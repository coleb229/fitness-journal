'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { ProgressImageUpload } from "./ImageUpload"

export const ProgressTable = ({ data, images }:any) => {
  return (
    <Accordion type="single" collapsible className="bg-white shadow-xl px-6 rounded-lg">
      {data.map((item:any) => (
        item.date = new Date(item.date).toDateString(),
        <AccordionItem value={item.date} key={item.id}>
          <AccordionTrigger>{`${item.date} - (Weight: ${item.weight}lbs)`}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-4">
              {images.length > 0 ? (
                images[0].map((image:any) => (
                  image.progressEntryId === item.id &&
                    <Image
                      key={image.id}
                      src={image.url}
                      alt={image.filename}
                      width={400}
                      height={400}
                      className="max-w-[200px] max-h-[200px] 2xl:max-w-[400px] 2xl:max-h-[400px] overflow-hidden"
                    />
              ))
              ) : (
                <>
                  <div>No images uploaded for this date.</div>
                </>
              )}
              <ProgressImageUpload id={item.id} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}