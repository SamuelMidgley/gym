import classNames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LineChart from '../../../components/line-chart/LineChart'
import getExercise, { IExerciseLog } from '../api'
import LogCard from './components/LogCard'

interface LineChartData {
  chartLabels: string[]
  chartData: number[]
}

function createChartData(logs: IExerciseLog[]) {
  const chartData: LineChartData = {
    chartLabels: [],
    chartData: [],
  }

  logs.forEach((log) => {
    const { date, sets } = log

    const { weight } = sets[sets.length - 1]
    chartData.chartLabels.push(date.toLocaleDateString())
    chartData.chartData.push(weight)
  })

  return chartData
}

interface IExerciseChart {
  logs: IExerciseLog[]
}

function ExerciseChart(props: IExerciseChart) {
  const { logs } = props
  const { chartLabels, chartData } = createChartData(logs)

  return (
    <div className="w-full">
      <LineChart
        chartLabels={chartLabels.reverse()}
        chartData={chartData.reverse()}
      />
    </div>
  )
}

function ExerciseStats() {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex justify-center bg-brand-500 p-5 rounded-2xl items-center">
        <div className="flex justify-center items-center h-8 w-8 p-6 rounded-full mr-2 border-4 border-solid border-green">
          50kg
        </div>
        <div className="flex items-center">One Rep Max</div>
      </div>
      <div className="flex justify-center bg-brand-500 p-5 rounded-2xl items-center">
        <ul className="list-none">
          <li>No. of repetitions: 1000</li>
          <li>Total weight lifted: 400kg</li>
        </ul>
      </div>
    </div>
  )
}

interface IExerciseLogs {
  logs: IExerciseLog[]
  onerepmax: number
}

function ExerciseLogs(props: IExerciseLogs) {
  const { logs, onerepmax } = props
  return (
    <div className="flex flex-col items-center">
      {logs.map((log) => (
        <LogCard key={log.date.toISOString()} onerepmax={onerepmax} log={log} />
      ))}
    </div>
  )
}

function renderMenu(type: string, logs: IExerciseLog[], onerepmax: number) {
  switch (type) {
    case 'Stats':
      return <ExerciseStats />
    case 'Chart':
      return <ExerciseChart logs={logs} />
    default:
      return <ExerciseChart logs={logs} />
  }
}

export default function Exercise() {
  const [menuType, setMenuType] = useState<string>('Chart')

  const { exerciseId } = useParams()
  const id = parseInt(exerciseId ?? '', 10)

  if (!id) {
    return <h1>Exercise Not Found</h1>
  }

  const { name, onerepmax, logs } = getExercise(id)

  return (
    <main className="max-w-4xl mt-2 mx-4 w-full">
      <div className="mx-4">
        <div className="flex justify-center my-3">
          <h1 className="text-3xl">{name}</h1>
        </div>
        <div className="flex gap-4 items-center my-4">
          {['Chart', 'Stats'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMenuType(option)}
              className={classNames(
                'py-2 px-5 rounded-2xl text-base text-white bg-brand-700 hover:bg-brand-600',
                {
                  'bg-brand-600': menuType === option,
                }
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-8 bg-brand-600 rounded-2xl p-5 my-4">
          {renderMenu(menuType, logs, onerepmax)}
        </div>
        <div className="my-4">
          <h3 className="text-2xl text-center">Logs</h3>
          <ExerciseLogs logs={logs} onerepmax={onerepmax} />
        </div>
      </div>
    </main>
  )
}
