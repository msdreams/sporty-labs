export default function Background() {
  return (
    <div
      className="w-full bg-cover bg-left bg-no-repeat h-[700px] md:h-[1000px] 2xl:h-[1450px] "
      style={{ backgroundImage: `url('/bg_man.jpg')` }}
    >
      <div className="w-full h-full bg-[#ffffff77] animate-blur" />
    </div>
  )
}