import axios, { AxiosResponse } from "axios";

export interface GithubUser {
  id: number;
  login: string;
  url: string;
}

export async function getGithubUserData(
  userToken: string
): Promise<GithubUser | null> {
  try {
    const response: AxiosResponse<GithubUser> = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${userToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
