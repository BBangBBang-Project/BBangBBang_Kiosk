import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tts from 'react-native-tts';
import { MY_IP_ADDRESS } from '../config/config';

const PurchaseCompleteScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const {orderId} = route.params;

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(
          `http://${MY_IP_ADDRESS}:8080/kiosk/bread/order/${orderId}`,
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  const renderItem = ({item}) => (
    <Text style={styles.itemText}>
      {item.breadName} X {item.quantitySold}
    </Text>
  );

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Main')
          Tts.stop();
          Tts.speak("감사합니다. 또 오세요.")}}>
          <Text style={styles.buttonText}>구매 완료</Text>
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

export default PurchaseCompleteScreen;
