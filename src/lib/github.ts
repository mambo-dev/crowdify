import axios from "axios";
import qs from "qs";

type GitHubOauthToken = {
  access_token: string;
};

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: null;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

function getGithubCredentials() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT;

  if (!clientId || clientId.length === 0) {
    throw new Error("No github client Id set or client Id is empty");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No github client secret set or client secret is empty");
  }
  if (!redirect_uri || redirect_uri.length === 0) {
    throw new Error("Invalid redirect uri");
  }

  return {
    clientId,
    clientSecret,
    redirect_uri,
  };
}

export const getGithubOathToken = async ({
  code,
}: {
  code: string;
}): Promise<GitHubOauthToken> => {
  const rootUrl = "https://github.com/login/oauth/access_token";
  const options = {
    client_id: getGithubCredentials().clientId,
    client_secret: getGithubCredentials().clientSecret,
    code,
  };

  const queryString = qs.stringify(options);

  try {
    const { data } = await axios.post(`${rootUrl}?${queryString}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const decoded = qs.parse(data) as GitHubOauthToken;

    return decoded;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
};

export const getGithubUser = async ({
  access_token,
}: {
  access_token: string;
}): Promise<GitHubUser> => {
  try {
    const { data } = await axios.get<GitHubUser>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
};
