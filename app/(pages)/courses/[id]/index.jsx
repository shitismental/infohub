import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking } from "react-native";
import { useLocalSearchParams, router, } from "expo-router";
import { useRef, useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import BlurCircle from "../../../../assets/icons/BlurCircle.png"
import ArrowLeftIcon from "../../../../assets/icons/arrow_left_icon.png"
import BellIcon from "../../../../assets/icons/question_mark_icon.png"
import CartIcon from "../../../../assets/icons/rounded_cart_icon.png"
import HatIcon from "../../../../assets/icons/hat_icon.png"

import { Colors } from "../../../../constants/Colors";

import CourseProgressCard from "../../../../components/CourseProgressCard";
import { getCourse } from "../../../../hooks/getCourse";
import { getUser } from "../../../../services/auth";
import { getMediaUrl } from "../../../../utils/media";

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const courseId = Number(id);

  const [user, setUser] = useState(null);

  const { course } = getCourse(courseId);
  const lessons = course?.lessons || []

  const { title, description, price, discount_price, preview_url, preview_video } = course

  console.log(course)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getUser();
        setUser(me)
      } catch (err) {
      }
    };

    fetchUser();
  }, [])

  const userCourses = user?.courses
  const isUnlocked = !!(userCourses?.some((c) => c.id === course.id))

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

  const redirectToTelegram = () => {
    Linking.openURL(`https://t.me//Yehor_liora`);
  }

  const actual_price = price || "???"

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
            onPress={redirectToTelegram}
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
              <Image style={[styles.course__info_card_img]} source={preview_url} resizeMode="contain" />
            </View>
            <View style={[styles.course__info_card_text]}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.course__info_card_title]}>
                {title}
              </Text>
              <Text style={[styles.course__info_card_price]}>
                {isUnlocked ? "Придбано" : `Ціна: ${actual_price}₴`}
              </Text>
            </View>
          </View>
          <Pressable
            disabled={isUnlocked}
            onPress={() => {
              router.replace({
                pathname: `/chatbot`,
                params: { courseId: course.id, action: "buy" },
              });
            }}
            style={({ pressed }) => [
              styles.course__buy_btn,
              pressed && { opacity: 0.7 }
            ]}>
            <Image style={[styles.course__cart_icon]} source={isUnlocked ? HatIcon : CartIcon} resizeMode="contain" />
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
          {preview_video && <video
            ref={videoRef}
            width="100%"
            height="100%"
            controls
            playsInline
            style={{ objectFit: "cover" }}
          >
            <source src={getMediaUrl(preview_video) + "#t=0.001"} type="video/mp4" />
          </video>}
        </View>
        <View style={[styles.course__info_description_container]}>
          <Text style={[styles.course__info_description_title]}>Опис курсу</Text>
          <Text style={[styles.course__info_description_desc_text]}>
            {description || "В процесі..."}
          </Text>
        </View>
        <View style={{ gap: 10, }}>
          {lessons.map(lesson => {
            return (
              <CourseProgressCard
                key={lesson.id}
                lessonId={lesson.id}
                courseId={course.id}
                onPress={() => router.push(`/courses/${courseId}/${encodeURIComponent(lesson.id)}`)}
              />
            )
          })}
        </View>
      </ScrollView>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  header__container: {
    backgroundColor: "#094174",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 130,
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
    marginTop: -40,
  },
  course__info_card_container: {
    flexDirection: "row",
    gap: 12,
  },
  course__info_card: {
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  course__info_card_img_container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden"
  },
  course__info_card_img: {
    width: 44,
    height: 44,
  },
  course__info_card_text: {
    justifyContent: "center",
    gap: 2,
    flex: 1,
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