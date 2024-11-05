import { Post } from '../post/post.model';
import { User } from '../user/user.model';

const getStatisticsFromDB = async () => {
  const totalUsers = await User.countDocuments();
  const totalPremiumUsers = await User.countDocuments({ status: 'premium' });
  const totalBasicUsers = await User.countDocuments({ status: 'basic' });

  const totalContents = await Post.countDocuments();
  const totalInactiveContents = await Post.countDocuments({ isActive: false });

  const result = {
    totalUsers: totalUsers,
    totalPremiumUsers: totalPremiumUsers,
    totalBasicUsers: totalBasicUsers,
    totalContents: totalContents,
    totalActiveContents: totalContents - totalInactiveContents,
    totalInactiveContents: totalInactiveContents,
  };

  return result;
};

export const StatisticsServices = {
  getStatisticsFromDB,
};
