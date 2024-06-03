"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { OptionKeys, eventDefaultValues } from "@/constants";
// import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { IQuestionnaire } from "@/lib/database/models/questionnaire.model";
import { getQuestionnaire } from "@/lib/actions/questionnaire.actions";
import QdropDown from "./QdropDown";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire[]>([]);

  useEffect(() => {
    const loadQuestionnaire = async () => {
      const questionnaire = await getQuestionnaire();
      if (questionnaire) {
        setQuestionnaire(questionnaire as IQuestionnaire[]);
      }
    };

    loadQuestionnaire();
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues:
      event && type === "Update" ? { ...event } : eventDefaultValues,
  });

  const passQueryString = (values: any) => {
    const { surfingLevel, budget, waterTemp, monthToTravel } = values;
    const queryString = new URLSearchParams({
      surfingLevel: surfingLevel || "",
      budget: budget || "",
      waterTemp: waterTemp || "",
      monthToTravel: monthToTravel || "",
    }).toString();
    router.push(`/explore?${queryString}`, { scroll: false });
  };

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/explore`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/explore`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    passQueryString(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-col">
          {/* <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {questionnaire[0]?.options.map((option) => (
            <FormField
              key={option.key}
              control={form.control}
              name={option.key as OptionKeys}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <QdropDown
                      onChangeHandler={field.onChange}
                      value={field.value}
                      options={option}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >

          {form.formState.isSubmitting ? "Submitting..." : ` Search `}
        </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
