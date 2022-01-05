import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const formvalidationSchema = yup.object({
  email: yup.string().required("Email Required"),
  password: yup
    .string()
    .min(8, "password too short")
    .max(12, "Password is too long")
    .required("Password Required"),
});

export function Signin() {
  const history = useHistory();
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        Login(values).then(() => history.push("/signup"));
        console.log("onsubmit",values)
      },
    });

    async function Login(values){
     const data=await fetch("https://6166c4d613aa1d00170a66f1.mockapi.io/datauser/signin",{method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(values)
     })
     console.log(data);
     

    
  };
  return (
    <div className="main-container">
      <div className="signin">
        <form className="form" onSubmit={handleSubmit}>
          <header className="header">
            <b>LOG IN</b>
          </header>
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <EmailIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              id="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="standard"
              label="Email-ID"
              error={errors.email && touched.email}
            />
          </Box>
          {errors.email && touched.email && errors.email}
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard"
              value={values.password}
              error={errors.password && touched.password}
            />
          </Box>
          {errors.password && touched.password && errors.password}
          <Button
            type="submit"
            value="signin"
            variant="contained"
            className="button" onClick={()=>history.push("/signin")}
          >
            <LoginIcon />
            Log In
          </Button>
          <Link onClick={() => history.push("/forgotpassword")}>
            Forgot Password ?
          </Link>
          <Divider />
          <div className="media">
            <Button
              type="submit"
              value="signin"
              variant="outlined"
              className="button"
            >
              <GoogleIcon />
              Sign in with Gooogle
            </Button>
            <Button
              type="submit"
              value="signin"
              className="button"
              onClick={() => history.push("/signup")}
              variant="contained"
            >
              <PersonAddAlt1Icon /> SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
