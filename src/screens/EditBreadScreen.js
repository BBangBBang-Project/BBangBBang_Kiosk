import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MY_IP_ADDRESS } from '../config/config';
//이미지 수정중

const EditBreadScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [breadName, setBreadName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          `http://172.20.10.5:8080/kiosk/bread/${id}`,
=======
          `http://${MY_IP_ADDRESS}:8080/kiosk/bread/${id}`,
>>>>>>> b2d5398 (feature:config)
        );
        const {name, price, stock, imageUrl} = response.data;
        setBreadName(name);
        setPrice(String(price));
        setStock(String(stock));
<<<<<<< HEAD
        setImageUrl(imageUrl.replace('localhost', '172.20.10.5')); // 'localhost'를 호스트 IP로 대체
=======
        setImageUrl(imageUrl.replace('localhost', MY_IP_ADDRESS)); // 'localhost'를 호스트 IP로 대체
>>>>>>> b2d5398 (feature:config)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = () => {
    axios
<<<<<<< HEAD
      .put(`http://172.20.10.5:8080/kiosk/bread/${id}`, {
=======
      .put(`http://${MY_IP_ADDRESS}:8080/kiosk/bread/${id}`, {
>>>>>>> b2d5398 (feature:config)
        name: breadName,
        price: price,
        stock: stock,
      })
      .then(response => {
        console.log('Response:', response.data);
        navigation.navigate('ManageBread', {refresh: true});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDelete = () => {
    axios
<<<<<<< HEAD
      .delete(`http://172.20.10.5:8080/kiosk/bread/${id}`)
=======
      .delete(`http://${MY_IP_ADDRESS}:8080/kiosk/bread/${id}`)
>>>>>>> b2d5398 (feature:config)
      .then(response => {
        console.log('Response:', response.data);
        navigation.navigate('ManageBread', {refresh: true});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.breadImage} />
      <Text style={styles.text}>빵 이름</Text>
      <TextInput
        style={styles.input}
        value={breadName}
        onChangeText={text => setBreadName(text)}
      />
      <Text style={styles.text}>빵 가격</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <Text style={styles.text}>재고</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stock}
        onChangeText={text => setStock(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>삭제</Text>
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  discountContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 70,
    borderRadius: 10,
    borderColor: 'gray',
    marginBottom: 30,
    fontFamily: 'Pretendard-SemiBold',
    backgroundColor: 'white',
    fontSize: 35,
    padding: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    marginRight: 450,
    marginBottom: 20,
    textAlign: 'center',
  },
  breadImage: {
    width: 250,
    height: 250,
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
});

export default EditBreadScreen;

/*
type Bread = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};
const EditBreadScreen = () => {
  const [breads, setBreads] = useState<Bread[]>([]);

  useEffect(() => {
    const fetchBreads = async () => {
      try {
        const response = await axios.get(
          `http://192.168.219.104:8080/kiosk/bread/${id}`,
        );
        setBreads(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchBreads();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {breads.map(bread => (
        <View key={bread.id} style={styles.breadCard}>
          <Text style={styles.breadText}>이름 {bread.name}</Text>
          <Text style={styles.breadText}>가격 {bread.price}</Text>
          <Text style={styles.breadText}>{bread.stock}</Text>
          <Image source={{uri: bread.imageUrl}} style={styles.breadImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  breadCard: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  breadText: {
    fontSize: 18,
    marginBottom: 5,
  },
  breadImage: {
    width: 200,
    height: 200,
  },
});
export default EditBreadScreen;
*/
