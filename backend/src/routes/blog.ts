import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify, decode } from 'hono/jwt'
import { CreateBlogInput,UpdateBlogInput, createBlogInput, updateBlogInput } from '@pavan098/blog-validation'
import { UnsupportedPathError } from "hono/router";

export const blogRouter = new Hono<{
    Bindings:{
     DATABASE_URL:string,
     JWT_SECRET:string
    }
    Variables:{
        //TODO number to string  for good 
        userId: number;
    }
}>();

//authentication..
blogRouter.use("/*",async(c,next)=>{
    //  :here extract the author id 
    try {
        const auth= c.req.header("Authorization") || "";
        // console.log("check "+auth)

    const user = await verify(auth,c.env.JWT_SECRET)
    
    if(!user){
        c.status(401)
        return c.json({
            message:"login avvu first.."
        })
    }
    c.set('userId',user.id);

    await next();
        
    } catch (er) {
        // console.log("\n"+er)
        c.status(401)
        return c.json({
            Message:"you are not loged in yet..."
        })
        
    }

    
})

//add blog
blogRouter.post('/',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
    const body = await c.req.json();
    const authorId= c.get("userId")
    try {

        const{ success }= createBlogInput.safeParse(body)
    if (!success){
      c.status(411);
      return c.json({
        message:"inputs are not valid"
      })
    }

       const blog =  await prisma.blog.create({
            data:{
                thumbnail : body.thumbnail,
                content: body.content,
                picture : body.picture,
                authorId:  authorId//add that extracted id form authentication

            }
        })
        return c.json({
            id: blog.id
        })
    } catch (er) {
        console.log(er);

        return c.text('!bloging(invalid entry)')
        
    }
    
  })

//add into(update)
blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
    const body = await c.req.json();
    try {

        const{ success }= updateBlogInput.safeParse(body)
        if (!success){
          c.status(411);
          return c.json({
            message:"inputs are not valid"
          })
        }

       const blog =  await prisma.blog.update({
        where:{
            id : body.id
        },
        data:{
                thumbnail : body.thumbnail,
                content: body.content,
                picture : body.picture,
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (er) {
        console.log(er);

        return c.text('!bloging(invalid entry)')
        
    }
    
  })


//   

  //TODO : add pagination
  // get all blogs
  blogRouter.get('/bulk',async(c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    
        }).$extends(withAccelerate())

        try {

            const blogs = await  prisma.blog.findMany({
                select:{
                    content:true,
                    thumbnail:true,
                    id: true,
                    author:{
                        select:{
                            username:true
                        }
                    }
                }
            });

            return c.json({
                blogs
            });
            
        } catch (er) {

            c.status(404);
            return c.json({
                Message:"Error while  fetching then blogs"
            })
            
        }
    })
 
  //get a blog by id
  blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      //TODO: parseInt to string
    const id =  parseInt(c.req.param('id'));
    try {

       const blog =  await prisma.blog.findFirst({
            where:{
                id : id
            },
            select:{
                id: true,
                content:true,
                thumbnail:true,
                author:{
                    select:{
                        username:true,
                        id:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (er) {
        console.log(er);
           c.status(404)
        return c.json({
            message:"Error while fetching the blog"
        })
        
    }

  })



  blogRouter.delete('/:id', async(c) =>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const id =  parseInt(c.req.param('id'));
  
   try {

    await prisma.blog.delete({
        where:{
            id:id
        }
       })
         c.status(200)
       return c.json({Message: "blog deleted successfully"})
    
   } catch (er) {

    // console.log({Message: "fail to delete the blog "})
    c.status(500)
       return c.json({Message:"fail to delete the blog "})
    
   }
      
  })