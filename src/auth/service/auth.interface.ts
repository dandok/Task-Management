import { AuthCredentialsDTO } from "../dto/auth-credentials.dto";

export default interface IAuthService {
  signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}>;
  signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>;
}