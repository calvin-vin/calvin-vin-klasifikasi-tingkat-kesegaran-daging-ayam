import {Image, Text, View} from 'react-native';
import {Brand, Logo} from '../../assets';
import {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
      }}>
      {/* <Logo /> */}
      <Image source={Brand} style={{height: 200, width: 200}} />
      <View style={{height: 38}} />
      <Text
        style={{
          fontSize: 34,
          color: '#020202',
          textAlign: 'center',
          fontFamily: 'Poppins-Medium',
        }}>
        Klasifikasi Citra Daging Ayam
      </Text>
    </View>
  );
};

export default SplashScreen;
