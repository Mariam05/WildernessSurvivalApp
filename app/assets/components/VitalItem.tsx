import {
	VictoryLine,
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryContainer,
	VictoryLabel,
	VictoryVoronoiContainer,
	VictoryGroup,
	VictoryTooltip,
    Background
} from "victory-native";

import { Vital, Reading} from "../../../schemas";

import customTheme from "../CustomTheme";
import colours from "../colours";
import AppButton from "./AppButton";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	LayoutAnimation,
	Platform,
	View,
	Dimensions,
	ScrollView,
} from "react-native";
import { useState } from "react";

const Chart1 = (data) => {
	const mappedData = data.map((d) => {
		return {
			timestamp: d.timestamp,
			value: d.value,
		};
	});

	return (
		<VictoryChart
			theme={customTheme}
			domainPadding={{ x: 0, y: 20 }}
			padding={{ top: 5, bottom: 35, left: 50, right: 50 }}
			height={180}
		>
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" },
					parent: { border: "1px solid #ccc", fill: "#000000" },
				}}
				x={(d) => new Date(parseInt(d.timestamp) * 1000)}
				y="value"
				data={mappedData}
			/>
		</VictoryChart>
	);
};


const RowWithImage = (entry) => {
	const date = new Date(entry.timestamp * 1000);
	const dateString = date.getHours() + ":" + date.getMinutes();

	const [expandedImage, setExpandedImage] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const onPress = () => {
		setExpandedImage(!expandedImage);
		setImageUrl(entry.url);
	};

	return (
		<TouchableOpacity style={vitalItemStyles.row} onPress={onPress}>
			<View style={vitalItemStyles.timestampCell}>
				<Text style={vitalItemStyles.timestampCellText}>
					{dateString}
				</Text>
			</View>
			<View style={vitalItemStyles.valueCell}>
				<View style={vitalItemStyles.valueCellText}>
					<Text>{entry.value}</Text>
				</View>
				{expandedImage && (
					<View style={vitalItemStyles.valueCellImage}>
						<Image
							source={{ uri: imageUrl }}
							style={vitalItemStyles.valueImage}
						></Image>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const Row = (entry) => {
	const date = new Date(entry.timestamp * 1000);
	const dateString = date.getHours() + ":" + date.getMinutes();

	return (
		<View style={vitalItemStyles.row}>
			<View style={vitalItemStyles.timestampCell}>
				<Text style={vitalItemStyles.timestampCellText}>
					{dateString}
				</Text>
			</View>
			<View style={vitalItemStyles.valueCell}>
				<Text style={vitalItemStyles.valueCellText}>{entry.value}</Text>
			</View>
		</View>
	);
};


const Table = (data) => {
	const hasImage =
		data && data[0] && data[0].url != null && data[0].url != "";

	return (
		<View style={vitalItemStyles.table}>
			{data.map((entry) => {
				// This will  a row for each data element.
				return hasImage ? RowWithImage(entry) : Row(entry);
			})}
		</View>
	);
};

function formatAMPM(date) {

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}


const CategoricalChart = (data, init_categories) => {
	let categories = ["", ...init_categories, ""]
	let category_indicies = [...Array(categories.length).keys()]
	let categories_dict = Object.assign({}, ...categories.map((c, i) => ({ [c]: i })));

	let longest_length = categories.reduce((a, b) => a.length > b.length ? a : b).length;

	return (
		<VictoryChart
			theme={customTheme}
			padding={{ top: 5, bottom: 35, left: longest_length*8+ 10, right: 50 }}
			height={180}
			domainPadding={{ x: 0, y: [-30, -30] }}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>
			{/* X Axis */}
			<VictoryAxis 
				standalone={true}
				
				tickFormat={(v) => `${formatAMPM(new Date(v))}`}
				fixLabelOverlap={true}
			/>
	
			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickValues={category_indicies}
				tickFormat={(i) => `${categories[i]}`}
				standalone={false}
				style={{
					tickLabels: { angle: 0 }
				}}
			/>
			{/* Line */}
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" }
				}}
				x={(d) => new Date(d.timestamp)}
				y={(d) => categories_dict[d.value]}
				data={data}
			/>
		</VictoryChart>
	);
};

const NumericalChart = (data) => {
	//let longest_length = categories.reduce((a, b) => a.length > b.length ? a : b).length;

	return (
		<VictoryChart
			theme={customTheme}
			padding={{ top: 5, bottom: 35, left: 2 * 8 + 40, right: 50 }}
			height={180}
			domainPadding={{ x: 0, y: 10 }}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>
			{/* X Axis */}
			<VictoryAxis
				standalone={true}
				tickFormat={(v) => `${formatAMPM(new Date(v))}`}
				fixLabelOverlap={true}
			/>

			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickFormat={(i) => i}
				standalone={false}
				style={{
					tickLabels: { angle: 0 }
				}}
			/>
			{/* Line */}
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" }
				}}
				x={(d) => new Date(d.timestamp)}
				y="value"
				data={data}
			/>
		</VictoryChart>
	);
};


