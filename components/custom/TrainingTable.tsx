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

export const TrainingTable = ({ session, exercise, data }:any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise}</CardTitle>
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
                    <button type="submit">
                      {row.tenByThree ? 'x' : 'o'}
                    </button>  
                  </form>
                </TableCell>
                <TableCell className="bg-blue-200">
                  <form action={toggleSevenByFive}>
                    <input type="text" hidden value={row.id} name="id" />
                    <input type="text" hidden value={row.sevenByFive} name="sevenByFive" />
                    <button type="submit">
                      {row.sevenByFive ? 'x' : 'o'}
                    </button>  
                  </form>  
                </TableCell>
                <TableCell className="bg-blue-200">
                  <form action={toggleFiveBySeven}>
                    <input type="text" hidden value={row.id} name="id" />
                    <input type="text" hidden value={row.fiveBySeven} name="fiveBySeven" />
                    <button type="submit">
                      {row.fiveBySeven ? 'x' : 'o'}
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
              <DialogTitle>{exercise}</DialogTitle>
              <DialogDescription>
                <form action={createTrainingRow} className="flex">
                  <Label>Weight</Label>
                  <Input name="weight" type="number" />
                  <input type="text" hidden value={exercise} id="exercise" name="exercise" />
                  <input type="text" hidden defaultValue={session} name="user" />
                  <Button type="submit">Submit</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}