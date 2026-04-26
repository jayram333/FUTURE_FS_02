# LeadFlow CRM

## Setup (2 steps)
```bash
npm install
npm start
```
Open → http://localhost:3000

## First Run
On first visit you'll see a **Setup screen** — create your admin account with any username and password.

## Login Page — Quick User Access
The login page automatically shows **all registered users as clickable cards**.
Click any card to pre-fill the username, then just enter the password and sign in.
No passwords are shown — only names, usernames and roles are displayed.

## How Users Work
- **Admin** can add team members from the Team page
- **Sales users** only see their own leads
- **Admin** sees all leads across the team
- All passwords are hashed — nobody can read them

## New Endpoint
`GET /api/users/list` — public endpoint that returns username, name and role for all users.
Used by the login page to render the quick-access user cards.

## Files
```
leadflow-crm/
├── server.js
├── package.json
├── crm-data.json   ← leads (auto-created)
├── users.json      ← accounts (auto-created)
└── public/
    └── index.html
```

Requirements: Node.js v14+
