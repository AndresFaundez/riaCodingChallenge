"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  from: string;
  to: string;
  series: Record<string, number>;
}

const ExchangeRateChartClient = ({ from, to, series }: Props) => {
  // Procesamos la data y la ordenamos por fecha para evitar errores de renderizado
  const data = Object.entries(series)
    .map(([date, value]) => [new Date(date).getTime(), value])
    .sort((a, b) => a[0] - b[0]);

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent", // Clave para que se vea el efecto Glass
      style: {
        fontFamily: "var(--font-schibsted-grotesk)",
      },
      height: 400,
    },
    title: {
      text: "", // Ocultamos el título interno de Highcharts para usar el nuestro
    },
    credits: {
      enabled: false, // Quitar marca de agua de Highcharts
    },
    xAxis: {
      type: "datetime",
      gridLineColor: "rgba(255, 255, 255, 0.05)",
      lineColor: "rgba(255, 255, 255, 0.1)",
      tickColor: "rgba(255, 255, 255, 0.1)",
      labels: {
        style: {
          color: "#bdbdbd", // --color-light-200
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      gridLineColor: "rgba(255, 255, 255, 0.05)",
      labels: {
        style: {
          color: "#bdbdbd",
        },
      },
    },
    tooltip: {
      backgroundColor: "#0d161a", // --color-dark-100
      borderColor: "#59deca",     // --primary
      borderRadius: 8,
      style: {
        color: "#ffffff",
      },
      shared: true,
      useHTML: true,
      formatter: function () {
        // Formateo custom para el tooltip
        const date = new Date(this.x as number).toLocaleDateString();
        const value = this.y?.toFixed(4);
        return `
          <div style="padding: 4px;">
            <span style="font-size: 10px; color: #bdbdbd">${date}</span><br/>
            <strong style="font-size: 14px; color: #59deca">1 ${from} = ${value} ${to}</strong>
          </div>
        `;
      },
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false, // Sin puntos, solo línea limpia
          states: {
            hover: {
              enabled: true,
              fillColor: "#59deca",
              lineColor: "#ffffff",
            },
          },
        },
        lineWidth: 3,
        shadow: {
            color: '#59deca',
            width: 10,
            opacity: 0.2,
            offsetX: 0,
            offsetY: 0
        },
        states: {
            hover: {
                lineWidth: 3
            }
        },
        threshold: null
      },
    },
    series: [
      {
        type: "area", // Cambiado a 'area' para poder poner degradado
        name: `${from} a ${to}`,
        data: data,
        color: "#59deca", // --primary color
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(89, 222, 202, 0.5)"], // Primary con opacidad
            [1, "rgba(89, 222, 202, 0.0)"], // Transparente al final
          ],
        },
      },
    ],
    legend: {
        enabled: false
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto mb-20 px-4">
      <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
        
        {/* Header del Gráfico */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-end border-b border-white/5 pb-4">
          <div>
            <h2 className="text-3xl font-bold font-schibsted-grotesk text-white">
              Historial (30 Días)
            </h2>
            <p className="text-light-200 text-sm mt-1">
              Tendencia de <span className="text-primary font-bold">{from}</span> frente a <span className="text-white">{to}</span>
            </p>
          </div>
          
          {/* Indicador visual simple */}
           <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs text-light-200 uppercase tracking-wider">Live Data</span>
           </div>
        </div>

        {/* Contenedor del Gráfico */}
        <div className="w-full h-[400px] overflow-hidden rounded-xl bg-dark-200/20 border border-white/5">
            {Object.keys(series).length > 0 ? (
                 <HighchartsReact
                 highcharts={Highcharts}
                 options={options}
               />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-light-200">
                    <p>No hay datos disponibles para mostrar el gráfico.</p>
                </div>
            )}
         
        </div>
      </div>
    </section>
  );
};

export default ExchangeRateChartClient;