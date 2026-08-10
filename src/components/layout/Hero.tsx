
import Image from "next/image";
import bgWhite from "@/assets/images/bg_white.png"
import edina from "@/assets/images/hero_dina.png"

export default function Hero()
{
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Image 
                src={bgWhite} 
                alt="" 
                fill 
                priority
                className="object-cover z-0" 
            />
            {/* Overlay com a cor institucional */}
            <div className="absolute inset-0 z-10 bg-white/50" />
        </section>
    )
}