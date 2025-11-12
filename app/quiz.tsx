import { StyleSheet } from "react-native";
import tw from "twrnc";
// 1. Pressable, Link, useRouter import 제거
import { Text, View } from "@/components/Themed";

export default function QuizScreen() {
  // 2. router = useRouter() 제거

  return (
    <View style={styles.container}>
      
      {/* 3. '돌아가기' Pressable 컴포넌트 전체 삭제 */}
      
      <Text style={tw`text-3xl font-bold`}>단어 퀴즈</Text>
      <Text style={tw`text-lg text-gray-500 mt-4`}>
        (이슈 #7: 퀴즈 로직이 여기에 구현됩니다)
      </Text>
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