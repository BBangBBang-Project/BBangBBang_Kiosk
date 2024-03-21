import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PurchaseScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [breads, setBreads] = useState([]);

  useEffect(() => {
    axios
      .get('http://172.20.10.5:8080/kiosk/bread')
      .then(response => {
        setBreads(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addToOrder = menuItem => {
    setOrders([...orders, menuItem]);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderBreadItem = ({item}) => (
    <TouchableOpacity style={styles.breadItem} onPress={() => addToOrder(item)}>
      <Image source={item.image} style={styles.breadImage} />
      <View style={styles.breadInfo}>
        <Text style={styles.breadName}>{item.name}</Text>
        <Text style={styles.breadPrice}> {item.price}</Text>
        <Text style={styles.breadDiscountPrice}>{item.discountPrice}</Text>
        <Text style={styles.breadStock}>재고: {item.stock}개</Text>
      </View>
    </TouchableOpacity>
  );

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <Text>{item.name}</Text>
      <Text>{item.discountPrice}</Text>
      <Text>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요! 빵빵입니다!</Text>
      <View style={styles.menuContainer}>
        <FlatList
          data={breads}
          renderItem={renderBreadItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>주문 내역</Text>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.buttonText}>주문취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={styles.backButton}>
          <Text style={styles.buttonText}>주문하기</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.orderTitle}>주문 내역</Text>
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.modalButton}>
              <Text style={styles.modalText}>취소하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PurchaseComplete');
              }}
              style={styles.modalButton}>
              <Text style={styles.modalText}>결제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 30,
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    marginLeft: 40,
    marginTop: 80,
  },
  modalButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
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
  buttonText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  modalText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  orderContainer: {
    flex: 2,
    backgroundColor: '#F3E3D3',
    paddingHorizontal: 10,
  },
  orderTitle: {
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
  modalButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginLeft: 20,
    borderWidth: 3,
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 45,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginLeft: 70,
    marginTop: 20,
  },
  breadImage: {
    width: 200,
    height: 200,
  },
  breadItem: {
    backgroundColor: '#F3E3D3',
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 20,
    width: '30%',
  },
  breadInfo: {
    flex: 1,
  },
  breadName: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 30,
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  breadDiscountPrice: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    marginBottom: 5,
    color: '#D3705B',
    marginLeft: 5,
    textAlign: 'center',
  },
  breadPrice: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  breadStock: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: 'black',
    textAlign: 'right',
    marginRight: 10,
  },
});

export default PurchaseScreen;
