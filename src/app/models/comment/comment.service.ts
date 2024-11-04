import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';
import QueryBuilder from '../../builder/queryBuilder';
import { Post } from '../post/post.model';

const createCommentByPostIntoDB = async (payload: TComment) => {
  const isPostExists = await Post.findById(payload.post);

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const result = await Comment.create(payload);

  return result;
};

const getAllCommentsByPostFromDB = async (
  payload: TComment,
  query: Record<string, unknown>,
) => {
  const isPostExists = await Comment.findById(payload.post);

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const commentQuery = new QueryBuilder(
    Comment.find().populate('post').populate('user'),
    query,
  ).sort();
  const result = await commentQuery.modelQuery;
  return result;
};

const updateCommentByPostIntoDB = async (
  id: string,
  payload: Partial<TComment>,
) => {
  const isCommentExists = await Comment.findById(id);

  if (!isCommentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  const isUser = isCommentExists.user;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const isPostExists = isCommentExists.post;

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const result = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCommentByPostFromDB = async (id: string) => {
  const isCommentExists = await Comment.findById(id);

  if (!isCommentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  const isUser = isCommentExists.user;
  if (!isUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }
  const result = await Comment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CommentServices = {
  createCommentByPostIntoDB,
  getAllCommentsByPostFromDB,
  updateCommentByPostIntoDB,
  deleteCommentByPostFromDB,
};
