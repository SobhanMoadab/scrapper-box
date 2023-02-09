export type WordPressComment = {
  post: string;
  author_name: string;
  author_email: string;
  content: any;
};
export type TransferCommentDTO = {
  token: string;
  siteUrl: string;
  comment: WordPressComment;
};
