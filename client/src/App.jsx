import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import ReactMarkdown from 'https://esm.sh/react-markdown@10';
import './App.css'
import Loading from './Loading';
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)
  const [question,setQuestion]=useState("");
  let  [data,setData]=useState("");
  const [loadingstatus,setLoadingstatus]=useState(false);
    const handleSubmit=async(e)=>{
      e.preventDefault();
        setLoadingstatus(true);
       const response= await axios.post("http://localhost:5173/ask",{question});
       if(response.data.success){
           setData(response.data.reply);
           setLoadingstatus(false);
       }
    }
  return (
    <>
      <h1 className='text-center font-bold text-4xl mb-4'>chatbot</h1>
      <div className='max-w-[1320px] border-1 mx-auto grid grid-cols-[30%_auto] gap-5 p-5'>
      <form  onSubmit={handleSubmit} action=""className='p-4 shadow-lg'>
        <textarea value={question} onChange={(e)=>setQuestion(()=>setQuestion(e.target.value))} name="name"id="name"className='p-3 w-[100%] h-[200px] border-1'></textarea>
      <button className='bg-[#111115] text-white w-[100%] py-2 '>Enter to send</button>
      </form>
      <div className='border-l-1 border-[#ccc]'>
      <div className='h-[300px] text-left overflow-y-scroll p-3'>
        {loadingstatus ? <Loading/> : <ReactMarkdown>{data}</ReactMarkdown>}
      </div>
      </div>
      </div>
    </>
  )
}

export default App
