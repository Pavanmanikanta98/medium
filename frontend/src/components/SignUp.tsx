import {  SignupInput } from "@pavan098/blog-validation"
import { ChangeEvent,  useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../pages/config"
import { WarningCard } from "./WarningCard"


import {  useSetRecoilState } from "recoil"
import { AuthState } from "../hooks"
import { authState } from "../state/atom"


 

  export const SignUp =( )=> {
     const navigate = useNavigate()
     const [error, setError] = useState(false);
     
     const setAuth = useSetRecoilState<AuthState>(authState)
    // const [auth ,setAuth]=useRecoilState<AuthState>(authState)
    const [postInputs, setpostInputs]= useState<SignupInput>({
        name:"",
        username:"",
        gmail:"",
        password:"",
    })




   
    
     const data ={username:postInputs.username}
    
 
     async function sendRequest() {

      try {

        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
          const jwt = response.data;
          localStorage.setItem("token",jwt);
            
          setAuth({user:data})
          navigate("/blogs")
         
      } catch (er) {


         setError(true)
        //alert for :(
         
        
      }
      return( <div>
           
           {error && <WarningCard message="Failed to sign up" />}
         </div>)
      
     }
    return <div>
     
        <div className="h-screen flex justify-center  flex-col px-2">
        {/* {JSON.stringify(postInputs)} */}
            <div className="flex justify-center">

                <div>
               <div className="px-10">  
              <div className="text-4xl font-black">
            Create an account
             </div>
             <div className="text-slate-400 py-2 text-center">
                Already have an account ?<Link className="px-2 underline" to={"/signin"}> Login </Link> 
             </div>

             </div> 

             <div className="">

             

              <InputFields  label="name" placeHolder="pavan ...." onChange={(e)=>{
               setpostInputs((c)=>({
                ...c,
                name:e.target.value
               })

               )

              }} />

              <InputFields  label="Username" placeHolder="pavan123" onChange={(e)=>{
               setpostInputs((c)=>({
                ...c,
                username:e.target.value
               })

               )

              }} />
              <InputFields label="Gmail" placeHolder="gmail Address ...." onChange={(e)=>{

                setpostInputs({
                  ...postInputs,
                  gmail:e.target.value
                })

                }} />

              <InputFields label="Password" type={"password"} placeHolder="password" onChange={(e)=>{
                setpostInputs({
                  ...postInputs,
                  password:e.target.value
                })

              }} />

               <button  onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 w-full">Sign Up</button>    

                </div>

             </div>
            </div>
           

        </div>
    </div>
  }


    interface InputTypes{
        label: string,
        placeHolder : string,
        onChange (e: ChangeEvent<HTMLInputElement>):void ,
        type?:string
    }

  const InputFields=( { label , placeHolder, onChange , type }:InputTypes ) => {
    return  <div>
        <label  className="block text-sm font-medium text-lg text-gray-900 ">{label}</label>
       <input  onChange={ onChange } id="first_name" type={ type|| "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeHolder} required />
     </div>
  }