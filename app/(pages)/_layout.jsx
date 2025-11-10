import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import CustomTabBar from "../../components/CustomTabBar";
import HomeIcon from "../../assets/icons/home_icon.svg";
import CoursesIcon from "../../assets/icons/courses_icon.svg";
import ChatIcon from "../../assets/icons/chat_icon.svg";
import ProfileIcon from "../../assets/icons/profile_icon.svg";

import { useUser } from "../../utils/userContext";

export default function DashboardLayout() {

  const router = useRouter();

  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading || !user) return null;

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
          href: "/courses",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();

            navigation.navigate({
              name: "courses",
              merge: false,
              params: {
                screen: "index",
              },
            });
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