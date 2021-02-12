import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { GameSettingsContext } from "../components/Context";
interface TimerScreenProps extends StackScreenProps<any> {
  initialTime: number;
  increment: number;
}

export default function TimerScreen({ navigation }: TimerScreenProps) {
  const settings = useContext(GameSettingsContext);
  const [player1Time, setPlayer1Time] = useState(
    settings.timeSetting as number
  );
  const [player2Time, setPlayer2Time] = useState(
    settings.timeSetting as number
  );

  const [player1Interval, setPlayer1Interval] = useState(
    (undefined as unknown) as number
  );
  const [player2Interval, setPlayer2Interval] = useState(
    (undefined as unknown) as number
  );

  const [isGamePaused, setIsGamepaused] = useState(false);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(
    undefined as unknown | boolean
  );
  const [isPlayer1Win, setisPlayer1Win] = useState(undefined);

  let isMounted = true; //Used to prevent memory leak

  useEffect(() => {
    if (player1Time <= 0) {
      handleResetGame();
      window.alert("Player 2 wins");
    } else if (player2Time <= 0) {
      handleResetGame();
      window.alert("Player 1 wins");
    }
  }, [player1Time, player2Time]);
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      setIsGamepaused(true);
      return;
    });
    return () => {};
  }, [navigation, isGamePaused]);

  const handlePlayer1Press = () => {
    setIsPlayer1Turn(false);
    clearInterval(player1Interval);
    if (isPlayer1Turn !== undefined) {
      setPlayer1Time((currentTime) => currentTime + settings.increment * 1000);
    }
    let intervalId = setInterval(
      () => setPlayer2Time((currentTime) => currentTime - 100),
      100
    );
    setPlayer2Interval((intervalId as unknown) as number);
  };

  const handlePlayer2Press = () => {
    setIsPlayer1Turn(true);
    clearInterval(player2Interval);
    if (isPlayer1Turn !== undefined) {
      setPlayer2Time((currentTime) => currentTime + settings.increment * 1000);
    }
    let intervalId = setInterval(
      () => setPlayer1Time((currentTime) => currentTime - 100),
      100
    );
    setPlayer1Interval((intervalId as unknown) as number);
  };

  const handlePauseGame = () => {
    setIsGamepaused(true);
    clearInterval(player1Interval);
    clearInterval(player2Interval);
  };
  const handleContinueGame = () => {
    setIsGamepaused(false);
    if (isPlayer1Turn) {
      setPlayer1Interval(
        (setInterval(
          () => setPlayer1Time((currentTime) => currentTime - 100),
          100
        ) as unknown) as number
      );
    } else {
      setPlayer2Interval(
        (setInterval(
          () => setPlayer2Time((currentTime) => currentTime - 100),
          100
        ) as unknown) as number
      );
    }
  };

  const handleResetGame = () => {
    if (isGamePaused) {
      setIsGamepaused(false);
    }
    clearInterval(player1Interval);
    clearInterval(player2Interval);
    setPlayer1Time(settings.timeSetting);
    setPlayer2Time(settings.timeSetting);
    setIsPlayer1Turn(undefined);
  };

  const handleGoBack = () => {
    handlePauseGame(); //Pausing to clear the intervals and prevent a memory leak
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <TouchableOpacity
          onPress={handlePlayer1Press}
          disabled={
            isGamePaused || (isPlayer1Turn !== undefined && !isPlayer1Turn)
          }
          style={styles.timerButton}
        >
          {isGamePaused !== undefined && isGamePaused && (
            <Text
              style={[
                styles.timerText,
                { fontSize: 22, transform: [{ rotate: "180deg" }] },
              ]}
            >
              Paused
            </Text>
          )}
          <Text
            style={[
              styles.timerText,
              { transform: [{ rotate: "180deg" }] }, //The as statements are to satisfy the type checks
            ]}
          >
            {Math.floor(player1Time / (1000 * 60)).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
              ":" +
              Math.floor((player1Time % (1000 * 60)) / 1000).toLocaleString(
                "en-US",
                {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }
              )}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionsButtton} onPress={handleGoBack}>
          <Ionicons
            style={styles.optionsIcon}
            name="arrow-back-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {isGamePaused ? (
          <TouchableOpacity
            style={styles.optionsButtton}
            onPress={handleContinueGame}
          >
            <Ionicons style={styles.optionsIcon} name="play" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isPlayer1Turn === undefined}
            style={styles.optionsButtton}
            onPress={handlePauseGame}
          >
            {isPlayer1Turn !== undefined && (
              <Ionicons style={styles.optionsIcon} name="pause" size={24} />
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.optionsButtton}
          onPress={handleResetGame}
        >
          <Ionicons style={{ margin: "auto" }} name="refresh" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <TouchableOpacity
          onPress={handlePlayer2Press}
          disabled={(isGamePaused as boolean) || (isPlayer1Turn as boolean)}
          style={styles.timerButton}
        >
          <Text style={styles.timerText}>
            {Math.floor(player2Time / (1000 * 60)).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
              ":" +
              Math.floor((player2Time % (1000 * 60)) / 1000).toLocaleString(
                "en-US",
                {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }
              )}
          </Text>
          {isGamePaused !== undefined && isGamePaused && (
            <Text style={[styles.timerText, { fontSize: 22 }]}>Paused</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  timerButton: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    textAlignVertical: "center",
    backgroundColor: "#eee",
  },
  timerText: {
    fontSize: 56,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },
  optionsIcon: {
    flex: 1,
    justifyContent: "center",
  },
  optionsButtton: {
    marginHorizontal: 20,
  },
});
