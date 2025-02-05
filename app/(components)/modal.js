import { Pressable, StyleSheet, Text, View ,Modal} from 'react-native';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ModalView({modalVisible,setModalVisible,setIsRunning}) {

  const nextTimer = () => {
    setModalVisible(false)
    setIsRunning(true);
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press (Android)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.characterBody} >
              <View style={styles.characterEyes} >
                <View style={styles.characterPupils} >
                </View>
              </View>
              <View style={styles.characterEyes} >
                <View style={styles.characterPupils} >
                </View>
              </View>
            </View>
            <Text style={styles.modalText}>Want to Continue?</Text>
            <View style={{flexDirection: 'row', gap: 20}}>
            <Animated.View entering={BounceIn} exiting={BounceOut} >
              <Pressable onPress={()=> nextTimer()}>
                <AntDesign name="checkcircle" size={64} color="#664EFF" />
              </Pressable>
            </Animated.View>  
            <Animated.View entering={BounceIn} exiting={BounceOut} >
              <Pressable onPress={() => setModalVisible(false)}>
                <AntDesign name="closecircle" size={64} color="black" />
              </Pressable>
            </Animated.View>
            </View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'P2P',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontFamily:'P2P',
  },
  characterBody:{
    width:70,
    height:70,
    padding:10,
    backgroundColor:'#6A5CFF',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  characterEyes:{
    width:20,
    height:20,
    backgroundColor:'white'
  },
  characterPupils:{
    width:10,
    height:10,
    backgroundColor:'black'
  },
});
