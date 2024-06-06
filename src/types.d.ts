import { MouseEventHandler } from "react";

export interface Link {
  id: string;
  original_url: string;
  shortened_url?: string;
  createdAt: Date;
  expiresAt: Date;
  creator?: string;
  clicks: number;
}

export interface UserData {
  id: string;
  email: string;
  avatar_url: string;
  user_name: string;
  links: Array<Link>;
}

export interface LinkUtilBtn {
  onClickFn: () => void;
}