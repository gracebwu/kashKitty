import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export const Home = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/temp-background.jpg')} style={{width: '100%', height: '100%'}}>
                <Text>
                    Home
                </Text> 
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });