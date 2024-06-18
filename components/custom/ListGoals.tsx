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
    const overheadPress = training.filter((t:any) => t.exercise === 'overheadPress')
    const deadlift = training.filter((t:any) => t.exercise === 'deadlift')
    const pullup = training.filter((t:any) => t.exercise === 'pullup')
    const squat = training.filter((t:any) => t.exercise === 'squat')
    const curl = training.filter((t:any) => t.exercise === 'curl')

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
      case 'overheadPress':
        header = 'Overhead Press ' + goal.target + ' lbs'
        start = overheadPress[0].weight
        end = overheadPress[overheadPress.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'deadlift':
        header = 'Deadlift ' + goal.target + ' lbs'
        start = deadlift[0].weight
        end = deadlift[deadlift.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'pullup':
        header = 'Pullup ' + goal.target + ' reps'
        start = pullup[0].reps
        end = pullup[pullup.length - 1].reps
        progress = end - start
        target = goal.target - start
        break
      case 'squat':
        header = 'Squat ' + goal.target + ' lbs'
        start = squat[0].weight
        end = squat[squat.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'curl':
        header = 'Curl ' + goal.target + ' lbs'
        start = curl[0].weight
        end = curl[curl.length - 1].weight
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