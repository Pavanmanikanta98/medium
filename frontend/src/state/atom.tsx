import { atom } from 'recoil';
import { AuthState } from '../hooks';
import {  UpdateBlogInput } from '@pavan098/blog-validation';  

export const authState = atom<AuthState>({
  key: 'authState',
  default: { user: null },
});





export const blogState = atom<UpdateBlogInput>({
    key: 'blogState',
    default: {
        thumbnail: '',
        content: '',
        picture: '',
        id: 420,
        
    },
});
