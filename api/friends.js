import fetch from "node-fetch";

export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  try {
    const resp = await fetch(`https://friends.roblox.com/v1/users/${id}/friends`);
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
