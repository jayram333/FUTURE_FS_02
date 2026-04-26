/**
 * LeadFlow CRM — Backend
 * Run: npm install && npm start
 * First run → visit http://localhost:3000 → create your admin account
 */

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const crypto  = require('crypto');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── DATABASE ────────────────────────────────────────────────
const DB_FILE   = path.join(__dirname, 'crm-data.json');
const USER_FILE = path.join(__dirname, 'users.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ leads: [] }, null, 2));
    return { leads: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}
function writeDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

function readUsers() {
  if (!fs.existsSync(USER_FILE)) {
    fs.writeFileSync(USER_FILE, JSON.stringify({ users: [] }, null, 2));
    return { users: [] };
  }
  return JSON.parse(fs.readFileSync(USER_FILE, 'utf-8'));
}
function writeUsers(data) { fs.writeFileSync(USER_FILE, JSON.stringify(data, null, 2)); }

// ─── HELPERS ─────────────────────────────────────────────────
function ago(days) { return new Date(Date.now() - days * 86400000).toISOString(); }
function genId(prefix = 'lead') {
  return prefix + '_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
}
function hashPassword(p) { return crypto.createHash('sha256').update(p).digest('hex'); }

// ─── SEED DEMO LEADS ─────────────────────────────────────────
function seedLeadsForAdmin(adminId) {
  const db = readDB();
  if (db.leads.length > 0) return;

  db.leads = [
    {
      id: genId(), owner: adminId,
      name: 'Himateja Reddy', email: 'himateja.reddy@techwave.in', phone: '+91 98480 12345',
      source: 'Referral', status: 'new', followup: '2026-03-15', notes: [],
      created_at: ago(1), updated_at: ago(1)
    },
    {
      id: genId(), owner: adminId,
      name: 'Gautha Krishnamurthy', email: 'gautha.k@softedge.co.in', phone: '+91 90000 54321',
      source: 'Website Chat', status: 'contacted', followup: '2026-03-12',
      notes: [{ text: 'Interested in professional plan. Schedule demo.', date: ago(2) }],
      created_at: ago(5), updated_at: ago(2)
    },
    {
      id: genId(), owner: adminId,
      name: 'Jeevan Sai Kumar', email: 'jeevan.sai@innotech.in', phone: '+91 91234 67890',
      source: 'Cold Email', status: 'converted', followup: '',
      notes: [{ text: 'Signed 6-month contract. Onboarding next week.', date: ago(3) }],
      created_at: ago(10), updated_at: ago(3)
    },
    {
      id: genId(), owner: adminId,
      name: 'Purna Chandra Rao', email: 'purna.rao@vizagtech.com', phone: '+91 94400 33221',
      source: 'Social Media', status: 'new', followup: '2026-03-18', notes: [],
      created_at: ago(2), updated_at: ago(2)
    },
    {
      id: genId(), owner: adminId,
      name: 'Venkat Subramanian', email: 'venkat.s@deltasoft.in', phone: '+91 87654 11223',
      source: 'Contact Form', status: 'contacted', followup: '2026-03-10',
      notes: [{ text: 'Asked for pricing sheet. Sent via email.', date: ago(1) }],
      created_at: ago(4), updated_at: ago(1)
    },
    {
      id: genId(), owner: adminId,
      name: 'Srinivas Babu Naidu', email: 'srini.babu@apexsols.co', phone: '+91 99887 44556',
      source: 'Referral', status: 'lost', followup: '',
      notes: [{ text: 'Budget constraints. Follow up in Q4.', date: ago(7) }],
      created_at: ago(15), updated_at: ago(7)
    },
    {
      id: genId(), owner: adminId,
      name: 'Lakshmi Prasanna Devi', email: 'lakshmi.p@cloudnine.in', phone: '+91 82200 77889',
      source: 'Website Chat', status: 'converted', followup: '',
      notes: [{ text: 'Paid annual plan via NEFT. Very happy with demo.', date: ago(5) }],
      created_at: ago(12), updated_at: ago(5)
    },
    {
      id: genId(), owner: adminId,
      name: 'Naresh Varma Datla', email: 'naresh.datla@nexgen.in', phone: '+91 95560 98765',
      source: 'Cold Email', status: 'new', followup: '2026-03-20', notes: [],
      created_at: ago(0), updated_at: ago(0)
    },
    {
      id: genId(), owner: adminId,
      name: 'Bhavani Devi Kolli', email: 'bhavani.k@sriven.co.in', phone: '+91 76540 12398',
      source: 'Social Media', status: 'contacted', followup: '2026-03-11',
      notes: [{ text: 'Wants team collaboration features. Send brochure.', date: ago(1) }],
      created_at: ago(3), updated_at: ago(1)
    },
    {
      id: genId(), owner: adminId,
      name: 'Ravi Teja Muppala', email: 'raviteja.m@brightpath.in', phone: '+91 88000 23456',
      source: 'Referral', status: 'new', followup: '2026-03-22', notes: [],
      created_at: ago(1), updated_at: ago(1)
    },
    {
      id: genId(), owner: adminId,
      name: 'Chalapathi Rao Kota', email: 'chala.rao@vizagsys.in', phone: '+91 97050 66778',
      source: 'Contact Form', status: 'contacted', followup: '2026-03-13',
      notes: [{ text: 'Called twice, interested in startup plan.', date: ago(2) }],
      created_at: ago(6), updated_at: ago(2)
    },
    {
      id: genId(), owner: adminId,
      name: 'Mounika Yellapu', email: 'mounika.y@itpark.ap.in', phone: '+91 93310 45612',
      source: 'Social Media', status: 'new', followup: '2026-03-25', notes: [],
      created_at: ago(0), updated_at: ago(0)
    }
  ];

  writeDB(db);
  console.log('✓ Demo leads seeded with Indian profiles');
}

// ─── SETUP CHECK ─────────────────────────────────────────────
app.get('/api/setup-needed', (req, res) => {
  const { users } = readUsers();
  res.json({ needed: users.length === 0 });
});

app.post('/api/setup', (req, res) => {
  const { users } = readUsers();
  if (users.length > 0) return res.status(403).json({ error: 'Setup already complete' });

  const { username, password, name, email } = req.body;
  if (!username || !password || !name)
    return res.status(400).json({ error: 'username, password and name are required' });

  const data = readUsers();
  const newAdmin = {
    id: genId('user'),
    username: username.trim().toLowerCase(),
    password: hashPassword(password),
    name: name.trim(),
    email: (email || '').trim(),
    role: 'admin'
  };
  data.users.push(newAdmin);
  writeUsers(data);
  seedLeadsForAdmin(newAdmin.id);

  console.log(`✓ Admin created: ${username}`);
  res.status(201).json({ ok: true });
});

// ─── AUTH ────────────────────────────────────────────────────
const SESSIONS = new Map();

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  const session = SESSIONS.get(token);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  req.user = session;
  next();
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const { users } = readUsers();
  const user = users.find(
    u => u.username === (username || '').trim().toLowerCase() && u.password === hashPassword(password)
  );
  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const token = crypto.randomBytes(32).toString('hex');
  SESSIONS.set(token, { userId: user.id, username: user.username, name: user.name, role: user.role });
  res.json({ token, name: user.name, username: user.username, role: user.role });
});

