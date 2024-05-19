import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MY_IP_ADDRESS } from '../config/config';

const PickupCompleteScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  //일단은 사용자 한명으로 고정하고 테스트. 추후에 여러 간편비밀번호 사용할 경우 코드 수정
  useEffect(() => {
    axios
      .get(`http://${MY_IP_ADDRESS}:8080/kiosk/pick/0000`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderItem = ({item}) => (
    <Text style={styles.itemText}>
      {item.breadName} X {item.quantitySold}
    </Text>
  );

  //자판기 잠금
  const pickupComplete = () => {
    axios
      .post(`http://${MY_IP_ADDRESS}:8080/api/lock`)
      .then(response => {
        console.log('lock success:', response.data);
        navigation.navigate('Main');
      })
      .catch(error => {
        console.error('lock error:', error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>주문 내역</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.itemContainer}
        />

        <Text style={styles.detailText}>빵을 픽업하신 후 문을 꼭 닫고</Text>
        <Text style={styles.detailText}>픽업 완료 버튼을 눌러주세요!</Text>
        <TouchableOpacity style={styles.button} onPress={pickupComplete}>
          <Text style={styles.buttonText}>픽업 완료</Text>
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
  itemContainer: {
    borderColor: 'gray',
    width: '90%',
    height: '90%',
    padding: 10,
  },
  title: {
    fontSize: 50,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 50,
  },
  itemText: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 20,
    width: '100%',
  },
  detailText: {
    marginTop: 20,
    fontSize: 30,
    color: '#D3705B',
    fontFamily: 'Pretendard-SemiBold',
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'white',
  },
});

export default PickupCompleteScreen;
