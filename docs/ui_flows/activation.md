# Activation UI Flow

## Module

Public account activation flow for invited members. It validates an activation token, collects a password, guides the member through authenticator setup, and completes activation with an OTP code.

## Route

| Route               | View                                       | Permission |
| ------------------- | ------------------------------------------ | ---------- |
| `/activate-account` | `views/activation/ActivateAccountView.vue` | Public     |

## Flow

1. The view reads the activation token from the URL.
2. Token validation runs before password/OTP entry.
3. The password step collects and confirms the member password.
4. The two-factor step shows QR/secret details and collects a 6-digit OTP.
5. Submit completes member setup and routes into the auth flow.
6. If a user is already fully authenticated, the router redirects activation attempts to `/dashboard`.

## API Interactions

| Service Method             | Endpoint                                    | Method |
| -------------------------- | ------------------------------------------- | ------ |
| `validateMemberSetupToken` | `/member/profile/validate-activation-token` | `POST` |
| `completeMemberSetup`      | `/member/profile/complete-activation`       | `POST` |
