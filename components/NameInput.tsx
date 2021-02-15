import * as React from "react";
import { TextInput } from "react-native";

export interface INameInputProps {
  setStateFunc: React.SetStateAction<any>;
  defaultVal: number | string;
  value: string;
}

export default function NameInput({
  defaultVal,
  setStateFunc,
  value,
}: INameInputProps) {
  return (
    <TextInput
      maxLength={50}
      style={{
        height: 40,
        justifyContent: "center",
        alignSelf: "center",
        width: "80%",
        borderBottomWidth: 1,
        textAlign: "center",
        margin: 2,
      }}
      placeholder={defaultVal as string}
      onChangeText={(text: string) => {
        setStateFunc(text);
      }}
      value={value}
      returnKeyType="done"
      textAlign="center"
    />
  );
}
