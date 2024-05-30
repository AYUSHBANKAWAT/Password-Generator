import logo from './logo.svg';
import './App.css';
import { useState,useCallback,useEffect,useRef } from 'react';

function App() {

  const [bodyColor,setBodyColor] = useState("antiquewhite")
  const [cardColor,setCardColor] = useState("white")
  const [fontColor,setFontColor] = useState("black")
  const [UIState,setUIState] = useState(true)
  const [length, setLength] =useState(8);
  const [number,setNumber]=useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const[password,setPassword] =useState();
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if( number ) str+="0123456789";
    if(charAllowed) str+="@#$%^Z&*{}[]()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  },[length,number,charAllowed,setPassword])

  const UIChange =()=>{
    if(UIState){
      setFontColor("white")
      setBodyColor("black")
      setCardColor("grey")
    }
    else{
      setFontColor("black")
      setBodyColor("antiquewhite")
      setCardColor("white")
    }
    console.log("Data",fontColor,bodyColor,cardColor)
  }

 const copyToClipBoard = useCallback( ()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 } )
  useEffect(()=>{
    passwordGenerator()
  },[length,number,charAllowed])
  return (
    <div className="App"  style={{backgroundColor:bodyColor }} >
      <div className='Card' style={{backgroundColor:cardColor, color:fontColor }} >
        <div class="input-group mb-3">
          <input type="text" class="form-control" value={password} placeholder="Password"  aria-describedby="basic-addon2" ref={passwordRef} readOnly/>
          <div class="input-group-append">
            <button class="input-group-text" id="basic-addon2" onClick={copyToClipBoard} >Copy</button>
          </div>
        </div>
        <div class = "filters">
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <div class ="checkbox">
            <input  type="checkbox" 
            defaultChecked={number}
            id='numberInput'
            onChange={
              ()=>{
                setNumber((prev)=> ! prev);
              }
            }
            />
            <p>Number{length}</p>
          </div>

          <div class ="checkbox">
          <input  type="checkbox" 
            defaultChecked={charAllowed}
            id='numberInput'
            onChange={
              ()=>{
                setcharAllowed((prev)=> ! prev);
              }
            }
            />
            <p>Characters</p>
          </div>

          </div>   
        </div>
        <div  >
          <button className="UIbtn" onClick={ ()=>{
            setUIState(!UIState)
            UIChange()
          } }
             >Update UI</button>
        </div>

      </div>
  );
}

export default App;
