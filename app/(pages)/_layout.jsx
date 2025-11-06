import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";
import HomeIcon from "../../assets/icons/home_icon.svg";
import CoursesIcon from "../../assets/icons/courses_icon.svg";
import ChatIcon from "../../assets/icons/chat_icon.svg";
import ProfileIcon from "../../assets/icons/profile_icon.svg";

import { useUser } from "../../utils/userContext";

export default function DashboardLayout() {

  const { user } = useUser();

  if (!user) return null
  
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Головна", tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Курси",
          tabBarIcon: CoursesIcon,
          href: "/courses"
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("courses");
          },
        })}
      />
      <Tabs.Screen
        name="chatbot"
        options={{ title: "ЧатБОТ", tabBarIcon: ChatIcon }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Профіль", tabBarIcon: ProfileIcon }}
      />
    </Tabs>
  );
}