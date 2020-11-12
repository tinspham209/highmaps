import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getHumidityData, getHumidityDataHanoi } from "../api";

const LineChart = () => {
	const [dataLineChart, setDataLineChart] = useState({
		chart: {
			type: "line",
		},
		title: {
			text: "Yearly Average Humidity",
		},
		subtitle: {
			text: "Source: aaaaaa",
		},
		xAxis: {
			categories: [
				// "2012",
				// "2013",
				// "2014",
				// "2015",
				// "2016",
				// "2017",
				// "2018",
				// "2019",
			],
		},
		yAxis: {
			title: {
				text: "deo bik dat ten gi",
			},
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true,
				},
				enableMouseTracking: false,
			},
		},
		series: [
			// {
			// 	name: "Ca Mau",
			// 	data: [8.13e1, 8.1e1, 8.1e1, 8.0e1, 8.06e1, 8.08e1, 8.07e1, 8.08e1],
			// },
		],
	});

	useEffect(() => {
		const fetchAPI = async () => {
			Promise.all([await getHumidityData(), await getHumidityDataHanoi()]).then(
				(value) => {
					value.map((data) => {
						let categories1 = [];
						let seriesData = [];
						// console.log("data.bindings", data.bindings);
						data.bindings.map((binding) => {
							// console.log("binding", binding);
							categories1.push(binding.Year.value);
							seriesData.push(Number(binding.Humidity.value));
							return null;
						});
						let series1 = {
							name: data.bindings[0].City.value,
							data: seriesData,
						};
						setDataLineChart((prevState) => ({
							...prevState,
							xAxis: {
								...prevState.xAxis,
								categories: categories1,
							},
							series: [...prevState.series, series1],
						}));

						return null;
					});
				}
			);
		};
		fetchAPI();
	}, []);

	return (
		<div className="">
			<HighchartsReact highcharts={Highcharts} options={dataLineChart} />
		</div>
	);
};

export default LineChart;
