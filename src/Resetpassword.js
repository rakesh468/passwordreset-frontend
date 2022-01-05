import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const formvalidation = yup.object({
  password: yup
    .string()
    .required("Password Required")
    .min(8, "Password is too short")
    .matches(/[a-zA-Z]/),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export function Resetpassword() {
  const { handleChange, handleBlur, values, errors, handleSubmit, touched } =
    useFormik({
      initialValues: { password: "", passwordConfirmation: "" },
      validationSchema: formvalidation,
      onSubmit: (values) => {
        console.log("onSubmit", values);
      },
    });

  return (
    <div className="main-container">
      <div className="signin">
        <form classNane="form" onSubmit={handleSubmit}>
          <header className="header">Reset Password</header>
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <TextField
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              error={errors.password && touched.password}
              variant="filled"
              label="Enter old password"
            />
          </Box>
          {errors.password && touched.password && errors.password}
          <Box
            className="input"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              label="Enter New password"
              variant="filled"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordConfirmation}
              error={
                errors.passwordConfirmation && touched.passwordConfirmation
              }
            />
          </Box>
          <Button
            type="submit"
            value="signin"
            variant="contained"
            className="button"
          >
            Reset Passsword
          </Button>
        </form>
      </div>
    </div>
  );
}
