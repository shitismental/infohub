import { StyleSheet, Text, View, Pressable, Image, TextInput, ScrollView, Linking } from 'react-native'
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

import { logoutUser } from '../../services/auth';
import { getUser } from '../../services/auth';

import BlurCircle from "../../assets/icons/BlurCircle.png";
import ArrowIcon from "../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../assets/icons/question_mark_icon.png";

import ProfileIcon from "../../assets/icons/profile_icon.png"
import BookIcon from "../../assets/icons/book_icon.png"

import EditIcon from "../../assets/icons/edit_icon.png"

import PlaneIcon from "../../assets/icons/plane_icon.png"
import PersonIcon from "../../assets/icons/person_icon.png"
import EnvelopeIcon from "../../assets/icons/envelope_icon.png"
import PaperPlaneIcon from "../../assets/icons/paper_plane_icon.png"

import InfoIcon from "../../assets/icons/info_icon.png"
import LogoutIcon from "../../assets/icons/logout_icon.png"

import { Colors } from "../../constants/Colors";

const Profile = () => {

  const [openInfoAccordion, setOpenInfoAccordion] = useState(false);
  const [openCertificatsAccordion, setOpenCertificatsAccordion] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getUser();
        setUser(me);
      } catch (err) {
        console.log("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [])

  const username = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    } else if (user?.username && (!user?.first_name && !user?.last_name)) {
      return (user.username)
    } else {
      return "PLACEHOLDER"
    }
  }

  const handleGoBack = () => {
    router.replace("/chatbot")
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleOpenInfoAccordion = () => {
    setOpenInfoAccordion(prev => !prev)
    console.log(user)
  }

  const handleOpenCertificatsAccordion = () => {
    setOpenCertificatsAccordion(prev => !prev)
  }

  const redirectToTelegram = () => {
    Linking.openURL(`https://t.me/liora_innovation`);
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
            onPress={redirectToTelegram}
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
            <Text style={[styles.header__bottom_profile_name]}>{username()}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.paddingWrapper, styles.profile__main_content_wrapper]}>
        <View style={[styles.profile__main_content_container]}>
          <View style={[styles.profile__main_content_accordions_container]}>
            <View style={[
              { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: 1, borderBottomColor: "#F7F7F7" }, styles.profile__main_content_accordion_container,
            ]
            }>
              <Pressable
                onPress={handleOpenInfoAccordion}
                style={[styles.profile__main_content_accordion_btn,]}>
                <View style={[styles.profile__main_content_accordion_left_container]}>
                  <Image source={BookIcon} resizeMode='contain' style={[styles.profile__main_content_accordion_left_icon]} />
                  <Text style={[styles.profile__main_content_accordion_left_text]}>Особиста інформація</Text>
                </View>
                <Pressable
                  onPress={handleOpenInfoAccordion}
                  style={({ pressed }) => [
                    styles.profile__main_content_accordion_arrow_icon_container,
                    pressed && { opacity: 0.7 },
                  ]}>
                  <Image tintColor={"#B3B3B3"} source={ArrowIcon} resizeMode='contain' style={[
                    styles.profile__main_content_accordion_arrow_icon,
                    { transform: [{ rotate: openInfoAccordion ? "90deg" : "-90deg" }] }
                  ]} />
                </Pressable>
              </Pressable>
              {openInfoAccordion && <View style={[styles.accordion__info_container]}>
                <View style={[styles.accordion__info_field_container]}>
                  <Image source={PersonIcon} style={[styles.accordion__info_field_icon]} resizeMode='contain' />
                  <View style={[styles.accordion__info_field_input_container]}>
                    <TextInput
                      editable={false}
                      style={[styles.accordion__info_field_input]}
                      placeholder='Анастасія Лужко'
                    />
                  </View>
                </View>
                <View style={[styles.accordion__info_field_container]}>
                  <Image source={EnvelopeIcon} style={[styles.accordion__info_field_icon]} resizeMode='contain' />
                  <View style={[styles.accordion__info_field_input_container]}>
                    <TextInput
                      editable={false}

                      style={[styles.accordion__info_field_input]}
                      placeholder='anastitest@gmail.com'
                    />
                  </View>
                </View>
                <View style={[styles.accordion__info_field_container]}>
                  <Image source={PaperPlaneIcon} style={[styles.accordion__info_field_icon]} resizeMode='contain' />
                  <View style={[styles.accordion__info_field_input_container]}>
                    <TextInput
                      editable={false}
                      style={[styles.accordion__info_field_input]}
                      placeholder='@ananasik'
                    />
                    <Pressable
                      style={({ pressed }) => [
                        styles.accordion__edit_icon_container,
                        pressed && { opacity: 0.7 }
                      ]}>
                      <Image
                        source={EditIcon}
                        resizeMode='contain'
                        style={[styles.accordion__edit_icon]} />
                    </Pressable>
                  </View>
                </View>
              </View>}
            </View>
            <View style={[styles.profile__main_content_accordion_container,
            ]
            }>
              <Pressable
                onPress={handleOpenCertificatsAccordion}
                style={[styles.profile__main_content_accordion_btn,]}>
                <View style={[styles.profile__main_content_accordion_left_container]}>
                  <Image source={InfoIcon} resizeMode='contain' style={[styles.profile__main_content_accordion_left_icon]} />
                  <Text style={[styles.profile__main_content_accordion_left_text]}>Як поділитися курсом ?</Text>
                </View>
                <Pressable
                  onPress={handleOpenCertificatsAccordion}
                  style={({ pressed }) => [
                    styles.profile__main_content_accordion_arrow_icon_container,
                    pressed && { opacity: 0.7 },
                  ]}>
                  <Image tintColor={"#B3B3B3"} source={ArrowIcon} resizeMode='contain' style={[
                    styles.profile__main_content_accordion_arrow_icon,
                    { transform: [{ rotate: openCertificatsAccordion ? "90deg" : "-90deg" }] }
                  ]} />
                </Pressable>
              </Pressable>
              {openCertificatsAccordion && <View style={[styles.accordion__info_container]}>
                <View style={[styles.accordion__info_field_container]}>
                  <Text style={[styles.accordion__certificats_field_text]}>А хуй знает...</Text>
                </View>
              </View>}
            </View>
            <Pressable
              onPress={redirectToTelegram}
              style={({ pressed }) => [
                styles.profile__main_content_help_button, { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: 1, borderBottomColor: "#F7F7F7" },
                pressed && { opacity: 0.7 }
              ]}>
              <Image style={[styles.profile__main_content_help_button_icon]} source={PlaneIcon} resizeMode='contain' tintColor={"#094174"} />
              <Text style={[styles.profile__main_content_help_button_text]}>Тех. підтримка</Text>
            </Pressable>
          </View>
          <View style={[styles.profile__main_content_help_buttons_container]}>
            <Pressable
              onPress={() => handleLogout()}
              style={({ pressed }) => [
                styles.profile__main_content_help_button, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                pressed && { opacity: 0.7 }
              ]}>
              <Image style={[styles.profile__main_content_help_button_icon]} source={LogoutIcon} resizeMode='contain' tintColor={"#B3B3B3"} />
              <Text style={[styles.profile__main_content_help_button_text, { color: "#B3B3B3" }]}>Вийти</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

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
  profile__main_content_wrapper: {
    marginTop: -30,
    paddingBottom: 110,
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
    gap: 20,
  },
  profile__main_content_accordions_container: {
    boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
    backgroundColor: "transparent",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  profile__main_content_accordion_container: {
    overflow: "hidden",
  },
  profile__main_content_accordion_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: Colors.white
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
  },
  accordion__info_field_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    gap: 24,
  },
  accordion__info_container: {
    overflow: "hidden",
  },
  accordion__info_field_icon: {
    width: 20,
    height: 20,
  },
  accordion__info_field_input_container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    flex: 1,
  },
  accordion__info_field_input: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 12,
    color: "#0A0A0A",
    fontFamily: "MontserratMedium",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#B3B3B3",
    outlineStyle: "none",
    flex: 1,
  },
  accordion__edit_icon_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  accordion__edit_icon: {
    width: 25,
    height: 25,
  },
  accordion__cart_icon: {
    width: 20,
    height: 20,
  },
  accordion__info_field_forgot_password_btn_text: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    color: "#0A0A0A"
  },
  accordion__certificats_field_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#B3B3B3",
  },
  profile__main_content_help_buttons_container: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.white,
    boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
  },
  profile__main_content_help_button: {
    paddingHorizontal: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profile__main_content_help_button_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#0A0A0A"
  },
  profile__main_content_help_button_icon: {
    width: 20,
    height: 20,
  }
})