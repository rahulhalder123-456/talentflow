# Talent Flow

## 🔴 ACTION REQUIRED: Configure Firebase Credentials

This app will not run until you configure your Firebase credentials. This is a required manual step.

1.  **Rename the example file**: In the root of your project, find the file named `.env.local.example` and rename it to `.env.local`.
2.  **Add your credentials**: Open the new `.env.local` file. Copy and paste the credentials from your Firebase project's web app configuration. You can find these in your [Firebase Project Settings](https://console.firebase.google.com/).
3.  **Restart the Server**: If the development server is running, you **must** stop it (Ctrl+C) and restart it (`npm run dev`) for the new credentials to be loaded.

---

## About This Project

This is a NextJS starter for the "Talent Flow" freelance marketplace, built in Firebase Studio.

## Getting Started

Once you have configured your Firebase credentials as described above, you can run the development server:

```bash
npm install
npm run dev
```