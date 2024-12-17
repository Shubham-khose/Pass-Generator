import {useEffect,useState,useCallback,useRef} from 'react'
export default function App() {
  let [length,setLength] = useState("5")
  let [num,setNum] = useState(false)
  let [char,setChar] = useState(false)
  let [pass,setPass] = useState("")
  let passWordGen = useRef(null)  // get reference of values in input boxes
  let passGen = useCallback(()=>{
    let password=''
    let string='"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"'
    if(num) string +="0123456789"
    if(char)string+="!@#$%^&*-_+=[]{}~`"

    for(let i=0;i< length;i++){
      let gen = Math.floor(Math.random() * string.length)
      password += string.charAt(gen)
    }
    setPass(password)
  },[length,num,char])  // depenencies use to store in cache memory for optimizing code
  let copyText = useCallback(()=>{
    passWordGen.current?.select()
    passWordGen.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(pass)
  },[pass])
  useEffect(()=>{passGen()},[length,num,char,setPass,passGen])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-yellow-500">
      <h1 className="text-3xl text-center text-white">PASSgen</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={pass}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passWordGen}
        />
      <button onClick={copyText} className="outline-none bg-green-500 text-white px-3 py-5 shrink-0">Copy</button>
      </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range"
        min={5}
        max={100}
        className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={num}
          id="numberInput"
          onChange={()=>{
            setNum((prev)=>!prev)
          }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
          <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={num}
          id="numberInput"
          onChange={()=>{
            setChar((prev)=>!prev)
          }}
          />
          <label htmlFor="numberInput">Character</label>
          </div>
      </div>
    </div>

    </>
  )
}