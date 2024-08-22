import { Separator } from "@/components/ui/separator"

export const PageInfo = ({ props }:any) => {
  return (
    <div className="flex flex-col justify-center bg-amber-100 px-8 py-4 rounded-md shadow-lg border max-w-[50%]">
      <h1 className="text-xl 2xl:text-4xl font-bold">{props.title} Info</h1>
      <Separator className="w-[99%]" />
      {props.description.map((desc:any) => (
        <p key={desc} className="text-sm 2xl:text-lg py-2 px-4">{desc}</p>
      ))}
      <div className="flex w-full items-center justify-between h-5">
        <Separator orientation="vertical" />
        {props.links.map((link:any) => (
          <>
            <a key={link.href} href={link.href} target='_blank' className="text-sm 2xl:text-lg text-slate-500 hover:scale-110 duration-150">{link.text}</a>
            <Separator orientation="vertical" />
          </>
        ))}
      </div>
    </div>
  )
}