import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { WeightLineGraph, FatLineGraph, ProteinLineGraph, CarbsLineGraph } from "./LineGraph"

export const GraphCarousel = ({ data }:any) => {
    return (
        <Carousel>
            <CarouselContent className="w-[800px] h-[400px]">
                <CarouselItem>
                    <WeightLineGraph data={data} key='weight' />
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