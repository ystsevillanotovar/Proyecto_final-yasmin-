export default async function statusCheck(req, res) {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
