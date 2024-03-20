import z from 'zod'

export const signupInput = z.object({
    username: z.string(),
    gmail: z.string().email(),
    password : z.string().min(7),
    name :    z.string().optional()

});


export const signinInput = z.object({
    username :  z.string(),
     gmail    :  z.string().email(),
    password :  z.string().min(7)
});

export const  createBlogInput = z.object({
    picture: z.string().optional(),
    thumbnail : z.string(),
    content : z.string()
    
})

export const updateBlogInput = z.object({
    picture: z.string().optional(),
    thumbnail : z.string(),
    content : z.string(),
    id : z.number()

})



//type inference    in zod 

export type SignupInput = z.infer< typeof signupInput >
export type SigninInput = z.infer< typeof signinInput >
export type CreateBlogInput = z.infer< typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
