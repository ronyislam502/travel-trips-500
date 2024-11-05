import { Types } from 'mongoose';

export type TPost = {
  user: Types.ObjectId;
  content: string;
  image?: string;
  categories: string;
  upVotes: Types.ObjectId[];
  downVotes: Types.ObjectId[];
  tags: 'premium' | 'everyone';
  isDeleted: boolean;
};
