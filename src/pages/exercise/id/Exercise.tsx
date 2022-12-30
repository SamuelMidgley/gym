import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import LineChart from '../../../components/line-chart/LineChart'
import getExercise, { IExerciseLog, ISet } from '../api'

import './Exercise.scss'

interface ILogCard {
  log: IExerciseLog
  onerepmax: number
}

function SetCard(props: ISet) {
  const { set, reps, weight } = props
  return (
    <div className="set-card">
      <div className="set-number">Set: {set}</div>
      <div>{reps} reps</div>
      <div>{weight}kg </div>
    </div>
  )
}

function LogCard(props: ILogCard) {
  const [showDetails, setShowDetails] = useState(false)
  const { log, onerepmax } = props
  const dateSplit = log.date.toLocaleDateString().split('/')

  const expandDetails = useCallback(() => {
    setShowDetails((prevDetails) => !prevDetails)
  }, [])

  return (
    <div className="log-card">
      <div className="log-date">
        <div>
          {dateSplit[0]}/{dateSplit[1]}
        </div>
        <div>{dateSplit[2]}</div>
      </div>
      <div className="log-info">
        <div className="log-summary">
          <div>Sets: {log.sets.length}</div>
          <div>
            Max Weight: {log.sets[log.sets.length - 1].weight}kg (
            {((log.sets[log.sets.length - 1].weight / onerepmax) * 100).toFixed(
              0
            )}
            % of 1RM)
          </div>
        </div>
        <div className="log-details">
          {showDetails &&
            log.sets.map((setObject) => (
              <SetCard
                key={`${setObject.set}`}
                set={setObject.set}
                reps={setObject.reps}
                weight={setObject.weight}
              />
            ))}
          <button type="button" onClick={expandDetails}>
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  )
}

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

export default function Exercise() {
  const { exerciseId } = useParams()
  const id = parseInt(exerciseId ?? '', 10)

  if (!id) {
    return <h1>Exercise Not Found</h1>
  }

  const { name, onerepmax, logs } = getExercise(id)

  const { chartData, chartLabels } = createChartData(logs)

  return (
    <div className="exercise">
      <div className="exercise-header">
        <h1>{name}</h1>
      </div>
      <div className="exercise-summary">
        <div className="exercise-orm">
          <div className="orm-value">{onerepmax}kg</div>
          <div className="orm-text">One Rep Max</div>
        </div>
        <div className="exercise-chart">
          <LineChart
            chartLabels={chartLabels.reverse()}
            chartData={chartData.reverse()}
          />
        </div>
      </div>
      <div className="exercise-log">
        <h2>Logs</h2>
        {logs.map((log) => (
          <LogCard
            key={log.date.toISOString()}
            onerepmax={onerepmax}
            log={log}
          />
        ))}
      </div>
    </div>
  )
}
