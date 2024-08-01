import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator color="#1ABC9C" size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
