import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ManageScreen = ({navigation}) => {
  const [code, setCode] = useState('');

  const handleCode = text => {
    if (text.length <= 4) {
      setCode(text);
    }
  };
  const handleConfirm = () => {
    if (code === '1234') {
      navigation.navigate('ManageBread');
    } else {
      Alert.alert('코드가 틀렸습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관리자 코드를 입력하세요</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="관리자  코드"
          value={code}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={handleCode}
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
    width: 350,
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

export default ManageScreen;
