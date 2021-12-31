import React from "react";
import { View, Text } from "react-native";
import RNModal from "react-native-modal";

import styles from "../stylesheet";

type ModalProps = {
	isVisible: boolean,
	children: React.ReactNode,
	[x: string]: any,
};
export const PatientModal = ({
	isVisible = false,
	children,
	...props
}: ModalProps) => {
	return (
		<RNModal
			isVisible={isVisible}
			animationInTiming={1000}
			animationOutTiming={1000}
			backdropTransitionInTiming={800}
			backdropTransitionOutTiming={800}
			{...props}
		>
			{children}
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

PatientModal.Header = ModalHeader;
PatientModal.Container = ModalContainer;
PatientModal.Body = ModalBody;
PatientModal.Footer = ModalFooter;
