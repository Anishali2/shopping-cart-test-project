 import  * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email("Invalid").required("Required"),
    password: Yup.string().required("Password is required"),
  });
  
export const signupSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Required"),
    avatar: Yup.string().required("Required"),
  });