import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";
/*
reducer 
 - application의 current state, action 과 함께 불려지는 function
 - return하는 것은 application의 state가 됨
action
 - reducer와 소통하는 방법
 - Object type
 - must have 'type' property
dispatch : reducer에게 action과 state를 전송
subscribe : store의 change 감지
reducer에서 switch가 자주 쓰임
ex)
  switch(action.type){
    case ..blah..:
    return smth
    case ..blah2..:
    return smth2
    default:
    return smth3
  }
 * string으로 바로 쓰는 대신에 const variable로 선언해서 사용하기 -> 에러 발견 용이
*/

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default :
    return count;
  }

}

const countStore = createStore(countModifier);
  
const onChange = () => {  
  number.innerText = countStore.getState();
}
countStore.subscribe(onChange);

// add.addEventListener("click", () => countStore.dispatch({type: "ADD"}));
// minus.addEventListener("click", () => countStore.dispatch({type: "MINUS"}));

const handleAdd = () => {
  countStore.dispatch({type: ADD});
}

const handleMinus = () => {
  countStore.dispatch({type: MINUS});
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
