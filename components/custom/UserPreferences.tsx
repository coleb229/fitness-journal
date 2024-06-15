import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateGoal } from "@/lib/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const UserPreference = ({ action, label, target, preferences, type }:any) => {
  return (
    <form action={action}>
      <Label htmlFor={target}>{label}</Label>
      <div className="flex">
        <Input type={type} name={target} id={target} className="mr-4" defaultValue={preferences} />
        <Button type="submit">Update</Button>
      </div>
    </form>
  )
}

export const UpdateGoal = () => {
  return (
    <form action={updateGoal}>
      <Label htmlFor="goal">Goal</Label>
      <div className="flex">
        <Select name="goal">
          <SelectTrigger className="w-[220px] mr-3">
            <SelectValue placeholder="Select Your Goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lose">Lose weight</SelectItem>
            <SelectItem value="maintain">Maintain weight</SelectItem>
            <SelectItem value="gain">Gain Weight</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Update</Button>
      </div>
    </form>
  )
}