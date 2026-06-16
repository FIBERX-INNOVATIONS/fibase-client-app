# Auth UI Flow

## Module

Handles login, two-factor login, logout, access refresh, and CSRF token retrieval for protected form submissions.

## Routes

| Route               | View                                | Permission                |
| ------------------- | ----------------------------------- | ------------------------- |
| `/`                 | `views/auth/LoginView.vue`          | Public                    |
| `/login`            | `views/auth/LoginView.vue`          | Public                    |
| `/two-factor-login` | `views/auth/TwoFactorLoginView.vue` | Logged-in challenge state |
| `/logout`           | `views/auth/LogoutView.vue`         | Logged in                 |

## Flow

1. Login view requests a CSRF token for the login form.
2. Login submit calls the login API and stores the current member, access token, device ID, expiry, and login challenge token.
3. Members who are logged in but not fully authenticated are routed to `/two-factor-login`.
4. Two-factor submit completes full authentication and stores permissions.
5. Logout calls the logout API, clears auth state, and returns the user to login.
6. Router guards protect all non-auth routes and redirect users based on logged-in and fully authenticated state.

## API Interactions

| Service Method      | Endpoint                 | Method |
| ------------------- | ------------------------ | ------ |
| `getFormCSRFToken`  | `/auth/get-csrf-token`   | `GET`  |
| `logIn`             | `/auth/login`            | `POST` |
| `twoFactorLogin`    | `/auth/two-factor-login` | `POST` |
| `refreshAccessToen` | `/auth/refresh`          | `POST` |
| `logOut`            | `/auth/logout`           | `POST` |
