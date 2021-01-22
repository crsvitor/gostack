import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const { token } = request.query;
    const { password, token } = request.body;

    // console.log(token);

    // const tokenTyped = token as string;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      // token: tokenTyped,
      token,
      password,
    });

    return response.status(204).json();
  }
}
