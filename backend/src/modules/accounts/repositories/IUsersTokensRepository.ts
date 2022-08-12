import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserTokens } from '../entities/UserTokens'

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findByUsersIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>
  deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }
