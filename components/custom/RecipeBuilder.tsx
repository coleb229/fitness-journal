'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { addRecipe } from "@/lib/db"
import { DescriptionSection, FooterSection, PreviewRecipeInfoTabs } from "./RecipeSections"
import { PageHeader } from "./PageHeader"

export const RecipeBuilder = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [calories, setCalories] = useState(0)
  const [fat, setFat] = useState(0)
  const [protein, setProtein] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [serving, setServing] = useState(0)
  const recipe = {
    name: name,
    description: description,
    ingredients: ingredients,
    instructions: instructions,
    calories: calories,
    fat: fat,
    protein: protein,
    carbs: carbs,
    serving: serving
  }

  //page state for modal form
  const [page, setPage] = useState(1)
  const lastPage = 4

  return (
    <Dialog>
      <DialogTrigger className="bg-white text-xl border-4 px-6 2xl:px-10 py-2 2xl:py-4 my-6 hover:rounded-2xl hover:text-white hover:bg-black duration-200 shadow-xl">Add Recipe +</DialogTrigger>
      <DialogContent className="text-sm 2xl:text-md max-w-screen p-0 h-screen">
        <DialogHeader>
          <hr className="h-10" />
          <PreviewWindow data={recipe} />
        </DialogHeader>
        <form action={addRecipe} className="bg-slate-800 px-10 py-6 overflow-y-auto">
          <input hidden value={name} name="name" />
          <input hidden value={description} name="description" />
          <input hidden value={ingredients.split('\n')} name="ingredients" />
          <input hidden value={instructions.split('\n')} name="instructions" />
          <input hidden value={calories} name="calories" />
          <input hidden value={fat} name="fat" />
          <input hidden value={protein} name="protein" />
          <input hidden value={carbs} name="carbs" />
          <input hidden value={serving} name="serving" />
          {
            page === 1 ? (
              console.log(ingredients),
              <>
                <Label className='text-white text-xs 2xl:text-lg'>Recipe Name</Label>
                <Input
                  placeholder="Recipe name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <ModalControls page={page} setPage={setPage} lastPage={lastPage} />
              </>
            ) : null
          }
          {
            page === 2 ? (
              console.log(ingredients),
              <>     
                <div className="grid grid-cols-3 gap-2">
                  <div className="">
                    <Label className='text-white text-xs 2xl:text-lg'>Recipe Description</Label>
                    <Textarea
                      placeholder="Recipe description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Recipe Ingredients</Label>
                    <Textarea
                      placeholder="Recipe ingredients"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Recipe Instructions</Label>
                    <Textarea
                      placeholder="Recipe instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>
                <ModalControls page={page} setPage={setPage} lastPage={lastPage} />
              </>
            ) : null
          }
          {
            page === 3 ? (
              console.log(ingredients),
              <>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Calories</Label>
                    <Input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Fat</Label>
                    <Input
                      type="number"
                      value={fat}
                      onChange={(e) => setFat(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Protein</Label>
                    <Input
                      type="number"
                      value={protein}
                      onChange={(e) => setProtein(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className='text-white text-xs 2xl:text-lg'>Carbs</Label>
                    <Input
                      type="number"
                      value={carbs}
                      onChange={(e) => setCarbs(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <ModalControls page={page} setPage={setPage} lastPage={lastPage} />
              </>
            ) : null
          }
          {
            page === 4 ? (
              console.log(ingredients),
              <>
                <Label className='text-white text-xs 2xl:text-lg'>Serving Size</Label>
                <Input
                  type="number"
                  value={serving}
                  onChange={(e) => setServing(parseInt(e.target.value))}
                />
                <ModalControls page={page} setPage={setPage} lastPage={lastPage} />
              </>
            ) : null
          }
        </form>
      </DialogContent>
    </Dialog>
  )
}

const PreviewWindow = ({ data }:any) => {
  return (
    <div className="bg-slate-100 rounded-xl shadow-xl max-h-[300px] 2xl:max-h-[600px] min-[2000px]:max-h-[1000px] overflow-y-auto">
      <PageHeader title={data.name} description="Check out how your recipe will look" url='/journals/recipes/######' />
      <PreviewRecipeInfoTabs data={data} />
      <DescriptionSection data={data} />
      <FooterSection data={data} />
    </div>
  )
}

const ModalControls = ({ page, setPage, lastPage }:any) => {
  return (
    <div className="flex justify-between pt-6">
      {page === 1 ? <div className="w-1/2" /> : <button onClick={() => setPage(page - 1)} className="bg-slate-400 text-white w-1/2 my-4 px-6 py-2 2xl:px-10 2xl:py-4 hover:rounded-2xl hover:text-black duration-200 shadow-xl">Previous</button>}
      {page === lastPage ? <button type="submit" className="bg-slate-400 text-white w-1/2 my-4 px-6 py-2 2xl:px-10 2xl:py-4 hover:rounded-2xl hover:text-black duration-200 shadow-xl">Submit</button> : <button onClick={() => setPage(page + 1)} className="bg-slate-400 text-white w-1/2 my-4 px-6 py-2 2xl:px-10 2xl:py-4 hover:rounded-2xl hover:text-black duration-200 shadow-xl">Next</button>}
    </div>
  )
}