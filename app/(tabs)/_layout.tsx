import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// 1. TabBarIcon 함수에서 style 속성 제거, size는 24로 설정
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
        // 2. 탭 바 스타일 수정
        tabBarStyle: {
          height: 85, // (아이콘/텍스트 50 + 여백 30)
          paddingBottom: 30, // 홈 바 영역을 피하기 위해 하단 여백을 30으로 늘림
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="word"
        options={{
          title: '단어학습',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="interview"
        options={{
          title: 'AI 인터뷰',
          tabBarIcon: ({ color }) => <TabBarIcon name="microphone" color={color} />,
        }}
      />
    </Tabs>
  );
}