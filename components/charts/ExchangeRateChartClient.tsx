"use client";


import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  from: string;
  to: string;
  series: Record<string, number>;
}


const ExchangeRateChartClient = ({ from, to, series }: Props) => {
  const data = Object.entries(series).map(([date, value]) => [
    new Date(date).getTime(),
    value,
  ]);

  const options: Highcharts.Options = {
    title: {
      text: `1 ${from} to ${to}`,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: to,
      },
    },
    series: [
      {
        type: "line",
        name: `${from}/${to}`,
        data,
      },
    ],
  };

  return (
    <section>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </section>
  );
};

export default ExchangeRateChartClient;