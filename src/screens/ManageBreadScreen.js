import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MY_IP_ADDRESS } from '../config/config';

const ManageBreadScreen = () => {
  const [breads, setBreads] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const fetchBreads = async () => {
      try {
        const response = await axios.get(
          `http://${MY_IP_ADDRESS}:8080/kiosk/bread`,
        );
        setBreads(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchBreads();
  }, [route.params]);

  const handleEditBread = id => {
    navigation.navigate('EditBread', {id: id});
  };
  /*
  <Image
  source={require('../assets/images/saltBread.png')}
  style={styles.breadImage}
/>*/

  const renderBreadItem = ({item}) => {
    // "localhost" 변경
    const imageUrl = item.imageUrl.replace('localhost', MY_IP_ADDRESS);

    return (
      <TouchableOpacity onPress={() => handleEditBread(item.id)}>
        <View style={styles.breadItem}>
          <Image source={{uri: imageUrl}} style={styles.breadImage} />
          <View style={styles.breadInfo}>
            <Text style={styles.breadName}>{item.name}</Text>
            <Text style={styles.breadPrice}>
              가격 :{' '}
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </Text>
            <Text style={styles.breadStock}>재고 : {item.stock}개</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../assets/images/bread.png')}
          style={styles.image}
        />
        <Text style={styles.title}>진열 빵 목록</Text>
      </View>
      <FlatList
        data={breads}
        renderItem={renderBreadItem}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddBread')}>
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
    marginLeft: 30,
    marginRight: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F3E3D3',
  },
  breadImage: {
    width: 180,
    height: 150,
    marginRight: 30,
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
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
