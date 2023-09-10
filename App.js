import {
  StyleSheet,
  View,
  Modal,
  Button,
  FlatList, // 為了可捲動列表而建的
} from "react-native"; // 這三個component是在React Native中才有的
import { StatusBar } from "expo-status-bar";

import { useState } from "react"; // 跟在React中一樣
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Button被點擊時觸發
  // 此函數會以props的方式被叫做onAddGoal傳遞給GoalInput中然後被當作Button的onPress事件函數addGoalHandler的callBackFn內會呼叫的函數這個函數並給予參數
  // 因為enteredGoalText狀態現在是在GoalItem組件中，所以要獲取這個值就要以參數的方式獲得。
  function addGoalHandler(enteredGoalText) {
    // 在終端機印出enteredGoalText狀態目前的值
    console.log(enteredGoalText);
    // 如果狀態的更新要依賴狀態目前的值，那使用函數回傳能確保每次更新的值是依賴前一次的值
    setGoals((currentGoals) => {
      // Goals會新增一個物件，text屬性是輸入的值，id屬性是隨機數字，是要方便我們做刪除的
      return [
        ...currentGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ];
    });
    // 新增後就呼叫函數，令modalIsVisible屬性為false
    endAddGoalHandler();
  }

  // 把此函數以props的方式叫做onDeleteItem傳遞給GoalItem.js
  // 因為每次FlatList在渲染GoalItem時都會把id使用props傳遞過去，所以可以使用這個來篩選
  // GoalItem.js的Pressable組件的onPress屬性值為{onDeleteItem.bind(this, data.id)}，就是每次被點擊就會把id當作參數傳過來
  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((item) => item.id !== id);
    });
  }

  // 按下按鈕後modalIsVisible為True
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar backgroundColor="#C4E1FF" barStyle="light-content" />
      <View style={styles.appContainer}>
        <Button title="添加新目標" color="gray" onPress={startAddGoalHandler} />
        <GoalInput
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
          visible={modalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                // itemData.item就是goals陣列目前的元素
                <GoalItem
                  data={itemData.item}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              // goals陣列每個元素都是物件，有id屬性
              return item.id;
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    // 如果沒有設定flex=1的話，預設這個組件會只占所需的空間
    // 因為此容器內部的子組件要用flex來分割空間，所以最外層的View組件要占據整個空間，因此flex=1
    flex: 1,
    padding: 50,
    // 水平方向上，容器的左側和右側都會有 16 像素的內邊距。
    paddingHorizontal: 16,
  },
  goalsContainer: {
    // 所有同容器(appContainer)的子組件的flex會加在一起，所有inputContainer的flex1與這個的3加在一起=4
    // 所以容器(appContainer)的空間會被分成4等份，goalsContainer分到3/4
    flex: 4,
  },
});
