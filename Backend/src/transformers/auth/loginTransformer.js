export default function loginTransformer(data) {
  return {
    token: data.token,
    user: data.user,
  };
}
