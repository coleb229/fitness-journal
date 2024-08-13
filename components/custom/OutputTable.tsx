'use client'
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
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"  
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { DeleteDataButton } from "./DeleteDataButton";
import { deleteRecord } from "@/lib/db";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation";


export const OutputTable = ({ data, targets, actions, fullData }:any) => {
    return (
        <Table>
            <TableCaption>
                <PaginationControls />
            </TableCaption>
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
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>
                            <ToggleButton id={record.id} action={actions.toggleAbs} value={record.abs ? 'yes' : 'no'} defaultVal={record.abs}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.abs ? 'yes' : 'no'}
                                </div>
                            </ToggleButton>
                        </TableCell>
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>
                            <ToggleButton id={record.id} action={actions.toggleCardio} value={record.cardio ? 'yes' : 'no'} defaultVal={record.cardio}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.cardio ? 'yes' : 'no'}
                                </div>
                            </ToggleButton>
                        </TableCell>
                        <TableCell className='bg-cyan-400 pl-2 pr-0'>
                            <EditButton id={record.id} action={actions.editTraining} value='training' defaultVal={record.training}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.training}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tFat}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tProtein}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tCarbs}</TableCell>
                        <TableCell className="bg-red-400 pl-2 pr-0">{record.tCalories}</TableCell>
                        <TableCell className="bg-violet-400 pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editBodyWeight} value='weight' defaultVal={record.weight}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.weight}
                                </div>
                            </EditButton>
                        </TableCell>
                        <TableCell className="bg-purple-600 text-white pl-2 pr-0">
                            <EditButton id={record.id} action={actions.editNotes} value='training' defaultVal={record.notes}>
                                <div className="flex hover:scale-125 duration-100 justify-center">
                                    {record.notes}
                                </div>
                            </EditButton>
                        </TableCell>
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
                    <form action={action} className="mt-4">
                        <input type="hidden" name="id" value={id} />
                        <Label htmlFor={value} className="">Change Value:</Label>
                        <Input type="text" name={value} defaultValue={defaultVal} className="border-[1px]" />
                        <button type="submit" className="text-center text-white bg-black w-3/4 ml-auto py-2 my-2 hover:rounded-lg duration-150">Submit</button>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const ToggleButton = ({ id, action, children, value, defaultVal }:any) => {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure you want to toggle record for {id}?</DialogTitle>
                <DialogDescription>
                    <form action={action} className="mt-4">
                        <input type="hidden" name="id" value={id} />
                        <p>current value: {value}</p>
                        <button type="submit" className="text-center text-white bg-black w-3/4 ml-auto py-2 my-2 hover:rounded-lg duration-150">Submit</button>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const PaginationControls = ({}) => {

    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '10'
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href={`/journals/diet/?page=${Number(page) - 1}&per_page=${per_page}`} />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="/journals/diet/#">
                    {page}
                </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href={`/journals/diet/?page=${Number(page) + 1}&per_page=${per_page}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}