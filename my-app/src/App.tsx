import { useState } from 'react'
import './App.css'
import Cascader from './component/cascader'
import MCascader from './component/mcascader'
function App() {

  return (
    <div className="App">
      {/* // 仿antd 级联 */}
      <Cascader></Cascader>
      {/* // 仿antd mobile级联 */}
      <MCascader></MCascader>
    </div>
  )
}

export default App
