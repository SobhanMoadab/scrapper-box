export type WordPressPostComment = {
  post: string;
  author_name: string;
  author_email: string;
  content: any;
};
export type TransferCommentDTO = {
  siteUrl: string;
  contentType: string;
  token: string;
  comment: WordPressProductComment | WordPressPostComment;
};
export type WordPressProductComment = {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
};
