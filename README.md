# Week 2 Node/Express API

A simple Express API built for the Week 2 assignment: basic routing, JSON
parsing, error handling, environment config, a static landing page, and a
custom logging middleware.

## Features

- `GET /` — serves a static HTML page (title: "My Week 2 API!")
- `GET /api` — returns the plain text `My Week 2 API!`
- `POST /user` — accepts JSON `{ "name": "...", "email": "..." }` and responds
  with `{ "message": "Hello, [name]!" }`. Returns `400` if either field is
  missing.
- `GET /user/:id` — returns `User [id] profile`
- Custom middleware logs every incoming request (method, path, timestamp)
- `.env` support for configuring the `PORT`
- JSON body parsing via `express.json()`
- 404 handler for unknown routes
- Centralized error-handling middleware

## Setup

```bash
git clone <your-repo-url>
cd week2-node-express
npm install
cp .env.example .env   # adjust PORT if you like
npm start
```

The server runs on `http://localhost:3000` by default (or whatever `PORT`
you set in `.env`).

## Testing

### Using curl

```bash
# Root page
curl http://localhost:3000/

# Plain-text API greeting
curl http://localhost:3000/api

# Create a user
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Missing field -> 400
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob"}'

# Get a user profile
curl http://localhost:3000/user/42

# Unknown route -> 404
curl http://localhost:3000/nonexistent
```

### Using Postman

1. Import a new request for each route above.
2. For `POST /user`, set the body to raw JSON and include the
   `Content-Type: application/json` header.
3. Confirm you get a `400` response when `name` or `email` is omitted.

## Project structure

```
week2-node-express/
├── public/
│   └── index.html      # static landing page served at "/"
├── server.js            # app entry point, routes, middleware
├── .env.example          # sample environment config
├── .gitignore
├── package.json
└── README.md
```

## Bonus

A custom middleware (`server.js`) logs every incoming request's method,
path, and timestamp to the console.
