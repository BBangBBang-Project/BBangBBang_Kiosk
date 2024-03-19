import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const NoPassWordScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => navigation.navigate('Purchase')}>
          <Icon name="x-circle" size={70} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/bread.png')}
          style={styles.image}
        />
        <Text style={styles.text}>간편 비밀번호가 존재하지 않습니다.</Text>
        <Text style={styles.text}>현장 구매를 원하신다면</Text>
        <Text style={styles.text}>아래 버튼을 눌러주세요.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Purchase')}>
          <Text style={styles.buttonText}>빵 구매하러 가기</Text>
        </TouchableOpacity>
      </View>
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
  textContainer: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    height: '90%',
  },
  text: {
    fontSize: 35,
    color: 'black',
    padding: 5,
    fontFamily: 'Pretendard-SemiBold',
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 20,
  },
  xButton: {
    marginLeft: 560,
    marginBottom: 80,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
});

export default NoPassWordScreen;
