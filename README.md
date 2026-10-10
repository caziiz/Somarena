# SomArena Frontend

SomArena is a gaming platform for Somali gamers. This repository contains the public-facing frontend and authenticated app shell for the platform.

## Overview

This project uses:
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Lucide React

## Important note

The real SomArena backend is not present in this workspace. This frontend is intentionally built as a production-ready shell with centralized API boundaries and explicit guard rails. It does not invent endpoints or fake success states. The app is ready to connect to the real backend once the environment variable points to the actual API and WebSocket URLs.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Environment variables

Create a local `.env` file from `.env.example` and fill in the real values.

```bash
cp .env.example .env
```

Example:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_WS_URL=wss://ws.example.com
```

## Authentication and API architecture

- Authentication state is centralized in the app shell and protected by route guards.
- The API client is kept in a single Axios instance.
- WebSocket and refresh logic are intentionally deferred until the actual backend contracts are available.
- The frontend does not bypass backend authorization rules.

## Public pages

- `/`
- `/games`
- `/tournaments`
- `/tournaments/:id`
- `/clans`
- `/clans/:id`
- `/leaderboard`
- `/about`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/verify-email`

## Authenticated app shell

The authenticated shell includes navigation for Arena, Dashboard, Games, Clans, Tournaments, Matches, Leaderboard, Friends, Messages, Notifications, Wallet, Profile, and Settings. Individual sections are only displayed when the real backend exposes them.

## Backend readiness status

This frontend intentionally avoids fake API calls. The following areas remain pending until the actual backend is available in the environment:
- exact REST route inventory
- official JWT and refresh token contract
- real WebSocket topics and message schemas
- actual tournament, clan, wallet, and admin APIs
- production media upload endpoints

## Deployment notes

- Keep frontend environment values public-safe; do not add secrets to `VITE_*` variables.
- Use the backend as the final source of truth for permissions, roles, authorization, and payment confirmations.
- Validate all requests server-side and never rely on client-side checks for access control.
