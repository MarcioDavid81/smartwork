"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

interface Props {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  name: string;
  placeholder: string;
}

export function DatePickerInput({ value, onChange, name, placeholder }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            type="text"
            name={name}
            value={value ? format(value, "dd-MM-yyyy") : ""}
            placeholder={placeholder}
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              if (!isNaN(inputDate.getTime())) {
                onChange(inputDate);
              }
            }}
            className="pr-10"
          />
          <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
          fromYear={1950}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}
