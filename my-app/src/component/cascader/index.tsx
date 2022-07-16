import "./index.css";
import { useState, useRef, useEffect } from 'react';
import React from 'react';
interface Option {
  name: string;
  value: string;
  children: Option[];
  choosen: boolean;
}

function deepCopyArray(options:Option[]):Option[] {
  let copy:Option[] = [];
  for (let option of options) {
    copy.push(deepCopy(option));
  }
  return copy;
}

function deepCopy(option:Option):Option {
  let copy:Option = {
    name: option.name,
    value: option.value,
    children: [],
    choosen: option.choosen
  };
  for (let child of option.children) {
    copy.children.push(deepCopy(child));
  }
  return copy;
}

function genNewMessgae(options:Option[]):string {
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
  return newMessage;
}

export default function Cascader(props: any) {
  const [preShow, setPreShow] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>();
  const [forceChange, setForceChange] = useState<number>(0);
  const [trueOptions, setTrueOptions] = useState<Option[]>(((props) => {return props.options;})(props));
  const [showOptions, setShowOptions] = useState<Option[]>(((props) => {return props.options;})(props));
  const domRef = useRef<HTMLDivElement>(null);
  const showCascader = () => {
    if (!show) {
      return [];
    }
    let layer:Option[] = [];
    console.log("preshow")
    console.log(preShow)
    if (!preShow) {
      layer = trueOptions;
      setPreShow(true);
    } else {
      layer = showOptions;
    }
    let result: Option[][] = [];
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
      setPreShow(false);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  console.log("render")
  return (
    <div ref={domRef}>
      <div className="hidden">{forceChange}</div>
      <div className={"input-div " + (message == null ? "no-value" : "has-value")} onClick={() => {
        setShow(true);
      }}>{message == null ? "Please select" : message}</div>
      <div className="all-container">
        {show && (<div className="outer-container">
          {showCascader().map((optionsArray,index) => (
            <div key={index} className="inner-container">
              {optionsArray.map((option,index) => (
                <div key={option.name+index} className={"option " + (option.choosen ? "option-chosen" : "")} onClick={(e) => {
                  // if (option.children.length != 0) {
                  //   return;
                  // }
                  console.log("click")
                  for (let oneOption of optionsArray) {
                    oneOption.choosen = false;
                  }
                  for (let oneOption of option.children) {
                    oneOption.choosen = false;
                  }
                  option.choosen = true;
                  if (option.children.length == 0) {
                    setShow(false);
                    setPreShow(false);
                    setTrueOptions(deepCopyArray(showOptions));
                    setMessage(genNewMessgae(showOptions));
                  }
                  setForceChange(forceChange + 1);
                }}>
                  {option.name}
                </div>
                  )
              )}
            </div>
          ))
          }
        </div>)
        }
      </div>
    </div>
  )
}