import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { PostServices } from './post.Service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.postUpdateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post update successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post delete successfully',
    data: result,
  });
});

const upVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req.params;
  const result = await PostServices.upVotePostIntoDB(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top 3 posts retrieved successfully',
    data: result,
  });
});

const downVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req.params;
  const result = await PostServices.downVotePostIntoDB(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top 3 posts retrieved successfully',
    data: result,
  });
});

const popularPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getPopularPostsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top 3 posts retrieved successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  popularPosts,
  upVote,
  downVote,
};
