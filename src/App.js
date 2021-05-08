
import MyFuncComp from './MyFuncComp';
import ClassComp from './ClassComp';
import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* 组件也是React元素，只不过与普通的React元素type类型不同 */}
      <MyFuncComp number='2'></MyFuncComp>
      <MyFuncComp number={5}></MyFuncComp>
      <MyFuncComp enable obj={{name:'liang',val:123}}></MyFuncComp>
      <MyFuncComp></MyFuncComp>
      <MyFuncComp></MyFuncComp>

      <ClassComp></ClassComp>
       
      </header>
    </div>
  );
}

export default App;
