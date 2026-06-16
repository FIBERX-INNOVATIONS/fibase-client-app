# My Profile UI Flow

## Module

Allows the current fully authenticated member to update their own profile details, profile photo, and password.

## Route

| Route         | View                      | Permission          |
| ------------- | ------------------------- | ------------------- |
| `/my-profile` | `views/MyProfileView.vue` | Fully authenticated |

## Views

- `MyProfileView.vue`

## Flow

1. View hydrates from the authenticated current member stored by auth utilities.
2. The form shows identity summary, roles, account state, profile fields, photo upload, and optional password fields.
3. Profile image changes upload through file storage and use the returned file URL.
4. Submit updates the current member through the member update endpoint.
5. Password fields are optional; when supplied, password and confirmation are submitted with the profile update payload.

## API Interactions

| Service Method | Endpoint                            | Method  |
| -------------- | ----------------------------------- | ------- |
| `uploadFile`   | `/file-storage/upload`              | `POST`  |
| `updateMember` | `/member/profile/:public_id/update` | `PATCH` |
