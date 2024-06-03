import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { IOption } from "@/lib/database/models/questionnaire.model";
import { SelectGroup } from "@radix-ui/react-select";

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
        <SelectGroup>
          <SelectLabel>{options.label}</SelectLabel>
          {options.select.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="select-item p-regular-14"
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Qdropdown;
