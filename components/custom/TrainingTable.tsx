import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const TrainingTable = ({ exercise }:any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Weight</TableHead>
              <TableHead>10x3</TableHead>
              <TableHead>7x5</TableHead>
              <TableHead>5x7</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>woop</TableCell>
              <TableCell>woop</TableCell>
              <TableCell>woop</TableCell>
              <TableCell>woop</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}