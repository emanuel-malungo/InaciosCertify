import Image from "next/image"
import logo from "@/assets/images/logo.png"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className="mx-auto container flex items-center justify-between py-4 px-6 lg:px-0">
                <div>
                    <Image src={logo} alt="EKANDA" width={100} height={200} />
                </div>

                <ul className="flex items-center space-x-8" >
                    <li>
                        <a href="#">Home</a>
                    </li>
                     <li>
                        <a href="#">Sobre Nós</a>
                    </li>
                    <li>
                        <a href="#">Os nossos serviços</a>
                    </li>
                    <li>
                        <a href="#">Localização</a>
                    </li>
                    <li>
                        <a href="#"><button>Contacte-nos</button></a>
                    </li>
                </ul>

                <button  className="bg-primary text-white p-2 round-sm " >
                    Emitir Certificado
                </button>

            </div>
        </header>
    )
}