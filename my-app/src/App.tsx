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
  let options:Option[] = [{
    name: "zhejiangasdasdasd",
    value: "zhejiang",
    children: [{
      name: "shaoxing",
      value: "shaoxing",
      children: [{
        name: "zhejiang",
        value: "zhejiang",
        children: [],
        choosen: false
      }],
      choosen: false
    },{
      name: "hangzhou",
      value: "hangzhou",
      children: [{
        name: "yuhang",
        value: "yuhang",
        children: [],
        choosen: false
      }],
      choosen: false
    }],
    choosen: true
  },
  {
    name: "jiangsu",
    value: "jiangsu",
    children: [],
    choosen: false
  },
  {
    name: "beijing",
    value: "beijing",
    children: [],
    choosen: false
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
