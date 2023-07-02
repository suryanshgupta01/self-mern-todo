import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const defaultTheme = createTheme();
function Later({ info, navigate, toast }) {
  console.log("info", info)
  if (info.status === 'OK') {
    localStorage.setItem('userinfo', JSON.stringify(info))
    navigate('/');
    toast({
      title: `${info.message}`,
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

export default function Signup() {

  const [data3, setdata3] = useState();
  // const navigate = useNavigate()
  const [loading, setloading] = useState(true);
  const [info, setinfo] = useState(null);
  const toast = useToast()
  const navigate = useNavigate()

  const [postImage, setPostImage] = useState({ myFile:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100' })

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostImage({ myFile: reader.result });
    };
    reader.readAsDataURL(file);
    // const base64 = convertToBase64(file);
    console.log(postImage)
    // setPostImage({ ...postImage, myFile: base64 })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('image', postImage.myFile)
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   name: data.get('fullName'),
    // });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post('http://localhost:4000/registeruser', {
      name: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
      image: postImage.myFile
    }, config).then((data1) => {
      setdata3(data1.data)
      console.log(data1.data)
      setloading(false)
    }).catch((err) => {
      console.log("error", err)
    })
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
              loading ? null : <><Later navigate={navigate} toast={toast} info={data3} /></>
            }
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="rem to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <label htmlFor="file-upload" className='custom-file-upload'>
                <img src={postImage.myFile } style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} alt="IMG here" />
              </label>

              <input
                type="file"
                label="Image"
                name="myFile"
                id='file-upload'
                accept='.jpeg, .png, .jpg'
                onChange={(e) => handleFileUpload(e)}
              />
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
                <Link to='/login' variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}