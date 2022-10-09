import { useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./Login.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { ILogin } from "../../models";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchLogin } from "../../store/reducers/actionsCreators";

import { Navigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import Loader from "../../components/Loader";

const Login = () => {
  const dispatch = useAppDispatch();

  const { error, isLoading } = useAppSelector((state) => state.auth);
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (data.meta.requestStatus === "rejected") {
      return;
    }
    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login">
          <Paper classes={{ root: styles.root }} elevation={3}>
            <Typography classes={{ root: styles.title }} variant="h5">
              Authorization
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                type="email"
                {...register("email", { required: "Enter E-Mail" })}
                className={styles.field}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                label="E-Mail"
                fullWidth
              />
              <TextField
                {...register("password", {
                  required: "Enter a password",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                })}
                className={styles.field}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
              />
              <FormControlLabel
                className={styles.label}
                label="Show password"
                control={<Checkbox onClick={onShowPassword} />}
              />
              <Button
                disabled={!isValid}
                variant="contained"
                type="submit"
                fullWidth
              >
                Enter
              </Button>
              {error && <FormHelperText error={true}>{error}</FormHelperText>}
            </form>
          </Paper>
        </div>
      )}
    </>
  );
};

export default Login;
