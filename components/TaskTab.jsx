import { StyleSheet, Text, View, Pressable, Image, Linking, Modal } from 'react-native'
import { useState } from 'react';
import { router } from 'expo-router';

import { Colors } from '../constants/Colors';

import LinkIcon from "../assets/icons/link_icon.png"
import RobotIcom from "../assets/icons/robot_icon.png"

const TaskTab = ({ stageIndex, taskDescription, taskLink }) => {

  const taskNumber = stageIndex + 1 || 0;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const normalizeURL = (url) => {
    if (!url) return null;

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    if (/^www\./i.test(url)) {
      return `https://${url}`;
    }

    if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(url)) {
      return `https://${url}`;
    }

    return null;
  };

  const handleTaskLinkRedirect = async () => {
    const url = normalizeURL(taskLink);

    if (!url) {
      console.warn("Invalid link:", taskLink);
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn("Cannot open URL:", url);
      }
    } catch (err) {
      console.error("Error opening URL:", err);
    }
  };

  const redirectToTelegram = () => {
    Linking.openURL(`https://t.me/liora_innovation`);
  }

  return (
    <>
      <View style={[styles.container, styles.paddingWrapper]}>
        <View style={[styles.task__content_container]}>
          <View style={[styles.task__info_card_container]}>
            <View style={[styles.task__info_card_top]}>
              <Text style={[styles.task__info_title_text]}>
                Домашнє завдання
              </Text>
              <Text style={[styles.task__info_number]}>
                №{taskNumber}
              </Text>
            </View>
            <Text style={[styles.task__info_card_desc_text]}>
              {taskDescription}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.task__link_container,
              pressed && { opacity: 0.7 }
            ]}
            onPress={handleTaskLinkRedirect}
          >
            <Text style={[styles.task__link_text]}>Завдання</Text>
            <View style={[styles.task__link_icon_container]}>
              <Image
                style={[styles.task__link_icon]}
                source={LinkIcon}
                resizeMode='contain'
              />
            </View>
          </Pressable>
        </View>
        <View style={[styles.task__btns_container]}>
          <Pressable
          onPress={() => setIsModalVisible(true)}
            style={({ pressed }) => [
              styles.task__btn,
              styles.task__btn_completed,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={[styles.task__btn_text, { color: "#fff" }]}>Я виконав</Text>
          </Pressable>
          <Pressable
            onPress={redirectToTelegram}
            style={({ pressed }) => [
              styles.task__btn,
              styles.task__btn_question,
              pressed && { opacity: 0.7 }
            ]}>
            <Text style={[styles.task__btn_text, { color: "#1D5588" }]}>Є питання</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType='fade'
        transparent={true}
      >
        <View style={[styles.paddingWrapper, styles.modal__container]}>
          <View style={[
            styles.modal__content_container,
          ]}>
            <View style={[styles.modal__top_icon_container]}>
              <Image
                style={[styles.modal_top_icon]}
                source={RobotIcom}
                resizeMode='contain'
              />
            </View>
            <View style={[styles.modal__text_container]}>
              <Text style={[
                styles.modal__text_title,
              ]}>Завдання на перевірці</Text>
              <Text style={[styles.modal__text_desc]}>{"Після перевірки вам відкриється доступ\nдо наступного уроку"}</Text>
            </View>
            <Pressable onPress={() => setIsModalVisible(false)} style={[styles.modal__close_btn]}>
              <Text style={[styles.modal__close_btn_text]}>Очікую</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default TaskTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 110,
    justifyContent: "space-between",
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  task__content_container: {
    marginTop: 15,
    gap: 15,
  },
  task__info_card_container: {
    gap: 15,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  task__info_card_top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  task__info_title_text: {
    fontFamily: "MontserratSemiBold",
    color: "#0A0A0A",
    fontSize: 16,
  },
  task__info_number: {
    fontFamily: "MontserratSemiBold",
    color: "#0A0A0A",
    fontSize: 16,
  },
  task__info_card_desc_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171",
  },
  task__link_container: {
    backgroundImage: "linear-gradient(90deg, #1D5588 0%, #3B73A6 100%)",
    padding: 14,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  task__link_text: {
    fontFamily: "MontserratMedium",
    fontSize: 15,
    color: "#fff",
  },
  task__link_icon_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 7,
  },
  task__link_icon: {
    width: 20,
    height: 20,
  },
  task__btns_container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  task__btn: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  task__btn_text: {
    fontFamily: "MontserratMedium",
    fontSize: "15",
  },
  task__btn_completed: {
    backgroundImage: "linear-gradient(90deg, #1D5588 0%, #3B73A6 100%)",
  },
  task__btn_question: {
    borderWidth: 1,
    borderColor: "#31699C",
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