import "./index.css";
import { useState } from 'react';
interface Option {
  name: string;
  value: string;
  children: Option[];
  choosen: boolean;
}

export default function Cascader(props: any) {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  //setOptions(props.options);
  const showCascader = () => {
    if (!show) {
      return [];
    }
    let result: Option[][] = [];

    let layer = props.options;
    do {
      result.push(layer);
      let nextLayer: Option[] = [];
      for (let option of layer) {
        if (option.choosen) {
          nextLayer.push(...option.children);
        }
      }
      layer = nextLayer;
    } while (layer.length != 0)
    console.log(result);
    return result;
  }
  let doms = showCascader();

  return (
    <div>
      <div className="bb" onClick={() => { setShow(true) }}></div>
      {show && doms.map(options => (
        <div key={options.toString()} className="innerContainer">
          {options.map(option => (
            <div key={option.name} className="option" onClick={(e) => {
              console.log(option.name + "choose");
              option.choosen = true;
              console.log(option.choosen)
            }}>
              {option.name}
            </div>
          )
          )}
        </div>
      )
      )}
    </div>
  )
}