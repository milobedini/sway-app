import { ThenThrow } from "../../../../../lib/then-throw";
import { PostTileData } from "./PostTileData";

export declare type PostListResponseDataItem = {
  id: number;
  author: { username: string };
  created_at: string | Date;
  title: string;
  views: number;
  text: string;
  category: string;
};

export const mapPostsTileData = (
  post: PostListResponseDataItem
): PostTileData => {
  const id = post.id ?? ThenThrow("id is missing");
  const author = post?.author.username;
  const created_at = post?.created_at;
  const title = post?.title;
  const views = post?.views;
  const text = post?.text;
  const category = post?.category;
  return {
    id,
    author,
    created_at,
    title,
    views,
    text,
    category,
  };
};
