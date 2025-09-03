import { StyleSheet, Text, View, Pressable, Image, ScrollView, Linking, Modal } from 'react-native'
import { router } from 'expo-router';
import { useState, useRef } from 'react'
import * as ImagePicker from "expo-image-picker";

import * as Clipboard from "expo-clipboard";
import CopyIcon from "../../assets/icons/copy_icon.png";

import BlurCircle from "../../assets/icons/BlurCircle.png";
import ArrowLeftIcon from "../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../assets/icons/bell_icon.png";

import ArrowIcon from "../../assets/icons/arrow_right_icon.png"
import FileIcon from "../../assets/icons/file_icon.png"

import RobotIcon from "../../assets/icons/robot_icon.png"

import { coursesData, homeDisplayCourses } from '../../constants/coursesData';

import { Colors } from "../../constants/Colors";

const ChatBot = () => {

  const telegramUsername = "yehor_rt"

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Чим я можу тобі допомогти?", hasBotIcon: true }
  ]);

  const [options, setOptions] = useState([
    { label: "Хочу купити код доступу", action: "buy", hasArrow: true },
    { label: "Мені потрібен адмін", action: "admin", hasArrow: true, hasSpecialStyle: true }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  const scrollViewRef = useRef(null);

  const handleOptionPress = (option) => {
    if (option.action !== "uploadReceipt") {
      setMessages(prev => [...prev, { sender: "user", text: option.label }]);
    }

    if (option.action === "buy") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Звісно! З радістю допоможу.", hasBotIcon: true },
        { sender: "bot", text: "До якого курсу потрібен код?" }
      ]);

      const allCourses = [...coursesData, ...homeDisplayCourses];
      const courseOptions = allCourses.map(c => {
        const { name } = c.mainCourseInfo || c;
        return {
          label: name,
          action: "course",
          courseId: c.id
        };
      });

      setOptions(courseOptions);
    }

    else if (option.action === "course") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Добре! Я надішлю код після сплати, він діє один раз." },
        { sender: "bot", text: "Моно: 5375 4115 9012 5097" }
      ]);
      setOptions([{ label: "Я оплатив(ла)", action: "paid" }]);
    }

    else if (option.action === "admin") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Звісно! Ось телеграм головного адміністратора" },
        { sender: "bot", text: `Нік: @${telegramUsername}` }
      ]);
      setOptions([
        { label: "Відкрити телеграм", action: "openTelegram" },
        { label: "Завершити сеанс", action: "end", hasSpecialStyle: true, }
      ]);
    }

    else if (option.action === "openTelegram") {
      const url = `tg://resolve?domain=${telegramUsername}`;

      Linking.openURL(url).catch(() => {
        Linking.openURL(`https://t.me/${telegramUsername}`);
      });
    }

    else if (option.action === "end") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "До зустрічі!" }
      ])
      setOptions([])
    }

    else if (option.action === "paid") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Дякую! Ми перевіряємо твій платіж ⏳" },
        { sender: "bot", text: "Щоб прискорити процес, прикріпи квитанцію про оплату." }
      ]);
      setOptions([{ label: "Квитанція", action: "uploadReceipt", hasFileIcon: true, hasSpecialStyle: true }
      ]);
    }

    else if (option.action === "uploadReceipt") {
      (async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.canceled) {
          const pickedImage = result.assets[0].uri;

          setMessages(prev => [
            ...prev,
            { sender: "user", image: pickedImage }
          ]);

          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "Дякую! Скоро наші менеджери перевірять квитанцію та надішлють код." },
          ]);

          setOptions([]);
        }
      })();
    }
  };

  const handleGoBack = () => {
    router.replace("/courses")
  }

  return (
    <View style={styles.container}>
      {/* Header */}
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
          <Text style={[styles.header__content_title]}>ЧатБОТ</Text>
          <Pressable
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

      {/* Chat */}
      <View style={[styles.chat__wrapper, options.length === 0 && { paddingBottom: 90 }]}>
        <ScrollView
          style={[styles.paddingWrapper, styles.chat__container, { paddingBottom: 30 }]}
          contentContainerStyle={{ gap: 20 }}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => {
            const isBot = msg.sender === "bot";
            const prevIsBot = index > 0 && messages[index - 1].sender === "bot";

            const showCopy =
              msg.text?.includes("Моно:") || msg.text?.includes("Нік:");

            if (isBot) {
              return (
                <View key={index} style={styles.chat__bot_bubble_container}>
                  {prevIsBot ? (
                    <View style={{ width: 50 }} />
                  ) : (
                    <View style={styles.chat__bot_icon_container}>
                      <Image source={RobotIcon} style={styles.chat__bot_icon} />
                    </View>
                  )}

                  <View style={[styles.chat__bot_text_container, { flexDirection: "row", alignItems: "center" }]}>
                    <View style={{ flex: 1 }}>
                      {!prevIsBot && (
                        <Text style={styles.chat__bot_name_text}>Чат БОТ</Text>
                      )}
                      {msg.text && (
                        <Text style={styles.chat__bot_response_text}>{msg.text}</Text>
                      )}
                    </View>
                  </View>
                  {showCopy && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.copyBtn,
                        pressed && { opacity: 0.7 }
                      ]}
                      onPress={() => Clipboard.setStringAsync(msg.text.replace("Моно: ", "").replace("Нік: ", ""))}
                    >
                      <Image source={CopyIcon} style={{ width: 20, height: 20 }} resizeMode='contain' />
                    </Pressable>
                  )}
                </View>
              );
            }

            // user bubble
            return (
              <View key={index} style={styles.chat__user_bubble_container}>
                <View style={styles.chat__user_text_container}>
                  {msg.text && (
                    <Text style={styles.chat__user_response_text}>{msg.text}</Text>
                  )}
                  {msg.image && (
                    <Pressable onPress={() => setSelectedImage(msg.image)}>
                      <Image
                        source={{ uri: msg.image }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
        {options.length !== 0 && (
          <View style={[styles.paddingWrapper, { maxHeight: "40%" }]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              {options.map((option, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.options__btn_container,
                    option.hasArrow && {justifyContent: "space-between" },
                    option.hasSpecialStyle && { backgroundImage: "none", backgroundColor: Colors.white, borderWidth: 1, borderColor: "#31699C" },
                    pressed && { opacity: 0.7 },
                    option.hasFileIcon && {gap: 5}
                  ]
                  }
                  onPress={() => handleOptionPress(option)}
                >
                  <Text
                    style={[
                      styles.options__btn_text,
                      option.hasSpecialStyle && { color: "#1D5588" }
                    ]}
                  >{option.label}</Text>
                  {
                    option.hasArrow
                    &&
                    <Image
                      style={[styles.options__btn_icon]}
                      source={ArrowIcon}
                      resizeMode='contain'
                      tintColor={option.hasSpecialStyle ? "#1D5588" : Colors.white}
                    />
                  }
                  {
                    option.hasFileIcon && 
                    <Image
                      style={[styles.options__btn_icon]}
                      source={FileIcon}
                      resizeMode='contain'
                      tintColor={option.hasSpecialStyle ? "#1D5588" : Colors.white}
                    />
                  }
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
        <Modal visible={!!selectedImage} transparent={true}>
          <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
            <Pressable style={{ position: "absolute", top: 50, right: 20, zIndex: 1 }}
              onPress={() => setSelectedImage(null)}>
              <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
            </Pressable>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            )}
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default ChatBot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#094174",
  },
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  header__container: {
    backgroundColor: "#094174",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 96,
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
  chat__wrapper: {
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 100,
    gap: 10,
  },
  chat__container: {
    paddingTop: 30,
  },
  chat__bot_bubble_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
  },
  chat__bot_icon_container: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 92,
    boxShadow: "0 4px 5px rgba(0,0,0,0.1)"
  },
  chat__bot_icon: {
    width: 40,
    height: 40,
  },
  chat__bot_text_container: {
    padding: 14,
    backgroundColor: Colors.white,
    boxShadow: "0 3px 5px rgba(0,0,0,0.15)",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    gap: 5,
    flexShrink: 1,
  },
  chat__bot_name_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#B3B3B3"
  },
  chat__bot_response_text: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#000",
  },
  copyBtn: {
    alignSelf: "center",
  },
  chat__user_bubble_container: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  chat__user_text_container: {
    backgroundColor: "#BADAF0",
    padding: 14,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    boxShadow: "0 4px 5px rgba(0,0,0,0.1)"
  },
  chat__user_response_text: {
    fontFamily: "MontserratMedium",
    color: "#000",
  },
  options__btns_container: {
    flexDirection: "column",
  },
  options__btn_container: {
    flexDirection: "row",
    backgroundImage: "linear-gradient(90deg, #1D5588 0%, #3B73A6 100%)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  options__btn_text: {
    fontFamily: "MontserratSemiBold",
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  options__btn_icon: {
    width: 20,
    height: 20,
  }
})