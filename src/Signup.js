import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";

const formvalidationSchema = yup.object({
  username: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .required("UserName Required")
    .max(20),
  email: yup.string().email().required("Email Required"),
  password: yup
    .string()
    .required("Password Required")
    .min(8, "Password is too short")
    .matches(/[a-zA-Z]/),
  
});

export function Signup() {
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        Adduser(values).then(() => history.push("/signin"));
        console.log("onsubmit",values)
      },
    });

   async function Adduser(values){
    const data=await ("https://6166c4d613aa1d00170a66f1.mockapi.io/datauser/signup",{method:"POST",
    headers:{"Content-Type":"apllicaton/json"},
    body:JSON.stringify(values)
    })
  console.log(data);
  }
  return (
    <div className="main-container">
      <div className="signin">
        <form className="form" onSubmit={handleSubmit}>
          <header className="header">
            <b>Sign up</b>
          </header>
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <PersonIcon />
            <TextField
              label=" Enter User Name"
              id="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={errors.username && touched.username}
              type="text"
              variant="standard"
            />
          </Box>
          {errors.username && touched.username && errors.username}
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <EmailIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              label=" Enter Email Id"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              variant="standard"
            />
          </Box>
          {errors.email && touched.email && errors.email}
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              id="password"
              name="password"
              type="password"
              label=" Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              variant="standard"
            />
          </Box>
          {errors.password && touched.password && errors.password}
          <Button
            type="submit"
            value="signin"
            variant="contained"
            className="button"
          >
            <PersonAddIcon />
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
