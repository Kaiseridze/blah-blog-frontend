import { FC } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./Post.module.scss";

import { useAppDispatch } from "../../hooks";
import { fetchMe, removePosts } from "../../store/reducers/actionsCreators";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { IPost } from "../../models";
import formatDate from "../../utils/FormatDate";
import TextLength from "../../utils/TextLength";

const Post: FC<IPost> = ({
  title,
  imageUrl,
  _id,
  user,
  viewsCount,
  text,
  createdAt,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const remove = async () => {
    await dispatch(removePosts(_id));
    await dispatch(fetchMe());
  };

  return (
    <div className={styles.post}>
      <Card classes={{ root: styles.card }}>
        {isEditable ? (
          <div className={styles.card__icons}>
            <Link to={`/posts/${_id}/edit`}>
              <EditIcon
                classes={{ root: styles.card__icon }}
                className={styles.card__icon_edit}
              />
            </Link>
            <ClearIcon onClick={remove} classes={{ root: styles.card__icon }} />
          </div>
        ) : null}

        <CardHeader
          classes={{ root: styles.card__header }}
          title={user?.fullName}
          subheader={formatDate(createdAt)}
        />

        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:4444${imageUrl}`}
          alt="Here could be your picture"
        />

        <CardContent classes={{ root: styles.card__content }}>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
          <ReactMarkdown
            className={styles.card__text}
            children={TextLength(text)}
          />
        </CardContent>
        <CardActions disableSpacing classes={{ root: styles.card__button }}>
          <Link to={`/posts/${_id}`}>
            <Button size="small">Open</Button>
          </Link>
        </CardActions>
        <div className={styles.card__views}>
          <VisibilityOutlinedIcon />
          <strong>{viewsCount}</strong>
        </div>
      </Card>
    </div>
  );
};

export default Post;
