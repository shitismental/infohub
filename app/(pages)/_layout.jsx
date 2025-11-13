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
        options={{
          title: "Головна",
          tabBarIcon: ({ color }) => <HomeIcon width={22} height={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Курси",
          tabBarIcon: ({ color }) => <CoursesIcon width={22} height={22} color={color} />,
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
        options={{ title: "ЧатБОТ", tabBarIcon: ({ color }) => <ChatIcon width={22} height={22} color={color} />, }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Профіль", tabBarIcon: ({ color }) => <ProfileIcon width={22} height={22} color={color} />, }}
      />
    </Tabs>
  );
}