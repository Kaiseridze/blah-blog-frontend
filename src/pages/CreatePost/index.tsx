import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./CreatePost.module.scss";

import { useAppSelector } from "../../hooks";
import axios from "../../axios";

const CreatePost = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const isEditing = Boolean(id);

  const isAuth = useAppSelector((state) => state.auth.data);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      alert("Ошибка при загрузке картинки!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChangeText = useCallback((value: string) => {
    setText(value);
  }, []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Write your magnum opus...",
      status: false,
      previewRender: function (plainText: string) {
        return ReactDOMServer.renderToString(
          <ReactMarkdown
            className={styles.markdown}
            rehypePlugins={[rehypeRaw]}
            children={plainText}
          />
        );
      },
    }),
    []
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        imageUrl,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      if (_id) {
        redirect(`/posts/${_id}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      return setError(error.response.data);
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
      });
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Paper style={{ padding: 30 }}>
        <Button
          className={styles.buttons}
          onClick={() => inputFileRef.current!.click()}
          variant="outlined"
          size="large"
        >
          Upload preview
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              className={styles.buttons}
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Delete
            </Button>
            <img
              className={styles.image}
              src={`http://localhost:4444${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}

        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          value={title}
          onChange={onChangeTitle}
          placeholder="Title"
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChangeText}
          options={options}
        />
        {error &&
          error.map((err: any) => (
            <Typography key={err.msg} color={"red"}>
              {err.msg}
            </Typography>
          ))}
        <div className={styles.buttons}>
          <Button
            disabled={isLoading}
            onClick={onSubmit}
            size="large"
            variant="contained"
          >
            {isEditing ? "Save" : "Publish"}
          </Button>
          <Link to="/">
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </Paper>
    </>
  );
};

export default CreatePost;
