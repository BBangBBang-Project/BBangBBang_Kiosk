import Voice from "@react-native-voice/voice";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';
import { CART_COMPLETE, GET_MODAL, MY_IP_ADDRESS, PURCHASE_COMP } from '../config/config';
import { useResult } from '../service/ResultContext';

const PurchaseScreen = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [breads, setBreads] = useState([]);
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState(null);
  const {result, setResult, isRecording, setIsRecording,isEnd,setIsEnd} = useResult();


  useEffect(() => {
    axios
      .get(`http://${MY_IP_ADDRESS}:8080/kiosk/bread`)
      .then(response => {
        setBreads(response.data);
      })
      .catch(error => {
        console.error('error : ', error);
      }); 
  }, []);

  useEffect(() => {
      // console.log(`result가 변경되었습니다: ${result}`);

      if(result == GET_MODAL){
        toggleModal();
        setResult('');
      }else if(result == PURCHASE_COMP){
        sendPayData();
        setResult('');
      }
      else if(result.includes(CART_COMPLETE)){
        //메뉴를 담는 과정.
        const regex = /(\D+?) (\d+)개/;
        const match = result.match(regex);

        if (match) {
          const itemName = match[1].trim();  // 아이템 이름 추출
          const quantity = parseInt(match[2].trim(), 10);  // 수량 추출 및 정수로 변환
        
          const menuItem = breads.find(bread => result.includes(bread.name));
        
          if (menuItem) {
            const existingIndex = orders.findIndex(order => order.id === menuItem.id);
        
            if (existingIndex !== -1) {
              const updatedOrders = [...orders];
              updatedOrders[existingIndex].count += quantity;  // 여기서 quantity 만큼 증가
              setOrders(updatedOrders);
            } else {
              setOrders([...orders, { ...menuItem, count: quantity }]);
            }
          } else {
            console.log('해당하는 메뉴 이름의 빵이 없습니다.');
          }
        }
      }
      
  }, [result]); // 의존성 배열에 result를 추가

  //장바구니 추가
  const addToOrder = menuItem => {
    const existingIndex = orders.findIndex(item => item.id === menuItem.id);
    const availableAddStock = menuItem.stock - (existingIndex !== -1 ? orders[existingIndex].count : 0);

    //주문목록에 추가하는 빵의 수량이 db에 있는 빵 수량을 넘어가지 않도록 함
    if (availableAddStock > 0) {
      if (existingIndex !== -1) {
        const updatedOrders = [...orders];
        updatedOrders[existingIndex].count++;
        setOrders(updatedOrders);
      } else {
        setOrders([...orders, {...menuItem, count: 1}]);
      }
    } else {
      alert('재고가 부족합니다.');
    }
  };

  //장바구니에서 제외
  const removeFromOrder = menuItemId => {
    const updatedOrders = orders.filter(item => item.id !== menuItemId);
    setOrders(updatedOrders);
  };

  //수량 추가
  const increaseCount = menuItemId => {
    const existingIndex = orders.findIndex(item => item.id === menuItemId);
    if (existingIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[existingIndex].count++;
      setOrders(updatedOrders);
    }
  };
  //수량 삭제
  const decreaseCount = menuItemId => {
    const existingIndex = orders.findIndex(item => item.id === menuItemId);
    if (existingIndex !== -1) {
      const updatedOrders = [...orders];
      if (updatedOrders[existingIndex].count > 1) {
        updatedOrders[existingIndex].count--;
        setOrders(updatedOrders);
      }
    }
  };
  //가격 할인 계산. db에는 정가만 들어가도록 하고 프론트에서 할인 가격 계산하도록 함
  const calculateDiscountPrice = price => {
    return (parseInt(price, 10) * 0.7).toFixed(0); // 30% 할인된 가격
  };

  //주문완료창으로 데이터 보내기 + 자판기 잠금 햊[
  const sendPayData = () => {
    const orderData = orders.map(item => ({
      order_id: orderId,
      id: item.id,
      count: item.count,
    }));
    axios
      .post(`http://${MY_IP_ADDRESS}:8080/kiosk/bread/order`, orderData)
      .then(response => {
        setOrderId(response.data);
        console.log('Order sent successfully:', response.data);
        setModalVisible(false);
        axios
          .post(`http://52.79.172.135:8080/api/unlock`)
          .then(response => {
            console.log('lock success:', response.data);
          })
          .catch(error => {
            console.error('unlock error:', error);
          });
        navigation.navigate('PurchaseComplete', {
          orderId: response.data,
        });
      })
      .catch(error => {
        console.error('Error sending order:', error);
      });
  };

  //총 수량 계산
  const totalQuantity = orders.reduce((total, item) => total + item.count, 0);

  //총 가격 계산
  const totalPrice = orders.reduce(
    (total, item) =>
      total +
      parseInt(calculateDiscountPrice(item.price, item.count), 10) * item.count,
    0,
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderBreadItem = ({item}) => {
    let soldoutText = '';

    if (item.stock === 0) {
      soldoutText='SOLD OUT';
    }
    const imageUrl = item.imageUrl.replace('localhost', MY_IP_ADDRESS);


    return (
      <TouchableOpacity
        style={styles.breadItem}
        onPress={() => addToOrder(item)}>
        <View style={styles.breadInfo}>
          <Image source={{uri: imageUrl}} style={styles.breadImage} />
          <Text style={styles.breadName}>{item.name}</Text>
          <Text style={styles.breadPrice}>
            {' '}
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
          <Text style={styles.breadDiscountPrice}>
            {calculateDiscountPrice(item.price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </Text>
          <Text style={styles.breadDiscountPrice}>{soldoutText}</Text>
        </View>
        <Text style={styles.breadStock}>재고: {item.stock}개</Text>
      </TouchableOpacity>
    );
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName}>{item.name}</Text>
        <View style={styles.orderItemQuantity}>
          <TouchableOpacity onPress={() => decreaseCount(item.id)}>
            <Text style={styles.quantityButton}> - </Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}> {item.count} </Text>
          <TouchableOpacity onPress={() => increaseCount(item.id)}>
            <Text style={styles.quantityButton}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.orderItemPrice}>
        {(
          parseInt(calculateDiscountPrice(item.price, item.count), 10) *
          item.count
        )
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        원
      </Text>
      <TouchableOpacity onPress={() => removeFromOrder(item.id)}>
        <Text style={styles.cancelButton}> 삭제 </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCheckItem = ({item}) => (
    <View style={styles.orderCheckItem}>
      <View style={styles.orderCheckDetails}>
        <Text style={styles.orderCheckName}>{item.name}</Text>
        <View style={styles.orderCheckQuantity}>
          <Text style={styles.quantityCheckText}> {item.count}개 </Text>
        </View>
      </View>
      <Text style={styles.orderCheckPrice}>
        {(
          parseInt(calculateDiscountPrice(item.price, item.count), 10) *
          item.count
        )
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        원
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>안녕하세요! 빵빵입니다!</Text>

      <Icon
            name="microphone"
            size={60}
            color={isRecording ? '#50AF00' : '#D3705B'} // 음성인식 중이면 초록색, 아니면 원래색으로
            style={styles.icon}
          />
      </View>
      <View style={styles.menuContainer}>
        <FlatList
          data={breads}
          renderItem={renderBreadItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>주문 목록</Text>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main')
            Voice.stop();
            Voice.cancel()
            Voice.destroy().then(Voice.removeAllListeners);
            setIsEnd(true);
        }}
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
          <View style={styles.row}>
          <Text style={styles.orderCheckTitle}>주문 내역</Text>

      <Icon
            name="microphone"
            size={60}
            color={isRecording ? '#50AF00' : '#D3705B'} // 음성인식 중이면 초록색, 아니면 원래색으로
            style={styles.modalIcon}
          />
          </View>
          
          
          <View style={styles.orderCheckContainer}>
            <FlatList
              data={orders}
              renderItem={renderCheckItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>총 수량 : {totalQuantity}개</Text>
              <Text style={styles.totalText}>
                총 가격 :{' '}
                {totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </Text>
            </View>
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.modalButton}>
              <Text style={styles.modalText}>취소하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendPayData} style={styles.modalButton}>
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
  totalContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  totalText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 10,
    marginBottom: 5,
    color: 'black',
  },

  orderCheckContainer: {
    borderWidth: 3,
    borderColor: '#F3E3D3',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    height: '80%',
    textAlign: 'center',
  },
  orderCheckTitle: {
    fontSize: 40,
    fontFamily: 'Pretendard-Bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    // marginLeft: 320,
    marginLeft: '40%',
  },
  orderCheckName: {
    fontSize: 35,
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
    width: '50%',
    textAlign: 'center',
    marginRight: 30,
  },
  orderCheckPrice: {
    fontSize: 35,
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
    width: '30%',
    textAlign: 'center',
  },
  quantityCheckText: {
    fontSize: 35,
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
    width: '90%',
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    padding: 10,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  orderCheckItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 30,
    justifyContent: 'space-around',
  },
  orderItemName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 25,
    marginRight: 20,
    marginLeft: 20,
    color: 'black',
    width: '25%',
    textAlign: 'center',
  },
  orderItemDetails: {
    flexDirection: 'row',
  },
  orderItemQuantity: {
    flexDirection: 'row',
  },
  orderCheckDetails: {
    flexDirection: 'row',
  },

  quantityButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 30,
    borderColor: 'black',
    borderRadius: 3,
    padding: 2,
    color: 'black',
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
  },
  quantityText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 25,
    color: 'black',
    width: '25%',
    textAlign: 'center',
    margin: 5,
  },
  orderItemPrice: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 25,
    color: 'black',
    width: '20%',
    textAlign: 'center',
  },
  cancelButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 25,
    borderWidth: 3,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#D3705B',
    padding: 2,
    color: '#D3705B',
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
  icon: {
    //marginLeft: 330,
    //marginLeft: '30%',
    marginRight: '10%',
    marginTop: 25,
  },

  modalIcon: {
    // marginLeft: 260,
    marginLeft: '30%',
  },
  breadImage: {
    marginTop: 10,
    width: 150,
    height: 150,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#D3705B',
    textAlign: 'right',
    marginRight: 10,
  },
  soldOut: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    marginBottom: 5,
    color: 'red',
    marginLeft: 5,
    textAlign: 'center',
  },
});

export default PurchaseScreen;
