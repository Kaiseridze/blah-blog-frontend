import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import CommentBlock from "../../components/CommentBlock";

import axios from "../../axios";
import Loader from "../../components/Loader";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createComment,
  getPostComments,
  removeComment,
} from "../../store/reducers/actionsCreators";
import Button from "../../components/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";

import styles from "./FullPost.module.scss";

const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [post, setPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const windowEndRef = useRef<HTMLInputElement>(null);

  const { comments, isCommentLoading } = useAppSelector(
    (state) => state.comment
  );
  const { data } = useAppSelector((state) => state.auth);

  const fetchPost = async () => {
    await axios.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
      setIsLoading(false);
    });
    await dispatch(getPostComments(id));
  };

  const onComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onRemove = (id: string | undefined, comment_id: string) => {
    dispatch(removeComment({ id, comment_id }));
  };

  const scrollToBottom = () => {
    windowEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async () => {
    setText("");
    await dispatch(createComment({ id, text }));
    await dispatch(getPostComments(id));
    scrollToBottom();
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.fullpost}>
          {post.imageUrl && (
            <img
              className={styles.fullpost__image}
              src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}
              alt="postImg"
            />
          )}

          <div className={styles.content}>
            <Typography
              classes={{ root: styles.content__title }}
              gutterBottom
              variant="h4"
            >
              {post?.title}
            </Typography>
            <ReactMarkdown
              className={styles.content__text}
              children={post.text}
            />
          </div>

          <div ref={windowEndRef} className={styles.comments}>
            {comments.length ? (
              <Typography
                className={styles.comments__typography}
                gutterBottom
                variant="h5"
              >
                Comments:{" "}
              </Typography>
            ) : (
              <Typography
                className={styles.comments__typography}
                gutterBottom
                variant="h5"
              >
                No one has left a comment yet, be the first!
              </Typography>
            )}
            <List>
              {comments?.map((comment) => (
                <CommentBlock
                  isLoading={isCommentLoading}
                  isEditable={
                    data?._id === comment?.user?._id ||
                    data?._id === post.user._id
                  }
                  onClick={() => onRemove(id, comment._id)}
                  key={comment._id}
                  {...comment}
                />
              ))}
            </List>
            {data ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  placeholder="Comment here..."
                  value={text}
                  onChange={onComment}
                  fullWidth
                  multiline
                  rows={4}
                />
                <Button
                  disabled={!text.trim().length}
                  className={text.trim().length ? "primary" : "disabled"}
                  onClick={onSubmit}
                >
                  Comment
                </Button>
              </form>
            ) : (
              <Typography>Please, sign in to comment</Typography>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FullPost;
