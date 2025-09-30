import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native'
import { useRouter } from "expo-router";
import { BlurView } from 'expo-blur';
import { useState } from 'react';

import PersonIcon from "../../assets/icons/person_blue.png"
import LockIcon from "../../assets/icons/lock_blue.png"
import PlaneIcon from "../../assets/icons/plane_icon.png"
import RepeatIcon from "../../assets/icons/repeat_icon.png"

import BlurCircle from "../../assets/icons/BlurCircle.png"

const Register = () => {

  // const [selected, setSelected] = useState(null);

  const router = useRouter()

  const handleRegister = () => {
    router.replace("(pages)/")
  }

  const handleRedirectLogin = () => {
    router.replace("/login")
  }

  return (
    <View style={styles.main__container}>
      <Image tintColor={"#0A0A0A"} source={BlurCircle} style={[styles.topBlurCircle]} />
      <Image tintColor={"#0A0A0A"} source={BlurCircle} style={[styles.bottomBlurCircle]} />
      <View style={styles.register__wrapper}>
        <Image tintColor={"#094174"} source={BlurCircle} style={[styles.blurCircle, styles.leftCircle]} />
        <Image tintColor={"#094174"} source={BlurCircle} style={[styles.blurCircle, styles.rightCircle]} />
        <Text style={styles.title}>Реєстрація</Text>
        <BlurView style={styles.register__form_container} intensity={900} tint='light' experimentalBlurMethod='dimezisBlurView'>
          <View style={styles.register__form}>
            <View style={styles.register__form_inputs_container}>
              <View style={styles.register__form_input_container}>
                <View style={styles.image__container}>
                  <Image style={styles.image} source={PersonIcon} />
                </View>
                <TextInput placeholder='Логін' placeholderTextColor="#0A0A0A" style={styles.input} />
              </View>
              <View style={styles.register__form_input_container}>
                <View style={styles.image__container}>
                  <Image style={styles.image} source={PersonIcon} />
                </View>
                <TextInput
                  placeholder='Ел. пошта'
                  placeholderTextColor="#0A0A0A"
                  style={styles.input}
                  inputMode="email"
                  textContentType="emailAddress"
                  autoComplete="email"
                />
              </View>
              <View style={styles.register__form_input_container}>
                <View style={styles.image__container}>
                  <Image style={styles.image} source={PlaneIcon} />
                </View>
                <TextInput placeholder='Номер/нік телеграм' placeholderTextColor="#0A0A0A" style={styles.input} />
              </View>
            </View>
            {/* <View style={[styles.choose__gender_container]}>
              {["Чоловік", "Жінка"].map((option, index) => (
                <Pressable
                  key={index}
                  style={styles.radioOption}
                  onPress={() => setSelected(option)}
                >
                  <View style={styles.outerCircle}>
                    {selected === option && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.radioLabel}>{option}</Text>
                </Pressable>
              ))}
            </View> */}
            <View style={styles.btns__container}>
              <Pressable style={({ pressed }) => [styles.register__btn, pressed && { opacity: 0.7 }]} onPress={handleRegister}>
                <Text style={styles.register__btn_text}>Реєструвати</Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
        <View style={styles.login__redirect_container}>
          <Pressable onPress={handleRedirectLogin} style={({ pressed }) => [styles.reg__redirect_btn, pressed && { opacity: 0.7 }]}>
            <Text style={styles.reg__redirect_text}>Вже є аккаунт?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
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
    width: 500,
    height: 500,
    resizeMode: "contain",
    opacity: 0.3
  },
  leftCircle: {
    top: "50%",
    left: -290,
    transform: [
      { translateY: -250 },
    ],
  },

  rightCircle: {
    top: "50%",
    right: -290,
    transform: [
      { translateY: -250 },
    ],
  },
  register__wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  register__form_container: {
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
  register__form: {
    gap: 24,
    flexDirection: "column"
  },
  register__form_inputs_container: {
    alignItems: "center",
    gap: 12,
  },
  register__form_input_container: {
    width: "100%",
    flexDirection: "row",
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
  },
  btns__container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  register__btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#001E3A",
    borderRadius: 45,
  },
  register__btn_text: {
    color: "#fff",
    fontFamily: "MontserratMedium",
    fontSize: 15,
  },
  forgot__btn_text: {
    fontFamily: "MontserratMedium"
  },
  login__redirect_container: {
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
  },
  choose__gender_container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#0066ff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#0066ff",
  },
  radioLabel: {
    fontSize: 15,
    color: "#0A0A0A",
    fontFamily: "MontserratMedium",
  },
})