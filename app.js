const API = "https://long-forest-6d6b.kailcongvinh.workers.dev";

// Tạo sessionId (1 lần duy nhất)
let sessionId = localStorage.getItem("sid");
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sid", sessionId);
}

const chat = document.getElementById("chat");

function add(role, text) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const input = document.getElementById("prompt");
  const text = input.value.trim();
  if (!text) return;

  add("user", text);
  input.value = "";

  try {
    const url =
      `${API}?q=${encodeURIComponent(text)}&sid=${encodeURIComponent(sessionId)}`;

    const res = await fetch(url);
    const aiText = await res.text();

    add("ai", aiText);
  } catch (e) {
    add("ai", "❌ Lỗi kết nối");
  }
}

function newChat() {
  localStorage.removeItem("sid");
  location.reload();
}
