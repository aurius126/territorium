import React from "react";
import { AspectRatio, Center, Image, NativeBaseProvider } from "native-base";
import * as elements from "./components/cardComponent";
import { ImageBackground } from "react-native";
import { Text, StyleSheet } from 'react-native';
import { color } from "native-base/lib/typescript/theme/styled-system";
const { Cards } = elements;
const LinearGradient = require("expo-linear-gradient").LinearGradient;
const Banner = require("./assets/I1.jpg")



const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default () => {
  return (
    <NativeBaseProvider config={config}>
      <Cards />
    </NativeBaseProvider>
  );
};
