import Voice from '@react-native-voice/voice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CART_COMPLETE, MY_IP_ADDRESS, NAVI_PURCHASE, ORDER_CAN, PURCHASE_COMP } from "../config/config";
import { useResult } from "./ResultContext";


const VoiceInput = ({onResult}) => {
  const {result, setResult, isRecording, setIsRecording} = useResult();

  const [error, setError] = useState('');
  const navigation = useNavigation();

 
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
    console.log(err.error.message)

    setTimeout(() => {
      startRecording();
    }, 2000);
  };
  Voice.onSpeechResults = results => {

    
    var speechResult = results.value[0].replace(/\s/g, '')

    //인식이 제대로 안되는 경우 조금 더 정확성을 높이기 위한 수단임.. 중요하진 않다.
    if (speechResult.includes("소금")) {
      speechResult = "소금빵"
    }
    else if (speechResult.includes("고로") || speechResult.includes("로케")) {
      speechResult = "고로케"
    }
    else if (speechResult.includes("에그") || speechResult.includes("타르")) {
      speechResult = "에그타르트"
    }
    else if (speechResult.includes("피자")) {
      speechResult = "피자빵"
    }
    else if (speechResult.includes("초코")) {
      speechResult = "초코빵"
    }


    console.log(speechResult);
    sendResult(speechResult);
  };

  useEffect(() => {
    // 음성 인식이 종료되면 stopRecording을 호출하고 아이콘 색상 변경
    Voice.onSpeechEnd = stopRecording;
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 구독 해제
      Voice.removeAllListeners();
    };
  }, []);

  const sendResult = async (result) => {
    try {
      await axios
        .post(`http://${MY_IP_ADDRESS}:8080/voice`, {text: result})
        .then(response => {
          Tts.stop();
          Tts.speak(response.data);
          console.log(response.data);


          if (response.data == CART_COMPLETE) {//이게 전역 변수 설정
            setResult(result);
          }
          else if (response.data == NAVI_PURCHASE) {
            navigation.navigate('Purchase')
          }
          else {//이게 전역 변수 설정
            setResult(response.data);
          }

          if (response.data == PURCHASE_COMP) {
            Voice.cancel()
            Voice.destroy()
          } else if (response.data == ORDER_CAN) {
            Voice.cancel()
            Voice.destroy()
            navigation.navigate('Main')
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

export default VoiceInput;

