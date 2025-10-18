import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MontserratBlack: require("../assets/fonts/Montserrat-Black.ttf"),
    MontserratBlackItalic: require("../assets/fonts/Montserrat-BlackItalic.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontserratBoldItalic: require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    MontserratExtraBold: require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    MontserratExtraBoldItalic: require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    MontserratExtraLight: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    MontserratExtraLightItalic: require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    MontserratItalic: require("../assets/fonts/Montserrat-Italic.ttf"),
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratLightItalic: require("../assets/fonts/Montserrat-LightItalic.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratMediumItalic: require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratSemiBoldItalic: require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratThinItalic: require("../assets/fonts/Montserrat-ThinItalic.ttf"),
    MontserratAlternatesBold: require("../assets/fonts/MontserratAlternates-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar
        barStyle="auto"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }}>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(pages)"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
    </>
  );
}