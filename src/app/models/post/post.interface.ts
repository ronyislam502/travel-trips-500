import { Types } from 'mongoose';

export type TPost = {
  user: Types.ObjectId;
  content: string;
  image?: string;
  categories: string;
  upVote: Types.ObjectId[];
  downVote: Types.ObjectId[];
  isPremium: boolean;
  isDeleted: boolean;
};
