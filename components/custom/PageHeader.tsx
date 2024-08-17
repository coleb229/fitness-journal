'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const PageHeader = ({ title, description, url }:any) => {
  return (
    <>
      <Trail url={url} />
      <header className="flex flex-col items-center top-10 w-screen py-14 bg-slate-800 text-white mb-10">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg text-center">{description}</p>
        </div>
      </header>
    </>
  );
}

const Trail = ({ url }:any) => {
  const crumbs = url.split('/').filter((crumb:any) => crumb)

  return (
    <Breadcrumb className="fixed top-14 left-5">
      <BreadcrumbList className="text-white">
        {crumbs.map((crumb:any, index:number) => (
          crumb === crumbs[crumbs.length - 1] ? null :
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={`/${crumbs.slice(0, index + 1).join('/')}`}>
              {crumb}
            </BreadcrumbLink>
            <BreadcrumbSeparator/>
          </BreadcrumbItem>
        ))}
        <BreadcrumbPage className="text-white">
          {crumbs[crumbs.length - 1]}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}