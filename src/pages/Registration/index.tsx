import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import styles from "./Registration.module.scss";

import { IRegister } from "../../models";

import { useForm, SubmitHandler } from "react-hook-form";

import { fetchRegister } from "../../store/reducers/actionsCreators";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { Navigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import Loader from "../../components/Loader";

const Registration = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.data);
  const { error, isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegister>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    const data = await dispatch(fetchRegister(values));
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
        <div className="registration">
          <Paper classes={{ root: styles.root }} elevation={3}>
            <Typography classes={{ root: styles.title }} variant="h5">
              Registration
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                type="email"
                {...register("email", { required: "Enter Password" })}
                className={styles.field}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                label="E-Mail"
                fullWidth
              />{" "}
              <TextField
                type="FullName or Nickname"
                {...register("fullName", {
                  required: "Enter Name or Nickname",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className={styles.field}
                error={!!errors.fullName?.message}
                helperText={errors.fullName?.message}
                label="Fullname"
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
                label="Password"
                fullWidth
              />
              <Button
                disabled={!isValid}
                variant="contained"
                type="submit"
                fullWidth
              >
                Register
              </Button>
              {error && <FormHelperText error={true}>{error}</FormHelperText>}
            </form>
          </Paper>
        </div>
      )}
    </>
  );
};

export default Registration;
