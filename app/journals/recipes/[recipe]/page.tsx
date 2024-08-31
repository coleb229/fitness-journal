import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/custom/PageHeader"
import { RecipeInfoTabs, DescriptionSection, FooterSection } from "@/components/custom/RecipeSections"
import { RecipeImageUpload } from "@/components/custom/ImageUpload"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tester } from "@/app/data/tester"

export default async function Page({ params } : { params: { recipe: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.recipe
    }
  })

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title={recipe?.name} description={`Author: ${recipe?.user}`} url={`/journals/recipes/${recipe?.id}`} />
      {recipe?.image ? (
        <Image src={recipe?.image} alt={recipe?.name} width={400} height={400} />
      ) : (
        user === recipe?.user && <RecipeImageUpload id={recipe?.id} />
      )}
      <RecipeInfoTabs data={recipe} />
      <DescriptionSection data={recipe} />
      <FooterSection data={recipe} />
    </main>
  )
}