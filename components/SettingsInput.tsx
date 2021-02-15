import * as React from "react";
import { View, TextInput, Text } from "react-native";

export interface ISettingsInputProps {
  type: "minutes" | "seconds";
  setStateFunc: React.SetStateAction<any>;
  defaultVal: number | string;
  value: string;
}

export default function SettingsInput({
  type,
  setStateFunc,
  value,
  defaultVal,
}: ISettingsInputProps) {
  return (
    <>
      <TextInput
        returnKeyType="done"
        style={{
          height: 40,
          justifyContent: "center",
          width: 50,
          borderBottomWidth: 1,
          textAlign: "center",
        }}
        maxLength={type === "seconds" ? 2 : 3}
        placeholder={defaultVal as string}
        onChangeText={(text: string) => {
          if (type == "seconds") {
            let filteredText = text.replace(/([^0-9])+/g, "");
            if (parseInt(filteredText) >= 60) {
              filteredText = "59";
            }
            setStateFunc(filteredText);
          } else {
            setStateFunc(text.replace(/([^0-9])+/g, ""));
          }
        }}
        value={value}
        keyboardType="numeric"
        textAlign="center"
      />

      <View style={{ justifyContent: "center", margin: 5 }}>
        <Text>{type}</Text>
      </View>
    </>
  );
}
