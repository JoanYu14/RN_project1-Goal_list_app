import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";

const GoalInput = (props) => {
  // 創建一個enteredGoalText狀態，儲存輸入內容
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  // 在App.js中也有同名的函數但沒關係
  // Button點擊後觸發
  function addGoalHander() {
    // 透過手動調用此函數可以把enteredGoalText傳遞給App.js中的addGoalHandler
    props.onAddGoal(enteredGoalText);
    // 每次新增後都會把狀態清空
    // 要把此狀態綁訂到TextInput的value屬性，這樣輸入欄才會清空
    setEnteredGoalText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="請輸入你的目標"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="增加目標" onPress={addGoalHander} color="#CA8EFF" />
          </View>
          <View style={styles.button}>
            <Button title="取消" onPress={props.onCancel} color="#BEBEBE" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    // 是一個在 React Native 中用於設定 Flexbox 佈局的屬性。會使子元件橫向排列，也就是從左到右。預設是column(直向排列)
    flexDirection: "column",
    justifyContent: "center",
    // 這會使得容器中的子元素在交叉軸上（如果 flexDirection 是 "row"，則是垂直軸；如果是 "column"，則是水平軸）
    alignItems: "center", // 因為Button沒有style，所以設定這個屬性能使button的文字居中
    padding: 16,
    backgroundColor: "#C4E1FF",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ECF5FF",
    backgroundColor: "#ECF5FF",
    borderRadius: 6,
    width: "100%", // 設定寬度為容器寬度的 70%。
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
