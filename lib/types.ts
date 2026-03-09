export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
};

export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  profiles: Profile;
  likes: { count: number }[];
  comments: { count: number }[];
  user_has_liked?: boolean;
};

export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  profiles: Profile;
};
