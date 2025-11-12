import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import LineChartVisitsPublicaction from "./StatisticalGraphs/LineChartVisitsPublicaction";
import Moment from "moment";
//import "./styles.css";
import ReactEcharts from "echarts-for-react";

let datmeses = [];

// Change your description content here
const ModuleNetSales = (props) => {
    const { visitasPrd, dataX, dataY } = props;
    let daty = [123128, 242128, 112311, 312121, 372121, 512121]
     const [isMobile, setIsMobile] = useState(false);
                //console.log(dataX, dataY);
                useEffect(() => {
                    setIsMobile(window.innerWidth < 768)
                }, [])
        
        const axisLabelMobile = isMobile
            ? {
                rotate: 45,
                fontSize: 10,
                formatter: function (value) {
                    return value?.length > 3 ? value.substring(0, 4) : value;
                },
            }
            : {}; // En escri
        

    const option = {
        textStyle: {
          color: "#2D2E83"
        },
        title: {
            text: "Ventas netas",
            left: "0%", // Alineado a la izquierda
            top: "0%",
            textStyle: {
              color: "#2D2E83",   
              fontWeight: 100,
              left: 100
            },
        },
        tooltip: {
            trigger: "axis",
            confine: true, // fuerza que se quede dentro del área del gráfico
            textStyle: {
                fontSize: 10, // reduce el tamaño del texto
                width: 100, // ancho máximo del tooltip
            },
          },
        tooltip: {
            trigger: "axis",
            confine: true,
           
            formatter: function (params) {
                let content = `<b>${params[0].axisValue}</b><br/>`; // Fecha en negrita

                params.forEach((item) => {
                    const nombreEnDosLineas = `<b>Ventas brutas<br/>menos descuentos</b>`;
                    content += `${item.marker}${nombreEnDosLineas}: <b>$${item.data.toLocaleString()}</b><br/>`;
                });

                return content;
              }
          },
        grid: {
            left: "0.5%",
            right: "5%",
            bottom: "25%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: 0,
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: dataX,
            axisLabel: axisLabelMobile
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Ventas brutas menos descuentos",
                type: "line",
                stack: "Total",
                data: daty,
            },
        ],
    };

    return (
        <div className="ml-10 ps-product__description ps-document cajagraficasposts">
            <ReactEcharts option={option} />
        </div>
    );
};

export default ModuleNetSales;
