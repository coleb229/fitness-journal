import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { navigationRoutes } from "@/app/data/navigationRoutes"

export const FastTravel = () => {
  return (
    <Command className="w-1/2 my-12 shadow-xl">
      <CommandInput placeholder="Fast Travel to a Different Page..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Dashboard">
          <CommandItem>
            <a href="/" className="hover:text-slate-500">Dashboard</a>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Analytics">
          {navigationRoutes.map((route:any) => (
            route.section === 'analytics' ? (
              <CommandItem key={route.title}>
                <a href={route.route} className="hover:text-slate-500">{route.title}</a>
              </CommandItem>
            ) : null
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tools">
          {navigationRoutes.map((route:any) => (
            route.section === 'tool' ? (
              <CommandItem key={route.title}>
                <a href={route.route} className="hover:text-slate-500">{route.title}</a>
              </CommandItem>
            ) : null
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Journals">
          {navigationRoutes.map((route:any) => (
            route.section === 'journals' ? (
              <CommandItem key={route.title}>
                <a href={route.route} className="hover:text-slate-500">{route.title}</a>
              </CommandItem>
            ) : null
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Knowledge">
          {navigationRoutes.map((route:any) => (
            route.section === 'knowledge' ? (
              <CommandItem key={route.title}>
                <a href={route.route} className="hover:text-slate-500">{route.title}</a>
              </CommandItem>
            ) : null
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="User">
          {navigationRoutes.map((route:any) => (
            route.section === 'user' ? (
              <CommandItem key={route.title}>
                <a href={route.route} className="hover:text-slate-500">{route.title}</a>
              </CommandItem>
            ) : null
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  )
}