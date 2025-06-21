# Talent Flow

## 🔴 ACTION REQUIRED: Configure API Keys & Credentials

This app will not run until you configure your API keys and Firebase credentials. This is a required manual step.

### 1. Create the Credentials File

- In the root of your project, create a new file named `.env.local`.

### 2. Add Your Keys

- Open your new `.env.local` file and add the following lines, pasting your keys after the `=`.
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free **Google AI API key**.
- Go to your [Firebase Project Settings](https://console.firebase.google.com/) to find your web app's **Firebase credentials**.

```
# Google AI API Key
GOOGLE_API_KEY=YOUR_API_KEY_HERE

# Firebase Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Restart the Server

- If the development server is running, you **must** stop it (Ctrl+C) and restart it (`npm run dev`) for the new credentials to be loaded.

---

## About This Project

This is a NextJS starter for the "Talent Flow" freelance marketplace, built in Firebase Studio.

## Getting Started

Once you have configured your credentials as described above, you can run the development server:

```bash
npm install
npm run dev
```
