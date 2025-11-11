import "react-native";

declare module "react-native" {
  interface TextProps {
    tw?: string;
  }
  interface ViewProps {
    tw?: string;
  }
  interface PressableProps {
    tw?: string;
  }
  interface TouchableOpacityProps {
    tw?: string;
  }
  // 앞으로 사용할 다른 컴포넌트들도 여기에 추가할 수 있다.
}
