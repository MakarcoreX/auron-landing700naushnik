// api/send-telegram.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, phone, tg, city, comment, src } = req.body || {};

    const token  = '8052585141:AAHAou3XhLYAQFl83QfWL0_8_nMVvV_amfc';
    const chatId = '7590252618';

    const esc = (s = '—') =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const date = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      hour12: false
    });

    const text =
`🎧 <b>Нова заявка з лендингу AURON</b>
─────────────────────────────
👤 <b>Ім’я:</b> ${esc(name)}
📞 <b>Телефон:</b> ${esc(phone)}
💬 <b>Telegram:</b> ${esc(tg)}
🏙 <b>Місто:</b> ${esc(city)}
📝 <b>Коментар:</b> ${esc(comment)}

🕓 <b>Час:</b> ${date}
📦 <b>Пропозиція:</b> -30% на наступну покупку
🔗 <a href="${esc(src)}">Відкрити лендинг</a>`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });

    const data = await tgRes.json();
    if (!data.ok) {
      return res.status(500).json({ ok: false, error: 'Telegram API error', data });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
