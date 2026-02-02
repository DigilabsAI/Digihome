export interface User {
  role: string;
  is_setup_done: boolean;
  title?: string;
  username: string;
  name: string;
  email: string;
  avatar_url?: string | null;
}