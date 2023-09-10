import { StyleSheet, View, Text, Pressable } from "react-native";

const GoalItem = ({ data, onDeleteItem }) => {
  return (
    // 使用了 bind 方法來創建了一個新的函式，這個新函式將 onDeleteItem 作為上下文（this）並將 data.id 作為第一個參數。
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "red" }}
        onPress={onDeleteItem.bind(this, data.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{data.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6, // 在iOS的Text組件編譯的iOS原生是沒有borderRadius的，所以要把Text包在View裡面並把這個style給View
    backgroundColor: "rgb(145, 193, 232)",
  },
  pressedItem: { opacity: 0.5 },
  goalText: {
    color: "white",
    padding: 8,
  },
});
