export interface NewsItem {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  rating: number;
  votes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
}