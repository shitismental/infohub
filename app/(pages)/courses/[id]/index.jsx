import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { useLocalSearchParams, router, } from "expo-router";
import { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import BlurCircle from "../../../../assets/icons/BlurCircle.png"
import ArrowLeftIcon from "../../../../assets/icons/arrow_left_icon.png"
import BellIcon from "../../../../assets/icons/bell_icon.png"
import CartIcon from "../../../../assets/icons/rounded_cart_icon.png"

import TestCardImg from "../../../../assets/imgs/card_img_2.png"

import { Colors } from "../../../../constants/Colors";

import CourseProgressCard from "../../../../components/CourseProgressCard";
import { coursesData, homeDisplayCourses } from "../../../../constants/coursesData";

import BellModal from "../../../../components/BellModal"

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const courseId = Number(id);

  const [isBellModalVisible, setBellModalVisible] = useState(false);

  const handleOpenBellModal = () => {
    setBellModalVisible(true);
  }

  const handleCloseBellModal = () => {
    setBellModalVisible(false);
  }

  const allCourses = [...coursesData, ...homeDisplayCourses];
  const course = allCourses.find(c => c.id === courseId);

  const { name, description, price, stages } = course.mainCourseInfo || course

  const handleGoBack = () => {
    router.replace("/courses");
  };

  const videoRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };
    }, [])
  );

  return (
    <View style={[styles.container]}>
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
            style={({ pressed }) => [
              pressed && { opacity: 0.7 }
            ]}>
            <Image
              style={[styles.header__left_arrow_icon]}
              source={ArrowLeftIcon}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={[styles.header__content_title]}>Сторінка курсу</Text>
          <Pressable 
          onPress={handleOpenBellModal}
          style={({ pressed }) => [
            { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.2)", borderWidth: 1 },
            styles.header__bell_icon_btn,
            pressed && { opacity: 0.7 }
          ]}>
            <Image
              style={[styles.header__bell_icon]}
              source={BellIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
      <View style={[styles.paddingWrapper, styles.course__info_container]}>
        <View style={[styles.course__info_card_container]}>
          <View style={[styles.course__info_card]}>
            <View style={[styles.course__info_card_img_container]}>
              <Image style={[styles.course__info_card_img]} source={TestCardImg} resizeMode="contain" />
            </View>
            <View style={[styles.course__info_card_text]}>
              <Text style={[styles.course__info_card_title]}>
                {name}
              </Text>
              <Text style={[styles.course__info_card_price]}>
                Ціна: {price}₴
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              console.log(course.price)
            }}
            style={({ pressed }) => [
              styles.course__buy_btn,
              pressed && { opacity: 0.7 }
            ]}>
            <Image style={[styles.course__cart_icon]} source={CartIcon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={[styles.paddingWrapper, styles.course__content_container]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, gap: 20 }}
      >
        <View style={styles.course__video_container}>
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            controls
            playsInline
            poster="/video_preview_img_1.jpg"
            style={{ objectFit: "cover" }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </View>
        <View style={[styles.course__info_description_container]}>
          <Text style={[styles.course__info_description_title]}>Опис курсу</Text>
          <Text style={[styles.course__info_description_desc_text]}>
            {description}
          </Text>
        </View>
        <View style={{ gap: 10, }}>
          {stages.map(item => {
            return (
              <CourseProgressCard
                key={item.id}
                stage={item}
                onPress={() => router.push(`/courses/${courseId}/${encodeURIComponent(item.name)}`)}
              />
            )
          })}
        </View>
      </ScrollView>

      {/* Bell Modal */}
      <BellModal isBellModalOpen={isBellModalVisible} handleCloseBellModal={handleCloseBellModal} />

    </View >
  );
}

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
    height: 156,
    paddingVertical: 20,
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
  header__content_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  header__left_arrow_icon: {
    height: 30,
    width: 30,
  },
  header__content_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: Colors.white
  },
  header__bell_icon_btn: {
    padding: 10,
    borderRadius: 31,
  },
  header__bell_icon: {
    width: 25,
    height: 25,
  },
  course__info_container: {
    marginTop: -45,
  },
  course__info_card_container: {
    flexDirection: "row",
    gap: 12,
  },
  course__info_card: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  course__info_card_img_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#094174",
    borderRadius: 10,
    padding: 5,
  },
  course__info_card_img: {
    width: 40,
    height: 40,
  },
  course__info_card_text: {
    justifyContent: "center",
    gap: 2,
  },
  course__info_card_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    color: "#0A0A0A",
  },
  course__info_card_price: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171"
  },
  course__buy_btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    padding: 12,
    borderRadius: 10,
  },
  course__cart_icon: {
    width: 20,
    height: 20,
  },
  course__content_container: {
    marginTop: 20,
  },
  course__video_container: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  course__info_description_container: {
    gap: 16,
  },
  course__info_description_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    color: "#0A0A0A"
  },
  course__info_description_desc_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171"
  }
});