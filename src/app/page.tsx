// import Image from "next/image";

import Background from "@/сomponents/Background";
import Header from "@/сomponents/Header";
import Hero from "@/сomponents/Hero";

export default function Home() {
  return (
    <div>
      <div className="w-full h-[700px] md:h-[800px] overflow-hidden absolute top-0">
        <Background />
      </div>
      <div className="w-full px-4 md:px-6 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 md:gap-32">
        <Header />
        <Hero />
        </div>
      </div>
    </div>
  );
}
