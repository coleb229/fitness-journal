import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { newTrainingTable } from "@/lib/db"
import React from "react"

const exercises = ['benchPress', 'deadlift', 'squat', 'Overhead Press', 'pullUp', 'curl', 'dips', 'legPress', 'legCurl', 'legExtension', 'latPulldown', 'seatedRow', 'chestPress', 'shoulderFly', 'tricepExtension', 'preacherCurl', 'legRaise', 'crunch', 'russianTwist', 'plank', 'sidePlank', 'chestFly']

export const AddTrainingTable = () => {
  return (
    <div className="m-auto">
      <Dialog>
        <DialogTrigger >
          <TriggerComponent />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <form action={newTrainingTable}>
                <Label>Exercise</Label>
                <ExerciseSelect />
                <Label>Weight</Label>
                <Input name="weight" type="number" className="w-1/3" />
                <button type="submit" className="flex mx-auto my-2 p-4 border-2 hover:bg-black hover:text-white hover:rounded-lg duration-150">Submit</button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const TriggerComponent = () => {
  return (
    <div className="w-[200px] bg-white rounded-lg shadow-xl hover:scale-110 duration-150 p-4">
      <p className="text-xl font-semibold">Add a New Workout to Track</p>
    </div>
  )
}

const ExerciseSelect = () => {
  return (
    <Select name="exercise">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose Exercise..." />
      </SelectTrigger>
      <SelectContent>
        {exercises.map((exercise) => (
          <SelectItem key={exercise} value={exercise}>
            {exercise.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}