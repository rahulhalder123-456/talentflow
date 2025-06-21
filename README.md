# Talent Flow

## 🔴 ACTION REQUIRED: Configure API Keys & Credentials

This app will not run until you configure your API keys and Firebase credentials. This is a required manual step.

### 1. Create the Credentials File

- In the root of your project, create a new file named `.env.local`.
- You can do this by renaming the `env.local.example` file.

### 2. Add Google AI API Key

- The AI features of this app are powered by Google's Gemini model through Genkit.
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free API key.
- Open your new `.env.local` file and add the following line, pasting your key after the `=`:
  ```
  GOOGLE_API_KEY=YOUR_API_KEY_HERE
  ```

### 3. Add Firebase Credentials

- In your [Firebase Project Settings](https://console.firebase.google.com/), find your web app's configuration credentials.
- Copy and paste these into your `.env.local` file. The file should look like this:

  ```
  # Google AI API Key
  GOOGLE_API_KEY=...

  # Firebase Credentials
  NEXT_PUBLIC_FIREBASE_API_KEY=...
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
  NEXT_PUBLIC_FIREBASE_APP_ID=...
  ```

### 4. Restart the Server

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
