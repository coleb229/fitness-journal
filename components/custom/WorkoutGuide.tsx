import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export const WorkoutGuide = ({ data }:any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:shadow-xl">
        <WorkoutGuideCard data={data} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.title}</AlertDialogTitle>
          <AlertDialogDescription>
            <Image src={`/images/workouts/${data.name}.jpg`} alt={data.title} width={200} height={200} />
            <ol>
              {data.instructions.map((instruction:any, index:number) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const WorkoutGuideCard = ({ data }:any) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Targets the {data.target}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image src={`/images/workouts/${data.name}.jpg`} alt={data.title} width={200} height={200} />
      </CardContent>
    </Card>
  )
}