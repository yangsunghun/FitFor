export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  upload_place: string;
  season_tag: string[];
  body_size: number[];
  created_at: string;
  longitude: string;
  latitude: string;
  view: number;
  likes: number;
  bookmarks: number;
  comments: number;
  thumbnail: string;
};
