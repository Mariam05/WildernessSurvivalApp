import {
	View,
	StyleSheet,
	Text,
	Platform,
	ScrollView,
} from "react-native";
import RNModal from "react-native-modal";
import AppButton from "./AppButton";
import colours from "../colours";

type ModalProps = {
	isVisible: boolean;
	children?: React.ReactNode;
	[x: string]: any;
};


export const VitalInfoModal = ({
	isVisible = false,
	handleVitalInfoModal,
	vitalDescription,
}: ModalProps) => {

	return (
		<RNModal
			isVisible={isVisible}
			animationInTiming={1000}
			animationOutTiming={1000}
			backdropTransitionInTiming={800}
			backdropTransitionOutTiming={800}
		>
				<ScrollView
					style={{ top: "5%" }}
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="never"
				>
				<VitalInfoModal.Container>
					<VitalInfoModal.Body>
						<Text style={{ top: 20, bottom: 50 }}>
								{vitalDescription}
							</Text>
						</VitalInfoModal.Body>
						<VitalInfoModal.Footer>
							<AppButton
								title="Close"
								style={modalStyles.modalCancelButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => { handleVitalInfoModal() }}
							/>
						</VitalInfoModal.Footer>
					</VitalInfoModal.Container>
				</ScrollView>
		</RNModal>
	);
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
	<View style={styles.modalContainer}>{children}</View>
);

const ModalHeader = () => (
	<View style={styles.modalHeader}>
		<Text style={styles.modalHeaderText}>Create a New Patient</Text>
	</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalBody}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalFooter}>{children}</View>
);

VitalInfoModal.Header = ModalHeader;
VitalInfoModal.Container = ModalContainer;
VitalInfoModal.Body = ModalBody;
VitalInfoModal.Footer = ModalFooter;

const styles = StyleSheet.create({
	modalBody: {
		justifyContent: "center",
		paddingHorizontal: 15,
		minHeight: 10,
	},
	modalContainer: {
		backgroundColor: colours.pinkBackground,
		borderRadius: 25,
		borderColor: "#000",
		height: "100%",
	},
	modalFooter: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		flexDirection: "row",
	},
	modalHeader: {
		alignItems: "center",
		justifyContent: "center",
	},
	modalHeaderText: {
		paddingTop: 10,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "500",
	},
});

const modalStyles = StyleSheet.create({
	modalButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	modalCancelButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.blue,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	modalSubHeadingText: {
		fontSize: 17,
		fontWeight: "500",
	},
	modalSubmitButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
});
