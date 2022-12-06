import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";

const ModalSeeMore = (props) => {
  return (
    <Modal
    style={{ margin: 0 }}
    backdropOpacity={0}
    isVisible={props.modalSeeMore}
    hideModalContentWhileAnimating={true}
    backdropTransitionOutTiming={0}
    onSwipeComplete={() => props.setModalSeeMore(false)}
    onBackdropPress={() => props.setModalSeeMore(false)}
    swipeDirection="down"
	  animationType="slide"
    propagateSwipe
		>
		<View style={styles.modalContainer}>

      <View style={[{ backgroundColor: "white" }, styles.titleContainer]}>
      	<View style={{flex: 1}}/>
				<Text style={[{ color: props.theme.classic.textDark }, styles.textTitle ]}>Description</Text>
				<View style={{ flex: 1 }}>
					<TouchableOpacity style= {styles.backButton} onPress={() => props.setModalSeeMore(false)}>
    				<Ionicons name="close" size={40} color={props.theme.classic.textDark}/>
  				</TouchableOpacity>
				</View>
    	</View>

			<View style={styles.contentContainer}>
				<View style={[{ backgroundColor: props.focusData.background }, styles.elementContainer, styles.shadow ]}>
					<Text style={{ marginTop: 20, color: props.theme.classic.textDark }}>
						<Text style={styles.textDiv}>Catégorie d'événement: </Text>
						<Text style={styles.text}>{props.focusData.type}</Text>
					</Text>
					<Text style={{ marginTop: 20, color: props.theme.classic.textDark }}>
						<Text style={styles.textDiv}>Horraire: </Text>
						<Text style={styles.text}>{props.focusData.date}</Text>
					</Text>
					<Text style={{ marginTop: 20, color: props.theme.classic.textDark }}>
						<Text style={styles.textDiv}>Salle: </Text>
						<Text style={styles.text}>{props.focusData.room}</Text>
					</Text>
					<Text style={{ marginTop: 20, color: props.theme.classic.textDark }}>
						<Text style={styles.textDiv}>Elément pédagogique: </Text>
						<Text style={styles.text}>{props.focusData.course}</Text>
					</Text>
					<Text style={{ marginTop: 20, color: props.theme.classic.textDark }}>
						<Text style={styles.textDiv}>Groupes: </Text>
						<Text style={styles.text}>{props.focusData.group}</Text>
					</Text>
				</View>
			</View>

    	</View>
    </Modal>
  );
};


const styles = StyleSheet.create({
	modalContainer: {
    height: "70%", 
    width: "100%", 
    position: 'absolute', 
    bottom: 0, 
    borderRadius: 50,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
		width: "100%",
		height: 75,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderWidth: 1,
   	borderColor: "#c2c2c2"
  },
	contentContainer: {
		width: "100%", 
		height: "100%", 
		backgroundColor: "#f2f2f2", 
		alignItems: "center",

	},
	elementContainer: {
		width: "90%",  
		height: "80%",
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "#858585", 
    marginTop: 10, 
    paddingLeft: 10, 
	},

	textTitle: {
		fontSize: 20, 
		fontWeight: 'bold'
	},
	textDiv: {
		fontSize: 15,
		fontWeight: "600"
	},
  text: {
    fontSize: 12,
		fontWeight: "300",
  },

	backButton: {
		alignItems: "flex-end", 
		alignItems: "center",
		alignSelf: "center",
		width: 50,
	},

	shadow: Platform.OS === 'ios' ? {
		shadowColor: '#171717',
		shadowOffset: {width: 0, height: 3},
		shadowOpacity: 0.4,
		shadowRadius: 2,
	  } : {
		elevation: 3,
	  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2"
  },
});

export default ModalSeeMore;