const NumericalChartFullScreen = (data) => {
	return (
		<VictoryChart
			horizontal={true}
			theme={customTheme}
			padding={{ top: 2 * 8 + 30, bottom: 40, left: 40, right: 40 }}
			width={Dimensions.get('window').width}
			height={Dimensions.get('window').height}
			domainPadding={{ x: 0, y: 10 }}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>
			{/* X Axis */}
			<VictoryAxis
				standalone={true}
				tickFormat={(v) => `${formatAMPM(new Date(v))}`}
				fixLabelOverlap={true}
				style={{
					tickLabels: { angle: 90 }
				}}
				orientation="left" 
				invertAxis={true}
				tickLabelComponent={<VictoryLabel dx={25} />}
			/>

			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickFormat={(i) => i}
				standalone={false}
				style={{
					tickLabels: { angle: 90 },
				}}
				orientation="top"
				tickLabelComponent={<VictoryLabel dy={5} textAnchor={"end"} />}
			/>
			{/* Line */}
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" }
				}}
				x={(d) => new Date(d.timestamp)}
				y="value"
				data={data}
			/>
		</VictoryChart>
	);
};


const RenderChart = ({ initial_data, fullscreen, displayVitals }) => {
	if (initial_data == null)
		return null;

	const data = JSON.parse(JSON.stringify(initial_data))
	let i = 0;
	for (const vital of data) {
		vital.color = colours.data_colors[i++];

    }

	const filteredData = data.filter((v) =>
		(v.type == "Numerical" || v.type == "Categorical")
		&& v.data.length > 0
		&& (displayVitals.length == 0 || displayVitals.includes(v.name)));


	const timeCorrectedData = filteredData.map((v) => {
		let maxV = -99999999999, minV = 99999999999;
		const vitalData = v.data.map((d) => {
			let timestamp = parseInt(d.timestamp) * (d.timestamp.length == 10 ? 1000 : 1);

			let value = (v.type == "Categorical") ? v.categories.indexOf(d.value) : d.value;
			minV = Math.min(minV, value);
			maxV = Math.max(maxV, value);

			return {
				x: new Date(timestamp),
				y: value,
			}
		});
	
		return {
			data: vitalData,
			minV: minV,
			maxV: maxV,
			diff: maxV-minV,
			color: v.color
		}}
	)


	const isCategorical = filteredData[0].type == "Categorical";

	let categories = ["", ...filteredData[0].categories]
	let category_indicies = [...Array(categories.length).keys()]

	let longest_length = (isCategorical && timeCorrectedData.length == 1 )?
		categories.reduce((a, b) => a.length > b.length ? a : b).length : 2;

	return (
	< VictoryChart
		theme={customTheme}
		padding={{ top: 20, bottom: 35, left: longest_length * 8 + 30, right: 50 }}
		domainPadding={{ x: 0, y: [0, 0] }}
		height={180}
		containerComponent={<VictoryVoronoiContainer
			mouseFollowTooltips
			voronoiDimension="x"
			labels={({ datum }) => `y: ${datum.y}`}
		/>}
		>

		{/* Y axis categorical */}
		{timeCorrectedData.length == 1 && isCategorical ?
			<VictoryAxis dependentAxis
				tickValues={category_indicies}
				tickFormat={(i) => `${categories[i]}`}
				standalone={false}
			/> : null
			}

		{/* Y axis numerical */}
		{timeCorrectedData.length == 1 && !isCategorical ?
			<VictoryAxis dependentAxis
				standalone={false}
			/> : null
		}

			
		{/* X axis */}
		<VictoryAxis
			standalone={false}
			tickFormat={(v) => `${formatAMPM(new Date(v))}`}
			fixLabelOverlap={true}	
		/>

		{/* Lines */}
		{timeCorrectedData.map((v, i) => {
			console.log(v);
		return <VictoryLine
			style={{
					data: { stroke: v.color, strokeWidth: 3 }
				}}
				y={(d) =>  (timeCorrectedData.length == 1) ? d.y : ((d.y - v.minV) / v.diff) }
				data={v.data}
				standalone={false}
				key={i}
			/>}
		)}

	</VictoryChart >)
}



