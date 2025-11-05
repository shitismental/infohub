import { StyleSheet, Text, View, Pressable, Image, ScrollView, Linking, Modal } from 'react-native'
import { router } from 'expo-router';
import { useState, useRef, useEffect, useMemo } from 'react'
import * as ImagePicker from "expo-image-picker";

import * as Clipboard from "expo-clipboard";
import CopyIcon from "../../assets/icons/copy_icon.png";

import BlurCircle from "../../assets/icons/BlurCircle.png";
import ArrowLeftIcon from "../../assets/icons/arrow_left_icon.png";
import BellIcon from "../../assets/icons/question_mark_icon.png";

import ArrowIcon from "../../assets/icons/arrow_right_icon.png"
import FileIcon from "../../assets/icons/file_icon.png"

import RobotIcon from "../../assets/icons/robot_icon.png"

import { Colors } from "../../constants/Colors";
import { useLocalSearchParams } from 'expo-router';
import { useGetCourses } from '../../hooks/getCourses';
import { useCreateOrder } from '../../hooks/useCreateOrder'

import { useUser } from '../../utils/userContext';

const INITIAL_MESSAGES = [
  { sender: "bot", text: "Чим я можу тобі допомогти?", hasBotIcon: true }
];

const INITIAL_OPTIONS = [
  { label: "Хочу купити код доступу", action: "buy", hasArrow: true },
  { label: "Мені потрібен адмін", action: "admin", hasArrow: true, hasSpecialStyle: true }
];

