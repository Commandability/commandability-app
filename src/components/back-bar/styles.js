import { StyleSheet } from "react-native";

import colors from "../../modules/colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.primary.dark,
    },
    buttonContainer: {
        padding: 5,
        flex: .1,
    },
    icon: {
        color: colors.text.light,
    }
});