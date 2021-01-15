import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkAlreadySignedUpEmails = await this.usersRepository.findByEmail(
      email,
    );

    if (
      checkAlreadySignedUpEmails &&
      checkAlreadySignedUpEmails.id !== user.id
    ) {
      throw new AppError('Email already registered.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkPasswordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkPasswordMatch) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
