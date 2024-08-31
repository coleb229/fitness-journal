'use server'
import { ImageUpload } from "@/components/custom/ImageUpload"

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-4">
      <h1>Testing</h1>
      <ImageUpload />
    </main>
  )
}