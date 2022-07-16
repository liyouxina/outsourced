import "./index.css";
import { useState, useRef, useEffect } from 'react';
import React from 'react';
interface Option {
  name: string;
  value: string;
  children: Option[];
  choosen: boolean;
}

interface Message {

}

export default function Cascader(props: any) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>();
  const [options, setOptions] = useState<Option[]>(((props) => {return props.options;})(props));
  const domRef = useRef<HTMLDivElement>(null);
  const showCascader = (options: Option[]) => {
    if (!show) {
      return [];
    }
    let result: Option[][] = [];
    let layer = options;
    do {
      result.push(layer);
      let nextLayer: Option[] = [];
      for (let option of layer) {
        if (option.choosen && option.children.length != 0) {
            nextLayer.push(...option.children)
        }
      }
      layer = nextLayer;
    } while(layer.length != 0);
    return result;
  }
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      // 判断用户点击的对象是否在DOM节点内部
      if (domRef.current?.contains(e.target as Node)) {
        return;
      }
      setShow(false);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  return (
    <div ref={domRef}>
      <div className={"input-div " + (message == null ? "no-value" : "has-value")} onClick={() => { setShow(true) }}>{message == null ? "Please select" : message}</div>
      {show && showCascader(options).map((optionsArray,index) => (
        <div key={index} className="inner-container">
          {optionsArray.map((option,index) => (
            <div key={option.name+index} className={"option " + (option.choosen ? "option-chosen" : "")} onClick={(e) => {
              for (let oneOption of optionsArray) {
                oneOption.choosen = false;
              }
              for (let oneOption of option.children) {
                oneOption.choosen = false;
              }
              option.choosen = true;
              if (option.children.length == 0) {
                setShow(false);
              }
              let newMessage = "";
              let chosen = null;
              for (let oneOption of options) {
                if (oneOption.choosen) {
                  chosen = oneOption;
                  break;
                }
              }
              while(chosen != null) {
                newMessage = newMessage + chosen.name;
                let match = false;
                for (let oneOption of chosen.children) {
                  if (oneOption.choosen) {
                    chosen = oneOption;
                    newMessage = newMessage + "/";
                    match = true;
                    break;
                  }
                }
                if (!match) {
                  break;
                }
              }
              setMessage(newMessage);
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