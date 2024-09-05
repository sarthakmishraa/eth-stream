import { Line } from "react-chartjs-2";
import { pricesType, dataType } from "../page";

interface propsType {
    prices: pricesType[] | null,
    currencySearched: dataType | null
}

const LineChart = (props: propsType) => {
    const { prices, currencySearched } = props;
    return(
        <div>
            <Line
                data={{
                  labels: prices?.map((price: pricesType) => (new Date(price.date)).toLocaleDateString()),
                  datasets: [{
                    label: "Price",
                    data: prices?.map((price: pricesType) => price.priceUsd),
                    fill: true,
                    backgroundColor: "rgb(0, 200, 200)",
                    borderColor: "rgb(0, 20, 0)"
                  }]
                }}

                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Price graph of ${currencySearched?.symbol}`,
                      font: {
                        size: 20
                      },
                      color: "rgb(255, 255, 255)"
                    },
                    legend: {
                      display: true,
                      labels: {
                        color: "rgb(0, 200, 200)",
                        font: {
                            size: 18
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                        ticks: {
                            color: "rgb(0, 200, 200)",
                            font: {
                                size: 14
                            },
                        }
                    },
                    y: {
                        ticks: {
                            color: "rgb(0, 200, 200)",
                            font: {
                                size: 14
                            },
                            stepSize: 50
                        }
                    }
                  }
                }}
              ></Line>
        </div>
    )
};

export default LineChart;