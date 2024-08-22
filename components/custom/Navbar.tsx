'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const Navbar = ({ user }:any) => {
  return (
    <div className="flex justify-between items-center bg-slate-100 px-10 fixed top-0 w-screen shadow-md z-50">
      <NavMenu />
      <UserDropdown user={user} />
      <Link href='/' className="text-md 2xl:text-xl hover:scale-110 duration-100">Dashboard</Link>
    </div> 
  )
}

const UserDropdown = ({ user }:any) => {
  return (
    <div className="flex items-center">
      <h1 className="text-sm 2xl:text-lg font-semibold">Hello {user === undefined ? 'Tester' : user} </h1>
      <DropdownMenu>
        <DropdownMenuTrigger><b className="text-sm 2xl:text-xl ml-2">↴</b></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><a href="/user" className="hover:text-slate-500">Profile</a></DropdownMenuItem>
          {user === undefined ? <DropdownMenuItem><a href="/api/auth/signin" className="hover:text-slate-500">Login</a></DropdownMenuItem> : <DropdownMenuItem><a href="/api/auth/signout" className="hover:text-slate-500">Logout</a></DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm 2xl:text-lg bg-slate-100">Analytics</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/analytics" name="Data Visualization" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm 2xl:text-lg bg-slate-100">Tools</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/tool/bmr" name="BMR Calculator" />
            <NavMenuLink href="/tool/macros" name="Macros Calculator" />
            <NavMenuLink href="/tool/workout-guides" name="Workout Guides" />
            <NavMenuLink href="/tool/workout-planner" name="Workout Planner" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm 2xl:text-lg bg-slate-100">Journals</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/journals/diet" name="Diet Journal" />
            <NavMenuLink href="/journals/training" name="Training Journal" />
            <NavMenuLink href="/journals/measurements" name="Measurements Journal" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm 2xl:text-lg bg-slate-100">Knowledge</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/knowledge/diet-tips" name="Diet Tips" />
            <NavMenuLink href="/knowledge/training-tips" name="Training Journal" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const NavMenuLink = ({href, name}:any) => {
  return (
    <NavigationMenuLink>
      <a
        href={href}
        className="text-md flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-lg hover:shadow-md hover:font-semibold"
      >
        {name}
      </a>         
    </NavigationMenuLink>
  )
}