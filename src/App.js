import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // 내가 할 일의 목록을 관리하는 'todos'와 input란에 입력된 텍스트를 관리하기 위해 'todoText'를 useState로 상태 관리를 해준다.
  // 또한, 'darkMode' 상태를 사용하여 다크모드를 토글할 수 있도록 기능을 추가하고 기본값은 false로 다크모드가 적용되지 않았을 때를 지정해주며, 'today'라는 오늘의 날짜를 나타내기 위해 동일하게 useState로 상태 관리를 해준다.
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [today, setToday] = useState('');

  // useEffect 훅을 사용하여 현재 날짜를 가져와 "today"상태인 setToday에 저장을 하고, "toLocalDateString"이라는 메소드로 날짜를 원하는 형식으로 포맷팅한다.  
  // (포맷팅을 하게되면 날짜를 년/월/일/요일까지 상세하게 나타낼 수 있음)
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setToday(formattedDate);
  }, []);

  // addTodo 함수를 만들어 input란에 입력된 텍스트가 비어있지 않은 경우에만 새로운 할 일들을 추가한다. 
  // 이는 "setTodos"를 이용하여 나열된 "todos" 배열에 새로운 할 일들을 추가하고, (기본값은 할 일을 아직 해결하지 않았다는 false로 지정한다.) "setTodoText"로 input란을 비워둔다.
  function addTodo() {
    if (todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  // toggleComplete 함수를 만들어 할 일의 완료 여부를 정하는 기능을 만든다.
  // 할 일의 index를 사용하여 "completed" 속성을 반전시켜 할 일을 완료 했는지, 아직 안했는지 구분한다.
  function toggleComplete(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // removeTodo 함수를 만들어 해당 index의 할 일을 제거한다.
  // splice 메소드를 이용하여 배열로 지정된 updatedTodos의 index를 제거해준다.
  function removeTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // toggleDarkMode 함수를 만들어 다크모드 상태를 토글한다.
  // "setDarkMode"를 사용하여 다크모드 상태를 반전시킨다. (즉, 기본값인 false에서 반전시켜 True를 만들면 다크모드 상태가 된다.)
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  };

  // 글자 삭제 및 전체 삭제를 시도해보는데 "해낸 일 체크표시" 처럼 취소선 표시만 일어나고 화면에서 삭제가 안됩니다... (계속해서 시도해볼 예정)
  // const clearTodos = (props) => {
    // if (todoText === "") {
      // setTodoText("")
    // }
    // else {

    // }
  // };

  // 체크박스를 통해 다크모드의 유무를 결정하고, 입력 input 필드를 사용하여 할 일을 새롭게 추가할 수 있다.
  // 할 일의 목록은 "todos" 배열의 매핑으로 생성이 되며, 클릭 이벤트로 완료 여부를 결정하고, 완료 버튼을 클릭하면 해당 할 일을 완료 상태로 만들 수 있다. (취소선 표시로 할 일을 완료했다는 상태를 나타냄)
  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className='header'>
      <div className='today-date'>{today}</div>
        <h1>My Todo List</h1>
        <div className='dark-mode-toggle'>
          <label htmlFor='darkModeToggle'>다크모드</label>
          <input
            type='checkbox'
            id='darkModeToggle'
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
      <div className='underline'></div>
      <div className='todo-input'>
        <input
          type='text'
          placeholder='할 일을 입력하세요'
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? 'completed' : ''}
            onClick={() => toggleComplete(index)}
          >
            {todo.text}
            <button onClick={() => removeTodo(index)}>완료</button>
          </li>
        ))}
      </ul>
      
    </div>
    
  );
}

export default App;


