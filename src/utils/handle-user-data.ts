import { FastifyRequest } from "fastify";
import { checkUserInDb } from "./check-user-in-db";
import { GithubUser } from "./get-github-user-data";

interface HandleUserDataArgs {
  req: FastifyRequest;
  userData: GithubUser | null;
}

export async function handleUserData({
  req,
  userData,
}: HandleUserDataArgs): Promise<boolean> {
  try {
    if (userData) {
      //check if user exists in db
      const doesUserExist = await checkUserInDb({ req, user: userData });

      //if user does not exist in db, insert user data into db
      if (!doesUserExist) {
        await req.server.sql`
    INSERT INTO oauth_users (login, url, github_id, first_login_date)
    VALUES (${userData?.login}, ${userData?.url}, ${userData?.id}, NOW())
    `;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
