'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";
import { fetchRecipes } from "@/lib/db";
import { RecipeSearch } from "@/components/custom/RecipeSearch";
import { RecipeBuilder } from "@/components/custom/RecipeBuilder";

export default async function Page() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  const recipes = await fetchRecipes()

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title="Recipes" description='Find a recipe for your next meal' url='/journals/recipes' />
      <div className="flex items-center gap-4 w-full">
        <RecipeSearch data={recipes} />
        <RecipeBuilder />
      </div>
    </main>
  )
}