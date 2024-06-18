import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export const Notification = ({ message }:any) => {
  return (
    <Alert className="shadow-lg hover:shadow-2xl hover:scale-110 duration-150 my-2">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}