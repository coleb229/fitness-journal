import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export const OutputTable = ({ data }:any) => {
    return (
        <Table>
            <TableCaption>Daily fitness chart</TableCaption>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Kcal</TableHead>
                    <TableHead>Fat</TableHead>
                    <TableHead>Protein</TableHead>
                    <TableHead>Carbs</TableHead>
                    <TableHead>Abs</TableHead>
                    <TableHead>Cardio</TableHead>
                    <TableHead>Training</TableHead>
                    <TableHead>Target Fat</TableHead>
                    <TableHead>Target Protein</TableHead>
                    <TableHead>Target Carbs</TableHead>
                    <TableHead>Target Kcal</TableHead>
                    <TableHead>Body Weight</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record:any) => (
                    record.date = new Date(record.date),
                    record.date = record.date.toDateString(),
                    <TableRow key={record.id}>
                        <TableCell className="bg-slate-600 text-white">{record.date.toString()}</TableCell>
                        <TableCell className="bg-lime-400">{record.calories}</TableCell>
                        <TableCell className="bg-lime-400">{record.fat}</TableCell>
                        <TableCell className="bg-lime-400">{record.protein}</TableCell>
                        <TableCell className="bg-lime-400">{record.carbs}</TableCell>
                        <TableCell className='bg-cyan-400'>{record.abs}</TableCell>
                        <TableCell className='bg-cyan-400'>{record.cardio}</TableCell>
                        <TableCell className='bg-cyan-400'>{record.training}</TableCell>
                        <TableCell className="bg-red-400">{record.tFat}</TableCell>
                        <TableCell className="bg-red-400">{record.tProtein}</TableCell>
                        <TableCell className="bg-red-400">{record.tCarbs}</TableCell>
                        <TableCell className="bg-red-400">{record.tCalories}</TableCell>
                        <TableCell className="bg-violet-400">{record.weight}</TableCell>
                        <TableCell className="bg-purple-800 text-white">{record.notes}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}