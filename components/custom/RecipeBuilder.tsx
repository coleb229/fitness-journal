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

  const handleSubmit = () => {
    console.log(name, description, ingredients, instructions)
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-white text-xl border-4 px-6 2xl:px-10 py-2 2xl:py-4 my-6 hover:rounded-2xl hover:text-white hover:bg-black duration-200 shadow-xl">Add Recipe +</DialogTrigger>
      <DialogContent className="px-10 text-sm 2xl:text-md max-w-screen">
        <DialogHeader>
          <DialogTitle>Add a new recipe</DialogTitle>
          <PreviewWindow name={name} description={description} ingredients={ingredients} instructions={instructions} />
        </DialogHeader>
        <form action={addRecipe}>
          <Label>Recipe Name</Label>
          <Input
            placeholder="Recipe name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>Recipe Description</Label>
              <Textarea
                placeholder="Recipe description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Recipe Ingredients</Label>
              <Textarea
                placeholder="Recipe ingredients"
                value={ingredients}
                name="ingredients"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div>
              <Label>Recipe Instructions</Label>
              <Textarea
                placeholder="Recipe instructions"
                value={instructions}
                name="instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Calories</Label>
              <Input
                type="number"
                value={calories}
                name="calories"
                onChange={(e) => setCalories(parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Fat</Label>
              <Input
                type="number"
                value={fat}
                name="fat"
                onChange={(e) => setFat(parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Protein</Label>
              <Input
                type="number"
                value={protein}
                name="protein"
                onChange={(e) => setProtein(parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Carbs</Label>
              <Input
                type="number"
                value={carbs}
                name="carbs"
                onChange={(e) => setCarbs(parseInt(e.target.value))}
              />
            </div>
          </div>
          <Label>Serving Size</Label>
          <Input
            type="number"
            value={serving}
            name="serving"
            onChange={(e) => setServing(parseInt(e.target.value))}
          />
          <button type="submit" className="bg-slate-400 text-white w-full my-4 px-6 py-2 2xl:px-10 2xl:py-4 hover:rounded-2xl hover:text-black duration-200 shadow-xl">Submit</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const PreviewWindow = ({ name, description, ingredients, instructions }:any) => {
  return (
    <div className="bg-slate-100 p-4 rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{description}</p>
      <h2 className="text-lg font-semibold">Ingredients</h2>
      <ul className="list-disc px-10">
        {ingredients.split('\n').map((ingredient:any, index:any) => (
          <li key={index}>{ingredient}</li>
        ))} 
      </ul>
      <h2 className="text-lg font-semibold">Instructions</h2>
      <ol className="list-decimal px-10">
        {instructions.split('\n').map((instruction:any, index:any) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  )
}