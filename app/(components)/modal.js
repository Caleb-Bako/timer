import { useEffect, useCallback } from "react"
import { Pressable, StyleSheet, Text, View, Modal } from "react-native"
import Animated, {
  BounceIn,
  BounceOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated"
import { AntDesign } from "@expo/vector-icons"

const OUTER_SQUARE_SIZE = 20
const INNER_SQUARE_SIZE = 10
const EYE_MOVEMENT = 5 // How far the eyes move

export default function ModalView({ modalVisible, setModalVisible, setIsRunning }) {
  const translateY = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  const startAnimation = useCallback(() => {
    translateY.value = withRepeat(
      withSequence(
        // Look up
        withTiming(-EYE_MOVEMENT, { duration: 150, easing: Easing.bounce }),
        // Hold up
        withTiming(-EYE_MOVEMENT, { duration: 7000 }),
        // Look down
        withTiming(EYE_MOVEMENT, { duration: 150, easing: Easing.bounce }),
        // Hold down
        withTiming(EYE_MOVEMENT, { duration: 7000 }),
        // Back to middle
        withTiming(0, { duration: 150, easing: Easing.bounce }),
        // Hold in middle
        withTiming(0, { duration: 7000 }),
      ),
      -1, // Repeat infinitely
      false, // Don't reverse the animation
    )
  }, [])

  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  const nextTimer = () => {
    setModalVisible(false)
    setIsRunning(true)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.characterBody}>
            <View style={styles.characterEyes}>
              <Animated.View style={[styles.characterPupils, animatedStyle]} />
            </View>
            <View style={styles.characterEyes}>
              <Animated.View style={[styles.characterPupils, animatedStyle]} />
            </View>
          </View>
          <Text style={styles.modalText}>Want to Continue?</Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Animated.View entering={BounceIn} exiting={BounceOut}>
              <Pressable onPress={nextTimer}>
                <AntDesign name="checkcircle" size={64} color="#664EFF" />
              </Pressable>
            </Animated.View>
            <Animated.View entering={BounceIn} exiting={BounceOut}>
              <Pressable onPress={() => setModalVisible(false)}>
                <AntDesign name="closecircle" size={64} color="black" />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "P2P",
  },
  characterBody: {
    width: 70,
    height: 70,
    padding: 10,
    backgroundColor: "#6A5CFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  characterEyes: {
    width: OUTER_SQUARE_SIZE,
    height: OUTER_SQUARE_SIZE,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  characterPupils: {
    width: INNER_SQUARE_SIZE,
    height: INNER_SQUARE_SIZE,
    backgroundColor: "black",
  },
})

