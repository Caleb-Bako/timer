import TimeScroll from "@/components/TimeScroll";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop:50,
        backgroundColor:'#1F1B2E',
      }}
    >
      <TimeScroll/>
    </View>
  );
}
