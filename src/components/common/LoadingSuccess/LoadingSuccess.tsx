import { useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import * as React from "react";

interface Props {
  message: string;
}
const theme = createTheme({palette: { mode: 'dark' }});

export const LoadingSuccess = (props: Props) => {
  const navigate = useNavigate();
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
          {props.message}
        </Typography>
        <Box
            component="form"
            noValidate
            onSubmit={()=>navigate("/")}
            sx={{ mt: 1 }}
        >
          <Grid item xs={12} sx={{ padding: "10px 0", margin: "15px 0" }}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                // sx={{ mt: 3, mb: 2 }}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};
