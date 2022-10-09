import React from "react";

// Redux interfaces
export interface IPostFetch {
  posts: any;
  isLoading: boolean;
  error: String;
}

export interface IAuthFetch {
  data: null | any;
  isLoading: boolean;
  error: string;
}

export interface ICommentFetch {
  comments: any[];
  isLoading: boolean;
  error: String;
}

// React interfaces
export interface IButton {
  className: string;
  children: React.ReactNode;
  onClick?: any;
  type?: any;
  disabled?: boolean;
}

export interface ILogin {
  email: string;
  password: string;
  rejectedWithValue: any;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
}

export interface IPost {
  text: string;
  title: string;
  viewsCount: number;
  imageUrl: string;
  _id: string;
  createdAt: string;
  user: IUser;
  isEditable: boolean;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface IComment {
  text: string;
  user?: IUser;
  id: number;
}

export interface ICommentBlock {
  text: string;
  user: IUser;
  onClick: React.MouseEventHandler<HTMLButtonElement | SVGSVGElement>;
  isEditable: boolean;
}

export interface INavLinks {
  onClick: React.MouseEventHandler<HTMLButtonElement | SVGSVGElement | HTMLLIElement>;
  isAuth: boolean;
}
