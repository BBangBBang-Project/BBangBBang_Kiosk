import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AddBreadScreen = () => {
  const [breadName, setBreadName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null); // 이미지 상태를 null에서 시작.
  const [nextId, setNextId] = useState(1);

  const navigation = useNavigation();

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // 'photo', 'video', 또는 'mixed' 중 하나를 선택.
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel || response.errorCode) {
        // 사용자가 취소했거나 오류가 발생.
      } else if (
        response.assets &&
        response.assets[0] &&
        response.assets.length > 0
      ) {
        const asset = response.assets[0];
        // asset.uri가 undefined가 아니면 이미지 리사이징을 시도
        if (asset.uri) {
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              asset.uri,
              200,
              160,
              'JPEG',
              70,
            );
            setImage({
              uri: resizedImage.uri,
              type: 'image/jpeg', // 파일 형식을 JPEG로 설정
              fileName: asset.fileName || 'resized.jpg',
            });
          } catch (resizeError) {
            console.error(resizeError);
            // 이미지 리사이징에 실패했을 때의 오류 처리
          }
        } else {
          // asset.uri가 undefined인 경우의 처리
          Alert.alert('오류', '이미지의 URI를 찾을 수 없습니다.');
        }
        if ('fileName' in asset && 'type' in asset && 'uri' in asset) {
          const fileName = asset.fileName;
          const type = asset.type;
          const uri = asset.uri;
        }
      }
    });
  };

  const uploadBread = async () => {
    if (!image || !image.uri) {
      Alert.alert('오류', '이미지를 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', breadName);
    formData.append('price', price);
    formData.append('stock', stock);
    // image.uri, image.fileName, image.type을 사용할 수 있도록 수정.
    formData.append('imageFile', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });

    try {
      const response = await axios.post(
        'http://172.20.10.5:8080/kiosk/bread',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        navigation.navigate('ManageBread', {refresh: true});
        Alert.alert('성공', '빵 등록에 성공했습니다.');
      }
    } catch (error) {
      Alert.alert('실패', '빵 등록에 실패했습니다.');
      console.error(error);
    }
  };
/*
이미지 추가전에 사용한 코드. 추후에 필요하면 사용할 예정
  const handleSave = () => {
    const breadId = nextId;
    axios
      .post('http://192.168.219.106:8080/kiosk/bread', {
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
*/
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        {image ? (
          <Image source={{uri: image.uri}} style={styles.breadImage} />
        ) : (
          <Icon
            name="add-photo-alternate"
            size={250}
            color="black"
            style={styles.icon}
          />
        )}
        <Text style={styles.imageText}>이미지 추가하기</Text>
      </TouchableOpacity>
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

      <TouchableOpacity style={styles.button} onPress={uploadBread}>
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
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 30,
    fontFamily: 'Pretendard-SemiBold',
    backgroundColor: 'white',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    marginRight: 450,
    marginBottom: 20,
  },
  breadImage: {
    width: 250,
    height: 250,
  },
  imageText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    textAlign: 'center',
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
