import React from 'react';
import { Image, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import VoiceInput from '../service/VoiceInput';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const MainScreen = ({navigation}) => {
  const handleVoiceResult = data => {
    if (
      data == '현재 구매할 수 있는 목록입니다. 어떤 빵을 구매 하시겠습니까?'
    ) {
      navigation.navigate('Purchase');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Manage')}
        style={styles.manageButton}>
        <Icon3
          name="manage-accounts"
          size={110}
          color="black"
          marginLeft={620}
          marginBottom={180}
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>bbangbbang</Text>
      <Image
        source={require('../assets/images/bread.png')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Purchase')}>
          <Icon name="bread-slice" size={120} color="#D3705B" />
          <Text style={styles.buttonText}>빵 구매하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pickup')}>
          <Icon2 name="baguette" size={120} color="#D3705B" />
          <Text style={styles.buttonText}>빵 픽업하기</Text>
        </TouchableOpacity>
      </View>

      <VoiceInput onResult={handleVoiceResult} />

      <Text style={styles.voiceText}>
        <Text>음성으로 구매를 원하시면 </Text>
        <Text style={styles.redText}>상단의 버튼</Text>
        <Text>을 누르고{'\n'}</Text>
        <Text style={styles.redText}>                      빵빵이</Text>
        <Text>를 불러주세요!</Text>
        </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E3D3',
  },
  titleText: {
    fontSize: 60,
    color: 'black',
    padding: 10,
    fontFamily: 'DoHyeon-Regular',
  },
  voiceText: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'Pretendard-SemiBold',
  },
  redText: {
    color: '#D3705B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    marginLeft: 10,
    marginTop: 15,
    fontSize: 35,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 70,
  },
});

export default MainScreen;
