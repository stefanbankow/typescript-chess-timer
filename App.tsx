import React, { useState } from "react";
import { Button, View } from "react-native";
import { enableScreens } from "react-native-screens";

import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import TimerScreen from "./screens/TimerScreen";
import { GameSettingsContext } from "./components/Context";

enableScreens();
const Stack = createStackNavigator();

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [timeSetting, setTimeSetting] = useState(5000);
  const [increment, setIncrement] = useState(5);
  return (
    <GameSettingsContext.Provider value={{ timeSetting, increment }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {({ navigation }: StackScreenProps<any>) =>
              (
                <Button
                  title="Start"
                  onPress={() => {
                    navigation.navigate("timerScreen");
                  }}
                />
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
