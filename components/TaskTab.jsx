import { StyleSheet, Text, View, Pressable, Image, } from 'react-native'
import { useState } from 'react'

import LinkIcon from "../assets/icons/link_icon.png"

const TaskTab = ({ stageIndex, taskDescription }) => {

  const taskNumber = stageIndex + 1 || 0;

  return (
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
        style={({pressed}) => [
          styles.task__link_container,
          pressed && {opacity: 0.7}
          ]}>
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
        <Pressable style={({pressed}) => [
          styles.task__btn, 
          styles.task__btn_completed,
          pressed && {opacity: 0.7}
          ]}>
          <Text style={[styles.task__btn_text, {color: "#fff"}]}>Я виконав</Text>
        </Pressable>
        <Pressable style={({pressed}) => [
          styles.task__btn, 
          styles.task__btn_question,
          pressed && {opacity: 0.7}
          ]}>
          <Text style={[styles.task__btn_text, {color: "#1D5588"}]}>Є питання</Text>
        </Pressable>
      </View>
    </View>
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
  }
})