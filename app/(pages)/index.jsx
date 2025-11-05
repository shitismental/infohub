import { Pressable, StyleSheet, Text, View, Image, Animated, ScrollView, Linking } from 'react-native'
import { useRef, useState, useEffect, useMemo } from 'react'

import CourseCard from '../../components/CourseCard'

import BellIcon from "../../assets/icons/question_mark_icon.png"
import BlurCircle from "../../assets/icons/BlurCircle.png"
import StartEarningImg from "../../assets/imgs/start_earning_img.png"

import TrophyIcon from "../../assets/icons/trophy_icon.png"

import { Colors } from "../../constants/Colors"

import { useGetCourses } from '../../hooks/getCourses'

import { getUser } from '../../services/auth'

import { TopEarners } from '../../constants/TopEarners'
import TopEarnCard from '../../components/TopEarnCard'

const CARD_WIDTH = 305;
const CARD_SPACING = 16;

const Home = () => {

  const scrollX = useRef(new Animated.Value(0)).current;

  const redirectToTelegram = () => {
    Linking.openURL(`https://t.me//Yehor_liora`);
  }

  const [user, setUser] = useState(null);

  const { courses } = useGetCourses();

  const userCourses = user?.courses || [];

  const sortedCourses = useMemo(() => {
    if (!courses || !Array.isArray(courses) || !user) {
      return [];
    }

    const boughtIds = new Set(userCourses.map((uc) => uc.id));

    return [...courses].sort((a, b) => {
      const aBought = boughtIds.has(a.id);
      const bBought = boughtIds.has(b.id);

      if (aBought && !bBought) return -1;
      if (!aBought && bBought) return 1;
      return a.id - b.id;
    });
  }, [courses, user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getUser();
        setUser(me);
      } catch (err) {
      }
    };

    fetchUser();
  }, [])

  const username = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    } else if (user?.username) {
      return user.username
    } else {
      return "???"
    }
  }
  
  const currMonth = new Date().toLocaleString('uk-UA', { month: 'long' });

  return (
    <ScrollView style={[styles.container, { paddingBottom: 110 }]}>
      {/* Header */}
      <View style={[styles.header__top_container, styles.paddingWrapper]}>
        <Image
          tintColor={Colors.white}
          style={styles.topBlurCircle}
          source={BlurCircle}
          resizeMode='contain'
        />
        <View style={[styles.header__top_content]}>
          <View style={[styles.header__title_container]}>
            <Text style={[styles.header__title_text]}>Привіт! 👋</Text>
            <Text style={[styles.header__name_text]}>{username()}</Text>
          </View>
          <View style={[styles.header__btns_container]}>
            <Pressable
              onPress={redirectToTelegram}
              style={({ pressed }) => [
                { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.1)" },
                styles.header__btn_container,
                pressed && { opacity: 0.7 }
              ]}>
              <Image
                style={[styles.header__btn_image]}
                source={BellIcon}
                resizeMode='contain'
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Start earning block */}
      <View style={[styles.paddingWrapper]}>
        <View style={styles.start__earning_container}>
          <View style={styles.blurWrapper}>
            <Image
              style={[styles.start__earning_blur, styles.start__earning_blur_left]}
              source={BlurCircle}
              tintColor={"#00ccffff"}
              resizeMode='contain'
            />
            <Image
              style={[styles.start__earning_blur, styles.start__earning_blur_right]}
              source={BlurCircle}
              tintColor={"#00ccffff"}
              resizeMode='contain'
            />
          </View>
          <View style={styles.start__earning_content}>
            <Text style={styles.start__earning_text}>
              Почни <Text style={{ fontFamily: "MontserratBold" }}>{"заробляти\n"}</Text>з телефону ЗАРАЗ!
            </Text>
            <Pressable
              onPress={() => {
                Linking.openURL("https://t.me/+iSzACcR5xxtiOTg8")
              }}
              style={({ pressed }) => [
                styles.start__earning_btn,
                pressed && { opacity: 0.7 }
              ]}>
              <Text style={[styles.start__earning_btn_text]}>Почати</Text>
            </Pressable>
          </View>

          <Image
            style={styles.start__earning_img}
            source={StartEarningImg}
            resizeMode='contain'
          />
        </View>
      </View>

      {/* Courses */}
      <View style={[styles.paddingWrapper]}>
        <View style={[styles.our__courses_container]}>
          <View style={[styles.our__courses_title_container]}>
            <Text style={[styles.our__courses_title_text]}>Наші курси</Text>
            <Text style={[styles.our__courses_infohub_text]}>
              LIORA
            </Text>
          </View>

          {/* Carousel */}
          <Animated.FlatList
            data={sortedCourses}
            style={{ paddingVertical: 15, }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: CARD_WIDTH }}>
                <CourseCard courseId={item.id} />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            bounces={false}
            alwaysBounceHorizontal={false}
            overScrollMode="never"
            pagingEnabled={true}
            ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />

          {/* Dots */}
          <View style={styles.dotsContainer}>
            {courses?.map((_, i) => {
              const inputRange = [
                (i - 1) * (CARD_WIDTH + CARD_SPACING),
                i * (CARD_WIDTH + CARD_SPACING),
                (i + 1) * (CARD_WIDTH + CARD_SPACING),
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });

              const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: ["#B0B0B0", "#0057D9", "#B0B0B0"],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      opacity,
                      backgroundColor,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>

      <View style={[styles.paddingWrapper]}>
        <View style={[styles.top__earn_container]}>
          <View style={[styles.top__earn_top_info]}>
            <View style={[styles.top__earn_top_info_left]}>
              <Image resizeMode='contain' source={TrophyIcon} style={[styles.top__earn_top_info_img]} />
              <Text style={[styles.top__earn_top_info_text]}>ТОП 3 заробітку</Text>
            </View>
            <Text style={[styles.top__earn_top_info_month]}>
              {currMonth}
            </Text>
          </View>
          <View style={[styles.top__earners_display]}>
            {TopEarners.map((earner, _) => {
              return (
                <TopEarnCard key={earner.id} id={earner.id} img={earner.img} name={earner.name} cashAmnt={earner.cashAmnt} />
              )
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  header__top_container: {
    height: 166,
    backgroundColor: "#094174",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    gap: 45,
  },
  header__top_content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  header__title_text: {
    color: Colors.white,
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
  },
  header__name_text: {
    fontFamily: "MontserratMedium",
    color: Colors.white,
    fontSize: 15,
  },
  header__btns_container: {
    flexDirection: "row",
    gap: 15,
  },
  header__btn_container: {
    padding: 10,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  header__btn_image: {
    width: 25,
    height: 25,
  },
  topBlurCircle: {
    width: 500,
    height: 500,
    position: "absolute",
    left: "50%",
    transform: [
      { translateX: -250 }, { translateY: -300 }
    ],
    opacity: 0.1,
  },
  start__earning_container: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: -70,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)"
  },
  blurWrapper: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    overflow: "hidden",
  },
  start__earning_blur: {
    width: 230,
    height: 230,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -115 }],
    opacity: 0.15,
  },
  start__earning_blur_left: {
    left: -125
  },
  start__earning_blur_right: {
    right: -125
  },
  start__earning_content: {
    flex: 1,
    maxWidth: "52%",
    alignItems: "flex-start",
    gap: 8,
  },
  start__earning_text: {
    fontSize: 17,
    fontFamily: "MontserratMedium",
    whiteSpace: "pre",
    color: Colors.textSecondary,
  },
  start__earning_btn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: Colors.btnsPrimary,
  },
  start__earning_btn_text: {
    fontFamily: "MontserratMedium",
    fontSize: 15,
    color: Colors.white,
  },
  start__earning_img: {
    width: "35%",
    maxWidth: 170,
    aspectRatio: 170 / 150,
    height: "auto",

    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    zIndex: 2,
  },
  courses__completed_container: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  courses__completed_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
  },
  courses__completed_amnt_text: {
    fontFamily: "MontserratBold",
    fontSize: 15,
  },
  our__courses_container: {
    marginTop: 30,
    marginBottom: 24,
  },
  our__courses_title_container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  our__courses_title_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  our__courses_infohub_text: {
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
  },
  top__earn_container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  top__earn_top_info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  top__earn_top_info_img: {
    width: 20,
    height: 20,
  },
  top__earn_top_info_left: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  top__earn_top_info_text: {
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
    color: "#0A0A0A",
  },
  top__earn_top_info_month: {
    fontSize: 11,
    fontFamily: "MontserratMedium",
    color: "#000000",
    textTransform: "capitalize"
  },
  top__earners_display: {
    borderRadius: 10,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: Colors.white,
  }
})