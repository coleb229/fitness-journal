import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { WeightLineGraph, FatLineGraph, ProteinLineGraph, CarbsLineGraph } from "./LineGraph"

export const GraphCarousel = ({ data, goal }:any) => {
    if(data.length === 0) {
        return (
            <div>
                <p className="font-bold">No data to display</p>
                <p>Add your first log in the diet journal to see this graph appear</p>
            </div>
        )
    }

    return (
        <Carousel className="bg-white rounded-lg shadow-2xl pb-2">
            <CarouselContent className="w-full h-[400px]">
                <CarouselItem>
                    <WeightLineGraph data={data} goal={goal} key='weight' />
                </CarouselItem>
                <CarouselItem>
                    <FatLineGraph data={data} key='fat' />
                </CarouselItem>
                <CarouselItem>
                    <ProteinLineGraph data={data} key='protein' />
                </CarouselItem>
                <CarouselItem>
                    <CarbsLineGraph data={data} key='carbs' />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}