import { FastifyRequest } from "fastify/types/request";
import { env } from "../env";
import { type GithubUser } from "./get-github-user-data";

interface CheckUserInDbArgs {
  req: FastifyRequest;
  user: GithubUser | null;
}

interface DbUserSchema {
  id: number;
  login: string;
  url: string;
  github_id: number;
  first_login_date: string;
}

const dbUserSchema: DbUserSchema = {
  id: 1,
  login: "",
  url: "",
  github_id: 1,
  first_login_date: "",
};

const b = 1123;

export async function checkUserInDb({
  req,
  user,
}: CheckUserInDbArgs): Promise<boolean | string | unknown> {
  if (!user) {
    console.log("User is not provided");
    return "User is not provided";
  }

  const a: any = await req.server.sql`
  SELECT * 
  FROM oauth_users 
  WHERE github_id=${b}
  `;

  return a;
}
