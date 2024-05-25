import {Check} from "lucide-react";

export const VerifiedMark = () => {
    return (
        <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-black">
            <Check className="h-[10px] w-[10px] text-primary stroke-[4px] stroke-white"/>
        </div>
    )
}