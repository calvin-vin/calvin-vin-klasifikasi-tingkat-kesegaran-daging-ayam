import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Gap, Header, Loading} from '../../components';
import {showToast} from '../../utils';
import axios from 'axios';

const About = () => {
  return (
    <View style={styles.pages}>
      <Header title={'About'} subTitle={'Tentang Aplikasi'} />
      <View style={styles.container}>
        <Text style={styles.text}>
          1. Aplikasi dapat mengkategorikan tingkat kesegaran daging ayam
          menjadi 4 jenis (±1 jam setelah disembelih, ±7 jam setelah disembelih,
          ±13 jam setelah disembelih dan ±19 jam setelah disembelih).
        </Text>
        <Text style={styles.text}>
          2. Jika hendak ingin menguji aplikasi sebaiknya objek daging ayam
          diletakkan pada latar belakang yang gelap agar mendapat hasil yang
          akurat.
        </Text>
        <Text style={styles.text}>
          3. Sebaiknya objek daging ayam yang ingin diuji tidak bertulang.
        </Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
  },
  text: {
    paddingBottom: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
});
