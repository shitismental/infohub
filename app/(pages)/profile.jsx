import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { router } from 'expo-router';

import BlurCircle from "../../assets/icons/BlurCircle.png";
import ArrowLeftIcon from "../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../assets/icons/bell_icon.png";

import { Colors } from "../../constants/Colors";

const Profile = () => {
  const handleGoBack = () => {
    router.replace("/courses")
  }

  return (
    <View style={styles.container}>
      <View style={[styles.paddingWrapper, styles.header__container]}>
        <Image
          tintColor={Colors.white}
          style={[styles.topBlurCircle]}
          source={BlurCircle}
          resizeMode="contain"
        />
        <View style={[styles.header__content_container]}>
          <Pressable
            onPress={handleGoBack}
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
          >
            <Image
              style={[styles.header__left_arrow_icon]}
              source={ArrowLeftIcon}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={[styles.header__content_title]}>Профіль</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              styles.header__bell_icon_btn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Image
              style={[styles.header__bell_icon]}
              source={BellIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  header__container: {
    backgroundColor: "#094174",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 256,
    paddingVertical: 20,
  },
  topBlurCircle: {
    pointerEvents: "none",
    width: 500,
    height: 500,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -250 }, { translateY: -300 }],
    opacity: 0.1,
  },
  header__content_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__left_arrow_icon: {
    height: 30,
    width: 30,
  },
  header__content_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  header__bell_icon_btn: {
    padding: 10,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  header__bell_icon: {
    width: 25,
    height: 25,
  },
})