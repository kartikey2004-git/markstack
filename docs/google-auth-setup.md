# Google Authentication Setup

This project uses Better Auth for authentication with Google OAuth support.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Better Auth URLs
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new "OAuth 2.0 Client ID"
5. Configure the redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your environment variables

## Usage

The Google sign-in button is now integrated into the sign-in form. Users can click "Continue with Google" to authenticate using their Google account.

## Components

- `src/lib/auth.ts` - Better Auth server configuration with Google provider
- `src/lib/auth-client.ts` - Better Auth client configuration
- `src/components/auth/google-sign-in-button.tsx` - Google sign-in button component
- `src/components/auth/sign-in-form.tsx` - Sign-in form with Google integration

## API Routes

The authentication API is handled by `/api/auth/[...all]/route.ts` which uses Better Auth's Next.js handler.
