import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const RecipeInfoTabs = ({ data }:any) => {
  return(
    <Tabs defaultValue="nutrition" className="w-[400px] 2xl:w-[1200px] mx-auto">
      <TabsList className="w-full bg-slate-300">
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
      </TabsList>
      <TabsContent value="nutrition">
        <NutritionSection data={data} />
      </TabsContent>
      <TabsContent value="ingredients">
        <IngredientsSection data={data} />
      </TabsContent>
      <TabsContent value="instructions">
        <InstructionsSection data={data} />
      </TabsContent>
    </Tabs>
  )
}

export const PreviewRecipeInfoTabs = ({ data }:any) => {
  return(
    <Tabs defaultValue="nutrition" className="w-[400px] 2xl:w-[1200px] mx-auto">
      <TabsList className="w-full bg-slate-300">
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
      </TabsList>
      <TabsContent value="nutrition">
        <NutritionSection data={data} />
      </TabsContent>
      <TabsContent value="ingredients">
        <PreviewIngredientsSection data={data} />
      </TabsContent>
      <TabsContent value="instructions">
        <PreviewInstructionsSection data={data} />
      </TabsContent>
    </Tabs>
  )
}

export const NutritionSection = ({ data }:any) => {
  return(
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Nutrition Info</h2>
      <Separator />
      <div className="grid grid-cols-1 gap-4 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Calories</h3>
          <p>{data.calories}</p>
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold">Macronutrients</h3>
          <Separator />
          <div className="flex justify-around items-center">
            <div>
              <p className="p-2">Fat: {data.fat}</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div>
              <p className="p-2">Protein: {data.protein}</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <p className="p-2">Carbs: {data.carbs}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const IngredientsSection = ({ data }:any) => {
  return(
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Ingredients</h2>
      <Separator />
      <ul className="list-disc px-6">
        {data.ingredients.map((ingredient:any) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  )
}

export const PreviewIngredientsSection = ({ data }:any) => {
  const ingredients = data.ingredients.split('\n')
  return(
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Ingredients</h2>
      <Separator />
      <ul className="list-disc px-6">
        {ingredients.map((ingredient:any) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  )
}

export const InstructionsSection = ({ data }:any) => {
  return(
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Instructions</h2>
      <Separator />
      <ol className="list-decimal px-6">
        {data.instructions.map((instruction:any) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  )
}

export const PreviewInstructionsSection = ({ data }:any) => {
  const instructions = data.instructions.split('\n')
  return(
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Instructions</h2>
      <Separator />
      <ol className="list-decimal px-6">
        {instructions.map((instruction:any) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  )
}

export const DescriptionSection = ({ data }:any) => {
  return(
    <div className="bg-white p-6 rounded-lg mx-6 my-10 w-full">
      <h2 className="text-2xl font-bold">Recipe Description</h2>
      <Separator />
      <div className="p-10">
        <p>{data.description}</p>
      </div>
    </div>
  )
}

export const FooterSection = ({ data }:any) => {
  return(
    <div className="bg-slate-800 text-white p-6 mx-6 my-10 w-full">
      <div className="p-10 flex justify-around">
        <p>{data.user}</p>
        <p>{data.name}</p>
        <p>{data.id}</p>
      </div>
    </div>
  )
}