import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { DeleteDataButton } from "./DeleteDataButton";

export const OutputTable = ({ data }:any) => {
    return (
        <Table>
            <TableCaption>Daily fitness chart</TableCaption>
            <TableHeader>
                <TableRow className="text-lg bg-slate-600 hover:bg-slate-600">
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Kcal</TableHead>
                    <TableHead className="text-white">Fat</TableHead>
                    <TableHead className="text-white">Protein</TableHead>
                    <TableHead className="text-white">Carbs</TableHead>
                    <TableHead className="text-white">Abs</TableHead>
                    <TableHead className="text-white">Cardio</TableHead>
                    <TableHead className="text-white">Training</TableHead>
                    <TableHead className="text-white">Target Fat</TableHead>
                    <TableHead className="text-white">Target Protein</TableHead>
                    <TableHead className="text-white">Target Carbs</TableHead>
                    <TableHead className="text-white">Target Kcal</TableHead>
                    <TableHead className="text-white">Body Weight</TableHead>
                    <TableHead className="text-white">Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record:any) => (
                    record.date = new Date(record.date),
                    record.date = record.date.toDateString(),
                    <TableRow key={record.id}>
                        <TableCell className="bg-slate-600 text-white">{record.date.toString()}</TableCell>
                        <TableCell className="bg-lime-400">
                            <div className="flex">
                                {record.calories + ' '}{record.calories >= record.tCalories ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400">
                            <div className="flex">
                                {record.fat + ' '}{record.fat >= record.tFat ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400">
                            <div className="flex">
                                {record.protein + ' '}{record.protein >= record.tProtein ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400">
                            <div className="flex">
                                {record.carbs + ' '}{record.carbs >= record.tCarbs ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className='bg-cyan-400'>{record.abs ? 'yes' : 'no'}</TableCell>
                        <TableCell className='bg-cyan-400'>{record.cardio ? 'yes' : 'no'}</TableCell>
                        <TableCell className='bg-cyan-400'>{record.training}</TableCell>
                        <TableCell className="bg-red-400">{record.tFat}</TableCell>
                        <TableCell className="bg-red-400">{record.tProtein}</TableCell>
                        <TableCell className="bg-red-400">{record.tCarbs}</TableCell>
                        <TableCell className="bg-red-400">{record.tCalories}</TableCell>
                        <TableCell className="bg-violet-400">{record.weight}</TableCell>
                        <TableCell className="bg-purple-600 text-white">{record.notes}</TableCell>
                        <TableCell>
                            <DeleteDataButton id={record.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}