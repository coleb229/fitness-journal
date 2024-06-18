import { Progress } from "@/components/ui/progress"

export const ListGoals = ({ goals, dailyLogs, training }:any) => {

  return (
    <div>
      <ul>
        {goals.map((goal:any) => (
          <Goal key={goal.id} goal={goal} dailyLogs={dailyLogs} training={training} />
        ))}
      </ul>
    </div>
  )
}

const Goal = ({ goal, dailyLogs, training }:any) => {

    let start = dailyLogs[0].weight
    let end = dailyLogs[dailyLogs.length - 1].weight
    let progress = start - end
    let target = start - goal.target
    let header = ''

    const bench = training.filter((t:any) => t.exercise === 'benchPress')

    switch(goal.goal) {
      case 'lose':
        header = 'Drop down to ' + goal.target + ' lbs'
        start = dailyLogs[0].weight
        end = dailyLogs[dailyLogs.length - 1].weight
        progress = start - end
        target = start - goal.target
        break
      case 'gain':
        header = 'Bulk up to ' + goal.target + ' lbs'
        start = dailyLogs[0].weight
        end = dailyLogs[dailyLogs.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'bench':
        header = 'Bench ' + goal.target + ' lbs'
        start = bench[0].weight
        end = bench[bench.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
    }

    let percentage = (progress / target) * 100

  return (
    <li className="w-full border rounded shadow-lg bg-white px-6 my-2">
      <p className="p-2 font-semibold text-cyan-500 italic">
        {header}
      </p>
      <p className="text-right">{percentage.toFixed(2) + '%'}</p>
      <div className="flex items-center mb-4">
        <p className="pr-2">{start}</p>
        <Progress value={percentage} max={goal.target} />
        <p className="pl-2">{goal.target}</p>
      </div>
    </li>
  )
}