const CategoricalChartFullScreen = ( data, init_categories ) => {
	console.log("render full screen");

	let categories = ["", ...init_categories]
	let category_indicies = [...Array(categories.length).keys()]
	let categories_dict = Object.assign({}, ...categories.map((c, i) => ({ [c]: i })));

	let longest_length = categories.reduce((a, b) => a.length > b.length ? a : b).length;

	return (
		<VictoryChart
			horizontal={true}
			theme={customTheme}
			padding={{ top: longest_length * 8 + 30, bottom: 20, left: 40, right: 20 }}
			width={Dimensions.get('window').width}
			height={Dimensions.get('window').height}
			domainPadding={{ x: -1, y: [-30, 30] }}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>

			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickValues={category_indicies}
				tickFormat={(i) => `${categories[i]}`}
				standalone={false}
				style={{
					tickLabels: { angle: 90, fontSize: 15 },
				}}
				tickLabelComponent={<VictoryLabel dy={5} textAnchor={"end"} />}
				orientation="top"
				
			/>

			{/* X Axis */}
			<VictoryAxis
				standalone={true}
				tickFormat={(v) => `${formatAMPM(new Date(v))}`}
				fixLabelOverlap={true}
				style={{
					tickLabels: { angle: 90, paddingInline: 50 }
				}}
				tickLabelComponent={<VictoryLabel dx={25} />}
				orientation="left"
				
				invertAxis={true}
			/>

			{/* Line */}
			<VictoryLine
				style={{
					data: { stroke: "#c43a31"}
				}}
				x={(d) => new Date(d.timestamp) }
				y={(d) => categories_dict[d.value]}
				data={data}
			/>
		</VictoryChart>

	);
};





const PhotoRow = (category, entries) => {
	const [expanded, setExpanded] = useState(false);

	const onPress = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};

	return (
		<View style={{ width: "100%"}}>
			<TouchableOpacity style={vitalItemStyles.row} onPress={onPress}>
				<Text style={{ fontSize: 18 }}> {category} </Text>
			</TouchableOpacity>
			<ScrollView horizontal={true} style={{ left: 20, marginRight: 20 }}>
				{expanded &&
					(entries.map((e) =>
						<View style={{width: 150, height:150}}>
							<Image
								source={{ uri: e.url }}
								style={{ width: "90%", height: "90%", borderColor: "black", borderWidth: 1 }}>
							</Image>
							<Text
								style={vitalItemStyles.timestampCell}>
								{formatAMPM(new Date(e.timestamp))}
							</Text>
						</View>
					))
				}
			</ScrollView >
		</View>
	);
};

const PhotoTimeLine = (data : Array<any>) => {
	const categories = {}
	for (let reading of data) {
		if (!categories.hasOwnProperty(reading.value)) {
			categories[reading.value] = [reading];
		} else {
			categories[reading.value].push(reading);
        }
	}

	return (
		<View style={vitalItemStyles.table}>
			{Object.keys(categories).map((category) => {
				return PhotoRow(category, categories[category]);
			})}
		</View>
	);
}



const Chart = (onChartLongPress, chart) => {
	return (
		<TouchableOpacity
			onLongPress={onChartLongPress}
			style={vitalItemStyles.chart}
		>
			{chart}
		</TouchableOpacity>
	)


}



const Data = ({ type, data, categories, fullscreen, onChartLongPress }) => {
	if (data == null)
		return (null)

	const timeCorrectedData = data.map(d => {
		let timestamp = parseInt(d.timestamp) * (d.timestamp.length == 10 ? 1000 : 1);

		return {
			url: d.url,
			timestamp: timestamp,
			value: d.value,
		}
	})

	if (type === "Numerical") {
		if (timeCorrectedData.length > 1) {
			if (fullscreen) {
				return Chart(onChartLongPress, NumericalChartFullScreen(timeCorrectedData))
			}
			return Chart(onChartLongPress, NumericalChart(timeCorrectedData))
		}
	} else if (type === "Categorical") {
		if (timeCorrectedData.length > 1) {
			if (categories == null)
				return (null);

			if (fullscreen) {
				return Chart(onChartLongPress, CategoricalChartFullScreen(timeCorrectedData, categories))
			}
			return Chart(onChartLongPress, CategoricalChart(timeCorrectedData, categories))
		}
	} else if (type === "Photos") {
		return PhotoTimeLine(timeCorrectedData);
	} else {
		return Table(timeCorrectedData);
    }
	return (null);
	
};

const TimeElapsed = ({ timeElapsed, periodicity }) => {
	const isOverdue = timeElapsed > periodicity;

	return (
		<Text
			style={[
				vitalItemStyles.timeElapsedText,
				{ color: isOverdue ? colours.redText : colours.greenText },
			]}
		>
			{timeElapsed.toString()} min ago
		</Text>
	);
};


