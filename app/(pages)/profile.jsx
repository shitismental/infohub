import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { router } from 'expo-router';
import { useState } from 'react';

import BlurCircle from "../../assets/icons/BlurCircle.png";
import ArrowIcon from "../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../assets/icons/bell_icon.png";

import ProfileIcon from "../../assets/icons/profile_icon.png"
import BookIcon from "../../assets/icons/book_icon.png"

import { Colors } from "../../constants/Colors";

const Profile = () => {

  const [open, setOpen] = useState(false);

  const handleGoBack = () => {
    router.replace("/chatbot")
  }

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={[styles.paddingWrapper, styles.header__container]}>
        <Image
          tintColor={Colors.white}
          style={[styles.topBlurCircle]}
          source={BlurCircle}
          resizeMode="contain"
        />
        <View style={[styles.header__top_content_container]}>
          <Pressable
            onPress={handleGoBack}
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
          >
            <Image
              style={[styles.header__left_arrow_icon]}
              source={ArrowIcon}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={[styles.header__top_content_title]}>Профіль</Text>
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
        <View style={[styles.header__bottom_content_container]}>
          <View style={[styles.header__bottom_content_info]}>
            <View style={[styles.header__bottom_profile_icon_container]}>
              <Image style={[styles.header__bottom_profile_icon]} tintColor={Colors.white} source={ProfileIcon} resizeMode='contain' />
            </View>
            <Text style={[styles.header__bottom_profile_name]}>Анастасія Лужко</Text>
          </View>
        </View>
      </View>

      <View style={[styles.paddingWrapper, styles.profile__main_content_wrapper]}>
        <View style={[styles.profile__main_content_container]}>
          <View style={[styles.profile__main_content_accordions_container]}>
            <View style={[
              { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: 1, borderBottomColor: "#F7F7F7" }, styles.profile__main_content_accordion_container,
            ]
            }>
              <Pressable
                onPress={handleOpen}
                style={[styles.profile__main_content_accordion_btn,]}>
                <View style={[styles.profile__main_content_accordion_left_container]}>
                  <Image source={BookIcon} resizeMode='contain' style={[styles.profile__main_content_accordion_left_icon]} />
                  <Text style={[styles.profile__main_content_accordion_left_text]}>Особиста інформація</Text>
                </View>
                <Pressable style={({ pressed }) => [
                  styles.profile__main_content_accordion_arrow_icon_container,
                  pressed && { opacity: 0.7 },
                ]}>
                  <Image tintColor={"#B3B3B3"} source={ArrowIcon} resizeMode='contain' style={[
                    styles.profile__main_content_accordion_arrow_icon,
                    { transform: [{ rotate: open ? "90deg" : "-90deg" }] }
                  ]} />
                </Pressable>
              </Pressable>
              {open && <View style={{ height: 200, backgroundColor: "orange" }}>

              </View>}
            </View>
          </View>
          <View>

          </View>
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
  header__top_content_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__left_arrow_icon: {
    height: 30,
    width: 30,
  },
  header__top_content_title: {
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
  header__bottom_content_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  header__bottom_content_info: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  header__bottom_profile_icon_container: {
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header__bottom_profile_icon: {
    width: 50,
    height: 50,
  },
  header__bottom_profile_name: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
  },
  profile__main_content_container: {
    marginTop: -30,
  },
  profile__main_content_accordions_container: {
    boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
  },
  profile__main_content_accordion_container: {
    overflow: "hidden"
  },
  profile__main_content_accordion_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  profile__main_content_accordion_left_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profile__main_content_accordion_left_icon: {
    width: 20,
    height: 20,
  },
  profile__main_content_accordion_left_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#0A0A0A"
  },
  profile__main_content_accordion_arrow_icon_container: {
    alignItems: "center",
    justifyContent: "center"
  },
  profile__main_content_accordion_arrow_icon: {
    width: 20,
    height: 20,
  }
})