import classNames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LineChart from '../../../components/line-chart/LineChart'
import getExercise, { IExerciseLog } from '../api'
import LogCard from './components/LogCard'

import './Exercise.scss'

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
    <div className="exercise-chart">
      <LineChart
        chartLabels={chartLabels.reverse()}
        chartData={chartData.reverse()}
      />
    </div>
  )
}

function ExerciseStats() {
  return (
    <div className="exercise-stats">
      <div className="exercise-orm">
        <div className="orm-value">50kg</div>
        <div className="orm-text">One Rep Max</div>
      </div>
      <div className="exercise-orm">
        <ul>
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
    <div className="exercise-log">
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
    case 'Logs':
      return <ExerciseLogs logs={logs} onerepmax={onerepmax} />
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
    <main className="exercise">
      <div className="exercise-header">
        <h1>{name}</h1>
      </div>
      <div className="summary-buttons">
        {['Chart', 'Stats', 'Logs'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMenuType(option)}
            className={classNames('exercise-button', {
              'button-active': menuType === option,
            })}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="exercise-summary">
        {renderMenu(menuType, logs, onerepmax)}
      </div>
    </main>
  )
}
