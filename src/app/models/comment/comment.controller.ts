import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { CommentServices } from './comment.service';

const createCommentByPost = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentByPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post by comment successfully',
    data: result,
  });
});

const getAllCommentsByPost = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsByPostFromDB(
    req.body,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post by comment retrieved successfully',
    data: result,
  });
});

const updateCommentByPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.updateCommentByPostIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post by comment update successfully',
    data: result,
  });
});

const deleteCommentByPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.deleteCommentByPostFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post by comment delete successfully',
    data: result,
  });
});

export const CommentControllers = {
  createCommentByPost,
  updateCommentByPost,
  getAllCommentsByPost,
  deleteCommentByPost,
};
