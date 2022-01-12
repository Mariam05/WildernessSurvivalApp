import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
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
	View
} from "react-native";
import { useState } from "react";

const Chart = (data) => {

    const mappedData = data.map(d => {
        return {
            timestamp: d.timestamp,
            value: d.value,
        }
    })

	return (
		<VictoryChart
			theme={customTheme}
			domainPadding={{ x: 0, y: 20 }}
			padding={{top:5, bottom:35, left:50, right:50}}
			height={180}
		>
			<VictoryLine
				style={{
					data: { stroke: "#c43a31"},
					parent: { border: "1px solid #ccc", fill: "#000000"}
				}}
				x={(d) => new Date(parseInt(d.timestamp)*1000)}
				y="value"
				data={mappedData}
			/>
		</VictoryChart>
	)
}

const RowWithImage = (entry) => {
	const date = new Date(entry.timestamp * 1000);
	const dateString = date.getHours() + ":" + date.getMinutes();

	const [expandedImage, setExpandedImage] = useState(false);
	const [imageUrl, setImageUrl] = useState("");


	const onPress = () => {
		setExpandedImage(!expandedImage);
		setImageUrl(entry.url)
	};

	return (
		<TouchableOpacity style={vitalItemStyles.row} onPress={onPress}>
				<View style={vitalItemStyles.timestampCell}>
					<Text style={vitalItemStyles.timestampCellText}>{dateString}</Text>
				</View>
				<View style={vitalItemStyles.valueCell}>
					<View style={vitalItemStyles.valueCellText}>
						<Text>
							{entry.value}
						</Text>
					</View>
					{expandedImage && (
					<View style={vitalItemStyles.valueCellImage}>
						<Image
							source={{uri:imageUrl}}
							style={vitalItemStyles.valueImage}>
						</Image>
					</View>)}
				</View>
		</TouchableOpacity>
	)
}


const Row = (entry) => {
	const date = new Date(entry.timestamp*1000);
	const dateString = date.getHours() + ":" + date.getMinutes();

	return (
		<View style={vitalItemStyles.row}>
				<View style={vitalItemStyles.timestampCell}>
					<Text style={vitalItemStyles.timestampCellText}>{dateString}</Text>
				</View>
				<View style={vitalItemStyles.valueCell}>
					<Text style={vitalItemStyles.valueCellText}>
						{entry.value}
					</Text>
				</View>
		</View>
	)
}


const Table = (data) => {
	const hasImage = data && data[0] && data[0].url!=null && data[0].url!=""

	return (
		<View style={vitalItemStyles.table}>
			{
				data.map((entry) => { // This will  a row for each data element.
					return hasImage ? RowWithImage(entry) : Row(entry)
				})
			}
		</View>
	)
}

const Data = ({ type, data }) => {
	if (type === "Numerical"){
		return Chart(data);
	}
	return Table(data);
}


const TimeElapsed = ({ timeElapsed, periodicity }) => {
	const isOverdue = timeElapsed > periodicity

	return (
		<Text style={[vitalItemStyles.timeElapsedText, {color: isOverdue ? colours.redText : colours.greenText}]}>
			{ timeElapsed.toString() } min ago
		</Text>
	)
}


 function VitalItem({ enabled, name, periodicity, type, description, data, timeElapsed, onPressInfo, onPressAdd }){
    const [expanded, setExpanded] = useState(false);
    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };
    return (
        <View>
			<TouchableOpacity
				disabled={!enabled}
                onPress={onPress}
				style={[vitalItemStyles.vitalsHeader, {width: enabled ? "80%" : "90%"}]}>
				{
					description != undefined && (
						<AppButton
							title="i"
                        	style={vitalItemStyles.infoButton}
                        	buttonTextStyle={vitalItemStyles.infoButtonText}
                        	onPress={onPressInfo}
						/>
					)
				}

                <View>
                    <Text style={vitalItemStyles.vitalItemNameText}>{name}</Text>
					{
						timeElapsed != undefined && (
							<TimeElapsed timeElapsed={timeElapsed} periodicity={periodicity} />
						)
					}
                </View>

				{
					onPressAdd && (
						<AppButton
							title="Add"
							style={vitalItemStyles.newReadingButton}
							buttonTextStyle={vitalItemStyles.newReadingButtonText}
							onPress={onPressAdd}
						/>
					)
				}
            </TouchableOpacity>

			{
				expanded && data && data.length > 0 && (
					<Data type={type} data={data} />
				)
             }
    </View>)
}

export default VitalItem;

export const vitalItemStyles = StyleSheet.create({
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
		alignSelf: 'center',
		width: "80%",
		flexDirection: 'row',
		margin: 5,
		paddingVertical: 5,
		borderBottomColor: "#737373",
		borderBottomWidth: 0.5,//StyleSheet.hairlineWidth,
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
	valueCellText: {
		
	},
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
		shadowRadius: 3
	},
	valueImage: {
		flex: 1,
		resizeMode: "cover",
		borderRadius: 10,
		margin: 0
	},
    vitalsHeader: {
		flexDirection: "row",
		alignSelf: "center",
		padding: 10,
		margin: 10,
		marginBottom: 10,
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