// routes/mailRoutes.js
const express = require('express');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');

const router = express.Router();

// IMAP config (read inbox)
const imapConfig = {
  imap: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    tls: true,
    authTimeout: 10000,
  },
};

// SMTP transporter (send mail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // 465 with SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------- GET /api/mail/inbox  ----------
router.get('/inbox', async (req, res) => {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
      struct: true,
      markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const parsed = await Promise.all(
      messages.slice(-50).map(async (m) => {
        const headerPart = m.parts.find(
          (p) => p.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)'
        );
        const bodyPart = m.parts.find((p) => p.which === 'TEXT');

        const header = headerPart.body;
        const uid = m.attributes.uid;
        let snippet = '';

        if (bodyPart && bodyPart.body) {
          const parsedMail = await simpleParser(bodyPart.body);
          snippet = (parsedMail.text || '').slice(0, 150);
        }

        return {
          uid,
          from: header.from ? header.from[0] : '',
          subject: header.subject ? header.subject[0] : '',
          date: header.date ? header.date[0] : '',
          snippet,
        };
      })
    );

    await connection.end();
    res.json(parsed);
  } catch (err) {
    console.error('INBOX ERROR', err);
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

// ---------- GET /api/mail/message/:uid ----------
router.get('/message/:uid', async (req, res) => {
  const uid = parseInt(req.params.uid, 10);
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    const messages = await connection.search([['UID', uid]], {
      bodies: [''],
      struct: true,
    });

    if (!messages.length) {
      await connection.end();
      return res.status(404).json({ error: 'Message not found' });
    }

    const all = messages[0].parts.find((p) => p.which === '');
    const parsed = await simpleParser(all.body);

    await connection.end();

    res.json({
      uid,
      subject: parsed.subject,
      from: parsed.from && parsed.from.text,
      to: parsed.to && parsed.to.text,
      date: parsed.date,
      text: parsed.text,
      html: parsed.html,
    });
  } catch (err) {
    console.error('MESSAGE ERROR', err);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// ---------- POST /api/mail/send ----------
router.post('/send', async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Instant Carpet Cleaning" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('SEND ERROR', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
