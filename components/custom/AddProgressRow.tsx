'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DatePicker } from "./FormDrawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addProgressRow } from "@/lib/db"

export const AddProgressRow = () => {
  return(
    <Dialog>
      <DialogTrigger className="bg-white text-xl border-4 px-6 2xl:px-10 py-2 2xl:py-4 my-6 hover:rounded-2xl hover:text-white hover:bg-black duration-200 shadow-xl">Add Progress Row +</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Progress Row with the form below</DialogTitle>
          <DialogDescription>
            <form action={addProgressRow} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <DatePicker name='date' />
              </div>
              <div>
                <Label>Weight</Label>
                <Input type='number' name='weight' />
              </div>
              <button type='submit' className="bg-black text-white px-4 py-2 rounded-lg col-span-2">Submit</button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}