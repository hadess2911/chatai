const API = "https://long-forest-6d6b.kailcongvinh.workers.dev";

// Tạo sessionId 1 lần
let sessionId = localStorage.getItem("sid");
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sid", sessionId);
}

async function send(text) {
  const url =
    `${API}?q=${encodeURIComponent(text)}&sid=${sessionId}`;

  const res = await fetch(url);
  const aiText = await res.text();

  add("ai", aiText);
}
