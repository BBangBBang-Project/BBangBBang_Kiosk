import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MY_IP_ADDRESS } from '../config/config';
import axios from 'axios';
const PickupScreen = ({navigation}) => {
  const [password, setPassword] = useState('');

  const handlePassword = text => {
    if (text.length <= 4) {
      setPassword(text);
    }
  };

  const handleConfirm = () => {
    if (password === '0000') {
      navigation.navigate('PickupComplete');
      axios
          .post(`http://${MY_IP_ADDRESS}:8080/api/unlock`)
          .then(response => {
            console.log('lock success:', response.data);
          })
          .catch(error => {
            console.error('unlock error:', error);
          });
    } else {
      navigation.navigate('NoPassword');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>간편 비밀번호를 입력하세요</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="앱 이용자 간편 비밀번호"
          value={password}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={handlePassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Icon name="arrow-right" size={60} color="white" />
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
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 50,
  },
  input: {
    width: 400,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Pretendard-SemiBold',
    backgroundColor: 'white',
    fontSize: 35,
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D3705B',
    padding: 20,
    borderRadius: 80,
    marginLeft: 25,
  },
});

export default PickupScreen;
