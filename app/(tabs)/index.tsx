import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// import BarcodeReader from "react-barcode-reader";
// const BarcodeReader = require("react-barcode-reader").default;
import { BrowserMultiFormatReader, BrowserCodeReader } from "@zxing/browser";

import { useEffect, useRef, useState } from "react";

// import { useCodeScanner } from "react-native-vision-camera"; // Doesn't work on web

export default function HomeScreen() {
  const videoRef = useRef(null);
  // const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [result, setResult] = useState("");

  async function test() {
    // Get video devices
    const videoInputDevices = await BrowserCodeReader.listVideoInputDevices();

    // Get the device ID of the first device
    const selectedDeviceId = videoInputDevices[0].deviceId;

    const videoStream = document.getElementById("video-stream");

    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      "video-stream",
      (result, error, controls) => {
        // use the result and error values to choose your actions
        // you can also use controls API in this scope like the controls
        // returned from the method.
        if (result) {
          setResult(result.getText());
          controls.stop();
        }
        if (error) {
          console.error(error);
        }
      }
    );
  }

  useEffect(() => {
    test();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Text Buddy! </ThemedText>
        <HelloWave />
        <ThemedText>Result: {result}</ThemedText>
      </ThemedView>
      <ThemedView>
        {/* {hasPermission === false ? (
          <div>
            <p>Camera access denied. Please enable camera permissions.</p>
          </div>
        ) : (
          !result && (
            <video
              id="video-stream"
              width="600px"
              height="300px"
              ref={videoRef}
              autoPlay
              playsInline
            />
          )
        )} */}
        {!result && (
          <video
            id="video-stream"
            width="600px"
            height="300px"
            ref={videoRef}
            autoPlay
            playsInline
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
