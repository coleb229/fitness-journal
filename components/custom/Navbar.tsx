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

export const Navbar = ({ user }:any) => {
  return (
    <div className="flex justify-between items-center bg-slate-100 px-10 fixed top-0 w-screen shadow-md z-50">
      <NavMenu />
      <UserDropdown user={user} />
    </div> 
  )
}

const UserDropdown = ({ user }:any) => {
  return (
    <div className="flex">
      <h1 className="text-lg">Hello {user} </h1>
      <DropdownMenu>
        <DropdownMenuTrigger><b className="text-xl ml-2">↴</b></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><a href="/profile" className="hover:text-slate-500">Profile</a></DropdownMenuItem>
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
          <NavigationMenuTrigger className="text-lg bg-slate-100">Analytics</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/analytics" name="Daily Logs" />
            <NavMenuLink href="/analytics/weekly" name="Weekly Logs" />
            <NavMenuLink href="/analytics/monthly" name="Monthly Logs" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg bg-slate-100">Social</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/social" name="Friends" />
            <NavMenuLink href="/social/requests" name="Friend Requests" />
            <NavMenuLink href="/social/messages" name="Messages" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg bg-slate-100">Journals</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[400px]">
            <NavMenuLink href="/" name="Diet Journal" />
            <NavMenuLink href="/journals/food" name="Training Journal" />
            <NavMenuLink href="/journals/measurements" name="Measurements Journal" />
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