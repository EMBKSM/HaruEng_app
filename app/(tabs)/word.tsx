import { db } from "@/constants/firebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { collection, DocumentData, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import tw from "twrnc";

// Icon 헬퍼 함수
function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
  style?: object;
}) {
  return <FontAwesome size={props.size || 20} style={props.style} {...props} />;
}

// 난이도 변환 함수 (5단계)
const getLevelInfo = (level: number): { text: string; style: string } => {
  if (level <= 2) return { text: "기초", style: "green" };
  if (level <= 4) return { text: "초급", style: "blue" };
  if (level <= 6) return { text: "중급", style: "yellow" };
  if (level <= 8) return { text: "고급", style: "orange" };
  return { text: "마스터", style: "red" };
};

export default function WordScreen() {
  const [words, setWords] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWords = async () => {
      try {
        const q = query(collection(db, "words"), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedWords: DocumentData[] = [];
        querySnapshot.forEach((doc) => fetchedWords.push(doc.data()));
        setWords(fetchedWords);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    getWords();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100 dark:bg-black`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // 1. 최상위 View에 pt-12 (padding-top)를 추가합니다.
    <View style={tw`flex-1 bg-gray-100 dark:bg-gray-900 pt-12`}>
      {/* 2. 헤더: 이제 pt-12만큼 내려간 위치에서 시작됩니다. */}
      <View
        style={tw`flex-row justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800`}
      >
        <Text style={tw`text-2xl font-extrabold text-gray-900 dark:text-gray-100`}>
          오늘의 단어
        </Text>
        <Link href="/quiz" asChild>
          <TouchableOpacity style={tw`p-1`}>
            <Icon name="pencil-square-o" color={tw.color("blue-500")!} size={28} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView contentContainerStyle={tw`p-4`}>
        {words.length === 0 ? (
          <Text style={tw`text-lg text-gray-500 text-center mt-20`}>
            표시할 단어가 없습니다.
          </Text>
        ) : (
          words.map((word, index) => {
            const levelInfo = getLevelInfo(word.level);
            const badgeStyle = `bg-${levelInfo.style}-100 dark:bg-${levelInfo.style}-200`;
            const textStyle = `text-${levelInfo.style}-600 dark:text-${levelInfo.style}-700`;

            return (
              <View
                key={index}
                style={tw`w-full p-4 mb-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800`}
              >
                <View style={tw`absolute top-3 right-4`}>
                   <Pressable style={({ pressed }) => tw`p-2 ${pressed ? 'opacity-50' : ''}`}>
                      <Icon name="bookmark-o" color={tw.color("gray-400")!} size={20} />
                   </Pressable>
                </View>

                <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white mb-1`}>
                  {word.eng}
                </Text>
                <View style={tw`flex-row items-center mt-1 mb-4`}>
                  <Text style={tw`text-lg text-gray-600 dark:text-gray-300`}>
                    {word.kor}
                  </Text>
                  <View style={tw`px-3 py-1 rounded-full ml-2 ${badgeStyle}`}>
                    <Text style={tw`text-xs font-bold ${textStyle}`}>
                      {levelInfo.text}
                    </Text>
                  </View>
                </View>

                <View style={tw`border-t border-gray-100 dark:border-gray-700 pt-3`}>
                  <View style={tw`flex-row items-start`}>
                    <Icon name="book" color={tw.color("gray-400")!} style={tw`mr-3 mt-1`} />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-sm text-gray-800 dark:text-gray-100 leading-normal`}>
                        {word.exampleEng}
                      </Text>
                      <Text style={tw`text-xs text-gray-500 dark:text-gray-400 mt-1`}>
                        {word.exampleKor}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}