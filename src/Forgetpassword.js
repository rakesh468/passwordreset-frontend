import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const formvalidationSchema = yup.object({
  email: yup.string().email().required("Email Required"),
});

export function Forgotpassword() {
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        forgot(values).then((x) => history.push("/reset-password"));
        console.log("Onsubmit", values);
      },
    });

  const URL = `https://6166c4d613aa1d00170a66f1.mockapi.io/users`;
  const forgot = async (values) => {
    const response = await fetch(`${URL}/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  };

  return (
    <div className="main-container">
      <div className="signin">
        <form className="form" onSubmit={handleSubmit}>
          <header className="header">Forgot password</header>
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <TextField
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              variant="standard"
              label=" Enter Email"
            />
          </Box>
          {errors.email && touched.email && errors.email}
          <Button
            type="submit"
            value="signin"
            className="button"
            variant="contained"
            onClick={() => history.push("/signin")}
          >
            Send Mail
          </Button>
        </form>
      </div>
    </div>
  );
}
