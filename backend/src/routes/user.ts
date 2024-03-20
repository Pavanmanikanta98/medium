import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify, decode } from 'hono/jwt'
import { signinInput, signupInput } from '@pavan098/blog-validation'


export  const userRouter = new Hono<{
    Bindings:{
     DATABASE_URL:string,
     JWT_SECRET:string
    }
}>();



userRouter.post('/signup', async(c) => {
    ///here..
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json();

   
    // TODO add zod and password encrytion
  try {

    const{ success }= signupInput.safeParse(body)
    if (!success){
      c.status(411);
      return c.json({
        message:"inputs are not valid"
      })
    }
  
    const user = await prisma.user.create({
      data:{
        username:body.username,
        name:body.name,
        password:body.password,
        gmail: body.gmail
      }
    })
    const jwt = await sign({
      id: user.id,
  
    },c.env.JWT_SECRET)
  
    console.log(body.username);
  
    return c.text(jwt)
  
    
  } catch (e) {
    console.log(e)
     c.status(411);
    return c.text("invalid credentials");
    
  }
    
   
  })
  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    try {
       const{ success }= signinInput.safeParse(body)
     if (!success){
      c.status(411);
      return c.json({
        message:"inputs are not valid"
      })
    }
  
      const user = await prisma.user.findFirst({
        where:{
         
  
           gmail:body.gmail,
          
          password:body.password
        }
      })
      if (!user){
        c.status(403);
        return c.text("invalid credentialss");
  
      }
      const jwt = await sign({
        id: user.id,
    
      },c.env.JWT_SECRET)
    
      console.log(body.username);
    
      return c.text(jwt)
    
      
    } catch (e) {
      console.log(e)
       c.status(411);
      return c.text("invalid credentials");
      
    }
   
  })