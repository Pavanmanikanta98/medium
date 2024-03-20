import { Quote } from "../components/Quotes"

import { SignIn } from "../components/SignIn"

export const Signin =()=>{
    return( <div className="grid grid-cols-1 lg:grid-cols-2"> 
      

      <SignIn />
    
     <div className="invisible lg:visible">
     <Quote />
     </div>
   
     
     
   </div>)
}
