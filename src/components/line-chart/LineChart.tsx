import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

interface ILineChart {
  chartLabels: string[]
  chartData: number[]
}

const labels = ['a', 'b', 'c', 'd']

export const options = {
  responsive: true,
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Weight (kg)',
      data: [1, 5, 2, 3],
      borderColor: 'rgb(82, 227, 194)', // 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(82, 227, 194, 0.5)', // 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export default function LineChart(props: ILineChart) {
  const { chartLabels, chartData } = props

  data.labels = chartLabels

  data.datasets[0].data = chartData

  return <Line options={options} data={data} />
}
