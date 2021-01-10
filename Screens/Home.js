import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUserBudgets, getStoredTransactions } from "../Utils/storage";
import BottomSheet from "reanimated-bottom-sheet";
import TransactionsList from "../Components/TransactionsList";
import SheetHeader from "../Components/SheetHeader";

export const Home = ({ navigation, props }) => {
  const sheetRef = React.useRef(null);
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [overall, setOverall] = useState("");
  const [entertain, setEntertain] = useState("");
  const [necessity, setNecessity] = useState("");
  const [personal, setPersonal] = useState("");
  const [transactions, setTransactions] = useState([]);

  const save = () => {
    addUserBudgets(overall, entertain, necessity, personal).then();
    setVisible(!visible);
  };

  useEffect(() => {
    getStoredTransactions().then((res) => {
      setTransactions(res);
    });
  });

  async function userInfo() {
    let storedUser = await AsyncStorage.getItem("@user_info");
    JSON.parse(storedUser);
    if (!storedUser) return;
    setUser(storedUser);
  }

  useEffect(() => {
    userInfo().then();
  });

  function getBarColor(percentage) {
    let rounded = Math.round(percentage * 100) / 100;
    if (rounded >= 0.0 && rounded < 0.2) {
      return "#109671";
    } else if (rounded >= 0.2 && rounded < 0.4) {
      return "#B7CC33";
    } else if (rounded >= 0.4 && rounded < 0.6) {
      return "#F8DC71";
    } else if (rounded >= 0.6 && rounded < 0.8) {
      return "#F8F290";
    } else {
      return "#DD6B6B";
    }
  }

  const HomeList = () => {
    return <TransactionsList category="Overall"></TransactionsList>;
  };

  const Header = () => {
    let total = 1000;
    let used = 500;
    return (
      <SheetHeader
        icon={
          <FontAwesome
            name="paw"
            size={30}
            color={getBarColor(used / total)}
            style={styles.icons}
          />
        }
        total={total}
        used={used}
        color={getBarColor(used / total)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/temp-background.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ alignItems: "center" }}>
          <View style={styles.centeredView}>
            <Overlay
              animationType="fade"
              transparent={true}
              isVisible={visible}
              fullScreen={true}
              overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.description}>
                    <Text style={{ fontSize: 24, fontWeight: "600" }}>
                      This Month's Budget
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: "600" }}>
                      Your budget will reset every month.
                    </Text>
                  </View>
                  <Text style={styles.inputLabel}>OVERALL BUDGET</Text>
                  <TextInput
                    value={overall}
                    onChangeText={(overall) => {
                      setOverall(overall);
                    }}
                    style={styles.input}
                  />
                  <Text style={styles.inputLabel}>ENTERTAINMENT BUDGET</Text>
                  <TextInput
                    value={entertain}
                    onChangeText={(entertain) => {
                      setEntertain(entertain);
                    }}
                    style={styles.input}
                  />
                  <Text style={styles.inputLabel}>NECESSITY BUDGET</Text>
                  <TextInput
                    value={necessity}
                    onChangeText={(necessity) => {
                      setNecessity(necessity);
                    }}
                    style={styles.input}
                  />
                  <Text style={styles.inputLabel}>PERSONAL BUDGET</Text>
                  <TextInput
                    value={personal}
                    onChangeText={(personal) => {
                      setPersonal(personal);
                    }}
                    style={styles.input}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => save()}
                      style={styles.saveButton}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Overlay>
          </View>
        </View>
        <BottomSheet
          ref={sheetRef}
          initialSnap={2}
          snapPoints={[600, 500, 190]}
          renderContent={HomeList}
          renderHeader={Header}
          enabledContentGestureInteraction={false}
        />
      </ImageBackground>
      <View style={styles.addButtonContainer}>
        <Icon
          raised
          reverse
          onPress={() => navigation.navigate("TransactionPage")}
          name="add"
          color="#FEC89A"
          style={styles.addButton}
        />
        <Icon
          raised
          reverse
          onPress={() => setVisible(!visible)}
          name="edit"
          color="#FEC89A"
          style={styles.addButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  addButton: {
    zIndex: 5,
    flex: 1,
  },
  addButtonContainer: {
    zIndex: 5,
    top: 0,
    right: 0,
    position: "absolute",
    marginBottom: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F8EDEB",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    maxHeight: 549,
    minWidth: 330,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#FEC89A",
    padding: 10,
    width: 160,
    height: 43,
    borderRadius: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  description: {
    textAlign: "left",
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: 290,
    height: 37,
    borderRadius: 5,
    marginBottom: 28,
    padding: 8,
  },
  inputLabel: {
    fontSize: 10,
    paddingBottom: 6,
    textAlign: "left",
    fontWeight: "600",
  },
});
