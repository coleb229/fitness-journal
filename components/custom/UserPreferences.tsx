import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const UserPreference = ({ action, label, target, preferences }:any) => {
  return (
    <form action={action}>
      <Label htmlFor={target}>{label}</Label>
      <div className="flex">
        <Input type="number" name={target} id={target} className="mr-4" defaultValue={preferences} />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}