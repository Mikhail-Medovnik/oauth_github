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

export async function getGithubToken(
  code: string
): Promise<GithubTokenData | null> {
  try {
    const postData = {
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      code,
    };
    const postHeaders = { headers: { accept: "application/json" } };
    const response: AxiosResponse<GithubTokenData> = await axios.post(
      env.GITHUB_TOKEN_LINK,
      postData,
      postHeaders
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
