"use client"

import React from "react";
import { Form, Input, DateRangePicker, TimeInput, Button, Checkbox,Tooltip, Autocomplete, AutocompleteItem, useDisclosure} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getLocalTimeZone, Time, ZonedDateTime,today} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { BookingSummaryModal } from "./Modal";

const CITIES = [
  { key: 'nyc', value: 'New York' },
  { key: 'la', value: 'Los Angeles' },
  { key: 'chi', value: 'Chicago' },
  { key: 'mia', value: 'Miami' },
  { key: 'sf', value: 'San Francisco' },
  { key: 'sea', value: 'Seattle' }
];

export interface FormData {
  city: string;
  eventName: string;
  dateRange: RangeValue<DateValue> | null;
  startTime: Time | ZonedDateTime | null;
  endTime: Time | ZonedDateTime | null;
  includeTime: boolean;
}

export function EventBookingForm() {
  const [formData, setFormData] = React.useState<FormData>({
    city: CITIES[0].value,
    eventName: "",
    dateRange: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ days: 1 })
    },
    startTime: new Time(9, 0),
    endTime: new Time(17, 0),
    includeTime: false
  });
  const [submitted, setSubmitted] = React.useState<FormData | null>(null);
  const [emailError, setEmailError] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dateFormatter = useDateFormatter({ dateStyle: "long" });
  const timeFormatter = useDateFormatter({ timeStyle: "short" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName) {
      setEmailError(true);
      return
    } else {
      setEmailError(false);
    }
    setSubmitted({ ...formData });
    onOpen();
  };

  const handleReset = () => {
    setFormData({
      city: CITIES[0].value,
      eventName: "",
      dateRange: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 1 })
      },
      startTime: new Time(9, 0),
      endTime: new Time(17, 0),
      includeTime: false
    });
    setSubmitted(null);
    setEmailError(false);
  };
  
  const formatTime = (time: Time | ZonedDateTime | null) => {
    if (!time) return "--";
    if (time instanceof ZonedDateTime && time.toDate) {
      return timeFormatter.format(time.toDate());
    }
    return time.toString();
  };
  
  const formatDateRange = (range: RangeValue<DateValue> | null) => {
    if (!range || !range.start || !range.end) return "--";
    
    return dateFormatter.formatRange(
      range.start.toDate(getLocalTimeZone()),
      range.end.toDate(getLocalTimeZone())
    );
  };
  
  return (
    <Form
      className="w-full flex-col gap-4 md:gap-0"
      onSubmit={handleSubmit}
>
      <div className=" w-full flex flex-col gap-4 md:flex-row items-top md:h-[80px]">
      <Autocomplete
          className="w-full data-[hover=true]:!bg-secondary-200"
          classNames={{ listbox: "hover:bg-secondary-200" }}
          name="city"
          placeholder="Search for a city"
          defaultItems={CITIES}

          label="City"
            selectedKey={formData.city}
            onSelectionChange={(value) => {
              const selectedCity = CITIES.find(city => city.value === value);
              if (selectedCity) {
                setFormData({ ...formData, city: selectedCity.value });
              }
            }}
          listboxProps={{
            itemClasses: {
              base: [
                "data-[hover=true]:bg-primary-50",
                "data-[hover=true]:text-primary-600",
                "data-[selected=true]:bg-primary-100",
                "data-[selected=true]:text-primary-700",
                "transition-colors"
              ].join(" ")
            }
          }}
          >
            {(item) => (
              <AutocompleteItem key={item.value} textValue={item.value}>
                {item.value}
              </AutocompleteItem>
            )}
          </Autocomplete>
      
        <Input
          label="Event Name"
          name="eventName"
          placeholder="Enter event name"
          value={formData.eventName}
          onValueChange={(value) => setFormData({ ...formData, eventName: value })}
          isInvalid={emailError}
        />
        
        <DateRangePicker
          id="dateRange"
          label="Event Date Range"
          aria-label="Select event date range"
          value={formData.dateRange}
          onChange={(value) => setFormData({ ...formData, dateRange: value })}
          classNames={{inputWrapper: "hover:!bg-secondary-100"}}
        />
      </div>
      <div className="w-full flex flex-col items-start gap-6 md:flex-row md:justify-between md:place-items-center">
        <div className="w-full flex flex-col md:flex-row gap-4 md:h-[76px]">
          <Checkbox
            className="w-[500px]"
            isSelected={formData.includeTime}
            onValueChange={(selected) => setFormData({...formData, includeTime: selected})}
          >
            Specify Time
          </Checkbox>
          
          {formData.includeTime && (
            <div className=" w-full flex flex-row gap-4 items-center ">
              <div className="w-full space-y-1">
                <TimeInput
                  id="startTime"
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(value) => setFormData({...formData, startTime: value})}
                />
                <div className="flex justify-start">
                  <Tooltip content="Tap on time segments to adjust values">
                    <div className="flex items-center text-xs text-default-500 gap-1 cursor-help">
                      <Icon icon="lucide:arrow-up-down" className="hidden md:block w-3.5 h-3.5" />
                      <span className="md:hidden">Tap on to adjust</span>
                      <span className="hidden md:block">Click or use arrow keys</span>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="w-full space-y-1">
                <TimeInput
                  id="endTime"
                  label="End Time"
                  value={formData.endTime}
                  onChange={(value) => setFormData({...formData, endTime: value})}
                />
                <div className="flex justify-start">
                  <Tooltip content="Tap on time segments to adjust values">
                    <div className="flex items-center text-xs text-default-500 gap-1 cursor-help">
                      <Icon icon="lucide:arrow-up-down" className="hidden md:block w-3.5 h-3.5" />
                      <span className="md:hidden">Tap on to adjust</span>
                      <span className="hidden md:block">Click or use arrow keys</span>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-end gap-2">
          <Button
              className="border-white text-gray-700"
              variant="bordered"
              startContent={<Icon icon="lucide:refresh-ccw" />}
              onPress={handleReset}
            >
              Reset
            </Button>
            
            <Button
              color="primary"
              type="submit"
              startContent={<Icon icon="lucide:calendar-check" />}
            >
              Book Event
            </Button>
          </div>
      </div>
      <BookingSummaryModal
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        bookingData={submitted} 
        formatDateRange={formatDateRange}
        formatTime={formatTime}
      />
    </Form>
  );
}
