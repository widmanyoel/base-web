import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLoginMutation } from "../../stateManagement/apiSlices/userApi";
import * as userConstants from "./model/LoginConstants";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CardMedia, IconButton, InputAdornment } from "@mui/material";
import logoruway from '../../assets/logoruway.png';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import localize, { defineLocalizeBaseKey } from "../../utils/localizer";
import {saveToken }from "../../core/services/auth/Auth";

type Inputs = {
  identifier: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [token, setToken] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors = {} },
  } = useForm<Inputs>({ defaultValues: { identifier: "", password: "" } });

  const t = defineLocalizeBaseKey('login');

  const handleSubmitForm = (data: Inputs) => {
    //console.log(data);
    login(data)
      .unwrap()
      .then((res: any) => {
        saveToken(res.jwt)
        setToken(JSON.stringify(res))
        navigate('/products')
      })
      .catch((err: any) => {
        setToken(JSON.stringify(err));
      });
  };
  const [messageAlert, setMessageAlert] = useState<any>({
    isOpenAlert: false,
    type: 'error',
    message: '',
  })

  //mostar contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //traemos la imagen para el background
  const backgroundImage = require('../../assets/imagelogin.png');

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
      >
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={6}
            md={7}
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <CardMedia
                    component="img"
                    alt="My Image"
                    image={logoruway}
                    title="RuwayTech"
                    style={{ width: '200px', height: 'auto' }}
                  />
                </Grid>
              </Grid>
              <br />
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <Box
              >               
                <Controller
                  control={control}
                  name={userConstants.USER_NAME}
                  rules={{
                    required: {
                      value: true,
                      message: localize('requiredInput'),
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      autoComplete="off"
                      margin="normal"
                      {...field}
                      id={userConstants.USER_NAME}
                      label={t('userName')}
                      variant="outlined"
                      placeholder={t('userPlaceholder')}
                      error={!!errors[userConstants.USER_NAME]}
                      helperText={errors[userConstants.USER_NAME]?.message}
                    />
                  )}
                />                
                <Controller
                  control={control}
                  name={userConstants.PASSWORD}
                  rules={{
                    required: {
                      value: true,
                      message: localize('requiredInput'),
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      autoComplete="off"
                      margin="normal"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      id={userConstants.PASSWORD}
                      label={t('password')}
                      variant="outlined"
                      placeholder={t('passPlaceholder')}
                      error={!!errors[userConstants.PASSWORD]}
                      helperText={errors[userConstants.PASSWORD]?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#7E07F6" }} disabled={isLoading} >
                  {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                </Button>
              </Box>
              <Box>
                <p>widmanyoelb@outlook.com</p>
                <p>95Wybg95</p>
              </Box>
              {token}

            </Box>
          </Grid>
        </Grid>
      </form>

    </div>

  );
};

export default Login;
