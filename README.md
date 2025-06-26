
# Talent Flow

## 🔴 ACTION REQUIRED: Configure API Keys & Security Rules

This app will not run correctly until you perform these **required manual steps**.

### 1. Configure API Keys & Credentials

- In the root of your project, create a new file named `.env.local`.
- Open your new `.env.local` file and add the following lines, pasting your keys after the `=`.
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free **Google AI API key**.
- Go to your [Firebase Project Settings](https://console.firebase.google.com/) to find your web app's **Firebase credentials**.
- Go to your [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) to get your API keys.

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

### 2. Update Firestore Security Rules

This is a **critical one-time setup** to make your app work correctly.

1.  **Go to Firestore Rules**: In the Firebase Console, go to the Firestore Database section and click the **Rules** tab.
2.  **Copy & Paste**: A file named `firestore.rules` exists in your project's root directory. Open this file, copy its **entire contents**, and paste them into the editor in the Firebase Console, replacing any existing rules.
3.  **Publish**: Click the **Publish** button.

### 3. Deploying to Vercel?

When you deploy your project to a hosting provider like Vercel, you must configure your environment variables there as well.

1.  **Go to Project Settings:** In your Vercel project, go to the **Settings** tab.
2.  **Go to Environment Variables:** Select **Environment Variables** from the side menu.
3.  **Add Your Keys:** Copy each key-value pair from your `.env.local` file and add them to Vercel.
4.  **Redeploy:** After adding the variables, you **must trigger a new deployment** for the changes to take effect. Go to the "Deployments" tab and redeploy your latest commit.

---

## About This Project

This is a NextJS starter for the "Talent Flow" freelance marketplace, built in Firebase Studio.

## Getting Started

Once you have configured your credentials and security rules as described above, you can run the development server:

```bash
npm install
npm run dev
```


