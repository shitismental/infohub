import { StyleSheet, Text, View, Image } from 'react-native'

const TopEarnCard = ({ id, img, name, cashAmnt }) => {
  return (
    <>
      <View style={[styles.top__earner_card]}>
        <View style={[styles.top__earner_left]}>
          <Text style={[styles.top__earner_position]}>{id}</Text>
          <View style={[styles.top__earner_left_info]}>
            <Image source={img} style={[styles.top__earner_photo]} resizeMode='contain' />
            <Text style={[styles.top__earner_name]}>{name}</Text>
          </View>
        </View>
        <View style={[styles.top__earner_amnt]}>
          <Text style={[styles.top__earner_amnt_text]}>
            + {cashAmnt} ₴
          </Text>
        </View>
      </View>
    {(id !== 3) && 
    <View style={[styles.separator]}></View>
    }
    </>
  )
}

export default TopEarnCard

const styles = StyleSheet.create({
  top__earner_card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  top__earner_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  top__earner_position: {
    fontSize: 13,
    fontFamily: "MontserratBold",
    color: "#0A0A0A",
  },
  top__earner_left_info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  top__earner_photo: {
    width: 35,
    height: 35,
  },
  top__earner_name: {
    fontSize: 13,
    fontFamily: "MontserratMedium",
    color: "#0A0A0A",
  },
  top__earner_amnt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  top__earner_amnt_text: {
    fontSize: 13,
    fontFamily: "MontserratSemiBold",
    color: "#094174",
  },
  separator: {
    height: 2,
    backgroundColor: "#F7F7F7",
  }
})