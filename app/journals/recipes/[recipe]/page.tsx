import prisma from "@/lib/prisma"

export default async function Page({ params } : { params: { recipe: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.recipe
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <h1>{recipe?.name}</h1>
    </main>
  )
}