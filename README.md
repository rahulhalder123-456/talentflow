# Talent Flow

## 🔴 ACTION REQUIRED: Configure API Keys & Security Rules

This app will not run correctly until you configure your API keys and database security rules. These are required manual steps.

### 1. Configure API Keys & Credentials

- In the root of your project, create a new file named `.env.local`.
- Open your new `.env.local` file and add the following lines, pasting your keys after the `=`.
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free **Google AI API key**.
- Go to your [Firebase Project Settings](https://console.firebase.google.com/) to find your web app's **Firebase credentials**.
- Go to your [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) to generate API keys.

```
# Google AI API Key
GOOGLE_API_KEY=YOUR_GOOGLE_AI_KEY_HERE

# Firebase Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Razorpay API Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET
```

### 2. Configure Firestore Security Rules

For the app to save data (like projects and user profiles), you MUST update your Firestore Security Rules. The default rules are too restrictive.

- **Go to Firestore Rules**: Open your Firebase project in the [Firebase Console](https://console.firebase.google.com/), navigate to **Build > Firestore Database**, and click the **Rules** tab.
- **Copy & Paste**: A new file named `firestore.rules` has been added to your project. Open this file, copy its entire contents, and paste them into the editor in the Firebase Console, replacing any existing rules.
- **Publish**: Click the **Publish** button.

### 3. Restart the Server

- After updating your `.env.local` file, you **must** stop the development server (Ctrl+C) and restart it (`npm run dev`) for the new credentials to be loaded.

### 4. Deploying to Vercel or other platforms

When you deploy your project to a hosting provider like Vercel, the `.env.local` file is **not** included in the build for security reasons. You must configure your environment variables directly in your Vercel project settings.

- **Go to Vercel**: Open your project in the Vercel dashboard.
- **Navigate to Settings > Environment Variables**.
- **Add Variables**: Add each of the keys and their corresponding values from your `.env.local` file.
    - `GOOGLE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`
    - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
    - `RAZORPAY_KEY_SECRET`
- **Redeploy**: After adding the variables, trigger a new deployment from your Vercel project's "Deployments" tab to apply the changes. This is required for the new environment variables to take effect.


---

## About This Project

This is a NextJS starter for the "Talent Flow" freelance marketplace, built in Firebase Studio.

## Getting Started

Once you have configured your credentials and security rules as described above, you can run the development server:

```bash
npm install
npm run dev
```