app.post('/api/logout', requireAuth, (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  SESSIONS.delete(token);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => res.json(req.user));

// ─── PUBLIC USER LIST (for login page — no auth needed) ──────
// Returns only username, name, role — NO passwords
app.get('/api/users/list', (req, res) => {
  const { users } = readUsers();
  res.json(users.map(u => ({ username: u.username, name: u.name, role: u.role })));
});

// ─── USER MANAGEMENT (admin only) ────────────────────────────
app.get('/api/users', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { users } = readUsers();
  res.json(users.map(u => ({ id: u.id, username: u.username, name: u.name, email: u.email, role: u.role })));
});

app.post('/api/users', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { username, password, name, email, role = 'sales' } = req.body;
  if (!username || !password || !name)
    return res.status(400).json({ error: 'username, password and name are required' });

  const data = readUsers();
  const uname = username.trim().toLowerCase();
  if (data.users.find(u => u.username === uname))
    return res.status(409).json({ error: 'Username already exists' });

  const user = {
    id: genId('user'), username: uname, password: hashPassword(password),
    name: name.trim(), email: (email || '').trim(), role
  };
  data.users.push(user);
  writeUsers(data);
  const { password: _, ...safe } = user;
  res.status(201).json(safe);
});

app.patch('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const data = readUsers();
  const idx = data.users.findIndex(u => u.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  if (req.body.name)     data.users[idx].name     = req.body.name.trim();
  if (req.body.email)    data.users[idx].email    = req.body.email.trim();
  if (req.body.role)     data.users[idx].role     = req.body.role;
  if (req.body.password) data.users[idx].password = hashPassword(req.body.password);
  writeUsers(data);
  const { password: _, ...safe } = data.users[idx];
  res.json(safe);
});