const ColoredLine = ({ color }) => (
	<Text
		style={{
			color,
			backgroundColor: color,
		}}
	>
		-------
	</Text>
);

function VitalItem({
	click_enabled,
	name,
	periodicity,
	type,
	description,
	categories,
	data,
	index,
	timeElapsed,
	onPress,
	onPressInfo,
	onPressAdd,
	onChartLongPress,
	isToggled,
}) {


	const [expanded, setExpanded] = useState(false);
	const onPressItem = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};

	return (
		<View>
			<TouchableOpacity
				disabled={!click_enabled}
				onPress={onPress ? onPress : onPressItem}
				style={[
					vitalItemStyles.vitalsHeader,
					{
						width: click_enabled ? "80%" : "90%",
						borderColor: colours.data_colors[index],
						borderWidth: onPress ? 3 : 0,
						backgroundColor: isToggled ? colours.darkerBlueBackground : colours.lightBlueBackground
					},
	

				]}
			>
				{description != undefined && (
					<AppButton
						title="i"
						style={vitalItemStyles.infoButton}
						buttonTextStyle={vitalItemStyles.infoButtonText}
						onPress={onPressInfo}
					/>
				)}

				<View>
					<Text style={vitalItemStyles.vitalItemNameText}>
						{name}
					</Text>
					{timeElapsed != undefined && (
						<TimeElapsed
							timeElapsed={timeElapsed}
							periodicity={periodicity}
						/>
					)}
				</View>

				{onPressAdd && (
					<AppButton
						title="Add"
						style={vitalItemStyles.newReadingButton}
						buttonTextStyle={vitalItemStyles.newReadingButtonText}
						onPress={onPressAdd}
					/>
				)}
			</TouchableOpacity>

			{expanded && data && data.length > 0 && (
				<Data type={type} data={data} categories={categories} fullscreen={false} onChartLongPress={onChartLongPress} />
			)}
		</View>
	);
}

export { VitalItem, Data, RenderChart  };

const vitalItemStyles = StyleSheet.create({
	chart: {
	
	},
	regular: {},
	infoButton: {
		height: undefined,
		width: "10%",
		aspectRatio: 1,
		backgroundColor: colours.purple,
		borderRadius: 100,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		left: "-3%",
		top: "-20%",
		shadowColor: colours.primary,
		shadowOpacity: 0.9,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 4,
		elevation: 7,
	},
	infoButtonText: {
		alignSelf: "center",
		height: "100%",
		width: "100%",
		fontSize: 25,
		fontWeight: "300",
		textAlign: "center",
	},
	newReadingButton: {
		alignSelf: "center",
		justifyContent: "center",
		position: "absolute",
		right: 10,
		backgroundColor: colours.purple,
		height: "65%",
		width: "15%",
		borderRadius: 10,
		borderColor: colours.primary,
		borderWidth: 1,
	},
	newReadingButtonText: {
		fontSize: 15,
		fontWeight: "300",
		alignSelf: "center",
	},
	row: {
		flex: 1,
		alignSelf: "center",
		width: "80%",
		flexDirection: "row",
		margin: 5,
		paddingVertical: 5,
		borderBottomColor: "#737373",
		borderBottomWidth: 0.5, //StyleSheet.hairlineWidth,
		maxWidth: 300,
	},
	table: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: -5,
		marginBottom: 10,
	},
	timeElapsedText: {
		fontSize: 12,
		alignSelf: "flex-start",
	},
	timestampCell: {
		width: "25%",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
	},
	timestampCellText: {
		fontWeight: "bold",
	},
	valueCell: {
		paddingLeft: 5,
		width: "75%",
	},
	valueCellText: {},
	valueCellImage: {
		marginVertical: 5,
		borderRadius: 10,
		width: "50%",
		height: undefined,
		aspectRatio: 1,
		elevation: 7,
		shadowColor: colours.primary,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
	},
	valueImage: {
		flex: 1,
		resizeMode: "cover",
		borderRadius: 10,
		margin: 0,
		height: 20,
		width: 20,
	},
	vitalsHeader: {
		flexDirection: "row",
		alignSelf: "center",
		padding: 10,
		margin: 10,
		marginBottom: 0,
		paddingBottom: 0,
		paddingLeft: "5%",
		fontSize: 30,
		height: 60,
		width: "80%",
		justifyContent: "flex-start",
		fontWeight: "900",
		backgroundColor: colours.lightBlueBackground,
		borderRadius: 15,
		shadowColor: colours.primary,
		shadowOpacity: 0.6,
		shadowOffset: { width: 1, height: 2 },
		shadowRadius: 3,
		elevation: 6,
	},
	vitalItemNameText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "flex-start",
	},
});