const ChatBot = () => {

  const telegramUsername = "Yehor_liora"

  const { courses } = useGetCourses();

  const { action, courseId } = useLocalSearchParams();

  const numberCourseId = Number(courseId)

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [options, setOptions] = useState(INITIAL_OPTIONS);

  const [selectedCourseId, setSelectedCourseId] = useState(numberCourseId || null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [copied, setCopied] = useState(false);
  const timeoutId = useRef(null);

  const scrollViewRef = useRef(null);

  const { createOrder } = useCreateOrder();

  const { user } = useUser();

  if (!user) return null;

  const userCourses = user?.courses

  useEffect(() => {
    if (action === "buy" && numberCourseId && courses.length > 0) {
      const course = courses.find(c => c.id === numberCourseId);
      if (!course) return;

      setSelectedCourseId(numberCourseId);

      const unlocked = !!userCourses?.some(c => c.id === course.id);

      setMessages([
        { sender: "user", text: `Хочу купити код доступу до "${course.title}"` },
        { sender: "bot", text: "Звісно! З радістю допоможу.", hasBotIcon: true },
        { sender: "bot", text: `Ціна курсу: ${unlocked ? course.discount_price : course.price}₴` },
        { sender: "bot", text: "Оберіть спосіб оплати" }
      ]);

      setOptions([
        { label: "На ФОП", action: "payToFOP" },
        { label: "На картку", action: "payToCard", hasSpecialStyle: true },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
      ]);
    }
  }, [action, numberCourseId, courses, userCourses]);

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

      const courseOptions = courses.map(c => {
        const { title } = c
        return {
          label: title,
          action: "course",
          courseId: c.id,
        }
      })

      const manualOption = {
        label: "Завершити чат",
        action: "end",
        hasSpecialStyle: true
      };

      setOptions([...courseOptions, manualOption]);
    }

    else if (option.action === "course") {

      const course = courses.find(c => c.id === option.courseId);
      if (!course) return;

      const unlocked = !!userCourses?.some(c => c.id === option.courseId);

      setSelectedCourseId(option.courseId);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `Ціна курсу: ${unlocked ? course.discount_price : course.price}₴` },
        { sender: "bot", text: "Оберіть спосіб оплати" },
      ]);
      setOptions([
        { label: "На ФОП", action: "payToFOP" },
        { label: "На картку ", action: "payToCard", hasSpecialStyle: true, },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
      ]);
    }

    else if (option.action === "payToFOP") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Отримувач \nФОП Тютюнник Єгор Володимирович" },
        { sender: "bot", text: "IBAN\nUA45322001000002600036\n0051448\n\nІПН/ЄДРПОУ\n3883502175" },
        { sender: "bot", text: "Призначення платежу:\nСплата за навчання" },
      ]);
      setOptions([
        { label: "Я оплатив(ла)", action: "paid" },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
      ]);
    }

    else if (option.action === "payToCard") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Добре! Я надішлю код після сплати, він діє один раз" },
        { sender: "bot", text: "Моно: 4441 1110 2886 2369", hasSpecialStyle: true },
      ]);
      setOptions([
        { label: "Я оплатив(ла)", action: "paid" },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
      ]);
    }

    else if (option.action === "admin") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Звісно! Ось телеграм головного адміністратора" },
        { sender: "bot", text: `Нік: @${telegramUsername}` }
      ]);
      setOptions([
        { label: "Відкрити телеграм", action: "openTelegram" },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
      ]);
    }

    else if (option.action === "openTelegram") {
      const url = `tg://resolve?domain=${telegramUsername}`;

      Linking.openURL(url).catch(() => {
        Linking.openURL(`https://t.me/${telegramUsername}`);
      });
    }

    else if (option.action === "end") {
      setMessages(INITIAL_MESSAGES);
      setOptions(INITIAL_OPTIONS)
    }

    else if (option.action === "paid") {
      (async () => {
        try {
          await createOrder(selectedCourseId);
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "Дякую! Ми перевіряємо твій платіж ⏳" },
            { sender: "bot", text: "Щоб прискорити перевірку, прикріпи квитанцію про оплату." }
          ]);
        } catch (err) {
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "❌ Не вдалося створити замовлення. Спробуй ще раз пізніше." }
          ]);
        }
      })();

      setOptions([
        { label: "Квитанція", action: "uploadReceipt", hasFileIcon: true, hasSpecialStyle: true },
        { label: "Завершити чат", action: "end", hasSpecialStyle: true, }
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
            { sender: "bot", text: "Дякуємо! Після перевірки оплати код прийде вам на пошту." },
          ]);

          setOptions([]);
        }
      })();
    }
  };

  const handleGoBack = () => {
    router.replace("/courses")
  }

  const handleCopy = async (msg) => {
    await Clipboard.setStringAsync(
      msg.text.replace("Моно: ", "").replace("Нік: ", "")
    );

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setCopied(true);

    timeoutId.current = setTimeout(() => {
      setCopied(false);
      timeoutId.current = null;
    }, 2000);
  };

  const redirectToTelegram = () => {
    Linking.openURL(`https://t.me//Yehor_liora`);
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
              msg.text?.includes("Моно:") || msg.text?.includes("Нік:") || msg.text?.includes("IBAN");

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
                    <View style={{ flex: 1, gap: 5 }}>
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
                      onPress={() => handleCopy(msg)}
                    >
                      <Image source={CopyIcon} style={{ width: 20, height: 20 }} resizeMode='contain' />
                    </Pressable>
                  )}
                </View>
              );
            }

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
                    option.hasArrow && { justifyContent: "space-between" },
                    option.hasSpecialStyle && { backgroundImage: "none", backgroundColor: Colors.white, borderWidth: 1, borderColor: "#31699C" },
                    pressed && { opacity: 0.7 },
                    option.hasFileIcon && { gap: 5 }
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
        {copied && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>Скопійовано!</Text>
          </View>
        )}
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
    paddingVertical: 14,
    justifyContent: "center"
  },
  topBlurCircle: {
    pointerEvents: "none",
    width: 500,
    height: 500,
    position: "absolute",
    left: "50%",
    top: 0,
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
    backgroundColor: "#FBFBFB",
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
    boxShadow: "0 4px 5px rgba(0,0,0,0.1)",
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
  },
  toast: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
  }
})