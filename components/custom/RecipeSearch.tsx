'use client'
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

export const RecipeSearch = ({ data }:any) => {
  const authors = data.map((recipe:any) => recipe.user).filter((value:any, index:any, self:any) => self.indexOf(value) === index)
  return(
    <Command>
      <CommandInput placeholder="Search for a recipe..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {authors.map((author:any) => (
          <>
            <CommandGroup key={author} heading={author}>
              {data.map((recipe:any) => (
                recipe.user === author ? <CommandItem key={recipe.name}>
                  <a href={`/journals/recipes/${recipe.id}`}>{recipe.name}</a>
                </CommandItem> : null
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        ))}
      </CommandList>
    </Command>
  )
}