import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const MainScreen = ({navigation}) => {
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
          marginBottom={160}
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
      <Text style={styles.voiceText}>
        <Text>음성으로 구매를 원하시면 </Text>
        <Text style={styles.redText}>빵빵아!</Text>
        <Text>라고 불러주세요!</Text>
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
  header: {
    flexDirection: 'row-reverse',
    width: '95%',
    marginTop: 0,
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
    marginBottom: 50,
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
    marginBottom: 80,
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
    marginBottom: 100,
  },
});

export default MainScreen;
