import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { addGoal } from "@/lib/db"

export const AddGoal = () => {
  return (
    <Dialog>
      <DialogTrigger className="font-bold bg-white mr-4 my-4 text-xl px-4 py-2 border hover:bg-black hover:rounded-lg hover:text-white hover:scale-125 duration-200">+</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What goal are we setting?</DialogTitle>
          <DialogDescription>
            <form action={addGoal}>
              <Label htmlFor="goal">Goal</Label>
              <Select name="goal">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose weight</SelectItem>
                </SelectContent>
                <Label htmlFor="target">Target</Label>
                <Input type="number" name="target" id="target" />
              </Select>
              <Button type="submit" className="bg-black text-white">Submit</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}