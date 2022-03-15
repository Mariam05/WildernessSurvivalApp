import {
	VictoryLine,
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryContainer
} from "victory-native";

import { HorizontalTimeline } from 'react-native-horizontal-timeline';

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
	Dimensions
} from "react-native";
import { useState } from "react";



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
							style={vitalItemStyles.valueImage}>
						</Image>
					</View>)}
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
	const hasImage = data && data[0] && data[0].url != null && data[0].url != ""

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

	/*
	return (
		<VictoryChart
			theme={customTheme}
			domainPadding={{ x: 0, y: 10 }}
			padding={{ top: 5, bottom: 35, left: 50, right: 50 }}
			height={180}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" }
					
				}}
				x={(d) => new Date(d.timestamp)}
				y="value"
				data={data}
			/>
		</VictoryChart>
	);*/
};


const NumericalChartFullScreen = (data) => {

	const timestamps = data.map(d => d.timestamp);

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
			/>

			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickFormat={(i) => i}
				standalone={false}
				style={{
					tickLabels: { angle: 90 },
				}}
				orientation="top"
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


const RenderChart = ({ type, data, categories, fullscreen }) => {
	



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
			padding={{ top: longest_length * 8 + 30, bottom: 20, left: 20, right: 20 }}
			width={Dimensions.get('window').width}
			height={Dimensions.get('window').height}
			domainPadding={{ x: -1, y: [-20, 20] }}
			containerComponent={<VictoryContainer disableContainerEvents />}
		>

			{/* Y axis */}
			<VictoryAxis dependentAxis
				tickValues={category_indicies}
				tickFormat={(i) => `${categories[i]}`}
				standalone={false}
				style={{
					tickLabels: { angle: 90, fontSize: 15, padding: 50 },
				}}
				orientation="top"
				
			/>

			{/* X Axis */}
			<VictoryAxis
				standalone={true}
				tickFormat={(v) => `${formatAMPM(new Date(v))}`}
				fixLabelOverlap={true}
				style={{
					tickLabels: { angle: 90 }
				}}
				orientation="left"
				offsetX={50}
				invertAxis={true}
			/>

			{/* Line */}
			<VictoryLine
				style={{
					data: { stroke: "#c43a31" }
				}}
				x={(d) => new Date(d.timestamp) }
				y={(d) => categories_dict[d.value]}
				data={data}
			/>
		</VictoryChart>

	);


};




const Data = ({ type, data, categories, fullscreen }) => {
	console.log("render");
	console.log(data);

	if (data == null)
		return (null)

	const timeCorrectedData = data.map(d => {
		let timestamp = parseInt(d.timestamp) * (d.timestamp.length == 10 ? 1000 : 1);

		return {
			timestamp: timestamp,
			value: d.value,
		}
	})

	if (type === "Numerical") {
		if (timeCorrectedData.length > 1) {
			if (fullscreen) {
				return NumericalChartFullScreen(timeCorrectedData);
			}
			return NumericalChart(timeCorrectedData);
		}
	} else if (type === "Categorical") {
		if (timeCorrectedData.length > 1) {
			if (categories == null)
				return (null);

			if (fullscreen) {
				return CategoricalChartFullScreen(timeCorrectedData, categories);
			}
			return CategoricalChart(timeCorrectedData, categories);
		}
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

function VitalItem({
	click_enabled,
	name,
	periodicity,
	type,
	description,
	categories,
	data,
	timeElapsed,
	onPressInfo,
	onPressAdd,
	onChartLongPress,
}) {


	const [expanded, setExpanded] = useState(false);
	const onPress = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};
	return (
		<View>
			<TouchableOpacity
				disabled={!click_enabled}
				onPress={onPress}
				style={[
					vitalItemStyles.vitalsHeader,
					{ width: click_enabled ? "80%" : "90%" },
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
			
			<TouchableOpacity
				onLongPress={onChartLongPress}
				style={vitalItemStyles.chart}
			>
				{expanded && data && data.length > 0 && (
					<Data type={type} data={data} categories={categories} fullscreen={false} />
				)}
			</TouchableOpacity >
		</View>
	);
}

export { VitalItem, Data, CategoricalChartFullScreen  };

export const vitalItemStyles = StyleSheet.create({
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
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -5,
		marginBottom: 10,
	},
	timeElapsedText: {
		fontSize: 12,
		alignSelf: "flex-start"
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
