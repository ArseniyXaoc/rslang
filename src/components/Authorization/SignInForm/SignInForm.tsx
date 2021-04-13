import React, { useState } from "react";

import { Link as RouterLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { RootState } from "../../../redux/reducer";
import { signIn, UserType } from "../../../redux/user_reducer";
import API_URL from "../../Constants/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    // height: "72vh",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const getUser = async (userId, token) => {
  const rawResponse = await fetch(`${API_URL}users/${userId}`, {
    method: "GET",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (rawResponse.ok) {
    const user = await rawResponse.json();
    return user;
  }
  return null;
};

type Props = {
  singIn: (value: UserType) => void;
}

function SignIn({ signIn }) {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loginResult, setLoginResult] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: "onTouched",
  });
  const onSubmit = async (data, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const rawResponse = await fetch(`${API_URL}signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (rawResponse.status === 200) {
      const authData = await rawResponse.json();
      const userData = await getUser(authData.userId, authData.token);
      if (userData) {
        signIn({
          ...userData,
          token: authData.token,
          refreshToken: authData.refreshToken,
        });
        setLoginResult({
          success: `hello ${userData.email}`,
        });
        history.push("/");
      } else {
        setLoginResult({
          error: "something went wrong, try again",
        });
      }
    } else {
      setLoginResult({
        error: "Incorrect e-mail or password",
      });
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextField
            error={!!errors?.email}
            helperText={errors.email && "required field"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={
              register({
                required: true,
              })}
          />
          <TextField
            error={!!errors?.password}
            helperText={errors.password && "required field"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={
              register({
                required: true,
              })}
          />
          {/*           <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {loginResult?.error && < Alert severity="error">{loginResult.error}</Alert>}
          {/* {loginResult?.success && < Alert severity="success">{loginResult.success}</Alert>} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>

          <Grid container>
            {/*             <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >

    </Container >
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
