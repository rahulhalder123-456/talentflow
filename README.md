# Talent Flow

## 🔴 ACTION REQUIRED: Configure API Keys, Database & Security Rules

This app will not run correctly until you perform these **required manual steps**.

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

### 2. Set up Firestore Database & Security Rules

This is a **critical one-time setup** to make your app work correctly.

#### Step 2a: Create the Admin Configuration

The new user management system requires a special document in your database to store who is an admin. You must create this manually to give yourself the first admin account.

1.  **Find Your User ID (UID):**
    -   Go to the [Firebase Console](https://console.firebase.google.com/) and open your project.
    -   Navigate to **Build > Authentication**.
    -   In the "Users" tab, find your account (you may need to sign into your app once for it to appear).
    -   Copy the **User UID** for your account. This is your unique ID.

2.  **Create the `admins` Document:**
    -   Navigate to **Build > Firestore Database**.
    -   Click **+ Start collection**.
    -   For **Collection ID**, enter `config`. Click **Next**.
    -   For **Document ID**, enter `admins`.
    -   Under **Fields**, add the following:
        -   **Field name:** `uids`
        -   **Field type:** `array`
        -   **Field value:** Click "Add value", paste your **User UID** from step 1 into the `value` box, and press Enter.
    -   Click **Save**.

You have now made yourself the first admin! You can now add other admins from the "Manage Users" page inside your app.

#### Step 2b: Update Firestore Security Rules

1.  **Go to Firestore Rules**: In the Firestore Database section, click the **Rules** tab.
2.  **Copy & Paste**: A file named `firestore.rules` exists in your project's root directory. Open this file, copy its **entire contents**, and paste them into the editor in the Firebase Console, replacing any existing rules.
3.  **Publish**: Click the **Publish** button.

### 3. Restart the Server or Redeploy

-   **Local Development:** After updating your `.env.local` file, you **must** stop the development server (Ctrl+C) and restart it (`npm run dev`).
-   **Vercel Deployment:** When you deploy your project to a hosting provider like Vercel, the `.env.local` file is **not** included. You must configure your environment variables directly in your Vercel project settings and **trigger a new deployment** to apply the changes.

---

## About This Project

This is a NextJS starter for the "Talent Flow" freelance marketplace, built in Firebase Studio.

## Getting Started

Once you have configured your credentials and security rules as described above, you can run the development server:

```bash
npm install
npm run dev
```
