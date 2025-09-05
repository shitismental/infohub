import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { BlurView } from 'expo-blur'
import { router, useRouter } from 'expo-router'

import CartIcon from "../assets/icons/cart_icon.png"
import DiscountIcon from "../assets/icons/discount_icon.png"
import ArrowRight from "../assets/icons/arrow_right_icon.png"
import ShareIcon from "../assets/icons/share_icon.png"
import ViewIcon from "../assets/icons/view_icon.png"

import { Colors } from "../constants/Colors"

const CourseCard = ({ course }) => {

  const { bgImg, isNew, hasDiscount, discountAmount, heroImg, heroTextTop, heroTextBottom, isBought, hasInfoBtn, isAvailable, hasBottomBtn } = course.courseCardInfo

  const { price } = course.mainCourseInfo

  return (
    <>
      <Pressable
        onPress={() => {
          router.replace(`/courses/${course.id}`);
        }}
        style={styles.card__container}>
        <Image source={bgImg} style={[styles.bgImage, StyleSheet.absoluteFillObject]} />
        {
          isNew ?
            <View style={[styles.card__info_isnew_container]}>
              <Text style={[styles.card__info_isnew_text]}>
                Новинка
              </Text>
            </View>
            :
            hasDiscount &&
            <View style={[styles.card__info_discount_container]}>
              <Image
                style={[styles.card__info_discount_image]}
                source={DiscountIcon}
                resizeMode='contain'
              />
              <Text style={[styles.card__info_discount_text]}>
                -{discountAmount}%
              </Text>
            </View>
        }
        <View style={[styles.card__content_container]}>
          <View style={[styles.card__content_hero_container]}>
            <Image style={[styles.card__hero_img]} source={heroImg} />
            <View style={[styles.card__content_hero_text_container]}>
              <Text style={[styles.card__content_hero_text]}>
                {heroTextTop}
              </Text>
              <Text style={[styles.card__content_hero_text]}>
                {heroTextBottom}
              </Text>
            </View>
          </View>
          <View style={[styles.card__content_footer_container]}>
            <View style={[styles.card__content_footer_btns_container]}>
              <Pressable
                onPress={() => {
                  router.replace(`/courses/${course.id}`)
                }}
                style={({ pressed }) => [
                  styles.card__content_footer_buy_btn,
                  pressed && { opacity: 0.7 }
                ]}>
                <Image
                  style={[styles.card__content_footer_buy_btn_img]}
                  source={isBought ? ViewIcon : CartIcon}
                  resizeMode='contain'
                />
                <Text style={[styles.card__content_footer_btn_text]}>{isBought ? "Перегляд" : "Купити"}</Text>
              </Pressable>
              {hasInfoBtn &&
                <Pressable
                  onPress={() => router.replace(`/courses/${course.id}`)}
                  style={({ pressed }) => [
                    styles.card__content_footer_info_btn,
                    pressed && { opacity: 0.7 }
                  ]}>
                  <Text style={[styles.card__content_footer_btn_text]}>Інфо</Text>
                </Pressable>}
            </View>
            <Text style={[styles.card__content_footer_text]}>
              {!isAvailable ? "Недоступно" : !isBought ? `Ціна ${price}₴` : isBought && "Відкрито"}
            </Text>
          </View>
        </View>
      </Pressable>
      {hasBottomBtn &&
        <View style={[styles.paddingWrapper]}>
          <Pressable
            onPress={() => {
              if (!isBought) {
                router.replace(`/courses/${course.id}`);
              } else {
                console.log("Sharing course access…");
              }
            }}
            style={({ pressed }) => [
              styles.card__bottom_btn_container,
              pressed && { opacity: 0.7 }
            ]}>
            <Text style={[styles.card__bottom_btn_text]}>{isBought ? "Поширити доступ?" : "Читати опис"}</Text>
            <Pressable
              onPress={() => {
                if (!isBought) {
                  router.replace(`/courses/${course.id}`);
                } else {
                  console.log("Sharing course access…");
                }
              }}
              style={({ pressed }) => [
                pressed && { opacity: 0.7 }
              ]}>
              <Image
                tintColor={"#000"}
                style={[styles.card__bottom_btn_icon]}
                source={isBought ? ShareIcon : ArrowRight}
                resizeMode='contain'
              />
            </Pressable>
          </Pressable>
        </View>
      }
    </>
  )
}

export default CourseCard

const styles = StyleSheet.create({
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  card__container: {
    height: 170,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)"
  },
  bgImage: {
    height: "100%",
    width: "100%",
  },
  card__content_container: {
    gap: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    height: "100%",
  },
  card__content_hero_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card__hero_img: {
    height: 90,
    width: 90,
  },
  card__content_hero_text_container: {
    flex: 1,
    justifyContent: "center"
  },
  card__content_hero_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
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
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  card__bottom_btn_text: {
    color: Colors.textPrimary,
    fontFamily: "MontserratMedium",
  },
  card__bottom_btn_icon: {
    width: 20,
    height: 20,
  },
})