app.delete('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const data = readUsers();
  const idx = data.users.findIndex(u => u.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  if (data.users[idx].id === req.user.userId)
    return res.status(400).json({ error: 'Cannot delete your own account' });
  data.users.splice(idx, 1);
  writeUsers(data);
  res.json({ ok: true });
});

// ─── LEADS ───────────────────────────────────────────────────
function filterByOwner(leads, user) {
  if (user.role === 'admin') return leads;
  return leads.filter(l => l.owner === user.userId);
}

app.get('/api/leads', requireAuth, (req, res) => {
  let { search = '', status = '' } = req.query;
  search = search.toLowerCase();
  let leads = filterByOwner(readDB().leads, req.user);
  if (status) leads = leads.filter(l => l.status === status);
  if (search) leads = leads.filter(l =>
    l.name.toLowerCase().includes(search) ||
    l.email.toLowerCase().includes(search) ||
    l.source.toLowerCase().includes(search)
  );
  res.json(leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

app.get('/api/leads/:id', requireAuth, (req, res) => {
  const lead = filterByOwner(readDB().leads, req.user).find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

app.post('/api/leads', requireAuth, (req, res) => {
  const { name, email, phone = '', source = 'Other', status = 'new', followup = '', note = '' } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const db = readDB(), now = new Date().toISOString();
  const lead = {
    id: genId(), owner: req.user.userId,
    name, email, phone, source, status, followup,
    notes: note.trim() ? [{ text: note.trim(), date: now }] : [],
    created_at: now, updated_at: now
  };
  db.leads.push(lead);
  writeDB(db);
  res.status(201).json(lead);
});

app.patch('/api/leads/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.leads.findIndex(l => l.id === req.params.id &&
    (req.user.role === 'admin' || l.owner === req.user.userId));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  ['name','email','phone','source','status','followup'].forEach(f => {
    if (req.body[f] !== undefined) db.leads[idx][f] = req.body[f];
  });
  db.leads[idx].updated_at = new Date().toISOString();
  if (req.body.note?.trim())
    db.leads[idx].notes.push({ text: req.body.note.trim(), date: new Date().toISOString() });
  writeDB(db);
  res.json(db.leads[idx]);
});

app.delete('/api/leads/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.leads.findIndex(l => l.id === req.params.id &&
    (req.user.role === 'admin' || l.owner === req.user.userId));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.leads.splice(idx, 1);
  writeDB(db);
  res.json({ ok: true });
});

app.post('/api/leads/:id/notes', requireAuth, (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'text is required' });
  const db = readDB();
  const idx = db.leads.findIndex(l => l.id === req.params.id &&
    (req.user.role === 'admin' || l.owner === req.user.userId));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.leads[idx].notes.push({ text: text.trim(), date: new Date().toISOString() });
  writeDB(db);
  res.status(201).json(db.leads[idx]);
});

// ─── STATS ───────────────────────────────────────────────────
app.get('/api/stats', requireAuth, (req, res) => {
  const leads = filterByOwner(readDB().leads, req.user);
  const sources = {};
  leads.forEach(l => sources[l.source] = (sources[l.source] || 0) + 1);
  res.json({
    total:     leads.length,
    new:       leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost:      leads.filter(l => l.status === 'lost').length,
    sources:   Object.entries(sources).map(([source, c]) => ({ source, c })).sort((a, b) => b.c - a.c)
  });
});

// ─── START ───────────────────────────────────────────────────
app.listen(PORT, () => {
  const { users } = readUsers();
  console.log(`\n🚀 LeadFlow running at http://localhost:${PORT}`);
  if (users.length === 0) {
    console.log('   ⚠️  First run! Visit the URL above to create your admin account.\n');
  } else {
    console.log(`   ${users.length} user(s) registered. Ready!\n`);
  }
});
