import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';

const ModalFindContact = (props) => {

  const contactData = require("../../data/contact.json");

  const [selectOption, setSelectOption] = useState("");
  const [step, setStep] = useState(1);

  const nextPress = () => {
    if (step === 1) {
      setStep(2);
    }
    else {
      setStep(1);
      props.setIsVisible(false);
    }
  }

  const leaveModal = () => {
    setStep(1);
    props.setIsVisible(false);
  }

  return (
    <Modal
    style={{ margin: 0 }}
    backdropOpacity={0}
    isVisible={props.isVisible}
    hideModalContentWhileAnimating={true}
    backdropTransitionOutTiming={0}
    onSwipeComplete={() => leaveModal()}
    onBackdropPress={() => leaveModal()}
    swipeDirection="down"
	  animationType="slide"
    propagateSwipe
	  >
			<View style={styles.modalContainer}>
        
        <View style={[{ backgroundColor: "#f2f2f2" }, styles.titleContainer]}>
      		<View style={{flex: 1}}/>
      		<Text style={[{ color: props.theme.classic.textDark }, styles.textTitle ]}>Etape {step} sur 2</Text>
      		<TouchableOpacity style= {styles.backButton} onPress={() => leaveModal()}>
        		<Ionicons name="close" size={40} color={props.theme.classic.textDark}/>
    			</TouchableOpacity>
    		</View>

			  <View style={styles.contentContainer}>

          {step === 1 && <Text style={[{ marginBottom: "5%"}, styles.text]}>Choisisez une option</Text>}
          {step === 1 &&
          <View style={{ marginBottom: "10%" }}>
            <ButtonType name="Licence" selectOption={selectOption} setSelectOption={setSelectOption} theme={props.theme}/>
            <ButtonType name="Master" selectOption={selectOption} setSelectOption={setSelectOption} theme={props.theme}/>
            <ButtonType name="Edt" selectOption={selectOption} setSelectOption={setSelectOption} theme={props.theme}/>
            <ButtonType name="Diplôme" selectOption={selectOption} setSelectOption={setSelectOption} theme={props.theme}/>
          </View>}
          {step === 1 &&
            <TouchableOpacity onPress={() => nextPress()}>
              <Text style={styles.textType}>Suivant</Text>
            </TouchableOpacity>
          }

          {step === 2 && <Text style={[{ marginBottom: "5%"}, styles.text]}>Choisisez votre groupe</Text>}
          {step === 2 && 
          <ScrollView style={{ width: "100%", height: "80%", marginBottom: 50}}>
            {contactData.data.filter(item => item.name === selectOption).map(item => item.data.map((item, index) => {
              return(
                <React.Fragment key={index}>
                  <ButtonList name={item.name}/>
                </React.Fragment>
              );
            }))}
            </ScrollView>
          }
          {step === 2 && 
          <TouchableOpacity style={[{ backgroundColor: props.theme.classic.secondary}, styles.nextContainer]} onPress={() => nextPress()}>
            <Text style={[{color: props.theme.classic.textLight }, styles.textType]}>Terminer</Text>
          </TouchableOpacity>
          }
          
			  </View>

    	</View>
    </Modal>
  );
};

const ButtonType = (props) => {
  return(
    <TouchableOpacity style={[{backgroundColor: props.name === props.selectOption ? props.theme.classic.secondary : props.theme.classic.foreground}, styles.buttonType, styles.shadow]}
    onPress={() => props.setSelectOption(props.name)}>
      <Text style={[{ color: props.name === props.selectOption ? props.theme.classic.textLight : props.theme.classic.textDark}, styles.textType]}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const ButtonList = (props) => {
  return(
    <TouchableOpacity style={[{ backgroundColor: "white" }, styles.buttonList, styles.shadow]}>
      <Text>{props.name}</Text>
      <View style={styles.line}/>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
	modalContainer: {
    height: "55%", 
    width: "100%", 
    position: 'absolute', 
    bottom: 0, 
    borderRadius: 50,
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
		width: "100%",
		height: 75,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
  },
	contentContainer: {
		width: "100%", 
		height: "100%", 
		backgroundColor: "#f2f2f2", 
		alignItems: "center"
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
  nextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    bottom: 125,
    paddingLeft: "15%",
    paddingRight: "15%",
    paddingTop: "4%",
    paddingBottom: "4%",
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
    fontSize: 15,
		fontWeight: "300",
  },
  textType: {
    fontWeight: "400",
    fontSize: 20
  },

	backButton: {
		flex: 1, 
		alignItems: "flex-end", 
		right: "30%"
	},
  buttonType: {
    borderRadius: 15,
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
    alignItems: "center",
    marginBottom: 15
  },
  buttonList: {
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    alignItems: "center",
  },

  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2",
    position: "absolute",
    bottom: 0
  },
});

export default ModalFindContact;