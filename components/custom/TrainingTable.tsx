import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { createTrainingRow, toggleTenByThree, toggleSevenByFive, toggleFiveBySeven, deleteTrainingRow, deleteFullTrainingTable } from "@/lib/db"
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { DeleteDataButton } from "./DeleteDataButton"

let push = 'let me push this ish'

export const TrainingTable = ({ session, data }:any) => {
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{data[0].exercise.toUpperCase()}</CardTitle>
          <DeleteTableButton exercise={data[0].exercise} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-900 hover:bg-blue-900">
              <TableHead className="text-white">Weight</TableHead>
              <TableHead className="text-white">10x3</TableHead>
              <TableHead className="text-white">7x5</TableHead>
              <TableHead className="text-white">5x7</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row:any) => (
              <TableRow key={row.id}>
                <TableCell className="bg-blue-900 text-white">{row.weight} lbs</TableCell>
                <TableCell className="bg-blue-200">
                  <form action={toggleTenByThree}>
                    <input type="text" hidden value={row.id} name="id" />
                    <input type="text" hidden value={row.tenByThree} name="tenByThree" />
                    <button type="submit" className="flex">
                      {row.tenByThree ? <IoCheckmarkOutline className="text-green-600" /> : <RxCross1 className="text-red-600" />}
                    </button>  
                  </form>
                </TableCell>
                <TableCell className="bg-blue-200">
                  <form action={toggleSevenByFive}>
                    <input type="text" hidden value={row.id} name="id" />
                    <input type="text" hidden value={row.sevenByFive} name="sevenByFive" />
                    <button type="submit" className="flex">
                      {row.sevenByFive ? <IoCheckmarkOutline className="text-green-600" /> : <RxCross1 className="text-red-600" />}
                    </button>  
                  </form>  
                </TableCell>
                <TableCell className="bg-blue-200">
                  <form action={toggleFiveBySeven}>
                    <input type="text" hidden value={row.id} name="id" />
                    <input type="text" hidden value={row.fiveBySeven} name="fiveBySeven" />
                    <button type="submit" className="flex">
                      {row.fiveBySeven ? <IoCheckmarkOutline className="text-green-600" /> : <RxCross1 className="text-red-600" />}
                    </button>  
                  </form>
                </TableCell>
                <TableCell className="bg-blue-900 text-white">
                  <DeleteDataButton id={row.id} action={deleteTrainingRow} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog>
          <DialogTrigger className="font-bold ml-auto mr-4 my-4 text-xl px-4 py-2 border hover:bg-black hover:rounded-lg hover:text-white hover:scale-125 duration-200">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">{data.exercise}</DialogTitle>
              <DialogDescription>
                <form action={createTrainingRow} className="flex">
                  <div>
                    <Label>Weight</Label>
                    <div className="flex">
                      <Input name="weight" type="number" />
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                  <input type="text" hidden value={data.exercise} id="exercise" name="exercise" />
                  <input type="text" hidden defaultValue={session} name="user" />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

const DeleteTableButton = ({ exercise }:any) => {
  return (
    <Dialog>
      <DialogTrigger className="text-red-500 font-semibold">x</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your training data for this exercise.
            <form action={deleteFullTrainingTable}>
              <input type="text" hidden value={exercise} name="exercise" />
              <button type="submit" className="flex mx-auto my-2 p-4 border-2 hover:bg-black hover:text-white hover:rounded-lg duration-150">Delete</button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}