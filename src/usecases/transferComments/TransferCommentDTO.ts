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

export function isReview(
  object: WordPressPostComment | WordPressProductComment,
): object is WordPressProductComment {
  return (object as WordPressProductComment).product_id !== undefined;
}
export type WordPressProductComment = {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
};
