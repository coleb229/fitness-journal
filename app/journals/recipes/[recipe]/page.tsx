import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/custom/PageHeader"
import { RecipeInfoTabs, DescriptionSection, FooterSection } from "@/components/custom/RecipeSections"

export default async function Page({ params } : { params: { recipe: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.recipe
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title={recipe?.name} description={`Author: ${recipe?.user}`} url={`/journals/recipes/${recipe?.id}`} />
      <RecipeInfoTabs data={recipe} />
      <DescriptionSection data={recipe} />
      <FooterSection data={recipe} />
    </main>
  )
}