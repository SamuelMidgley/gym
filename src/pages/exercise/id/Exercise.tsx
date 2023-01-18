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
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center justify-center rounded-2xl bg-brand-500 p-5">
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-solid border-green p-6">
          50kg
        </div>
        <div className="flex items-center">One Rep Max</div>
      </div>
      <div className="flex items-center justify-center rounded-2xl bg-brand-500 p-5">
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

function renderMenu(type: string, logs: IExerciseLog[]) {
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
    <main className="mx-4 mt-2 w-full max-w-4xl">
      <div className="mx-4">
        <div className="my-3 flex justify-center">
          <h1 className="text-3xl">{name}</h1>
        </div>
        <div className="mt-4 mb-2 flex items-center gap-4">
          {['Chart', 'Stats'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMenuType(option)}
              className={`${
                menuType === option ? 'bg-brand-600' : 'bg-brand-700'
              } rounded-2xl py-2 px-5 text-base text-white hover:bg-brand-600 `}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mb-4 mt-2 flex flex-col items-center gap-8 rounded-2xl bg-brand-600 p-5">
          {renderMenu(menuType, logs)}
        </div>
        <div className="my-4">
          <h3 className="text-center text-2xl">Logs</h3>
          <ExerciseLogs logs={logs} onerepmax={onerepmax} />
        </div>
      </div>
    </main>
  )
}
