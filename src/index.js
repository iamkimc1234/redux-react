import { createStore } from "redux";
/*
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
/*
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
*/

// never mutate state
// mutation -> 상태의 변경
// but you have to return new state, new object

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO, text
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO, id
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDo = {text: action.text, id:Date.now()};
      return [newToDo, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id );
      return cleaned;
    default :
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text))}

const dispatchDeleteToDo = (e) => {
  const id = Number(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}
store.subscribe(paintToDos);

// const createToDo = toDo => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// }

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createToDo(toDo);
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit);