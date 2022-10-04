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
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import {apiUrl} from "../../../config/apiUrl";
import {LoadingSuccess} from "../../common/LoadingSuccess/LoadingSuccess";
import {CustomSpinner} from "../../common/CustomSpinner/CustomSpinner";

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
        MUI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({palette: { mode: 'dark' }});

const validationSchema = yup.object({
  password: yup
    .string()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        "Passwords must contain at least 1 upper and 1 lower case and at least 1 number or special character",
    })
    .required("Please enter new password"),
  rePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

interface FormFields {
  password: string;
  rePassword: string;
}

interface Props {
  token: string | null;
  activateOrReset?: string;
}
export const PasswordChange = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormFields, actions) => {

      if(props.activateOrReset === 'activate') {
        setLoading(true);
        try {
          const res = await fetch(`${apiUrl}/auth/activate?token=${props.token}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...values,
            }),
          });

          const dataFormRes = await res.json();
          if (dataFormRes.statusCode !== 200) {
            if (dataFormRes.statusCode === 401) {
              setError('Brak autoryazji, skontaktuj się z supportem aby narpawić problem.');
            } else {
              setError(dataFormRes.message);
            }
          }
          if (dataFormRes.statusCode === 200) {
            // setSuccess(dataFormRes.message);
            console.log(dataFormRes.message);
          }
        } finally {
          setLoading(false);
        }
      }

      if(props.activateOrReset === 'reset') {
        setLoading(true);
        try {
          const res = await fetch(`${apiUrl}/auth/reset-password?token=${props.token}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...values,
            }),
          });

          const dataFormRes = await res.json();
          if (dataFormRes.statusCode !== 200) {
            if (dataFormRes.statusCode === 401) {
              setError('Brak autoryazji, skontaktuj się z supportem, aby narpawić problem.');
            } else {
              setError(dataFormRes.message);
            }
          }
          if (dataFormRes.statusCode === 200) {
            setSuccess(dataFormRes.message);
          }
        } finally {
          setLoading(false);
        }
      }

    }
    });
  if (success !== '') {
    return <LoadingSuccess message={success}/>;
  }

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
            Change password
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={0} sx={{ boxSizing: "border-box" }}>
              <Grid item xs={12} sx={{ padding: "10px 0" }}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "10px 0" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="rePassword"
                  name="rePassword"
                  label="Repeat Password"
                  autoComplete="current-password"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  error={
                    formik.touched.rePassword &&
                    Boolean(formik.errors.rePassword)
                  }
                  helperText={
                    formik.touched.rePassword &&
                    formik.errors.rePassword
                  }
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ padding: "10px 0", margin: "15px 0" }}>
                {loading ? <CustomSpinner/> : <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // sx={{ mt: 3, mb: 2 }}
                >
                  Change password
                </Button>}
              </Grid>
              <Grid item xs>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Remember password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
