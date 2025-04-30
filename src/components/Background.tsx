"use client"

export default function Background() {
  return (
    <div
      className="w-full bg-cover bg-left bg-no-repeat h-[700px] md:h-[1000px] 2xl:h-[1450px] opacity-0 animate-fade-in"
      style={{ backgroundImage: `url('/bg_man.jpg')` }}
    >
      <div className="w-full h-full bg-white/40 backdrop-blur-sm" />
    </div>
  )
}