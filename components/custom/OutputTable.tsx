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
import { deleteRecord } from "@/lib/db";

export const OutputTable = ({ data, targets }:any) => {
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
                            <div className="flex">
                                {record.calories + ' '}{record.calories >= record.tCalories ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <div className="flex">
                                {record.fat + ' '}{record.fat >= record.tFat ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <div className="flex">
                                {record.protein + ' '}{record.protein >= record.tProtein ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
                        </TableCell>
                        <TableCell className="bg-lime-400 pl-2 pr-0">
                            <div className="flex">
                                {record.carbs + ' '}{record.carbs >= record.tCarbs ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                            </div>
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