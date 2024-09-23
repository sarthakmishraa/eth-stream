"use client";

import { Line } from "react-chartjs-2";
import { pricesType, dataType } from "../page";

interface propsType {
    prices: pricesType[] | null,
    currencySearched: dataType | null,
    interval: string | null
}

const LineChart = (props: propsType) => {
    const { prices, currencySearched, interval } = props;

    const setXLabel = (date: string) => {
      let xLabel;

      if(interval === "d1") {
        xLabel = (new Date(date)).toLocaleDateString();
      }
      else {
        xLabel = (new Date(date)).toLocaleString();
      }
      return xLabel;
    }

    return(
        <div className="p-1 shadow-2xl border border-rose-300 rounded-sm">
          <Line
              data={{
                labels: prices?.map((price: pricesType) => setXLabel(price.date)),
                datasets: [{
                  label: "Price",
                  data: prices?.map((price: pricesType) => price.priceUsd),
                  fill: true,
                  borderColor: "rgb(199, 235, 19)"
                }]
              }}

              options={{
                responsive: true,
                interaction: {
                  mode: "x"
                },
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
                  },
                },
                scales: {
                  x: {
                      ticks: {
                          color: "rgb(0, 200, 200)",
                          font: {
                              size: 1
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