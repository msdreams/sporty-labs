import React from "react";
import { EventBookingForm } from "./event-boooking-form"
import { AnimatedActiveButton } from "./AnimatedActiveButton";

export default function Hero() {
  return (
    <div className="flex flex-col gap-6 md:gap-20 z-20">
      <div className="flex flex-col justify-center items-center">
      <div className="text-4xl md:text-5xl animate-fade-in-down">
        Make your life{" "}
          {/* <span className="text-white font-medium bg-primary px-4 pb-1 rounded-3xl ">
            active
          </span> */}
          <AnimatedActiveButton />

          , book your next activity!
      </div>
      </div>
      <div
        className=" w-full flex flex-row px-4 py-6 md:pt-12 md:px-8 lg:px-10 rounded-3xl bg-[#25DB49DD] animate-fade-in-up ">
        <EventBookingForm />
      </div>
    </div>
)
}