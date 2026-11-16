import Image from "next/image";

export default function PatternDivider() {
  return (
    <div className="bg-paan-dark-blue relative">
      <div className="w-full h-[30px] sm:h-[40px] md:h-[50px] relative">
         <Image
           src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-pattern.svg"
           fill
           alt=""
          className="object-cover w-full h-full"
           loading="lazy"
           sizes="100vw"
         />
       </div>
    </div>
  );
}
