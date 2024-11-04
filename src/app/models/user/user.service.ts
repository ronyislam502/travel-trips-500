import QueryBuilder from '../../builder/queryBuilder';

import { userSearchableFields } from './user.const';
import { TUser } from './user.interface';
import { User } from './user.model';

const signUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;
  return { meta, result };
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await User.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const UserServices = {
  signUpUserIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
};
