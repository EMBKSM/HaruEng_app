import { StyleSheet } from "react-native";
import tw from "twrnc";

import { Text, View } from "@/components/Themed";

export default function WordLearningScreen() {
  return (
    <View style={styles.container}>
      <Text style={tw`text-blue-500 text-3xl font-bold`}>단어학습 화면</Text>
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
