import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PickupCompleteScreen = ({navigation}) => {
  const data = [
    {key: '1', text: '소보로 빵 X 1'},
    {key: '2', text: '크림 빵 X 2'},
    {key: '3', text: '크림 빵 X 2'},
    {key: '4', text: '크림 빵 X 2'},
  ];

  const renderItem = ({item}) => (
    <Text style={styles.itemText}>{item.text}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>주문 내역</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          style={styles.itemContainer}
        />

        <Text style={styles.detailText}>빵을 픽업하신 후 문을 꼭 닫고</Text>
        <Text style={styles.detailText}>픽업 완료 버튼을 눌러주세요!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>픽업 완료</Text>
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
  textContainer: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    height: '90%',
  },
  itemContainer: {
    borderColor: 'gray',
    width: '90%',
    height: '90%',
    padding: 10,
  },
  title: {
    fontSize: 50,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 50,
  },
  itemText: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 20,
    width: '100%',
  },
  detailText: {
    marginTop: 20,
    fontSize: 30,
    color: '#D3705B',
    fontFamily: 'Pretendard-SemiBold',
  },
  button: {
    backgroundColor: '#D3705B',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'white',
  },
});

export default PickupCompleteScreen;
