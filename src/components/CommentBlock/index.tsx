import { FC } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ClearIcon from "@mui/icons-material/Clear";
import Skeleton from "@mui/material/Skeleton";

import styles from "./CommentBlock.module.scss";

import { ICommentBlock } from "../../models";

const CommentBlock: FC<ICommentBlock> = ({
  text,
  user,
  onClick,
  isEditable,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton>
          <List>
            <ListItem></ListItem>
          </List>
        </Skeleton>
      ) : (
        <List>
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
        </List>
      )}
    </>
  );
};

export default CommentBlock;
