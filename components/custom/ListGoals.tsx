import { Progress } from "@/components/ui/progress"

export const ListGoals = ({ goals, dailyLogs }:any) => {

  return (
    <div>
      <ul>
        {goals.map((goal:any) => (
          <Goal key={goal.id} goal={goal} dailyLogs={dailyLogs} />
        ))}
      </ul>
    </div>
  )
}

const Goal = ({ goal, dailyLogs }:any) => {

    const start = dailyLogs[0].weight
    const end = dailyLogs[dailyLogs.length - 1].weight
    let progress = start - end
    let target = start - goal.target
    let percentage = (progress / target) * 100

    switch(goal.goal) {
      case 'lose':
        progress = start - end
        target = start - goal.target
        break
      case 'gain':
        progress = end - start
        target = goal.target - start
        break
    }

  return (
    <li className="w-full border rounded shadow-lg bg-white px-6 my-2">
      <p className="p-2 font-semibold text-cyan-500 italic">
        {goal.goal === 'lose' ? 'Lose Weight' : 'Gain Weight'}
        Drop down to {goal.target} lbs
      </p>
      <p className="text-right">{percentage.toFixed(2) + '%'}</p>
      <div className="flex items-center">
        <p className="pr-2">{start}</p>
        <Progress value={percentage} max={goal.target}  />
        <p className="pl-2">{goal.target}</p>
      </div>
    </li>
  )
}