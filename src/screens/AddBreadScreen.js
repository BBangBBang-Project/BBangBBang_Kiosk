import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddBreadScreen = () => {
  const [breadName, setBreadName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [stock, setStock] = useState('');
  const [nextId, setNextId] = useState(1);

  const navigation = useNavigation();

  const handleSave = () => {
    const breadId = nextId;
    axios
      .post('http://172.20.10.5:8080/kiosk/bread', {
        id: breadId,
        name: breadName,
        price: price,
        stock: stock,
      })
      .then(response => {
        console.log('Response:', response.data);
        setNextId(prevId => prevId + 1);
        navigation.navigate('ManageBread', {refresh: true});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Icon
        name="add-photo-alternate"
        size={250}
        color="black"
        style={styles.icon}
      />
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>빵 등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 30,
    fontFamily: 'Pretendard-SemiBold',
    backgroundColor: '#F3E3D3',
    fontSize: 30,
    padding: 10,
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    marginRight: 450,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'white',
  },
});

export default AddBreadScreen;
