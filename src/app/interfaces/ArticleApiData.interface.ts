export interface Article {
  id: number;
  title: string;
  date: string;
  discription: string;
  article: string;
  views: number;
  category: number;
  route: string;
}

export interface ArticleApiData {
  totalItems: number;
  articles: Article[];
  category?: number;
}
