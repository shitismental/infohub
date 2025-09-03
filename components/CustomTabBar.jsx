import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BlurCircle from "../assets/icons/BlurCircle.png"

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 414;
const BASE_HEIGHT = 846;

const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

const circleSize = 400 * scale;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarWrapper]}>
      <Image tintColor={"#0A0A0A"} source={BlurCircle} style={[styles.blurCircle]} />
      <View style={[{ marginBottom: insets.bottom || 16 }, styles.tabBarContainer]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              activeOpacity={1}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
            >
              <View style={[
                styles.inner, 
                isFocused && styles.innerActive,
                ]}>
                {options.tabBarIcon && (
                  <Image
                    source={options.tabBarIcon}
                    tintColor={"#0A0A0A"}
                    style={[styles.icon]}
                    resizeMode='contain'
                  />
                )}
                {isFocused && (
                  <Text style={styles.label}>
                    {label}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  tabBarContainer: {
    borderRadius: 50,
    padding: 16,
    overflow: "hidden",
    flexDirection: "row",
    backgroundImage: "linear-gradient(0deg, #FFFFFF 0%, #E6E6E6 100%)",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    zIndex: 5,
    gap: 15,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemActive: {
    flex: 2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
  },
  innerActive: {
    borderWidth: 1,
    borderColor: "#001E3A",
  },
  icon: {
    width: 22,
    height: 22,
  },
  label: {
    color: "#0A0A0A",
    fontSize: 15,
    marginLeft: 6,
    flexShrink: 0,
    flexWrap: 'nowrap',
  },
  blurCircle: {
    pointerEvents: "none",
    position: "absolute",
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    opacity: 0.1,
    bottom: -230 * scale,
    left: "50%",
    transform: [{ translateX: -circleSize / 2 }],
  },
});

export default CustomTabBar;