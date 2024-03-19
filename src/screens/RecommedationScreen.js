import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const RecommedationScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);

  const addToOrder = menuItem => {
    setOrders([...orders, menuItem]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../assets/images/bread.png')}
          style={styles.image}
        />
        <Text style={styles.title}>취향을 골라주시겠어요?</Text>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '고소한빵', price: 2000})}>
            <Text style={styles.tasteButtonText}>고소한빵</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '매콤한 빵', price: 2500})}>
            <Text style={styles.tasteButtonText}>매콤한 빵</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '달콤한 빵', price: 2200})}>
            <Text style={styles.tasteButtonText}>달콤한 빵</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '부드러운 빵', price: 1800})}>
            <Text style={styles.tasteButtonText}>부드러운 빵</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '쫄깃한 빵', price: 2200})}>
            <Text style={styles.tasteButtonText}>쫄깃한 빵</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => addToOrder({name: '짭짤한 빵', price: 1800})}>
            <Text style={styles.tasteButtonText}>짭짤한 빵</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.tasteButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderHeaderText}>주문 내역</Text>
        <ScrollView>
          {orders.map((order, index) => (
            <Text key={index}>
              {order.name} - {order.price}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.buttonText}>주문취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PurchaseComplete')}
            style={styles.backButton}>
            <Text style={styles.buttonText}>주문하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  menuContainer: {
    flex: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  menuButton: {
    width: 300,
    backgroundColor: '#F3E3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  tasteButtonText: {
    justifyContent: 'center',
    fontSize: 35,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },

  buttonText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  orderContainer: {
    flex: 2,
    backgroundColor: '#F3E3D3',
    paddingHorizontal: 10,
  },
  orderHeaderText: {
    fontSize: 30,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 350,
    margin: 10,
  },
  backButton: {
    backgroundColor: '#D3705B',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 100,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 45,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginTop: 20,
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 70,
  },
});

export default RecommedationScreen;
