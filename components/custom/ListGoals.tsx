import { Progress } from "@/components/ui/progress"
import { DeleteDataButton } from "./DeleteDataButton"
import { deleteGoal } from "@/lib/db"

export const ListGoals = ({ goals, dailyLogs, training, lossRate, gainRate }:any) => {
  return (
    <div>
      <ul>
        {goals.map((goal:any) => (
          <Goal key={goal.id} goal={goal} dailyLogs={dailyLogs} training={training} lossRate={lossRate} gainRate={gainRate} />
        ))}
      </ul>
    </div>
  )
}

const Goal = ({ goal, dailyLogs, training, lossRate, gainRate }:any) => {

    let start = dailyLogs[0].weight
    let end = dailyLogs[dailyLogs.length - 1].weight
    let progress = start - end
    let target = start - goal.target
    let header = ''
    let weightLossRate = ''

    const bench = training.filter((t:any) => t.exercise === 'benchPress' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))
    const overheadPress = training.filter((t:any) => t.exercise === 'overheadPress' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))
    const deadlift = training.filter((t:any) => t.exercise === 'deadlift' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))
    const pullup = training.filter((t:any) => t.exercise === 'pullup' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))
    const squat = training.filter((t:any) => t.exercise === 'squat' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))
    const curl = training.filter((t:any) => t.exercise === 'curl' && (t.tenByThree === true || t.sevenByFive === true || t.fiveBySeven === true))

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
        header = 'Bench ' + goal.target + ' lbs 10x3'
        start = bench[0].weight
        end = bench[bench.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'overheadPress':
        header = 'Overhead Press ' + goal.target + ' lbs 10x3'
        start = overheadPress[0].weight
        end = overheadPress[overheadPress.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'deadlift':
        header = 'Deadlift ' + goal.target + ' lbs 10x3'
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
        header = 'Squat ' + goal.target + ' lbs 10x3'
        start = squat[0].weight
        end = squat[squat.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
      case 'curl':
        header = 'Curl ' + goal.target + ' lbs 10x3'
        start = curl[0].weight
        end = curl[curl.length - 1].weight
        progress = end - start
        target = goal.target - start
        break
    }

    let percentage = (progress / target) * 100
    console.log(gainRate, lossRate)

  return (
    <li className="w-full border rounded shadow-lg bg-white px-6 my-2">
      <div className="flex justify-between">
        <p className="p-2 font-semibold text-cyan-500 italic">
          {header}
        </p>
        {goal.goal === 'lose' && lossRate !== '' ? <p className="p-2 font-semibold text-red-500 italic">{lossRate} lbs/week</p> : null}
        {goal.goal === 'gain' && gainRate !== '' ? <p className="p-2 font-semibold text-red-500 italic">{gainRate} lbs/week</p> : null}
        <DeleteDataButton id={goal.id} action={deleteGoal} />
      </div>
      <p className="text-right">{percentage.toFixed(2) + '%'}</p>
      <div className="flex items-center mb-4">
        <p className="pr-2">{start}</p>
        <Progress value={percentage} max={goal.target} />
        <p className="pl-2">{goal.target}</p>
      </div>
    </li>
  )
}