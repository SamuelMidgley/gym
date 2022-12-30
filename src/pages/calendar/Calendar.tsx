import getDayArray from './utils'

import './Calendar.scss'

export default function Calendar() {
  getDayArray()
  return (
    <>
      <header>
        <h1>Calendar</h1>
      </header>
      <main className="calendar-main">
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
              <td>4</td>
            </tr>
            <tr>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
