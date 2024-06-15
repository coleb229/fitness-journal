import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const UserStats = ({ data }: any) => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="diet">Diet Stats</TabsTrigger>
                <TabsTrigger value="training">Training Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="diet">
                <p>Total Records: {data.dietData.length}</p>
                <p>Days met calorie target: {getDaysMetCalorieTarget(data)}</p>
                <p>Days met fat target: {getDaysMetFatTarget(data)}</p>
                <p>Days met protein target: {getDaysMetProteinTarget(data)}</p>
                <p>Days met carbs target: {getDaysMetCarbsTarget(data)}</p>
            </TabsContent>
            <TabsContent value="training">
                <p>Total Records: {data.trainingData.length}</p>
                <p>Bench Press weight improvements: {getBenchPressWeightImprovements(data)}</p>
                <p>Bench Press rep range improvements: {getBenchPressRepRangeImprovements(data)}</p>
                <p>Overhead Press weight improvements: {getOverheadPressWeightImprovements(data)}</p>
                <p>Overhead Press rep range improvements: {getOverheadPressRepRangeImprovements(data)}</p>
                <p>Deadlift weight improvements: {getDeadliftWeightImprovements(data)}</p>
                <p>Deadlift rep range improvements: {getDeadliftRepRangeImprovements(data)}</p>
                <p>Pullup weight improvements: {getPullupWeightImprovements(data)}</p>
                <p>Pullup rep range improvements: {getPullupRepRangeImprovements(data)}</p>
                <p>Squat weight improvements: {getSquatWeightImprovements(data)}</p>
                <p>Squat rep range improvements: {getSquatRepRangeImprovements(data)}</p>
                <p>Curl weight improvements: {getCurlWeightImprovements(data)}</p>
                <p>Curl rep range improvements: {getCurlRepRangeImprovements(data)}</p>
            </TabsContent>
        </Tabs>
    )
}

const getBenchPressWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'benchPress') {
            improvements++;
        }
    })
    return improvements;
}

const getBenchPressRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'benchPress') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getOverheadPressWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'overheadPress') {
            improvements++;
        }
    })
    return improvements;
}

const getOverheadPressRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'overheadPress') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getDeadliftWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'deadlift') {
            improvements++;
        }
    })
    return improvements;
}

const getDeadliftRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'deadlift') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getPullupWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'pullup') {
            improvements++;
        }
    })
    return improvements;
}

const getPullupRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'pullup') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getSquatWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'squat') {
            improvements++;
        }
    })
    return improvements;
}

const getSquatRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'squat') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getCurlWeightImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'curl') {
            improvements++;
        }
    })
    return improvements;
}

const getCurlRepRangeImprovements = (data:any) => {
    let improvements = 0;
    data.trainingData.forEach((record:any) => {
        if(record.exercise === 'curl') {
            if(record.tenByThree) {
                improvements++;
            }
            if(record.sevenByFive) {
                improvements++;
            }
            if(record.fiveBySeven) {
                improvements++;
            }
        }
    })
    return improvements;
}

const getDaysMetCalorieTarget = (data:any) => {
    let count = 0;
    data.dietData.forEach((record:any) => {
        if(record.calories <= record.tCalories) {
            count++;
        }
    })
    return count;
}

const getDaysMetFatTarget = (data:any) => {
    let count = 0;
    data.dietData.forEach((record:any) => {
        if(record.fat <= record.tFat) {
            count++;
        }
    })
    return count;
}

const getDaysMetProteinTarget = (data:any) => {
    let count = 0;
    data.dietData.forEach((record:any) => {
        if(record.protein >= record.tProtein) {
            count++;
        }
    })
    return count;
}

const getDaysMetCarbsTarget = (data:any) => {
    let count = 0;
    data.dietData.forEach((record:any) => {
        if(record.carbs <= record.tCarbs) {
            count++;
        }
    })
    return count;
}