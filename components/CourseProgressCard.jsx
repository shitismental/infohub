import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Colors } from '../constants/Colors'

import { useEffect } from 'react'

import { useGetLesson } from '../hooks/getLesson'

import LockIcon from "../assets/icons/lock_icon.png"
import { useState } from 'react'

const CourseProgressCard = ({ lessonId, courseId, onPress, user }) => {

  const { lesson } = useGetLesson(lessonId);

  if (!lesson) return null;

  const { title, position, is_free, duration_seconds } = lesson;

  const lessonLengthInMinutes = Math.round(duration_seconds / 60) || 0;

  const userCourses = user?.courses
  const isUnlocked = !!(is_free || userCourses?.some((c) => c.id === courseId))

  return (
    <View
      style={[
        styles.course__progress_card_wrapper,
        !isUnlocked && { opacity: 0.4 }
      ]}>
      <Pressable
        onPress={onPress}
        disabled={!isUnlocked}
        style={({ pressed }) => [
          styles.course__progress_card_container,
          pressed && isUnlocked && { opacity: 0.7 }
        ]}>
        <View style={[styles.course__progress_card_stage_container]}>
          <Text style={[styles.course__progress_card_stage_text]}>{position}</Text>
        </View>
        <View style={[styles.course__progress_card_info_container]}>
          <Text style={[styles.course__progress_card_stage_name]}>{title}</Text>
          <Text style={[styles.course__progress_card_stage_length]}>~{lessonLengthInMinutes} хвилин</Text>
        </View>
        {is_free && <View style={[styles.course__progress_card_isFree]}>
          <Text style={[styles.course__progress_card_isFree_text]}>
            Безкоштовно
          </Text>
        </View>}
      </Pressable>
      {!isUnlocked
        &&
        <View style={[styles.lock__icon_container]}>
          <Image style={[styles.lock__icon]} source={LockIcon} resizeMode='contain' />
        </View>
        // ||
        // stage.isCompleted && <View style={[styles.lock__icon_container]}>
        //   <Image style={[styles.lock__icon]} source={CheckmarkIcon} resizeMode='contain' />
        // </View>
      }
    </View>
  )
}

export default CourseProgressCard

const styles = StyleSheet.create({
  course__progress_card_wrapper: {
    flexDirection: "row",
    gap: 8,
  },
  course__progress_card_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    padding: 15,
    overflow: "hidden",
    flex: 1,
  },
  course__progress_card_stage_container: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#7CBCE8",
  },
  course__progress_card_stage_text: {
    fontFamily: "MontserratSemiBold",
    color: Colors.white,
    fontSize: 20,
  },
  course__progress_card_stage_name: {
    fontFamily: "MontserratSemiBold",
    color: "#0A0A0A"
  },
  course__progress_card_stage_length: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171"
  },
  course__progress_card_isFree: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#BDD8E9",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  course__progress_card_isFree_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
    color: "#0A0A0A",
  },
  lock__icon_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    padding: 5,
    borderRadius: 10,
  },
  lock__icon: {
    width: 20,
    height: 20,
  }
})