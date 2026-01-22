const API = "/api/chat";
let conversationId = localStorage.getItem("cid");

function add(role, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = role;
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

  let url = `${API}?q=${encodeURIComponent(text)}`;
  if (conversationId) url += `&cid=${encodeURIComponent(conversationId)}`;

  const res = await fetch(url);
  const data = await res.json();

  add("ai", data.text);

  if (data.conversationId) {
    conversationId = data.conversationId;
    localStorage.setItem("cid", conversationId);
  }
}
