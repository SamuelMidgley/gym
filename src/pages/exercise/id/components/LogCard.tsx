import { useCallback, useState } from 'react'
import { IExerciseLog, ISet } from '../../api'

import './LogCard.scss'

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

export default function LogCard(props: ILogCard) {
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
