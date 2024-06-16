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
import { createTrainingRow, toggleTenByThree, toggleSevenByFive, toggleFiveBySeven } from "@/lib/db"
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export const TrainingTable = ({ session, exercise, data, title }:any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog>
          <DialogTrigger className="font-bold ml-auto mr-4 my-4 text-xl px-4 py-2 border hover:bg-black hover:rounded-lg hover:text-white hover:scale-125 duration-200">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">{title}</DialogTitle>
              <DialogDescription>
                <form action={createTrainingRow} className="flex">
                  <div>
                    <Label>Weight</Label>
                    <div className="flex">
                      <Input name="weight" type="number" />
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                  <input type="text" hidden value={exercise} id="exercise" name="exercise" />
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