import Voice from '@react-native-voice/voice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { MY_IP_ADDRESS } from '../config/config';
import { useResult } from './ResultContext';

const VoiceInput = ({onResult}) => {
  const {result, setResult, isRecording, setIsRecording} = useResult();
  const [error, setError] = useState('');
  const navigation = useNavigation();
  //const [isRecording,setIsRecording] = React.useState(false); //색 변경 위해 추가

  useEffect(()=>{
    console.log(isRecording)
  },[isRecording])

  const startRecording = async () => {
    setIsRecording(true); //여기도 추가
    try {
      await Voice.start('ko-KR');
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false); //여기도 추가
    try {
      await Voice.stop();
    } catch (err) {
      setError(err);
    }
  };

  Voice.onSpeechStart = () => {
    console.log('음성 인식 시작됨');
  };
  Voice.onSpeechEnd = () => {
    console.log('음성 인식 종료됨');
    setIsRecording(false);
  };
  Voice.onSpeechError = err => {
    // console.error('음성 인식 오류:', err.error.message);
    console.log(err.error.message);
    // if(err.error.message == "7/No match" && isRecording){
    //   setTimeout(() => {
    //     startRecording();
    //   }, 2000);
    // };
    setTimeout(() => {
      startRecording();
    }, 2000);
  };
  Voice.onSpeechResults = results => {
    var speechResult = results.value[0].replace(/\s/g, '');

    if (speechResult.includes('소금')) {
      speechResult = '소금빵';
    } else if (speechResult.includes('고로') || speechResult.includes('로케')) {
      speechResult = '고로케';
    } else if (speechResult.includes('에그') || speechResult.includes('타르')) {
      speechResult = '에그타르트';
    } else if (speechResult.includes('피자')) {
      speechResult = '피자빵';
    } else if (speechResult.includes('초코')) {
      speechResult = '초코빵';
    }

    console.log(speechResult);
    sendResult(speechResult);
  };
  // useEffect(() => {

  //   // startRecording();

  //   return () => {
  //     Voice.stop();
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, [startRecording]);

  useEffect(() => {
    // 음성 인식이 종료되면 stopRecording을 호출하고 아이콘 색상 변경
    Voice.onSpeechEnd = stopRecording;
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 구독 해제
      Voice.removeAllListeners();
    };
  }, []);

  const sendResult = async result => {
    try {
      await axios
        .post(`http://${MY_IP_ADDRESS}:8080/voice`, {text: result})
        .then(response => {
          Tts.stop();
          Tts.speak(response.data);
          console.log(response.data);

          if (
            response.data ==
            '장바구니에 담았습니다. 추가할 메뉴 또는 주문을 말씀해 주세요.'
          ) {
            //이게 전역 변수 설정
            setResult(result);
          } else if (
            response.data ==
            '현재 구매할 수 있는 목록입니다. 어떤 빵을 구매 하시겠습니까?'
          ) {
            //이건 main 화면으로 보내서 navigation 사용
            onResult(response.data);
          } else {
            //이게 전역 변수 설정
            setResult(response.data);
          }

          if (response.data == '결제가 완료 되었습니다. 빵을 픽업 해주세요.') {
            Voice.cancel();
            Voice.destroy();
          } else if (response.data == '주문이 취소되었습니다.') {
            Voice.cancel();
            Voice.destroy();
            navigation.navigate('Main');
          } else {
            setTimeout(() => {
              startRecording();
            }, 4500);
          }
        })
        .catch(error => {
          console.error('Result sending error:', error);
        });
      console.log('Result sent successfully');

      // setIsChanged(true);
    } catch (error) {
      console.error('Error while sending result:', error);
    }
  };

  return (
    <View style={{alignItems: 'center', margin: 20}}>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}>
        <Icon
          name="microphone"
          size={60}
          color={isRecording ? '#50AF00' : '#D3705B'} // 음성인식 중이면 초록색, 아니면 원래색으로
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    //아직 안 쓰긴 하는데 나중에 디자인 수정할 수도 있으니까 냅둠
  },
});
export default VoiceInput;
