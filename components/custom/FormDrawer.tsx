'use client'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { createRecord } from "@/lib/db"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const FormDrawer = ({ preferences }:any) => {
    return (
        <Drawer>
            <DrawerTrigger className="bg-white text-xl border-4 px-12 py-6 my-6 hover:rounded-2xl hover:text-white hover:bg-black duration-200">Add Record</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Add a new record to the table</DrawerTitle>
                <DrawerDescription>This action cannot be undone currently.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                <Form preferences={preferences} />
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

const Form = ({ preferences }:any) => {
    return (
        <form action={createRecord} className="grid grid-cols-4 gap-2">
            <div className="grid grid-cols-1">
                <Label>Date</Label>
                <DatePicker name='date' />
            </div>
            <div>
                <Label>Calories</Label>
                <Input name="calories" type="number" defaultValue={0} />
            </div>
            <div>
                <Label>Fat</Label>
                <Input name="fat" type="number" defaultValue={0} />
            </div>
            <div>
                <Label>Protein</Label>
                <Input name="protein" type="number" defaultValue={0} />
            </div>
            <div>
                <Label>Carbs</Label>
                <Input name="carbs" type="number" defaultValue={0} />
            </div>
            <div>
                <Label>Training</Label>
                <Input name='training' />
            </div>
            <div className="grid grid-cols-1 mx-auto">
                <Label>Abs</Label>
                <Checkbox name="abs" />
            </div>
            <div className="grid grid-cols-1 mx-auto">
                <Label>Cardio</Label>
                <Checkbox name="cardio" />
            </div>
            <div>
                <Label>Target Fat</Label>
                <Input name="tFat" type="number" defaultValue={preferences.tFat} />
            </div>
            <div>
                <Label>Target Protein</Label>
                <Input name="tProtein" type="number" defaultValue={preferences.tProtein} />
            </div>
            <div>
                <Label>Target Carbs</Label>
                <Input name="tCarbs" type="number" defaultValue={preferences.tCarbs} />
            </div>
            <div>
                <Label>Target Calories</Label>
                <Input name="tCalories" type="number" defaultValue={preferences.tCalories} />
            </div>
            <div>
                <Label>Weight</Label>
                <Input name="weight" type="number" defaultValue={0} />
            </div>
            <div>
                <Label>Notes</Label>
                <Input name="notes" />
            </div>
            <Button className="my-auto">Submit</Button>
        </form>
    )
}

const DatePicker = ({name}:any) => {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
          <input type="hidden" name={name} value={date ? date.toISOString() : ''} />
        </Popover>
    )
}