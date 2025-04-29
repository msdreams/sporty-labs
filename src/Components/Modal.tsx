import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,Divider} from '@heroui/react';
import { Time, ZonedDateTime } from '@internationalized/date';
import { FormData } from './event-boooking-form';
import type { DateValue } from "@react-types/datepicker";

type RangeValue<T> = { start: T; end: T };

interface BookingSummaryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  bookingData: FormData | null;
  formatDateRange: (range: RangeValue<DateValue> | null) => string;
  formatTime: (time: Time | ZonedDateTime | null) => string;
}

export function BookingSummaryModal({
  isOpen,
  onOpenChange,
  bookingData,
  formatDateRange,
  formatTime
}: BookingSummaryModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Event Booking Summary</h3>
            </ModalHeader>
            <ModalBody>
              {bookingData && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-default-500">Event Name</span>
                    <p className="font-medium">{bookingData.eventName}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-default-500">City</span>
                    <p className="font-medium">{bookingData.city}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-default-500">Date Range</span>
                    <p className="font-medium">{formatDateRange(bookingData.dateRange)}</p>
                  </div>
                  {bookingData.includeTime && (
                    <>
                      <Divider />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-default-500">Time</span>
                        <p className="font-medium">{formatTime(bookingData.startTime)}/ {formatTime(bookingData.endTime)}</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="secondary" onPress={onClose}>
                Confirm Booking
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}