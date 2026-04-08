# jeetpotfoliyo

Portfolio website with a connected Node.js backend for contact form submissions.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## Backend endpoints

- `POST /api/contact` — Save a contact form message.
- `GET /api/contact` — List saved messages.

Messages are stored in `messages.json` (ignored from git).
