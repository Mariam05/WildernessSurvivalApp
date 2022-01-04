import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import customTheme from "../assets/customTheme.js";
import colours from "../assets/colours";
import AppButton from "../assets/components/AppButton";

const RenderChart = (item) => {
	return (
		<VictoryChart
				theme={customTheme}
 				domainPadding={{x:0, y: 20}}
				padding={{top:0, bottom:35, left:50, right:50}}
				margin={{top:0}}
				height={180}
			>
			<VictoryLine
				style={{
					data: { stroke: "#c43a31"},
					parent: { border: "1px solid #ccc", fill: "#000000"}
				}}
				x={(d) => new Date(d.timestamp*1000)}
				y="value"
				data={item.data}
			/>
		</VictoryChart>)
}



const RenderRowWithImage = (entry) => {
		const date = new Date(entry.timestamp*1000);
		const dateString = date.getHours() + ":" + date.getMinutes();

		const [openImage, setOpenImage] = useState(false);
		const [imageUrl, setImageUrl] = useState("");


		const onPress = () => {
			setOpenImage(!openImage);
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
						{openImage && (
						<View style={vitalItemStyles.valueCellImage}>
							<Image
								source={{uri:entry.url}}
								style={{alignSelf: "center", width: 100, height: 100,resizeMode: 'stretch'}}>
							</Image>
						</View>)}
					</View>
			</TouchableOpacity>
		)
}


const RenderRow = (entry) => {
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

const rowStyles = StyleSheet.create({

});

const RenderTable = (item) => {
	const hasImage = item.title==="Photos"

	return (
		  <View style={vitalItemStyles.table}>
				{
						item.data.map((entry) => { // This will render a row for each data element.
								return hasImage ? RenderRowWithImage(entry) : RenderRow(entry)
						})
				}
			</View>
	)
}



const RenderData = ({ item }) => {
	if (item.type === "numerical"){
		return RenderChart(item);
	}
	return RenderTable(item);
}


const RenderTimeElapsed = ({ item }) => {
	const containsTimeElapsed = item.hasOwnProperty("timeElapsed")
	const isOverdue = item.timeElapsed > item.periodicity

	if (containsTimeElapsed){
			return (<Text style={isOverdue ? vitalItemStyles.timeElapsedRedText : vitalItemStyles.timeElapsedGreenText}
							>{item.timeElapsed} min ago</Text>)
	}
	return (null)
}


export default const RenderVitalsItem = ({
	item,
	onPressInfo,
	onPressAdd,
}) => {
		const [open, setopen] = useState(false);
		const onPress = () => {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
			setopen(!open);
		};

		return (
			<View>
				<TouchableOpacity
						onPress={onPress}
						style={vitalItemStyles.vitalsHeader}>
						<View margin={0} />

					<AppButton
							title="i"
							style={vitalItemStyles.infoButton}
							buttonTextStyle={vitalItemStyles.infoButtonText}
							onPress={onPressInfo}
					/>

					<View>
						<Text style={vitalItemStyles.vitalItemNameText}>{item.title}</Text>
						<RenderTimeElapsed
								item={item}
						/>
					</View>

					<AppButton
							title="Add"
							style={vitalItemStyles.newReadingButton}
							buttonTextStyle={vitalItemStyles.newReadingButtonText}
							onPress={onPressAdd}
					/>
				</TouchableOpacity>
				{open && (
					<RenderData item={item}/>
				)}

		</View>
	)
};

vitalItemStyles = StyleSheet.create({
    row: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		left: 50,
		marginVertical: "1%",
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
		maxWidth: 300,
	},
	timestampCell: {
		paddingRight: 0,
		marginRight: 0,
		width: 50,
		display: "flex",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
	},
	timestampCellText: {
		fontWeight: "bold",
	},
	valueCell: {
		maxWidth: 260,
	},
	valueCellText: {
		flex: 1,
		paddingLeft: 5,
	},
	valueCellImage: {
		flex: 2,
		borderWidth: 1,
	},
    table: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    vitalsHeader: {
    		flexDirection: "row",
    		padding: 10,
    		margin: 10,
    		marginBottom: 0,
    		paddingBottom: 0,
    		paddingLeft: 20,
    		fontSize: 30,
    		height: 60,
    		width: "80%",
    		alignSelf: "center",
    		justifyContent: "flex-start",
    		fontWeight: "900",
    		backgroundColor: colours.lightBlueBackground,
    		borderRadius: 20,
    		shadowColor: colours.primary,
    		shadowOpacity: 0.8,
    		shadowOffset: { width: 1, height: 3 },
    		shadowRadius: 3,
    		elevation: 10,
    },
    infoButton: {
    		flexDirection: "column",
    		width: Platform.OS == "ios" ? 30: 20,
    		aspectRatio: 1,
    		backgroundColor: colours.purple,
    		borderRadius: 100,
    		alignSelf: "center",
    		alignItems: "center",
    		justifyContent: "center",
    		position: "absolute",
    		left: -5,
    		top: -5,
    		shadowColor: colours.primary,
    		shadowOpacity: 0.9,
    		shadowOffset: { width: 0, height: 3 },
    		shadowRadius: 4,
    		elevation: 7,
    },
    infoButtonText: {
        fontSize: 30,
        fontWeight: "300",
        top: Platform.OS == "ios" ? -2 : -6,
    },
    timeElapsedRedText: {
        fontSize: 12,
        color: colours.redText,
        alignSelf: "flex-start",
    },
    timeElapsedGreenText: {
        fontSize: 12,
        color: colours.greenText,
        alignSelf: "flex-start",
    },
    newReadingButton: {
        backgroundColor: colours.purple,
        height: "70%",
        borderRadius: 15,
        color: colours.primary,
        position: "absolute",
        right: 10,
        alignSelf: "center",
        borderColor: colours.primary,
        borderWidth: 1,
        padding: 6,
    },
    newReadingButtonText: {
        fontSize: 15,
        fontWeight: "300",
        top: Platform.OS == "ios" ? -4 : -1,
    },
    vitalItemNameText: {
        fontSize: 20,
        color: colours.primary,
        alignSelf: "flex-start",
    },
});