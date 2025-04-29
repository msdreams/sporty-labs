import { EventBookingForm } from "./event-boooking-form"

export default function Hero() {
  return (
    <div className="flex flex-col gap-6 md:gap-20 z-20">
      <div className="flex flex-col justify-center items-center">
      <div className="text-4xl md:text-5xl">
        Make your life active,{" "}
        <span className=" text-secondary font-bold">book</span> your next activity!
      </div>
      </div>
      <div className="w-full flex flex-row px-4 py-6 md:pt-12 md:px-8 lg:px-10 rounded-3xl bg-[#33FF49CC] ">
        <EventBookingForm />
      </div>
    </div>
)
}