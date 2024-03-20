import { SignUp } from "../components/SignUp"
import { Quote } from "../components/Quotes"



export const Signup =()=>{
    return( <div className="grid grid-cols-1 lg:grid-cols-2"> 
     <SignUp/>

      <div className="invisible lg:visible">
      <Quote />
      </div>
    
      
      
    </div>)
}