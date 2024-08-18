'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState, useEffect } from "react";

export const PageHeader = ({ title, description, url }:any) => {

  return (
    <>
      <Trail url={url} />
      <header className="flex flex-col items-center w-screen py-14 bg-slate-800 text-white mb-10">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg text-center">{description}</p>
        </div>
      </header>
    </>
  );
}

const Trail = ({ url }:any) => {

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const crumbs = url.split('/').filter((crumb:any) => crumb)

  return (
    <Breadcrumb className="fixed top-14 left-5 z-50">
      {scrollY > 200 ? (
        <BreadcrumbList className="text-black bg-[#f2f2f2] px-4 py-2">
        {crumbs.map((crumb:any, index:number) => (
          crumb === crumbs[crumbs.length - 1] ? null :
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={`/${crumbs.slice(0, index + 1).join('/')}`}>
              {crumb}
            </BreadcrumbLink>
            <BreadcrumbSeparator/>
          </BreadcrumbItem>
        ))}
        <BreadcrumbPage className="text-black">
          {crumbs[crumbs.length - 1]}
        </BreadcrumbPage>
      </BreadcrumbList>
      ) : (
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
      )}
    </Breadcrumb>
  )
}