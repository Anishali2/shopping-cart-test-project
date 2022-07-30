import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { Formik, Form } from "formik";
import { loginSchema } from "../Components/loginSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();
    const loginUser = (data) => {
        console.log(data);
        axios.post("https://api.escuelajs.co/api/v1/auth/login",data) .then(res => {
            localStorage.setItem("token", JSON.stringify(res.data.access_token));
            // alert("Login Successful");
            navigate("/")
        }
        ).catch(err => {
            alert("Email & Password incorrect");
        }
        );

    }

  return (

    

        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            loginUser(values);
          }}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            
          }) => (
            <>
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Login </h1>
              <FormControl
                fullWidth
                style={{ maxWidth: "400px" }}
                sx={{ m: 1 }}
              >
                <InputLabel htmlFor="outlined-adornment-amount" style={errors.email && touched.email? {color:"red"} : {color:"gray"}}>
                  Email
                </InputLabel>
                <OutlinedInput 
                 id="outlined-adornment-amount" label="Email" 
                 onChange={handleChange('email')}
                 onBlur={handleBlur('email')}
                 value={values.email}
                 error={errors.email && touched.email}
                 />

              </FormControl>

              <FormControl
                fullWidth
                style={{ maxWidth: "400px" }}
                sx={{ m: 1 }}
              >
                <InputLabel htmlFor="outlined-adornment-amount" style={errors.password && touched.password? {color:"red"} : {color:"gray"}}>
                  Password
                </InputLabel>
                <OutlinedInput id="outlined-adornment-amount"  label="Password" 
                 onChange={handleChange('password')}
                 onBlur={handleBlur('password')}
                 value={values.password}
                 error={errors.password && touched.password}

                 />
              </FormControl>

              {1 === 1 ? (
                  <Button
                  style={{width: "100%",maxWidth: "400px"}}
                  variant="contained"
                  size="medium"
                  onClick={() => handleSubmit()}
                  >
                  Login
                </Button>
              ) : (
                  <LoadingButton
                  loading
                  loadingPosition="end"
                  endIcon={<SaveIcon />}
                  variant="outlined"
                  >
                  Loading
                </LoadingButton>
              )}
              
            </div>
    </>
          )}
        </Formik>
     
  );
}
