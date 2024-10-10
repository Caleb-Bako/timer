import TimeScroll from "@/components/TimeScroll";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop:100
      }}
    >
      <TimeScroll/>
    </View>
  );
}
