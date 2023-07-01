import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
function Later({ info, navigate, toast }) {
  if (info.status === 'OK') {
    localStorage.setItem('userinfo', JSON.stringify(info))
    window.location.reload()
    navigate('/');
    toast({
      title: `${info.message}`,
      // status: 'success',
      // isClosable: true,
      // title: 'Account created.',
      position: 'top-right',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    console.log(info.message);
  } else {
    toast({
      title: `${info.message}`,
      position: 'top-right',
      status: 'error',
      isClosable: true,
    });
  }

  return (
    <></>
  )
};


export default function Login() {
  const [ticked, setticked] = useState(false);
  const [loading, setloading] = useState(true);
  const [info, setinfo] = useState(null);
  const toast = useToast()
  const navigate = useNavigate()
  // const [status1, setstatus1] = useState("");
  // const [message, setmessage] = useState("");
  // console.log("ticked", ticked)

  const handleSubmit = (event) => {
    event.preventDefault();
    setloading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const data = new FormData(event.currentTarget);
      axios.post('http://localhost:4000/loginuser', {
        email: data.get('email'),
        // name: data.get('fullName'),
        password: data.get('password'),
      }, config)
        .then((data1) => {
          setinfo(data1.data)
          console.log(info)
          setloading(false)
        })
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            {
              loading ? null : <><Later navigate={navigate} toast={toast} info={info} /></>
            }
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked={ticked} onClick={() => setticked(prev => !prev)} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}