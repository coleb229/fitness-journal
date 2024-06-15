import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FaArrowTurnDown } from "react-icons/fa6";

export const GraphCollapsible = ({ title, children }:any) => {
    return (
        <Collapsible className="pb-10">
            <CollapsibleTrigger>
                <h1 className="text-2xl flex hover:scale-110 duration-100">{title} <FaArrowTurnDown className="mt-auto" /></h1>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="h-[500px] w-[1400px] pb-20">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}