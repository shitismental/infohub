import { StyleSheet, Text, View, Modal, Image, Pressable } from 'react-native'

import CloseIcon from "../assets/icons/close_icon.png"

import {Colors} from "../constants/Colors"

const BellModal = ({isBellModalOpen, handleCloseBellModal}) => {
  return (
    <Modal
      visible={isBellModalOpen}
      transparent={true}
      animationType='fade'
    >
      <View style={[styles.paddingWrapper, styles.bell__modal_wrapper]}>
        <View style={[styles.bell__modal_message_container]}>
          <Text style={[styles.bell__modal_message_text]}>
            У п’ятницю чекаю всіх на онлайн зуструч у ZOOM на 19 годин по Киеву. Ось посилання: https/zoom.link
          </Text>
          <Pressable
            onPress={handleCloseBellModal}
            style={({ pressed }) => [
              styles.bell__modal_close_icon_container,
              pressed && { opacity: 0.7 },
            ]
            }>
            <Image
              source={CloseIcon}
              style={[styles.bell__modal_close_icon]}
              resizeMode='contain'
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default BellModal

const styles = StyleSheet.create({
  paddingWrapper: {
    paddingHorizontal: 15,
  },
  bell__modal_wrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.3)"
  },
  bell__modal_message_container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 14,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    top: 80,
    maxWidth: 306,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  bell__modal_message_text: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
    color: "#717171",
  },
  bell__modal_close_icon_container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bell__modal_close_icon: {
    width: 30,
    height: 30,
  }
})