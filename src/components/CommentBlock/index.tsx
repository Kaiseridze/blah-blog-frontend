import { FC } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";


import styles from "./CommentBlock.module.scss";

import { ICommentBlock } from "../../models";

const CommentBlock: FC<ICommentBlock> = ({
  text,
  user,
  onClick,
  isEditable,
}) => {
  return (
    <>
      <ListItem classes={{ root: styles.comment }} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={`${process.env.REACT_APP_API_URL}${user?.avatarUrl}`} />
        </ListItemAvatar>

        <ListItemText primary={user?.fullName} secondary={text} />
        {isEditable && (
          <ClearIcon
            classes={{ root: styles.comment__clear }}
            onClick={onClick}
          />
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentBlock;
