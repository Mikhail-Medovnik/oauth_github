import axios, { AxiosResponse } from "axios";

export async function getGithubUserData(
  userToken: string
): Promise<unknown | null> {
  try {
    const response: AxiosResponse<unknown> = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${userToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
