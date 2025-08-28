# Spy-Cat-Agency-Frontend (Dashboard)

Backend: [Spy-Cat-Agency-BE](https://github.com/Zebaro24/Spy-Cat-Agency-BE)

## Overview

A minimal Next.js dashboard to manage Spy Cats. It lists cats, allows creating new ones, editing salary only, and
deleting. The UI handles API errors gracefully and displays clear notifications.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- ESLint

## Features

- List spy cats
- Create a cat: name, years of experience, breed, salary
- Edit salary only (other fields are read-only in edit mode)
- Delete a cat
- Graceful API error handling:
    - Parses validation errors like `{ "detail": [...] }`
    - Displays user-friendly, multi-line notifications
- API field mapping: `years_of_experience` ↔ `years` (UI uses `years`)

## Requirements

- Node.js 20+
- npm
- Running Backend API (defaults to http://localhost:8000)

## Environment

- Configure the backend base URL via environment variables:
    - `NEXT_PUBLIC_API_URL` — base API URL (e.g., `http://localhost:8000`)
- Example `.env.local`:

```
bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If you don’t set an environment variable, make sure the frontend services point to the correct API URL.

## Quick Start (Docker)
1) Build and run:
```shell script
docker compose -f docker/docker-compose.yml up --build
```

2) Website will be available at:
http://localhost:3000

## API Summary (used by the frontend)

Expected backend endpoints:

- `POST /cats`
    - Create a cat: `name`, `years_of_experience`, `breed`, `salary`
- `GET /cats`
    - List cats
- `GET /cats/{id}`
    - Get a single cat (optional for the UI)
- `PATCH /cats/{id}`
    - Update salary only
- `DELETE /cats/{id}`
    - Delete a cat

Create example:

```
json
{
"name": "Whisker Bond",
"years_of_experience": 5,
"breed": "Siamese",
"salary": 5000
}
```

Update salary example:

```
json
{
"salary": 6500
}
```

## Validation & Error Handling

- Backend validates that `years_of_experience` and `salary` are greater than 0.
- Typical validation error:

```
json
{
  "detail": [
    {
      "type": "greater_than",
      "loc": ["body", "years_of_experience"],
      "msg": "Input should be greater than 0",
      "input": 0,
      "ctx": { "gt": 0 }
      },
      {
      "type": "greater_than",
      "loc": ["body", "salary"],
      "msg": "Input should be greater than 0",
      "input": 0,
      "ctx": { "gt": 0 }
    }
  ]
}
```

- The UI parses such responses and shows readable messages to the user.

## Project Structure (simplified)

```
text
src/
app/                 # Next.js routes (App Router)
components/          # UI components (form, list, notification)
services/            # API layer (fetch, mappings, error handling)
public/                # Static assets
```

## UX

- In edit mode, only salary is editable; name/breed/years are read-only.
- API errors are surfaced via toast notifications and inline form messages.
- The UI maps `years_of_experience` ↔ `years` to keep forms simple.

## Deployment

- Set `NEXT_PUBLIC_API_URL` to point to your backend.
- Any Node hosting works (including Vercel). Provide environment variables in your hosting settings and deploy the
  repository.

## Known Limitations

- The dashboard covers only cat management (CRUD), as required. Missions/targets UI is not implemented.

## License

MIT (or your preferred license)

```
