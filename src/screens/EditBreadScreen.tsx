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
/*
type Bread = {
  id:Number,
  name: String,
  price: Number,
  stock: Number,
  imageUrl: String,
};
*/
const EditBreadScreen = ({navigation, route}) => {
  const [breadName, setBreadName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [breads, setBreads] = useState([]);
  const {id} = route.params;

  //.get(`http://172.20.10.5:8080/kiosk/bread/${id}`)
  useEffect(() => {
    axios
      .get(`http://172.20.10.5:8080/kiosk/bread/${id}`)
      .then(response => {
        const {name, price, stock, imageUrl} = response.data;
        setBreadName(name);
        setPrice(String(price));
        setStock(String(stock));
        setImageUrl(imageUrl);
      })
      .catch(error => {
        console.error('error : ', error);
      });
  }, [id]);

  const handleSave = () => {
    axios
      .put(`http://172.20.10.5:8080/kiosk/bread/${id}`, {
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
      .delete(`http://172.20.10.5:8080/kiosk/bread/${id}`)
      .then(response => {
        console.log('Response:', response.data);
        navigation.navigate('ManageBread', {refresh: true});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  //<Image source={{uri: imageUrl}} style={styles.breadImage} />
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
  breadImage: {
    width: 150,
    height: 150,
    marginRight: 50,
    marginLeft: 40,
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