# Member Profile UI Flow

## Module

Manages administrator/member records, account state, activation links, profile details, restore/delete flows, and member login device sessions.

## Route

| Route      | View                                | Permission                              |
| ---------- | ----------------------------------- | --------------------------------------- |
| `/members` | `views/member_profile/ListView.vue` | `member_profile_module.get_member_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`
- `RestoreMemberView.vue`
- `SendActivationLinkView.vue`
- `MemberDevicesView.vue`
- `MemberDeviceDecisionView.vue`

## Flow

1. List view loads members with filters for search, active state, verification, 2FA, lock state, deleted state, role, gender, and date range.
2. Create opens the member form modal.
3. Edit opens the member form modal with the selected member.
4. Profile opens member details and security context.
5. Device/session management is available from the profile/device views.
6. Status toggle calls update status with a CSRF token.
7. Send activation link opens a confirmation/form modal.
8. Delete collects an optional reason and calls delete.
9. Restore is shown for deleted records and calls restore with CSRF.

## API Interactions

| Service Method                  | Endpoint                                          | Method   |
| ------------------------------- | ------------------------------------------------- | -------- |
| `getMemberList`                 | `/member/profile/list`                            | `GET`    |
| `getMember`                     | `/member/profile/:public_id`                      | `GET`    |
| `createMember`                  | `/member/profile/create`                          | `POST`   |
| `updateMember`                  | `/member/profile/:public_id/update`               | `PATCH`  |
| `updateMemberStatus`            | `/member/profile/:public_id/update-status`        | `PATCH`  |
| `deleteMember`                  | `/member/profile/:public_id/delete`               | `DELETE` |
| `restoreMember`                 | `/member/profile/:public_id/restore`              | `PATCH`  |
| `sendMemberActivationLink`      | `/member/profile/:public_id/activation-link/send` | `POST`   |
| `getMemberDeviceSessionList`    | `/member/:public_id/device/list`                  | `GET`    |
| `logoutMemberDeviceSession`     | `/member/:public_id/log-out-device/:session_id`   | `PATCH`  |
| `logoutAllMemberDeviceSessions` | `/member/:public_id/log-out-devices`              | `POST`   |
