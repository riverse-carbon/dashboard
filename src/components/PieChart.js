import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

// create an object with value:count entries
// values should be of type string/number or array (recursion allows to get nested values)
function countValues(value, countedValuesObject) {
  // call itself on every child if an array
  if (Array.isArray(value)) {
    value.forEach(val => {
      countValues(val, countedValuesObject);
    });
  } else {
    // create key-count pair or add 1 to count
    if (countedValuesObject[value]) {
      countedValuesObject[value] += 1;
    } else {
      countedValuesObject[value] = 1;
    }
  }
}

function PieChart({ rawData, filter }) {
  const data = {
    labels: [],
    datasets: [
      {
        backgroundColor: ['red', 'blue', 'yellow'],
        offset: 10,
        data: [],
      },
    ],
  };
  const values = {};
  rawData.forEach(node => {
    countValues(node[filter.value], values);
  });
  Object.entries(values).forEach(entry => {
    data.labels.push(entry[0]);
    data.datasets[0].data.push(entry[1]);
  });

  return <Pie data={data} />;
}

export default PieChart;
