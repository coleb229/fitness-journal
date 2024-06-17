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

  const calculateProgress = () => {
    const start = dailyLogs[0].weight
    const end = dailyLogs[dailyLogs.length - 1].weight
    const progress = start - end
    const target = start - goal.target
    const percentage = (progress / target) * 100
    console.log(percentage)
    return percentage
  }

  const number = calculateProgress()

  return (
    <li className="w-full border rounded shadow-lg">
      <p>{goal.goal}</p>
      <Progress value={number} max={goal.target} />
    </li>
  )
}