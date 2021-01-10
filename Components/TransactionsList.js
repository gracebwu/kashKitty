import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SectionList } from "react-native";

function getSpendingClass(spendingLevel) {
  if (spendingLevel === "Light Spending") {
    return styles.lightLevel;
  } else if (spendingLevel === "Moderate Spending") {
    return styles.medLevel;
  } else {
    return styles.heavyLevel;
  }
}

const DATA = [
  {
    title: "Entertainment",
    data: [
      {
        spendingLevel: "Light Spending",
        title: "McDonalds",
        amount: 7.43,
        id: 0,
      },
      {
        spendingLevel: "Moderate Spending",
        title: "Chipotle",
        amount: 25.43,
        id: 2,
      },
    ],
  },
  {
    title: "Personal",
    data: [
      {
        spendingLevel: "Moderate Spending",
        title: "Slippers",
        amount: 3.43,
        id: 1,
      },
    ],
  },
];

const Transaction = ({ title, spendingLevel, amount }) => (
  <View style={styles.transaction}>
    <View
      style={{ flex: 2, flexDirection: "row", justifyContent: "space-between" }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={getSpendingClass(spendingLevel)} />
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 10, textTransform: "uppercase" }}>
          {spendingLevel}
        </Text>
        <Text style={{ fontSize: 20 }}>{title}</Text>
      </View>
    </View>
    <View
      style={{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Text style={styles.amount}>${amount}</Text>
    </View>
  </View>
);

export default function TransactionsList({ catIcon, category, transactions }) {
  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return (
    <View style={styles.listContainer}>
    <View style={styles.list}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 24,
          alignContent: "flex-end",
          marginTop: 5
        }}
      >
        {category}
      </Text>
      <Text style={{ marginBottom: 12, fontSize:10, fontWeight:"600" }}>BUDGET</Text>
      <View
        style={{
          backgroundColor: "#B8F2E6",
          width: 63,
          height: 66,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          blurRadius: 4,
          padding: 10,
          paddingTop: 15
        }}
      >
        <Text style={{ fontWeight: "700", fontSize:11, lineHeight:15 }}>Mon</Text>
        <Text style={{ fontWeight: "400", fontSize:28, lineHeight:39 }}>11</Text>
      </View>
      <Text style={{fontSize:10, fontWeight:"600", paddingTop:18, paddingBottom:6}}>TRANSACTION HISTORY</Text>
      <View
        style={{
          borderStyle: "solid",
          borderWidth: 0.5,
          borderRadius: 1,
          marginVertical: 10,
          borderColor: "#515151"
        }}
      ></View>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <SectionList
          style={{ height: 400 }}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Transaction
              title={item.title}
              spendingLevel={item.spendingLevel}
              amount={item.amount}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.date}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
      alignItems: "center"
  },
  list: {
    backgroundColor: "#F8EDEB",
    height: 600,
    padding: 31,
    paddingTop: 0,
    width: 380,
  },
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 15,
    paddingLeft: 20,
  },
  transaction: {
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lightLevel: {
    backgroundColor: "#BBDCAB",
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  medLevel: {
    backgroundColor: "#EFC99B",
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  heavyLevel: {
    backgroundColor: "#EF9B9B",
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  amount: { fontSize: 20, paddingRight: 15 },
});
