import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export const StatusAlert = ({ status }:any) => {
  return (
    <Alert className="absolute bottom-10 right-10">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {status}
      </AlertDescription>
    </Alert>
  )
}