import { Feather } from "lucide-react"


const Logo = () => (
    <div className="flex justify-end w-full p-2 mb-8 items-center cursor-pointer font-mono font-bold text-2xl tracking-wider">
        <div className="hidden lg:block">
            FEATHERWING
        </div>
        
        <i className="ml-3 text-green-600"><Feather /></i>
    </div>
);

export { Logo };