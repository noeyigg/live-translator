// 번역할 텍스트 입력 칸
const sourceTextBox = document.getElementById('translate-box');
const targetLanguageSelect = document.getElementById('select-box');

// 디바운스 함수
const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
   };
};

// 보낼 데이터를 바디에 담는 함수
const requestToTranslate = function() {
    // 1. 생성자 함수를 통해 XMLHttpRequest 인스턴스(객체) 생성
  const xhr = new XMLHttpRequest();

    const data = {
      text: sourceTextBox.value,
      targetLang: targetLanguageSelect.value,
    }
  
  // 2. onload 이벤트 프로퍼티에 서버로부터의 응답이 완료되었는지 확인하는 코드 작성
  xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
          const responseData = xhr.responseText; // responseText: 서버로부터 받은 응답 데이터
          const result = responseData;
          // const result = JSON.parse(responseData); // JSON 역직렬화
          console.log(result); 
      }
  }
  
  // 3. 요청 준비(open(method, url, async, ..))
  const url = 'http://localhost:3000';
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  // 4. 요청 실제 전송
  xhr.send(JSON.stringify(data));
};

sourceTextBox.addEventListener('input', debounce(requestToTranslate, 1000));
