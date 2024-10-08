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
import { redirect, useSearchParams } from "next/navigation";
import { ImPencil2 } from "react-icons/im";
import { useOptimistic } from "react";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast"

type DailyLog = {
    id: number,
    date: string,
    calories: number,
    fat: number,
    protein: number,
    carbs: number,
    abs: boolean,
    cardio: boolean,
    training: string,
    tFat: number,
    tProtein: number,
    tCarbs: number,
    tCalories: number,
    weight: number,
    notes: string
}

type DailyLogProps = {
    dailyLog: DailyLog[]
}

export const OutputTable = ({ data, targets, actions, fullData, userPreferences }:any) => {

    const [entries, setEntries] = useState(data)

    const [optimisticEntries, updateOptimisticEntries] = useOptimistic(
        entries,
        setEntries
    )

    const handleAbSwitch = (formData:any) => {
        const index = optimisticEntries.findIndex((entry: any) => entry.id === formData.get('id'));
        if (index === -1) return;  // Early exit if no matching entry is found.
    
        const updatedEntries = [...optimisticEntries];
        updatedEntries[index] = {
            ...updatedEntries[index],
            abs: !updatedEntries[index].abs,
        };

        updateOptimisticEntries(updatedEntries);

        try {
            actions.toggleAbs(formData)
        } catch (error) {
            console.error(error)
        }
    }

    const clientActions = {
        editCalories: async (formData: FormData) => {
          const result = await actions.editCalories(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editFat: async (formData: FormData) => {
          const result = await actions.editFat(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editProtein: async (formData: FormData) => {
          const result = await actions.editProtein(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editCarbs: async (formData: FormData) => {
          const result = await actions.editCarbs(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        toggleAbs: async (formData: FormData) => {
          const result = await actions.toggleAbs(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        toggleCardio: async (formData: FormData) => {
          const result = await actions.toggleCardio(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editTraining: async (formData: FormData) => {
          const result = await actions.editTraining(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editBodyWeight: async (formData: FormData) => {
          const result = await actions.editBodyWeight(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editNotes: async (formData: FormData) => {
          const result = await actions.editNotes(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editTargetFat: async (formData: FormData) => {
          const result = await actions.editTargetFat(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editTargetProtein: async (formData: FormData) => {
          const result = await actions.editTargetProtein(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editTargetCarbs: async (formData: FormData) => {
          const result = await actions.editTargetCarbs(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        },
        editTargetCalories: async (formData: FormData) => {
          const result = await actions.editTargetCalories(formData)
          if(result?.error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
          } else {
            toast({
                title: 'Success',
                description: 'Data updated successfully',
            })
            setTimeout(redirect('/journals/diet'), 200)
          }
        }
    }

    return (
        <Table>
            <TableCaption>
                <PaginationControls data={fullData} />
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
                        <EditButton id={userPreferences.id} action={clientActions.editTargetFat} value='targetFat' defaultVal={userPreferences.tFat}>
                            <p className="text-sm font-normal text-center text-red-500">{targets.tFat}</p>
                        </EditButton>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Protein
                        <EditButton id={userPreferences.id} action={clientActions.editTargetProtein} value='targetProtein' defaultVal={userPreferences.tProtein}>
                            <p className="text-sm font-normal text-center text-red-500">{targets.tProtein}</p>
                        </EditButton>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Carbs
                        <EditButton id={userPreferences.id} action={clientActions.editTargetCarbs} value='targetCarbs' defaultVal={userPreferences.tCarbs}>
                            <p className="text-sm font-normal text-center text-red-500">{targets.tCarbs}</p>
                        </EditButton>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">
                        Target Kcal
                        <EditButton id={userPreferences.id} action={clientActions.editTargetCalories} value='targetCalories' defaultVal={userPreferences.tCalories}>
                            <p className="text-sm font-normal text-center text-red-500">{targets.tCalories}</p>
                        </EditButton>
                    </TableHead>
                    <TableHead className="text-white pl-2 pr-0">Body Weight</TableHead>
                    <TableHead className="text-white pl-2 pr-0">Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {//optimisticEntries && optimisticEntries.length > 0 ? (
                    data.map((record:any) => (
                        record.date = new Date(record.date),
                        record.date = record.date.toDateString(),
                        <TableRow key={record.id}>
                            <TableCell className="bg-slate-600 text-white pl-2 pr-0">{record.date.toString()}</TableCell>
                            <TableCell className="bg-lime-400 pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editCalories} value='calories' defaultVal={record.calories}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.calories + ' '}{record.calories >= record.tCalories ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="bg-lime-400 pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editFat} value='fat' defaultVal={record.fat}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.fat + ' '}{record.fat >= record.tFat ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="bg-lime-400 pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editProtein} value='protein' defaultVal={record.protein}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.protein + ' '}{record.protein >= record.tProtein ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="bg-lime-400 pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editCarbs} value='carbs' defaultVal={record.carbs}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.carbs + ' '}{record.carbs >= record.tCarbs ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className='bg-cyan-400 pl-2 pr-0'>
                                <ToggleButton id={record.id} action={clientActions.toggleAbs} value={record.abs ? 'yes' : 'no'} defaultVal={record.abs} optimisticAction={handleAbSwitch}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.abs ? 'yes' : 'no'}
                                    </div>
                                </ToggleButton>
                            </TableCell>
                            <TableCell className='bg-cyan-400 pl-2 pr-0'>
                                <ToggleButton id={record.id} action={clientActions.toggleCardio} value={record.cardio ? 'yes' : 'no'} defaultVal={record.cardio}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.cardio ? 'yes' : 'no'}
                                    </div>
                                </ToggleButton>
                            </TableCell>
                            <TableCell className='bg-cyan-400 pl-2 pr-0'>
                                <EditButton id={record.id} action={clientActions.editTraining} value='training' defaultVal={record.training}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.training !== '' ? record.training : <ImPencil2 />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="bg-red-400 pl-2 pr-0">{record.tFat}</TableCell>
                            <TableCell className="bg-red-400 pl-2 pr-0">{record.tProtein}</TableCell>
                            <TableCell className="bg-red-400 pl-2 pr-0">{record.tCarbs}</TableCell>
                            <TableCell className="bg-red-400 pl-2 pr-0">{record.tCalories}</TableCell>
                            <TableCell className="bg-violet-400 pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editBodyWeight} value='weight' defaultVal={record.weight}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.weight}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="bg-purple-600 text-white pl-2 pr-0">
                                <EditButton id={record.id} action={clientActions.editNotes} value='training' defaultVal={record.notes}>
                                    <div className="flex hover:scale-125 duration-100 justify-center">
                                        {record.notes !== '' ? record.notes : <ImPencil2 />}
                                    </div>
                                </EditButton>
                            </TableCell>
                            <TableCell className="hover:text-white hover:bg-black hover:rounded-r-xl duration-150">
                                <DeleteDataButton id={record.id} action={deleteRecord} />
                            </TableCell>
                        </TableRow>
                    ))
                /*) : (
                    <TableRow>
                        <TableCell colSpan={14} className="text-center">No data available</TableCell>
                    </TableRow>
                )*/
                }
            </TableBody>
        </Table>
    )
}

const EditButton = ({ id, action, children, value, defaultVal }:any) => {
    const { toast } = useToast()

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Data</DialogTitle>
                <>
                    <form action={async (formData: FormData) => {
                        const result = await action(formData)
                        if (result) {
                            toast({
                                title: 'Success',
                                description: 'Data updated successfully',
                            })
                        } else {
                            toast({
                                title: 'Error',
                                description: 'Data failed to update',
                            })
                        }
                    }} className="mt-4">
                        <input type="hidden" name="id" value={id} />
                        <Label htmlFor={value} className="">Change Value:</Label>
                        <Input type="text" name={value} defaultValue={defaultVal} className="border-[1px]" />
                        <button type="submit" className="text-center text-white bg-black w-3/4 ml-auto py-2 my-2 hover:rounded-lg duration-150">Submit</button>
                    </form>
                </>
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
                <>
                    <form action={action} className="mt-4">
                        <input type="hidden" name="id" value={id} />
                        <p>current value: {value}</p>
                        <button type="submit" className="text-center text-white bg-black w-3/4 ml-auto py-2 my-2 hover:rounded-lg duration-150">Submit</button>
                    </form>
                </>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const PaginationControls = ({ data }:any) => {

    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '10'
    const start = 1
    const end = data.length / Number(per_page)
    
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {Number(page) <= start ? null : <PaginationPrevious href={`/journals/diet/?page=${Number(page) - 1}&per_page=${per_page}`} />}
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
                    {Number(page) > end ? null : <PaginationNext href={`/journals/diet/?page=${Number(page) + 1}&per_page=${per_page}`} />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}