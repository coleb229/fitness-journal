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

export const AddGoal = ({ dailyLogs, training }:any) => {
  const benchCheck = training.filter((t:any) => t.exercise === 'benchPress')
  const overheadPressCheck = training.filter((t:any) => t.exercise === 'overheadPress')
  const deadliftCheck = training.filter((t:any) => t.exercise === 'deadlift')
  const pullupCheck = training.filter((t:any) => t.exercise === 'pullup')
  const squatCheck = training.filter((t:any) => t.exercise === 'squat')
  const curlCheck = training.filter((t:any) => t.exercise === 'curl')

  return (
    <Dialog>
      <DialogTrigger className="font-bold bg-white mr-4 my-4 text-xl px-4 py-2 border hover:bg-black hover:rounded-lg hover:text-white hover:scale-125 duration-200">+</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What goal are we setting?</DialogTitle>
          <DialogDescription>
            <form action={addGoal}>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <Label htmlFor="goal">Goal</Label>
                  <Select name="goal">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {dailyLogs.length === 0 ? null : <SelectItem value="lose">Lose weight</SelectItem>}
                      {dailyLogs.length === 0 ? null : <SelectItem value="gain">Gain weight</SelectItem>}
                      {benchCheck.length === 0 ? null : <SelectItem value="bench">Bench weight</SelectItem>}
                      {overheadPressCheck.length === 0 ? null : <SelectItem value="overheadPress">Overhead Press weight</SelectItem>}
                      {deadliftCheck.length === 0 ? null : <SelectItem value="deadlift">Deadlift weight</SelectItem>}
                      {pullupCheck.length === 0 ? null : <SelectItem value="pullup">Pullup weight</SelectItem>}
                      {squatCheck.length === 0 ? null : <SelectItem value="squat">Squat weight</SelectItem>}
                      {curlCheck.length === 0 ? null : <SelectItem value="curl">Curl weight</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target">Target</Label>
                  <Input type="number" name="target" id="target" />
                </div>
              </div>
              <Button type="submit" className="bg-black text-white ml-auto">Submit</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}