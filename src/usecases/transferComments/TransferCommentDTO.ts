export type WordPressProductComment = {
  post: string;
  author_name: string;
  author_email: string;
  content: any;
};
export type TransferCommentDTO = {
  siteUrl: string;
  contentType: string;
  token: string;
  comment: WordPressProductComment;
};
export type WordPressPostComment = {
  product_id: string;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
};
