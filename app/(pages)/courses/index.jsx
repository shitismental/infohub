{/* Imports */ }
import { Pressable, StyleSheet, Text, View, Image, ScrollView, Modal, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useState } from 'react'

{/* Components */ }

import CourseCard from '../../../components/CourseCard'

{/* Images */ }

import CoursesInfoCardImg from "../../../assets/imgs/courses_info_card_img.png"

{/* Icons */ }

import BellIcon from "../../../assets/icons/bell_icon.png"
import BlurCircle from "../../../assets/icons/BlurCircle.png"
import ArrowBackIcon from "../../../assets/icons/arrow_left_icon.png"
import PlusIcom from "../../../assets/icons/plus_icon.png"
import CartIcon from "../../../assets/icons/cart_icon.png"
import RobotIcom from "../../../assets/icons/robot_icon.png"

import { coursesData } from "../../../constants/coursesData"

{/* Constants */ }

import { Colors } from "../../../constants/Colors"

{/* Code */ }

const Courses = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const handleGoBack = () => {
    router.replace("/");
  };

  const courseCodes = [
    {
      name: "Test Code"
    },
    {
      name: "Fake Code"
    },
  ]

  const handleCheckCode = () => {
    const validCodes = courseCodes.map(c => c.name);

    if (validCodes.includes(enteredCode)) {
      setModalTitle("Код активован");
      setModalDescription("Вам відкрит доступ до всіх курсів\nКуратор з вами 24/7")
    } else {
      setModalTitle("Невірний код");
      setModalDescription("Ви ввели неправильний код, перевірте його і спробуйте ще раз.")
    }

    setIsModalVisible(true);
    setEnteredCode("");
  };

  return (
    <View style={[styles.container]}>

      {/* Header */}
      <View style={[styles.header__container, styles.paddingWrapper]}>
        <Image
          tintColor={Colors.white}
          style={styles.topBlurCircle}
          source={BlurCircle}
          resizeMode='contain'
        />
        <View style={[styles.header__content]}>
          <View style={[styles.header__top_content]}>
            <Pressable onPress={handleGoBack} style={({ pressed }) => [
              pressed && { opacity: 0.7 }
            ]}>
              <Image
                style={[styles.header__arrow_back_img]}
                source={ArrowBackIcon}
                resizeMode='contain'
              />
            </Pressable>
            <Text style={[styles.header__title_text]}>
              Наші курси
            </Text>
            <Pressable style={({ pressed }) => [
              { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.1)" },
              styles.header__btn_container,
              pressed && { opacity: 0.7 }
            ]}>
              <Image
                style={[styles.header__btn_icon]}
                source={BellIcon}
                resizeMode='contain'
              />
            </Pressable>
          </View>
          <View style={[styles.header__bottom_content]}>
            <TextInput
              style={[styles.header__input]}
              placeholder='Є код доступу?'
              placeholderTextColor={Colors.white}
              value={enteredCode}
              onChangeText={(text) => setEnteredCode(text)}
              autoFocus={false}
            />
            <Pressable onPress={handleCheckCode} style={({ pressed }) => [
              styles.header__btn_container,
              pressed && { opacity: 0.7 }
            ]}>
              <Image
                style={[styles.header__btn_icon]}
                source={PlusIcom}
                resizeMode='contain'
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Courses */}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.paddingWrapper, styles.courses__container]}
        contentContainerStyle={{ paddingBottom: 120, gap: 30 }}
      >
        <View style={[styles.courses__info_card_container]}>
          <View style={[styles.courses_info_card_content_container]}>
            <View style={[styles.courses_info_card_text_container]}>
              <Text style={[styles.course_info_card_text]}>{"Всі курси разом\nза ціною"} <Text style={{ fontFamily: "MontserratBold" }}>1900₴</Text></Text>
            </View>
            <View style={[styles.courses_info_card_btns_container]}>
              <Pressable style={({ pressed }) => [
                styles.courses_info_card_btn_container,
                pressed && { opacity: 0.7 }
              ]}>
                <Text style={[styles.courses_info_card_btn_text]}>Купити зараз</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [
                styles.courses_info_card_cart_btn_container,
                pressed && { opacity: 0.7 }
              ]}>
                <Image
                  tintColor={"#094174"}
                  style={[styles.courses_info_card_btn_img]}
                  source={CartIcon}
                  resizeMode='contain'
                />
              </Pressable>
            </View>
          </View>
          <View style={[styles.courses__image_container]}>
            <View style={[styles.courses__image_circle_big]}></View>
            <View style={[styles.courses__image_circle_small]}></View>
            <Image
              source={CoursesInfoCardImg}
              style={[styles.courses_info_card_img]}
              resizeMode='contain'
            />
          </View>
        </View>
        {coursesData.map((item, index) => (
          <View key={index}>
            <CourseCard course={item} />
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType='fade'
        transparent={true}
      >
        <View style={[styles.paddingWrapper, styles.modal__container]}>
          <View style={[styles.modal__content_container]}>
            <View style={[styles.modal__top_icon_container]}>
              <Image
                style={[styles.modal_top_icon]}
                source={RobotIcom}
                resizeMode='contain'
              />
            </View>
            <View style={[styles.modal__text_container]}>
              <Text style={[styles.modal__text_title]}>{modalTitle}</Text>
              <Text style={[styles.modal__text_desc]}>{modalDescription}</Text>
            </View>
            <Pressable onPress={() => setIsModalVisible(false)} style={[styles.modal__close_btn]}>
              <Text style={[styles.modal__close_btn_text]}>Закрити</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Courses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#094174",
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  header__container: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  header__content: {
    gap: 30,
    paddingVertical: 20,
  },
  header__top_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__arrow_back_img: {
    width: 30,
    height: 30,
  },
  header__title_text: {
    color: Colors.white,
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
  },
  header__btn_container: {
    padding: 10,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  topBlurCircle: {
    pointerEvents: "none",
    width: 500,
    height: 500,
    position: "absolute",
    left: "50%",
    transform: [
      { translateX: -250 }, { translateY: -300 }
    ],
    opacity: 0.1,
  },
  header__bottom_content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header__input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#31699C",
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: "#1D5588",
    borderRadius: 41,
    color: Colors.white,
    fontFamily: "MontserratMedium",
    fontSize: 16,
    boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
    outlineStyle: "none",
  },
  header__btn_icon: {
    width: 25,
    height: 25,
  },
  courses__container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  courses__info_card_container: {
    flexDirection: "row",
    overflow: "hidden",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#49769F",
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
  },
  courses_info_card_content_container: {
    gap: 15,
  },
  course_info_card_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
    color: Colors.white,
  },
  courses_info_card_btns_container: {
    flexDirection: "row",
    gap: 5,
  },
  courses_info_card_btn_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  courses_info_card_cart_btn_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 25,
  },
  courses_info_card_btn_text: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontFamily: "MontserratMedium"
  },
  courses_info_card_btn_img: {
    width: 25,
    height: 25,
  },
  courses__image_container: {
    flex: 1,
    position: "relative",
  },
  courses_info_card_img: {
    width: 135,
    height: 135,
    position: "absolute",
    top: "50%",
    right: -20,
    transform: [
      { translateY: -69 },
    ]
  },
  courses__image_circle_big: {
    width: 210,
    height: 210,
    borderRadius: 999,
    backgroundColor: "#5D8AB3",
    position: "absolute",
    top: "50%",
    right: -95,
    transform: [
      { translateY: -105 }
    ]
  },
  courses__image_circle_small: {
    width: 150,
    height: 150,
    backgroundColor: "#719EC7",
    borderRadius: 999,
    position: "absolute",
    top: "50%",
    right: -55,
    transform: [
      { translateY: -75 }
    ]
  },
  modal__container: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    flex: 1,
    justifyContent: "center",
  },
  modal__content_container: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: "#F1F1F1",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 16,
  },
  modal__top_icon_container: {
    borderRadius: 92,
    backgroundColor: Colors.white,
    boxShadow: "0 4px 5px rgba(0,0,0,0.1)",
    padding: 5,
  },
  modal_top_icon: {
    width: 45,
    height: 45,
  },
  modal__text_container: {
    alignItems: "cemter",
    justifyContent: "center",
    gap: 6,
  },
  modal__text_title: {
    color: "#000",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  modal__text_desc: {
    color: "#717171",
    fontFamily: "MontserratMedium",
    fontSize: 13,
    textAlign: "center",
  },
  modal__close_btn: {
    backgroundColor: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 25,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  modal__close_btn_text: {
    color: Colors.textSecondary,
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
})