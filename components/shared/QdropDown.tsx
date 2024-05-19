import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import {
  IOption,
  IQuestionnaire,
} from "@/lib/database/models/questionnaire.model";
import { getQuestionnaire } from "@/lib/actions/questionnaire.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  options: IOption;
};

const Qdropdown = ({ value, onChangeHandler, options }: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder={options.label} />
      </SelectTrigger>
      <SelectContent>
        {options.select.map((item) => (
          <SelectItem
            key={item}
            value={item}
            className="select-item p-regular-14"
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Qdropdown;
