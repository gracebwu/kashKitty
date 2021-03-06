import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { storeTransaction, addUserTransactions } from "../Utils/storage";

export const TransactionPage = (props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const saveTransaction = () => {
    const transaction = {
      name: description,
      amount: amount,
      date: new Date().toDateString(),
      type: category,
      level: level,
    };
    storeTransaction(transaction).then();
    addUserTransactions(transaction).then();
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.header}>Add Transaction</Text>
      <Text style={styles.input}>DESCRIPTION</Text>
      <TextInput
        value={description}
        style={styles.box}
        onChangeText={(description) => {
          setDescription(description);
        }}
      />
      <Text style={styles.input}>TRANSACTION CATEGORY</Text>
      <DropDownPicker
        placeholder=""
        items={[
          { label: "Entertainment", value: "Entertainment", hidden: true },
          { label: "Necessities", value: "Necessities" },
          { label: "Personal", value: "Personal" },
        ]}
        defaultValue={category}
        containerStyle={{ width: 334, height: 37, marginBottom: 16 }}
        style={{ backgroundColor: "#FFF", borderColor: "#FFF" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#FFF" }}
        onChangeItem={(item) => {
          setCategory(item.value);
        }}
      />
      <Text style={styles.input}>AMOUNT SPENT</Text>
      <TextInput
        value={amount}
        style={styles.box}
        onChangeText={(amount) => {
          setAmount(amount);
        }}
      />
      <Text style={styles.input}>SPENDING LEVEL</Text>
      <View>
        <TouchableOpacity
          style={styles.loginScreenButton}
          underlayColor="#000"
          onPress={(level) => {
            setLevel("Light");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#BBDCAB",
                width: 22,
                height: 22,
                borderRadius: 11,
                left: 30,
              }}
            ></View>
            <View>
              <Text style={styles.loginText}>Light</Text>
              <Text style={{ fontSize: 10, paddingLeft: 50 }}>
                Small transactions that won’t harm your budget.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginScreenButton}
          underlayColor="#000"
          onPress={(level) => {
            setLevel("Moderate");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#EFC99B",
                width: 22,
                height: 22,
                borderRadius: 11,
                left: 30,
              }}
            ></View>
            <View>
              <Text style={styles.loginText}>Moderate</Text>
              <Text style={{ fontSize: 10, paddingLeft: 50 }}>
                Transactions that do dent the bank account.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginScreenButton}
          underlayColor="#000"
          onPress={(level) => {
            setLevel("Heavy");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#EF9B9B",
                width: 22,
                height: 22,
                borderRadius: 11,
                left: 30,
              }}
            ></View>
            <View>
              <Text style={styles.loginText}>Heavy</Text>
              <Text style={{ fontSize: 10, paddingLeft: 50 }}>
                Oh boy. This purchase is gonna hurt.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
      <TouchableOpacity
        style={styles.saveButton}
        underlayColor="#000"
        onPress={() => {
          saveTransaction();
          props.navigation.pop();
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600", fontSize:15, color: '#fff' }}>Save</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDEB",
    padding: 0,
    alignSelf: "center",
    width: 100+'%',
    paddingLeft: 38
  },
  header: {
    width: 245,
    height: 29,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    paddingBottom: 20,
  },
  input: {
    fontWeight: "600",
    fontSize: 10,
    letterSpacing: 0.08,
    textAlign: "left",
    paddingBottom: 5,
    paddingTop: 10,
  },
  box: {
    width: 334,
    height: 37,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 16,
    padding: 10
  },
  buttonContainer: {
    width: 334,
    height: 85,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  saveButton: {
    width: 192,
    height: 43,
    marginTop: 10,
    backgroundColor: "#FEC89A",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FEC89A",
    justifyContent: "center",
  },
    saveButtonContainer: {
        alignSelf: "center",
        marginLeft: -36
    },
  loginScreenButton: {
    width: 334,
    height: 85,
    marginBottom: 14,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    justifyContent: "center",
  },
  loginText: {
    color: "#000",
    paddingLeft: 50,
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 3,
  },
});
