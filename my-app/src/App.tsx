import React from 'react';
import './App.css'
import Cascader from './component/cascader'
import MCascader from './component/mcascader'
interface Option {
  name: string;
  value: string;
  children: Option[];
  choosen: boolean;
}
function App() {
  let options = [{
    name: "zhejiang",
    value: "zhejiang",
    children: [{
      name: "shaoxing",
      value: "shaoxing",
      children: [{
        name: "1",
        value: "2",
        children: [],
      }],
    },{
      name: "hangzhou",
      value: "hangzhou",
      children: [{
        name: "yuhang",
        value: "yuhang",
        children: []
      }],
    }],
  },
  {
    name: "jiangsu",
    value: "jiangsu",
    children: [],
  }];
  return (
    <div className="App">
      {/* // 仿antd 级联 */}
      <Cascader options={options}></Cascader>
      {/* // 仿antd mobile级联 */}
      <MCascader></MCascader>
    </div>
  )
}

export default App
