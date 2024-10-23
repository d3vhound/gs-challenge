import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { SafeAreaView, ScrollView, useColorScheme } from "react-native";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface IBlock extends ViewProps {
    flex?: ViewStyle["flex"];
    row?: boolean;
    justify?: ViewStyle["justifyContent"];
    justifyContent?: ViewStyle["justifyContent"];
    align?: ViewStyle["alignItems"];
    alignItems?: ViewStyle["alignItems"];
    content?: ViewStyle["alignContent"];
    alignContent?: ViewStyle["alignContent"];
    wrap?: ViewStyle["flexWrap"];
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    position?: ViewStyle["position"];
    top?: ViewStyle["top"];
    right?: ViewStyle["right"];
    bottom?: ViewStyle["bottom"];
    left?: ViewStyle["left"];
    color?: ViewStyle["backgroundColor"];
    outlined?: boolean;
    card?: boolean;
    radius?: ViewStyle["borderRadius"];
    overflow?: ViewStyle["overflow"];
    safe?: boolean;
    scroll?: boolean;
    shadow?: {
      color?: ViewStyle["shadowColor"],
      offset?: ViewStyle["shadowOffset"],
      opacity?: ViewStyle["shadowOpacity"],
      radius?: ViewStyle["shadowRadius"]
    },
    children?: React.ReactNode;
}

const Block = ({
  children,
  style,
  flex = 1,
  row,
  justify,
  justifyContent,
  align,
  alignItems,
  content,
  alignContent,
  wrap,
  width,
  height,
  position,
  top,
  right,
  bottom,
  left,
  color,
  outlined,
  card,
  radius,
  overflow,
  safe,
  scroll,
  shadow,
  ...props
}: IBlock) => {
  const theme = useColorScheme() ?? 'light';
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    row && { flexDirection: "row" },
    justify !== undefined && { justifyContent: justify },
    justifyContent !== undefined && { justifyContent },
    align !== undefined && { alignItems: align },
    alignItems !== undefined && { alignItems },
    content !== undefined && { alignContent: content },
    alignContent !== undefined && { alignContent },
    wrap !== undefined && { flexWrap: wrap },
    width !== undefined && { width },
    height !== undefined && { height },
    position !== undefined && { position },
    top !== undefined && { top },
    right !== undefined && { right },
    bottom !== undefined && { bottom },
    left !== undefined && { left },
    color !== undefined && { backgroundColor: color },
    outlined && {
      borderWidth: 1,
      borderColor: color,
      backgroundColor: 'transparent',
    },
    card && {
      backgroundColor: Colors[theme].background,
      padding: 10,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      borderRadius: 10,
    },
    radius !== undefined && { borderRadius: radius },
    overflow !== undefined && { overflow },
    shadow !== undefined && { ...shadow },
    style
  ]) as ViewStyle;

  if (safe) {
    return (
      <SafeAreaView style={blockStyle} {...props}>
        {children}
      </SafeAreaView>
    );
  }
  
  if (scroll) {
    return (
      <ScrollView style={blockStyle} {...props}>
        {children}
      </ScrollView>
    );
  }
  
  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

export default Block;