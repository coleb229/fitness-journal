import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiInfo } from "react-icons/fi";

export const TooltipComponent = ({ message }:any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="p-6">
          <FiInfo />
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}