import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//데이터 일단 임의로 만들어서 테스트
const ManageBreadScreen = ({navigation}) => {
  const breads = [
    { id: '1', name: '소보로빵', price: '2000원', stock : 10, image: require('../assets/images/soboroBread.png') },
    { id: '2', name: '소금빵', price: '3000원', stock: 15, image: require('../assets/images/saltBread.png') },
    { id: '3', name: '바게트', price: '2000원', stock: 5, image: require('../assets/images/baguette.png') },
  ];


  const renderBreadItem = ({ item }) => (
    <View style={styles.breadItem}>
      <Image source={item.image} style={styles.breadImage} />
      <View style={styles.breadInfo}>
        <Text style={styles.breadName}>{item.name}</Text>
        <Text style={styles.breadPrice}>가격: {item.price}</Text>
        <Text style={styles.breadStock}>재고: {item.stock}개</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.title}>진열 빵 목록</Text>
      <FlatList
        data={breads}
        renderItem={renderBreadItem}
        keyExtractor={item => item.id}
      />

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBread')}>
          <Icon name="plus" size={60} color="white" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 45,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  breadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F3E3D3',
  },
  breadImage: {
    width: 150,
    height: 150,
    marginRight: 60,
  },
  breadInfo: {
    flex: 1,
  },
  breadName: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 30,
    marginBottom: 5,
    color: 'black',
  },
  breadPrice: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  breadStock: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: 'black',
  },
    
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});

export default ManageBreadScreen;