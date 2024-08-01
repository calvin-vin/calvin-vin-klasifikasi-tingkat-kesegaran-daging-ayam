import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import axios from 'axios';
import Base64 from 'base64-js';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Gap, Header, Loading} from '../../components';
import {showToast} from '../../utils';
import {GEMINI_API_KEY, API_URL} from '@env';

const Home = () => {
  const [photo, setPhoto] = useState('');
  const [filename, setFilename] = useState('');
  const [dataFile, setDatafile] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const resultObject = {
    busuk: '±19 jam setelah disembelih',
    'normal-busuk': '±13 jam setelah disembelih',
    'segar-normal': '±7 jam setelah disembelih',
    segar: '±1 jam setelah disembelih',
    'non-chicken-raw': 'Gambar Bukanlah Daging Ayam Mentah',
  };

  const addPhoto = () => {
    console.log(API_URL);
    setResult('');
    launchImageLibrary(
      {
        maxHeight: 400,
        maxWidth: 400,
      },
      response => {
        if (response.didCancel || response.error) {
          showToast('Anda tidak memilih foto');
        } else {
          const source = {uri: response.assets[0].uri};

          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          setFilename(response.assets[0].fileName);
          setPhoto(source);
          setDatafile(dataImage);
        }
      },
    );
  };

  const uploadPhoto = async data => {
    setLoading(true);

    let promptText = 'Yes or no is this a picture of raw chicken meat';

    try {
      let imageUrl = data.uri;
      let imageBase64 = await fetch(imageUrl)
        .then(r => r.arrayBuffer())
        .then(a => Base64.fromByteArray(new Uint8Array(a)));

      // Assemble the prompt by combining the text with the chosen image
      let contents = [
        {
          role: 'user',
          parts: [
            {inline_data: {mime_type: 'image/jpeg', data: imageBase64}},
            {text: promptText},
          ],
        },
      ];

      // Call the multimodal model, and get a stream of results
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash', // or gemini-1.5-pro
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContent({contents});
      const responseText = result.response.text();
      console.log(responseText);
      const alphanum = responseText
        .replace(/[^\w\s]/gi, '')
        .toLocaleLowerCase();
      const arrText = alphanum.split(' ');
      const isNotChicketMeat = arrText.includes('no');

      if (isNotChicketMeat) {
        setResult('non-chicken-raw');
        return;
      }

      const photoForUpload = new FormData();
      photoForUpload.append('file', data);
      const response = await axios.post(API_URL, photoForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setResult(response.data.result);
    } catch (error) {
      setResult('Server sibuk');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.pages}>
      <Header title={'Home'} subTitle={'Klasifikasi Citra Daging Ayam'} />
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={addPhoto}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              {filename && (
                <>
                  <Text style={styles.filename}>{filename}</Text>
                  <Gap height={10} />
                </>
              )}
              {photo ? (
                <Image source={photo} style={styles.photoContainer} />
              ) : (
                <View style={styles.photoContainer}>
                  <Text style={styles.addPhoto}>Add Photo</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {loading ? (
          <Loading />
        ) : (
          <Button text="Upload" onPress={() => uploadPhoto(dataFile)} />
        )}
        <Gap height={12} />
        {result && (
          <Text style={styles.result}>
            Hasil: {resultObject[result.toLocaleLowerCase()]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Home;

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
  filename: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  photo: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  photoContainer: {
    width: 300,
    height: 300,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  result: {
    color: '#020202',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
