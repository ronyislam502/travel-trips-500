import httpStatus from 'http-status';
import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { postSearch } from './post.cont';
import { TPost } from './post.interface';
import { Post } from './post.model';
import { Types } from 'mongoose';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('user'), query)
    .search(postSearch)
    .filter()
    .sort()
    .fields();
  const result = await postQuery.modelQuery;

  return {
    result,
  };
};

const postUpdateIntoDB = async (id: string, payload: Partial<TPost>) => {
  const isPostExists = await Post.findById(id);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deletePostFromDB = async (id: string, payload: TPost) => {
  const isExists = await Post.findById(id);
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const isUser = payload.user;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'unAuthorized access');
  }

  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const upVotePostIntoDB = async (id: string, user: string) => {
  const postData = await Post.findById(id);
  if (!postData) {
    throw new Error('Post not available!');
  }
  const userObjectId = new Types.ObjectId(user);

  const isDownVoted = postData.downVotes.includes(userObjectId);
  if (isDownVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: user },
    });
  }
  const isVoted = postData.upVotes.includes(userObjectId);
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: user },
    });
    return result;
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { upVotes: user },
    });
    return result;
  }
};

const downVotePostIntoDB = async (id: string, user: string) => {
  const postData = await Post.findById(id);
  if (!postData) {
    throw new Error('Post not available!');
  }
  const userObjectId = new Types.ObjectId(user);
  const isUpVoted = postData.upVotes.includes(userObjectId);
  if (isUpVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: user },
    });
  }
  const isVoted = postData.downVotes.includes(userObjectId);
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: user },
    });
    return result;
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { downVotes: user },
    });
    return result;
  }
};

const getPopularPostsFromDB = async () => {
  const result = await Post.aggregate([
    {
      $addFields: {
        upVotesCount: { $size: '$upVotes' }, // Add a field to calculate the length of the upVotes array
      },
    },
    {
      $sort: { upVotesCount: -1 }, // Sort by the length of the upVotes array in descending order
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        images: 0,
        downVotes: 0,
        commentsCount: 0,
        category: 0,
        comments: 0,
        'user.email': 0,
        'user.followers': 0,
        __v: 0,
      },
    },
  ]);
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  deletePostFromDB,
  postUpdateIntoDB,
  upVotePostIntoDB,
  downVotePostIntoDB,
  getPopularPostsFromDB,
};
