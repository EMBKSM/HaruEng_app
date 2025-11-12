import { StyleSheet } from "react-native";
import tw from "twrnc";

import { Text, View } from "@/components/Themed";

export default function AiInterviewScreen() {
  // 함수 이름 변경
  return (
    <View style={styles.container}>
      <Text style={tw`text-blue-500 text-3xl font-bold`}>AI 인터뷰 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
