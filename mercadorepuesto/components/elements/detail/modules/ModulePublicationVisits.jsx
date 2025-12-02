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
const ModulePublicationVisits = (props) => {
    const { visitasPrd, dataX, dataY } = props;
    const [isMobile, setIsMobile] = useState(false);
    //console.log(dataX, dataY);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])
     // Cambia el valor según tu diseño responsivo
    const axisLabelMobile = isMobile
        ? {
            rotate: 45,
            fontSize: 10,
            formatter: function (value) {
                return value?.length > 3 ? value.substring(0, 4) : value;
            },
        }
        : {}; // En escritorio, no se aplica axisLabel

    
    const option = {
        textStyle: {
          color: "#2D2E83"
        },
        title: {
            text: "Visitas por publicación ",
            textStyle: {
              color: "#2D2E83",   
              fontWeight: 100,
              left: 100
            },
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            left: isMobile ? "75%" : "90%",
            data: ["Visitas"],
            textStyle: {
                color: "#2D2E83",   
                fontWeight: 100,
                left: 0
              },
        },
        grid: {
            left: "0.5%",
            right: "5%",
            bottom: "25%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: "0",
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
                name: "Visitas",
                type: "line",
                stack: "Total",
                data: dataY,
            },
        ],
    };

    return (
        <div className="ml-10 ps-product__description ps-document cajagraficasposts">
            <ReactEcharts option={option} style={{ width: "100%" }} opts={{ renderer: "svg" }} />
        </div>
    );
};

export default ModulePublicationVisits;
