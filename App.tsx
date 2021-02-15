import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { enableScreens } from "react-native-screens";

import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import TimerScreen from "./screens/TimerScreen";
import { GameSettingsContext } from "./components/Context";
import Slider from "@react-native-community/slider";
import SettingsInput from "./components/SettingsInput";
import NameInput from "./components/NameInput";

enableScreens();
const Stack = createStackNavigator();

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [timeSetting, setTimeSetting] = useState(5000);
  const [increment, setIncrement] = useState(5);
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");
  const [incrementInput, setIncrementInput] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleGameStart = (navigation: StackNavigationProp<any>) => {
    let minutesInt: number = 10;
    let secondsInt: number = 0;
    let incrementInt: number = 0;
    if (minutesInput !== "") {
      minutesInt = parseInt(minutesInput);
    }
    if (secondsInput !== "") {
      secondsInt = parseInt(secondsInput);
    }
    if (incrementInput !== "") {
      incrementInt = parseInt(incrementInput);
    }
    if (player1Name === "") {
      setPlayer1Name("Player 1");
    }
    if (player2Name === "") {
      setPlayer2Name("Player 2");
    }

    let time = minutesInt * 60 * 1000 + secondsInt * 1000;

    setTimeSetting(time);
    setIncrement(incrementInt);
    navigation.navigate("timerScreen");
  };
  return (
    <GameSettingsContext.Provider
      value={{ timeSetting, increment, player1Name, player2Name }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Chess timer">
            {({ navigation }: StackScreenProps<any>) =>
              (
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                >
                  <View style={styles.inputsContainer}>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.inputTitle}>Player Names</Text>
                      <NameInput
                        defaultVal="Player 1"
                        value={player1Name}
                        setStateFunc={setPlayer1Name}
                      />
                      <NameInput
                        defaultVal="Player 2"
                        value={player2Name}
                        setStateFunc={setPlayer2Name}
                      />
                    </View>
                    <Text style={styles.inputTitle}>Starting time:</Text>
                    <View style={styles.singleInputContainer}>
                      <SettingsInput
                        defaultVal="10"
                        type="minutes"
                        setStateFunc={setMinutesInput}
                        value={minutesInput}
                      />
                      <SettingsInput
                        defaultVal="0"
                        type="seconds"
                        setStateFunc={setSecondsInput}
                        value={secondsInput}
                      />
                    </View>
                    <Text style={styles.inputTitle}>Increment:</Text>
                    <View style={styles.singleInputContainer}>
                      <SettingsInput
                        defaultVal="0"
                        type="seconds"
                        value={incrementInput}
                        setStateFunc={setIncrementInput}
                      />
                    </View>

                    <View style={{ width: "50%", alignSelf: "center" }}>
                      <Button
                        title="Start"
                        onPress={() => {
                          handleGameStart(navigation);
                        }}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              ) as JSX.Element
            }
          </Stack.Screen>
          <Stack.Screen
            name="timerScreen"
            options={{
              title: "Timer",

              header() {
                return <View></View>; //Removes the header
              },
            }}
            component={TimerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GameSettingsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  inputsContainer: {
    padding: 30,
  },
  inputTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  singleInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
