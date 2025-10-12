import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from 'react-native'
import { useRouter } from "expo-router";
import { BlurView } from 'expo-blur';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../services/api"

import PersonIcon from "../../assets/icons/person_blue.png"
import LockIcon from "../../assets/icons/lock_blue.png"
import AppleLogo from "../../assets/icons/apple_logo.png"
import GoogleLogo from "../../assets/icons/google_logo.png"

import BlurCircle from "../../assets/icons/BlurCircle.png"

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Помилка", "Будь ласка, введіть ел. пошту та пароль");
      return;
    }

    try {
      const res = await API.post("/users/login/", {
        username,
        password
      });

      const { access, refresh } = res.data;
      await AsyncStorage.setItem("access_token", access);
      await AsyncStorage.setItem("refresh_token", refresh);

      router.replace("(pages)/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert("Помилка", "Невірний логін або пароль");
    } finally {
    }
  }

  const handleRegister = () => {
    router.replace("/register")
  }

  return (
    <View style={styles.main__container}>
      <Image tintColor={"#0A0A0A"} source={BlurCircle} style={[styles.topBlurCircle]} />
      <Image tintColor={"#0A0A0A"} source={BlurCircle} style={[styles.bottomBlurCircle]} />
      <View style={styles.login__wrapper}>
        <Image tintColor={"#094174"} source={BlurCircle} style={[styles.blurCircle, styles.leftCircle]} />
        <Image tintColor={"#094174"} source={BlurCircle} style={[styles.blurCircle, styles.rightCircle]} />
        <Text style={styles.title}>Вхід</Text>
        <BlurView style={styles.login__form_container} intensity={900} tint='light' experimentalBlurMethod='dimezisBlurView'>
          <View style={styles.login__form}>
            <View style={styles.login__form_inputs_container}>
              <View style={styles.login__form_input_container}>
                <View style={styles.image__container}>
                  <Image style={styles.image} source={PersonIcon} />
                </View>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder='Логін'
                  placeholderTextColor="#0A0A0A"
                  style={styles.input} />
              </View>
              <View style={styles.login__form_input_container}>
                <View style={styles.image__container}>
                  <Image style={styles.image} source={LockIcon} />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder='Пароль'
                  placeholderTextColor="#0A0A0A"
                  secureTextEntry
                  style={styles.input} />
              </View>
            </View>
            <View style={styles.btns__container}>
              <Pressable style={({ pressed }) => [styles.login__btn, pressed && { opacity: 0.7 }]} onPress={handleLogin}>
                <Text style={styles.login__btn_text}>Увійти</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.forgot__btn, pressed && { opacity: 0.7 }]}>
                <Text style={styles.forgot__btn_text}>Забули пароль?</Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
        <View style={styles.reg__redirect_container}>
          <Pressable onPress={handleRegister} style={({ pressed }) => [styles.reg__redirect_btn, pressed && { opacity: 0.7 }]}>
            <Text style={styles.reg__redirect_text}>Реєстрація</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.other__methods_container}>
        <View style={styles.other__methods_wrapper}>
          <View style={styles.divider__with_text}>
            <View style={styles.divider__line} />
            <Text style={styles.divider__text}>Вхід за допомогою</Text>
            <View style={styles.divider__line} />
          </View>
          <View style={styles.other__methods_btns_container}>
            <Pressable style={({ pressed }) => [styles.other__methods_btn, pressed && { opacity: 0.7 }]}>
              <Image style={styles.other__methods_img} source={AppleLogo} />
            </Pressable>
            <Pressable style={({ pressed }) => [styles.other__methods_btn, pressed && { opacity: 0.7 }]}>
              <Image style={styles.other__methods_img} source={GoogleLogo} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 60,
    backgroundColor: "#fff"
  },
  topBlurCircle: {
    position: "absolute",
    width: 400,
    height: 400,
    resizeMode: "contain",
    opacity: 0.1,
    left: "50%",
    transform: [
      { translateX: -200 }, { translateY: -490 }
    ],
  },
  bottomBlurCircle: {
    position: "absolute",
    width: 400,
    height: 400,
    resizeMode: "contain",
    opacity: 0.1,
    left: "50%",
    transform: [
      { translateX: -200 }, { translateY: 490 }
    ],
  },
  blurCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    resizeMode: "contain",
    opacity: 0.25
  },
  leftCircle: {
    top: "50%",
    left: -155,
    transform: [
      { translateY: -150 }
    ],
  },
  rightCircle: {
    top: "50%",
    right: -155,
    transform: [
      { translateY: -150 }
    ],
  },
  login__wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  login__form_container: {
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ffffffff",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 24,
    overflow: "hidden",
    boxShadow: "0 -1px 5px rgba(0,0,0, 0.15)"
  },
  title: {
    fontSize: 20,
    color: "#0A0A0A",
    fontFamily: "MontserratSemiBold",
    textTransform: "uppercase",
    marginBottom: 25,
  },
  login__form: {
    gap: 25,
    flexDirection: "column"
  },
  login__form_inputs_container: {
    alignItems: "center",
    gap: 12,
  },
  login__form_input_container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  image: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },
  image__container: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)"
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 5,
    fontFamily: "MontserratMedium",
    color: "#0A0A0A",
    outlineStyle: "none",
    fontSize: 16,
  },
  btns__container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  login__btn: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    backgroundColor: "#001E3A",
    borderRadius: 45,
  },
  login__btn_text: {
    color: "#fff",
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  forgot__btn_text: {
    fontFamily: "MontserratMedium"
  },
  reg__redirect_container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  reg__redirect_btn: {
    width: "100%",
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)"
  },
  reg__redirect_text: {
    fontFamily: "MontserratMedium",
    textAlign: "center",
  },
  other__methods_container: {
    width: "100%",
    paddingHorizontal: 18,
  },
  other__methods_wrapper: {
    width: "100%",
    gap: 20,
    paddingHorizontal: 22,
  },
  divider__with_text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  divider__line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d1d1ff"
  },
  divider__text: {
    fontFamily: "MontserratMedium",
    color: "#0A0A0A",
  },
  other__methods_btns_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  other__methods_btn: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 13,
    boxShadow: "0 2px 5px rgba(0,0,0, 0.15)"
  },
  other__methods_img: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  }
})