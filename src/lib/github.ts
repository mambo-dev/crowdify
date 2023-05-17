function getGithubCredentials() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("No github client Id set or client Id is empty");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No github client secret set or client secret is empty");
  }

  return {
    clientId,
    clientSecret,
  };
}
