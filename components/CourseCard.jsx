import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

import ShareIcon from "../assets/icons/share_icon.png"
import RoundedCartIcon from "../assets/icons/rounded_cart_icon.png"

import { Colors } from "../constants/Colors"
import { getCourse } from '../hooks/getCourse'
import { getMediaUrl } from '../utils/media'

import { getUser } from '../services/auth'

const CourseCard = ({ courseId }) => {

  const { course } = getCourse(courseId);

  const { id, title, subtitle, preview_url } = course

  const [user, setUser] = useState(null);

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

  const isBought = userCourses?.some((c) => c.id === id);

  return (
    <>
      <Pressable
        onPress={() => {
          router.replace(`/courses/${id}`);
        }}
        style={styles.card__container}>
        <View style={[styles.card__content_container]}>
          <View style={[styles.card__content_hero_container]}>
            <Image
              style={[styles.card__hero_img]}
              source={{ uri: preview_url ? getMediaUrl(preview_url) : "https://placehold.co/60x60" }} resizeMode='contain' />
            <View style={[styles.card__content_hero_text_container]}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.card__content_hero_text]}>
                {title}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.card__content_hero_text]}>
                {subtitle}
              </Text>
            </View>
          </View>
        </View>
        {!isBought &&
          <View style={[
            styles.card__top_info_container,
            { backgroundColor: "#002D61" }
          ]}>
            <Text style={[styles.card__top_info_text]}>Заблоковано</Text>
          </View>
        }
        <View style={[styles.big__circle]}></View>
        <View style={[styles.small__circle]}></View>
      </Pressable>
      <View style={[styles.paddingWrapper]}>
        <Pressable
          onPress={() => {
            router.replace({
              pathname: `/chatbot`,
              params: { courseId: id, action: "buy" },
            });
          }}
          style={({ pressed }) => [
            styles.card__bottom_btn_container,
            pressed && { opacity: 0.7 }
          ]}>
          <Text style={[styles.card__bottom_btn_text]}>{isBought ? "Поширити доступ?" : "Купити зараз"}</Text>
          <Pressable
            onPress={() => {
              router.replace({
                pathname: `/chatbot`,
                params: { courseId: id, action: "buy" },
              });
            }}
            style={({ pressed }) => [
              pressed && { opacity: 0.7 }
            ]}>
            <Image
              tintColor={"#000"}
              style={[styles.card__bottom_btn_icon]}
              source={isBought ? ShareIcon : RoundedCartIcon}
              resizeMode='contain'
            />
          </Pressable>

        </Pressable>
      </View>
    </>
  )
}

export default CourseCard

const styles = StyleSheet.create({
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  card__container: {
    height: 110,
    borderRadius: 10,
    backgroundColor: "#094175",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)"
  },
  card__content_container: {
    gap: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
    height: "100%",
  },
  card__content_hero_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card__hero_img: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  card__content_hero_text_container: {
    flex: 1,
    justifyContent: "center",
  },
  card__content_hero_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
    color: Colors.white,
  },
  card__content_footer_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  card__content_footer_btns_container: {
    flexDirection: "row",
    gap: 15,
    alignSelf: "flex-start"
  },
  card__content_footer_buy_btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(255,255,255,0.5)",
  },
  card__content_footer_buy_btn_img: {
    width: 23,
    height: 23,
  },
  card__content_footer_btn_text: {
    color: Colors.white,
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  card__content_footer_info_btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(255,255,255,0.5)",
  },
  card__info_isnew_container: {
    position: "absolute",
    alignItems: "cemter",
    justifyContent: "center",
    top: 0,
    right: 0,
    backgroundColor: "#2666EC",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  card__info_isnew_text: {
    fontSize: 11,
    fontFamily: "MontserratMedium",
    color: Colors.white,
  },
  card__content_footer_text: {
    color: Colors.white,
    fontFamily: "MontserratBold",
    fontSize: 15,
  },
  card__info_discount_container: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    right: 0,
    backgroundColor: "#F09D00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    gap: 5,
  },
  card__info_discount_image: {
    width: 15,
    height: 15,
  },
  card__info_discount_text: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: "MontserratBold",
    fontSize: 11,
  },
  card__bottom_btn_container: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.white
  },
  card__bottom_btn_text: {
    color: Colors.textPrimary,
    fontFamily: "MontserratMedium",
  },
  card__bottom_btn_icon: {
    width: 20,
    height: 20,
  },
  card__top_info_container: {
    position: "absolute",
    right: 0,
    top: 0,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#2B6BF1"
  },
  card__top_info_text: {
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
  card__hero_img_container: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#000058",
    alignItems: "center",
    justifyContent: "center",
  },
  big__circle: {
    position: "absolute",
    left: -83,
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: 1000,
    height: 195,
    width: 195,
    backgroundColor: "#275F93",
    zIndex: -2
  },
  small__circle: {
    position: "absolute",
    left: -60,
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: 1000,
    height: 147,
    width: 147,
    backgroundColor: "#3B73A7",
    zIndex: -2
  }
})