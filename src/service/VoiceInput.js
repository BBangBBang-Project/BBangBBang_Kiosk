import Voice from "@react-native-voice/voice";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Tts from "react-native-tts";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { MY_IP_ADDRESS } from "../config/config";
import { useResult } from "./ResultContext";

const VoiceInput = ({ onResult }) => {
  const {result, setResult} = useResult();
  const [error, setError] = useState('');
  const [isRecording,setIsRecording] = React.useState(false);

  // useCallback을 사용하여 startRecording 함수를 메모이제이션
  const startRecording = useCallback(async () => {
    try {
      await Voice.start('ko-KR');
    } catch (err) {
      setError(err);
    }
  }, []); 

  // useCallback을 사용하여 stopRecording 함수를 메모이제이션
  const stopRecording = useCallback(async () => {
    try {
      await Voice.stop(); // 음성 인식 중지
      console.log('stop')
    } catch (err) {
      setError(err);
    }
  }, []); 

  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log('음성 인식 시작됨');
    };
    Voice.onSpeechEnd = () => {
      console.log('음성 인식 종료됨');
    };
    Voice.onSpeechError = err => {
      console.error('음성 인식 오류:', err.error.message);
      console.log('인식x')
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

      
      var speechResult = results.value[0].replace(/\s/g,'')

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

    // startRecording();

    return () => {
      Voice.stop();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [startRecording]); 

  useEffect(() => {
    console.log(`Result 상태 변경됨: ${result}`);
    if(result == "결제가 완료 되었습니다. 빵을 픽업 해주세요."){
      console.log("음성 인식 중지 시도");
      setIsRecording(false);
      stopRecording();
    }
}, [result]); // 의존성 배열에 result를 추가

  const sendResult = async (result) => {
    try {
      await axios.post(`http://${MY_IP_ADDRESS}:8080/voice`, { text: result })
        .then(response => {
          Tts.stop();
          Tts.speak(response.data);
          console.log(response.data);

          if(response.data == "장바구니에 담았습니다. 추가할 메뉴 또는 주문을 말씀해 주세요."){
            //이게 전역 변수 설정
            setResult(result);
          }
          else if(response.data == "현재 구매할 수 있는 목록입니다. 어떤 빵을 구매 하시겠습니까?"){
            //이건 main 화면으로 보내서 navigation 사용 
            onResult(response.data)
          }
          else {
            //이게 전역 변수 설정
            setResult(response.data);
          }

        }).catch(error => {
          console.error('Result sending error:', error);
        });
      console.log('Result sent successfully');
      setTimeout(() => {
        startRecording();
      }, 4000); 
    } catch (error) {
      console.error('Error while sending result:', error);
    }
  };


  return (
    <View style={{alignItems: 'center',margin:20}}>
        <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          if (isRecording) {
            stopRecording();
            setIsRecording(false);
          } else {
            startRecording();
            setIsRecording(true);
          }
        }}>
          <Icon name="microphone" size={60} color="#D3705B" />
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