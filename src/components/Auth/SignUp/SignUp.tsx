import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../redux/apis/auth.api";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FilteredUser } from "../../../types/FilteredUser";
import { useAppDispatch } from "../../../redux/app/hooks";
import { setAuthState } from "../../../redux/features/auth.slice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({palette: { mode: 'dark' }});

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  // lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

interface FormFields {
  firstName: string;
  bggName: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const [createUser] = useCreateUserMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      bggName: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values: FormFields, actions) => {
      setError([]);

      try {
        const response = (await createUser({
          firstName: values.firstName,
          bggName: values.bggName,
          email: values.email,
          password: values.password,
        }).unwrap()) as FilteredUser;
        dispatch(setAuthState({ user: response }));
        navigate("/");
      } catch (err: any) {
        if (err.status === 409 || err.status === 400) {
          if (typeof err.data.message === "string") {
            setError([err.data.message]);
          } else {
            setError([...err.data.message]);
          }
        } else {
          setError(["Something went wrong... try again later"]);
        }
        console.error(err.data);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, boxSizing: "border-box" }}
          >
            <Grid container spacing={0} sx={{ boxSizing: "border-box" }}>
              <Grid item xs={12} sm={6} sx={{ padding: "10px 10px 10px 0" }}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  autoComplete="given-name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: "10px 0 10px 10px" }}>
                <TextField
                  fullWidth
                  id="bggName"
                  name="bggName"
                  label="BGG Name"
                  value={formik.values.bggName}
                  onChange={formik.handleChange}
                  // error={
                  //   formik.touched.bggName && Boolean(formik.errors.bggName)
                  // }
                  // helperText={formik.touched.bggName && formik.errors.bggName}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "10px 0" }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  autoComplete="email"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "10px 0" }}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  // backgroundColor: "#ffb1b1",
                  color: "red",
                }}
              >
                {error.map((err, index) => (
                  <Typography
                    key={index}
                    component="p"
                    variant="body1"
                    sx={{
                      padding: "5px 10px",
                    }}
                  >
                    {err}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
