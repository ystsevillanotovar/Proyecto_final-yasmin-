export default function userTransformer(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}
