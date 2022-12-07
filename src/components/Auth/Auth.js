import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { signin, signup } from '../../actions/auth'

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  //Manual Login with token
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
        dispatch(signup(formData, history))
    }else{
        dispatch(signin(formData, history))

    }
    console.log(formData)
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({ type: 'AUTH', data: { result, token} });

        history.push('/')
    } catch (error) {
        console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("La connection au compte google à échoué. Réessayer plus tard")
}

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "S'inscrire" : "Se connecter"}
        </Typography>
        <form className={classes.from} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="Prénom"
                  handleChange={handleChange}
                  half
                />

                <Input
                  name="lastName"
                  label="Nom"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Adresse Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Mot de passe"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirmer mdp"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "S'inscrire" : "Se Connecter"}
          </Button>
          <GoogleLogin
            clientId="656412306637-ir3njoehf2fs65ois8jodommsckhg8ja.apps.googleusercontent.com"
            plugin_name='App Name that you used in google developer console API'

            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Se connecter avec Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Vous avez déja un compte? Se connecter"
                  : "Vous n'avez pas de compte? S'inscrire"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
