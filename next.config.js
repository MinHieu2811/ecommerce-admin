/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  publicRuntimeConfig: {
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSignIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    clerkSignUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    clerkAfterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    clerkAfterSignUp: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
};

module.exports = nextConfig;
