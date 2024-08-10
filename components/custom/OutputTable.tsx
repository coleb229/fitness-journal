import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { DeleteDataButton } from "./DeleteDataButton";
import { deleteRecord } from "@/lib/db";

export const OutputTable = ({ data, targets, actions }:any) => {
    return (
        <Table>
            <TableCaption>Daily fitness chart</TableCaption>
            <TableHeader>
                <TableRow className="text-md bg-slate-600 hover:bg-slate-600">
                    <TableHead className="text-white pl-2 pr-0">Date</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Kcal</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Fat</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Protein</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Carbs</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Abs</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Cardio</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Training</TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Fat
                        <p className="text-sm font-normal text-center text-red-500">{targets.tFat}</p>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Protein
                        <p className="text-sm font-normal text-center text-red-500">{targets.tProtein}</p>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Carbs
                        <p className="text-sm font-normal text-center text-red-500">{targets.tCarbs}</p>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Kcal
                        <p className="text-sm font-normal text-center text-red-500">{targets.tCalories}</p>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">Body Weight</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record:any) => (
                    record.date = new Date(record.date),
                    record.date = record.date.toDateString(),
                    <TableRow key={record.id}>
                        <TableCell className="bg-slate-600 text-white pl-2 pr-0">{record.date.toString()}</TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editCalories} value='calories' defaultVal={record.calories}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.calories + ' '}{record.calories >= record.tCalories ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editFat} value='fat' defaultVal={record.fat}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.fat + ' '}{record.fat >= record.tFat ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editProtein} value='protein' defaultVal={record.protein}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.protein + ' '}{record.protein >= record.tProtein ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editCarbs} value='carbs' defaultVal={record.carbs}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.carbs + ' '}{record.carbs >= record.tCarbs ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>{record.abs ? 'yes' : 'no'}</TableCell>
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>{record.cardio ? 'yes' : 'no'}</TableCell>
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>{record.training}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tFat}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tProtein}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tCarbs}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tCalories}</TableCell>
                        <TableCell className="bg-violet-400 pl-2 pr-0">{record.weight}</TableCell>
                        <TableCell className="bg-purple-600 text-white pl-2 pr-0">{record.notes}</TableCell>
                        <TableCell>
                            <DeleteDataButton id={record.id} action={deleteRecord} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const EditButton = ({ id, action, children, value, defaultVal }:any) => {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogDescription>
                    <form action={action}>
                        <input type="hidden" name="id" value={id} />
                        <input type="text" name={value} defaultValue={defaultVal} />
                        <button type="submit">Submit</button>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}