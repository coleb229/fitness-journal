'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
    <main className="flex items-center flex-col px-24 py-10 min-h-screen">
      <PageHeader title="Diet Tips" description='Learn how to eat better' url='/knowledge/diet-tips' />
      <BeginnerTips />
    </main>
  );
}

const BeginnerTips = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 border-b-2 border-black italic">Beginner Tips</h1>
      <ol className="list-disc list-inside">
        <li className="font-semibold text-xl">Calories are king</li>
        <div className="flex ml-14 mb-2">
          <p>↳ If your goal is to lose weight, the most important metric to keep an eye on is your calorie intake.  It is recommended to lose weight at a gradual rate, about 1lb/week, for the majority of people.  To accomplish this, calculate your Basil Metabolic Rate (BMR) from the tools section of this app and then subtract 500 calories from that number.</p>
        </div>
        <div className="flex ml-14 mb-8">
          <p>↳ Same deal with gaining weight, but when gaining, you should add 500 calories to your bmr if you want to expect to gain a lb of body mass every week.  To build muscle mass though, be aware that you will need to do more than just eat in a caloric surplus.  More on that later.</p>
        </div>
        <li className="font-semibold text-xl">Protein is the most satiating macro</li>
        <div className="flex ml-14 mb-4">
          <p>↳ Protein is the macro that is necessary for building muscle.  You will not build muscle without the proper stimulus for growth though (resistance training, manual labor, etc.)</p>
        </div>
        <div className="flex ml-14 mb-4">
          <p>↳ Protein is going to be your best friend to stave off food cravings in a caloric deficit, as it is by far the most satiating macro in contrast to fats and carbohydrates.</p>
        </div>
        <div className="flex ml-14 mb-4">
          <p>↳ Most people should shoot for around 40% of their daily caloric intake as protein.</p>
        </div>
        <div className="flex ml-14 mb-4">
          <p>↳ Low calorie whey isolate protein powder is a great staple meal substitute/addition when in a cut.  It is also a relatively inexpensive source of protein.</p>
        </div>
        <li className="font-semibold text-xl">Track everything that goes in</li>
        <div className="flex ml-14 mb-4">
          <p>↳ </p>
        </div>
        <li className="font-semibold text-xl">The first week is the worst week</li>
        <div className="flex ml-14 mb-4">
          <p>↳ </p>
        </div>
      </ol>
    </div>
  )
}