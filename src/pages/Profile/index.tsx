import { useRef, useState, useEffect, useCallback } from "react";

import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Button from "../../components/Button";

import Loader from "../../components/Loader";
import axios from "../../axios";
import { useAppSelector, useAppDispatch } from "../../hooks";

import styles from "./Profile.module.scss";
import { fetchMe, fetchPosts } from "../../store/reducers/actionsCreators";
import Post from "../../components/Post";

const Profile = () => {
  const dispatch = useAppDispatch();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { data, isLoading } = useAppSelector((state) => state.auth);

  const onChangeAvatar = useCallback(async () => {
    try {
      await axios.patch("/auth/me", { avatarUrl });
      setAvatarUrl("");
    } catch (error) {
      alert("Ошибка при смене аватара");
    }
  }, [avatarUrl]);

  const fetchProfile = () => {
    dispatch(fetchPosts({ page: 1 }));
    dispatch(fetchMe());
  };

  const onRemoveAvatar = async () => {
    try {
      await axios.delete("/auth/me");
      dispatch(fetchMe());
    } catch (error) {
      alert("Ошибка при удалении аватара");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [onChangeAvatar]);

  if (!window.localStorage.getItem("token") && !data) {
    return <Navigate to="/" />;
  }

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("upload", formData);
      setAvatarUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке картинки!");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Paper className={styles.profile}>
            <Avatar
              className={styles.profile__avatar}
              onClick={() => avatarRef.current!.click()}
              sx={{ width: 100, height: 100 }}
              src={`${process.env.REACT_APP_API_URL}${
                avatarUrl ? avatarUrl : data?.avatarUrl
              }`}
            ></Avatar>
            <Typography>Email: {data?.email}</Typography>
            <Typography>Name: {data?.fullName}</Typography>
            <input
              onChange={handleChangeFile}
              ref={avatarRef}
              type="file"
              hidden
            />
            {avatarUrl && (
              <Button className="primary" onClick={onChangeAvatar}>
                Submit change
              </Button>
            )}

            {data?.avatarUrl && (
              <Button className="tertiary" onClick={onRemoveAvatar}>
                Delete avatar
              </Button>
            )}

            <Typography sx={{ marginTop: 5, marginBottom: 5 }}>
              Click on your avatar to change it
            </Typography>
          </Paper>
          <Typography variant="h5" sx={{ marginTop: 5 }}>
            Your Posts:
          </Typography>
          <div className={styles.profile__posts}>
            {data?.posts?.map((post: any) => (
              <Post isEditable={true} key={post._id} {...post} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
