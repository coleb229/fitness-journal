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
      <div className="flex justify-between items-center">
        {recipe?.image ? (
          <div className="bg-slate-600 p-2 rounded-lg shadow-xl m-6">
            <Image src={recipe?.image} alt={recipe?.name} width={400} height={400} className="max-w-[400px] max-h-[400px] overflow-hidden" />
          </div>
        ) : (
          user === recipe?.user && <RecipeImageUpload id={recipe?.id} />
        )}
        <RecipeInfoTabs data={recipe} className='w-full' />
      </div>
      <DescriptionSection data={recipe} />
      <FooterSection data={recipe} />
    </main>
  )
}