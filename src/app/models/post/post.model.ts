import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    categories: {
      type: String,
      required: true,
    },
    upVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    downVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
postSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

postSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
export const Post = model<TPost>('Post', postSchema);
