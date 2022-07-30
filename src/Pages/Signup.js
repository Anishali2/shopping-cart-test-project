import * as React from "react";
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
import { signupSchema } from "../Components/loginSchema";
import axios from "axios";

export default function Signup() {

  const [loading, setLoading] = React.useState(false);
    const signUpUser = (data) => {
      setLoading(true)
        console.log(data);
        axios.post("https://fakse-store-api.herokuapp.com/api/v1/users",data) .then(res => {
            alert("Login Successful");
            setLoading(false)

        }
        ).catch(err => {
            alert("Email Already Exists");
            setLoading(false)

        }
        );
    }

  return (

    

        <Formik
          validationSchema={signupSchema}
          enableReinitialize={true}
          initialValues={{ name:"",email: "", password: "",role:"user",avatar:"https://api.lorem.space/image/face?w=640&h=480&r=6914" }}
          onSubmit={(values) => {
            signUpUser(values);
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
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
            <h1>Signup </h1>
              <FormControl
                fullWidth
                style={{ maxWidth: "400px" }}
                sx={{ m: 1 }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Name
                </InputLabel>
                <OutlinedInput 
                 id="outlined-adornment-amount" label="Name" 
                 onChange={handleChange('name')}
                 onBlur={handleBlur('name')}
                 value={values.name}
                 error={errors.name && touched.name}
                 />

              </FormControl>
              <FormControl
                fullWidth
                style={{ maxWidth: "400px" }}
                sx={{ m: 1 }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
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
                <InputLabel htmlFor="outlined-adornment-amount">
                  Password
                </InputLabel>
                <OutlinedInput id="outlined-adornment-amount" label="Password" 
                 onChange={handleChange('password')}
                 onBlur={handleBlur('password')}
                 value={values.password}
                 error={errors.password && touched.password}

                 />
              </FormControl>
              

              {!loading ? (
                  <Button
                  variant="contained"
                  size="medium"
                  onClick={() => handleSubmit()}
                  >
                  Signup
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
