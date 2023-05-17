import axios from "axios";

interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect_uri = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("No google client Id set or client Id is empty");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No google client secret set or client secret is empty");
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

export const getGoogleOauthToken = async ({
  code,
}: {
  code: string;
}): Promise<GoogleOauthToken> => {
  const rootURl = "https://oauth2.googleapis.com/token";
  const options = {
    code,
    client_id: getGoogleCredentials().clientId,
    client_secret: getGoogleCredentials().clientSecret,
    redirect_uri: getGoogleCredentials().clientSecret,
    grant_type: "authorization_code",
  };

  try {
    const { data } = await axios.post<GoogleOauthToken>(
      rootURl,
      JSON.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log("failed to get token");
    throw new Error(error);
  }
};

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log("failed to get user");
    throw new Error(error);
  }
}
