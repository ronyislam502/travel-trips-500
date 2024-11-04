import httpStatus from 'http-status';
import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { postSearch } from './post.cont';
import { TPost } from './post.interface';
import { Post } from './post.model';

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
  const sameUser = isPostExists.user;
  if (!sameUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'unAuthorized user');
  }

  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  deletePostFromDB,
  postUpdateIntoDB,
};
