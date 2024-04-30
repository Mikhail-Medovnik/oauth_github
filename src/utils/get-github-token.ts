import axios from "axios";
import { AxiosResponse } from "axios";
import { env } from "../env";

export interface GithubTokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: "bearer";
  scope: "";
}

interface GetGithubTokenArgs {
  code?: string;
  refreshToken?: string;
}

export async function getGithubToken({
  code,
  refreshToken,
}: GetGithubTokenArgs): Promise<GithubTokenData | null> {
  try {
    const accessTokenRequest = {
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      code,
    };

    const refreshTokenRequest = {
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const postHeaders = { headers: { accept: "application/json" } };
    const response: AxiosResponse<GithubTokenData> = await axios.post(
      env.GITHUB_TOKEN_LINK,
      accessTokenRequest.code ? accessTokenRequest : refreshTokenRequest,
      postHeaders
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
