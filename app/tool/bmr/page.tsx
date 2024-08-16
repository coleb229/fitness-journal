'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BmrCalculator } from "@/components/custom/BmrCalculator";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <PageHeader title="BMR Calculator" description='Find your BMR using this tool' url='/tool/bmr' />
      <BmrCalculator />
    </main>
  );
}
