const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newMessage = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  try {
    let messages = [];

    try {
      const fileContents = await fs.readFile(MESSAGES_FILE, 'utf8');
      messages = JSON.parse(fileContents);
      if (!Array.isArray(messages)) {
        messages = [];
      }
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        throw readError;
      }
    }

    messages.push(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    return res.status(201).json({
      success: true,
      message: 'Message received successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Could not save your message. Please try again later.'
    });
  }
});

app.get('/api/contact', async (_req, res) => {
  try {
    const fileContents = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(fileContents);
    return res.json(Array.isArray(messages) ? messages : []);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.json([]);
    }
    return res.status(500).json({ error: 'Failed to load messages.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server is running on http://localhost:${PORT}`);
});
