import {
  Dimensions,
  PixelRatio,
  Platform
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 400;

export const scaleFont = size => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.floor(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.floor(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
