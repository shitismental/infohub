import { View, Text, StyleSheet, Pressable, Image, ScrollView, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { coursesData, homeDisplayCourses } from "../../../../constants/coursesData";
import CourseProgressCard from "../../../../components/CourseProgressCard";

import BlurCircle from "../../../../assets/icons/BlurCircle.png";
import ArrowLeftIcon from "../../../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../../../assets/icons/question_mark_icon.png";

import { Colors } from "../../../../constants/Colors";

import TaskTab from "../../../../components/TaskTab";

export default function StageDetails() {
  const [activeTab, setActiveTab] = useState("description");

  const { id, stage } = useLocalSearchParams();
  const courseId = Number(id);

  const allCourses = [...coursesData, ...homeDisplayCourses];
  const course = allCourses.find(c => c.id === courseId);

  const { stages } = course.mainCourseInfo || course;

  const currentStage = stages.find(
    s => s.name === decodeURIComponent(stage)
  );

  const { name, description, videoURL, videoPreviewImg } = currentStage || {};

  const currentIndex = stages.findIndex(
    s => s.name === decodeURIComponent(stage)
  );

  const currentTask = currentStage?.tasks?.[0] ?? null
  const taskDescription = currentTask?.description ?? null
  const taskLink = currentTask?.taskLink ?? null

  const remainingStages = stages.slice(currentIndex + 1);

  const handleGoBack = () => {
    router.push(`/courses/${courseId}`);
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
    Linking.openURL(`https://t.me/liora_innovation`);
  }

  return (
    <View style={[styles.container]}>
      {/* HEADER */}
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
          <Text style={[styles.header__content_title]}>Сторінка курсу</Text>
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
      </View>

      {/* TABS */}
      <View style={[styles.paddingWrapper]}>
        <View style={[styles.tabs__container]}>
          <Pressable
            onPress={() => setActiveTab("description")}
            style={[
              styles.tabs__tab_btn_container,
              activeTab === "description" && styles.tabs__tab_btn_active,
            ]}
          >
            <Text
              style={[
                styles.tabs__tab_text,
                activeTab === "description"
                  ? styles.tabs__tab_text_active
                  : styles.tabs__tab_text_inactive,
              ]}
            >
              Опис
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("tasks")}
            style={[
              styles.tabs__tab_btn_container,
              activeTab === "tasks" && styles.tabs__tab_btn_active,
            ]}
          >
            <Text
              style={[
                styles.tabs__tab_text,
                activeTab === "tasks"
                  ? styles.tabs__tab_text_active
                  : styles.tabs__tab_text_inactive,
              ]}
            >
              Завдання
            </Text>
          </Pressable>
        </View>
      </View>

      {activeTab === "description" ?
        <ScrollView
          style={[styles.paddingWrapper, styles.stage__content_container]}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110, gap: 20 }}
        >
          <View style={styles.stage__video_container}>
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              controls
              playsInline
              poster={videoPreviewImg}
              style={{ objectFit: "cover" }}
            >
              <source src={videoURL} type="video/mp4" />
            </video>
          </View>
          <View style={[styles.stage__info_description_container]}>
            <Text style={[styles.stage__info_description_title]}>{name}</Text>
            <Text style={[styles.stage__info_description_desc_text]}>
              {description}
            </Text>
          </View>
          <View style={{ gap: 10 }}>
            {remainingStages.map(item => (
              <CourseProgressCard
                key={item.id}
                stage={item}
                onPress={() =>
                  router.push(`/courses/${courseId}/${encodeURIComponent(item.name)}`)
                }
              />
            ))}
          </View>
        </ScrollView>
        :
        (activeTab === "tasks" && currentTask) ?
        <TaskTab stageIndex={currentIndex} taskDescription={taskDescription} taskLink={taskLink} />
        :
        <View style={[styles.empty__tasks_container]}>
          <Text style={[styles.empty__tasks_text]}>Завдань немає...</Text>
        </View>
      }
    </View>
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
    height: 126,
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
  tabs__container: {
    flexDirection: "row",
    gap: 5,
    padding: 5,
    borderRadius: 15,
    backgroundColor: Colors.white,
    boxShadow: "0 3px 5px rgba(0,0,0,0.05)",
    marginTop: -25,
  },
  tabs__tab_btn_container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabs__tab_btn_active: {
    backgroundColor: "#001E3A",
  },
  tabs__tab_text: {
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  tabs__tab_text_active: {
    color: Colors.white,
  },
  tabs__tab_text_inactive: {
    color: "#B3B3B3",
  },
  stage__content_container: {
    marginTop: 20,
  },
  stage__video_container: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  stage__info_description_container: {
    gap: 16,
  },
  stage__info_description_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    color: "#0A0A0A",
  },
  stage__info_description_desc_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171",
  },
  scripts__tab_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
    marginBottom: 110,
  },
  scripts__tab_container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  scripts__tab_title: {
    fontFamily: "MontserratAlternatesBold",
    fontSize: 100,
    backgroundImage: "linear-gradient(180deg, #094174 0%, #FBFBFB 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  scripts__tab_text_container: {
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  scripts__tab_text_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    color: "#000000",
  },
  scripts__tab_text_description: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171",
    textAlign: "center",
  },
  scripts__tab_btn_container: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 31,
    backgroundColor: Colors.btnsPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  scripts__tab_btn_text: {
    color: Colors.white,
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  tasks__tab_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
    marginBottom: 110,
  },
  tasks__tab_container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tasks__tab_title: {
    fontFamily: "MontserratAlternatesBold",
    fontSize: 60,
    backgroundImage: "linear-gradient(180deg, #094174 0%, #FBFBFB 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  empty__tasks_container: {
    flex: 1,
    paddingBottom: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  empty__tasks_text: {
    fontFamily: "MontserratAlternatesBold",
    fontSize: "10vw",
    backgroundImage: "linear-gradient(180deg, #094174 0%, #FBFBFB 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }
});