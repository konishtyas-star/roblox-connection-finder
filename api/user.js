import fetch from "node-fetch";

export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    const resp = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userNames: [username] }),
    });

    const data = await resp.json();
    if (data.data && data.data[0] && data.data[0].id)
      return res.status(200).json({ id: data.data[0].id });
    else return res.status(404).json({ error: "User not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
