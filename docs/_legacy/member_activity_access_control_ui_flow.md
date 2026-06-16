# Member, Activity, And Access Control UI Flow

This document outlines the proposed front-end layout, interaction flow, and API surface for the
member profile, member activation, member device, activity, and access control modules.

The UI should follow the existing list/profile/form/delete patterns used by `registered_app`,
`currency`, and the payment configuration modules: content-manager driven copy, permission-gated
actions, modal-based forms, focused confirmation views, and consistent table rendering.

## Sidebar Navigation

Add three separate top-level sidebar menu items. These should not be grouped under a dropdown.

| Label          | Frontend Route    | Permission                              |
| -------------- | ----------------- | --------------------------------------- |
| Members        | `/members`        | `member_profile_module.get_member_list` |
| Activities     | `/activities`     | `activity_module.get_activity_list`     |
| Access Control | `/access-control` | `access_control_module.get_role_list`   |

Keep the sidebar item structure content-driven through
`content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list`.

The member activation screens are public setup screens and should not appear in the authenticated
sidebar.

## Shared Page Flow

The three sidebar modules should use the same page structure as existing list modules:

1. Breadcrumbs.
2. Page header with title, description, and primary action button when the page supports creation.
3. Collapsible filters panel.
4. Data table with result count, pagination, row selection support, and row action menu.
5. Modal body views for create/edit/profile/delete/confirmation flows.

Default recommendation: no bulk actions for v1. Keep row selection support only if it is already
part of the shared table behavior.

## API Base Paths

| Module         | API Base Path         |
| -------------- | --------------------- |
| Members        | `/api/member`         |
| Activities     | `/api/activity`       |
| Access Control | `/api/access-control` |

All authenticated module APIs require the existing full-auth flow. Mutating requests should fetch
and send the correct CSRF token before submit.

## 1. Members

Purpose: manage administrator/member profiles, account state, setup links, and member security
context.

Frontend route: `/members`

### API Service Methods

| Method                          | HTTP/API Route                                             | Permission                                                     |
| ------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| `getMemberList`                 | `GET /api/member/profile/list`                             | `member_profile_module.get_member_list`                        |
| `getMember`                     | `GET /api/member/profile/:public_id`                       | `member_profile_module.get_member`                             |
| `createMember`                  | `POST /api/member/profile/create`                          | `member_profile_module.create_member`                          |
| `updateMember`                  | `PATCH /api/member/profile/:public_id/update`              | `member_profile_module.update_member`                          |
| `updateMemberStatus`            | `PATCH /api/member/profile/:public_id/update-status`       | `member_profile_module.update_member_status`                   |
| `deleteMember`                  | `DELETE /api/member/profile/:public_id/delete`             | `member_profile_module.delete_member`                          |
| `restoreMember`                 | `PATCH /api/member/profile/:public_id/restore`             | `member_profile_module.restore_member`                         |
| `sendMemberActivationLink`      | `POST /api/member/profile/:public_id/activation-link/send` | `member_profile_module.send_member_activation_link`            |
| `getMemberDeviceSessionList`    | `GET /api/member/:public_id/device/list`                   | `member_device_module.get_member_login_device_sessions`        |
| `logoutMemberDeviceSession`     | `PATCH /api/member/:public_id/log-out-device/:session_id`  | `member_device_module.logout_member_device_login_session`      |
| `logoutAllMemberDeviceSessions` | `POST /api/member/:public_id/log-out-devices`              | `member_device_module.logout_all_member_device_login_sessions` |

### List Filters

| Filter       | Query Param      | Type           | Notes                                                       |
| ------------ | ---------------- | -------------- | ----------------------------------------------------------- |
| Search       | `search`         | `search`       | Searches public ID, username, email, first name, last name. |
| Status       | `is_active`      | boolean select | Active/inactive.                                            |
| Verified     | `is_verified`    | boolean select | Verification status.                                        |
| 2FA          | `is_2fa_enabled` | boolean select | Two-factor setup status.                                    |
| Locked       | `is_locked`      | boolean select | Derived from member auth lock state.                        |
| Deleted      | `is_deleted`     | boolean select | Default is `false`; expose this filter for deleted views.   |
| Role         | `role_id`        | select search  | Use access-control role list or preview mode.               |
| Gender       | `gender`         | select/text    | Content-driven options.                                     |
| Created Date | `date_range`     | date range     | `start_date,end_date` or existing date-range shape.         |

Standard pagination/sort params:

```txt
page
limit
sort_by
sort_direction
preview_only
```

Allowed `sort_by` values follow `MemberQueryFields.find_and_sort_fields`.

### List Columns

| Column       | Render                                                            |
| ------------ | ----------------------------------------------------------------- |
| S/N + Select | `DataTableSerialCellUI`                                           |
| Member       | Avatar/info cell using `profile_photo_link`, full name, email     |
| Username     | Text                                                              |
| Roles        | Compact role chips from `roles`                                   |
| Security     | 2FA, verified, locked compact indicators                          |
| Status       | Toggle cell for `is_active`, permission-gated                     |
| Deleted      | Badge or muted text, only prominent when deleted filter is active |
| Created At   | Date text                                                         |
| Actions      | Row action menu                                                   |

### Header Action

Show `Create Member` when the current user has `member_profile_module.create_member`.

### Form Payloads

Create member:

```ts
interface MemberCreatePayload {
    csrf_token: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    dob?: string | Date | null;
    gender?: string | null;
    profile_photo_link?: string | null;
}
```

Update member:

```ts
interface MemberUpdatePayload {
    csrf_token: string;
    first_name?: string;
    last_name?: string;
    phone?: string | null;
    dob?: string | Date | null;
    gender?: string | null;
    profile_photo_link?: string | null;
}
```

Delete member:

```ts
interface MemberDeletePayload {
    csrf_token: string;
    delete_reason?: string | null;
}
```

Send setup link:

```ts
interface MemberSetupLinkPayload {
    csrf_token: string;
    reason?: string | null;
}
```

Profile photo should use the existing file upload flow. The file upload result URL should be sent as
`profile_photo_link`.

### Row Actions

| Action               | Flow                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| View                 | Open member profile modal.                                                                                              |
| Edit                 | Open add/edit member form modal. Allow own profile edit or super admin edit according to backend rules and permissions. |
| Activate/Deactivate  | Use status toggle if permitted.                                                                                         |
| Send Activation Link | Show for inactive/pending members when permitted.                                                                       |
| Activity             | Navigate to `/activities?member_public_id=:public_id`.                                                                  |
| Delete               | Open delete confirmation view with `delete_reason`.                                                                     |
| Restore              | Show for deleted members when permitted.                                                                                |

Action restrictions:

- Hide destructive actions for deleted records except restore.
- Hide status/delete/setup-link actions for the super admin member when backend rules disallow them.
- Do not expose password, password hash, TOTP secret, or token values.

### Member Profile Modal

Use tabs:

| Tab     | Purpose                                                          |
| ------- | ---------------------------------------------------------------- |
| Profile | Member overview, security status, role chips, activity shortcut. |
| Devices | Login device/session list and logout actions.                    |

Profile sections:

- Header: avatar, full name, username, email, active/verified/2FA badges.
- Member Information: public ID, username, email, phone, gender, DOB.
- Security: 2FA, verified, locked state, member auth indicators where present.
- Roles: role chips. Role assignment should be opened through Access Control actor-role APIs.
- Activity: link/button to `/activities?member_public_id=:public_id`.
- Audit: deleted state, delete reason, created/updated dates.

### Device Tab

API filters for device sessions:

| Filter        | Query Param      | Type           |
| ------------- | ---------------- | -------------- |
| Search        | `search`         | search         |
| Status        | `is_active`      | boolean select |
| 2FA Validated | `is_2fa_enabled` | boolean select |
| Created Date  | `date_range`     | date range     |

Standard pagination/sort params:

```txt
page
limit
sort_by
sort_direction
preview_only
```

Device columns:

| Column     | Render                              |
| ---------- | ----------------------------------- |
| S/N        | Serial cell                         |
| Device     | `device_name`, `device_id`          |
| Request ID | Text/truncated                      |
| IP Address | Text                                |
| User Agent | Truncated tooltip                   |
| 2FA        | Boolean indicator                   |
| Status     | Active/expired/logged out           |
| Expires At | Date                                |
| Created At | Date                                |
| Actions    | Logout device when active/permitted |

Profile-level device actions:

- Logout selected device: `logoutMemberDeviceSession(public_id, session_id)`.
- Logout all devices: `logoutAllMemberDeviceSessions(public_id)`.

## 2. Member Activation

Purpose: public account setup after admin-created members receive an activation link.

Recommended frontend routes:

| Screen                | Frontend Route                |
| --------------------- | ----------------------------- |
| Activation Link Check | `/activate-account?token=...` |
| Complete Setup        | `/activate-account/setup`     |
| Complete              | `/activate-account/complete`  |

Current backend combines password setup and mandatory 2FA verification into one completion request.

### API Service Methods

| Method                     | HTTP/API Route                                       | Permission                                                    |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| `validateMemberSetupToken` | `POST /api/member/profile/validate-activation-token` | `member_profile_activation_module.validate_setup_token`       |
| `completeMemberSetup`      | `POST /api/member/profile/complete-activation`       | `member_profile_activation_module.complete_member_activation` |

Validate token payload:

```ts
interface ValidateMemberSetupTokenPayload {
    token: string;
}
```

Complete setup payload:

```ts
interface CompleteMemberSetupPayload {
    csrf_token: string;
    member_public_id: string;
    password: string;
    password_confirm: string;
    otp_code: string;
    token: string;
}
```

Token validation response includes member context, token public ID, expiry, and two-factor setup
information. The UI must not persist or display raw TOTP secret after setup completion.

## 3. Activities

Purpose: inspect activity/audit logs across members, apps, request IDs, and entity types.

Frontend route: `/activities`

### API Service Methods

| Method            | HTTP/API Route           | Permission                          |
| ----------------- | ------------------------ | ----------------------------------- |
| `getActivityList` | `GET /api/activity/list` | `activity_module.get_activity_list` |

### List Filters

| Filter         | Query Param                       | Type          | Notes                                               |
| -------------- | --------------------------------- | ------------- | --------------------------------------------------- |
| Search         | `search`                          | search        | Searches configured activity search fields.         |
| Registered App | `registered_app_id` or `app_id`   | select search | Use registered app preview fetcher.                 |
| Member         | `member_public_id` or `member_id` | select search | Use member preview/list fetcher.                    |
| Request ID     | `request_id`                      | text          | Exact request trace filter.                         |
| Entity Type    | `entity_type`                     | select/text   | Example: `Member`, `Role`, `ActorRole`, `AppEvent`. |
| IP Address     | `ip_address`                      | text          | Request context filter.                             |
| Status         | `status`                          | select        | `success`, `failed`.                                |
| Date Range     | `date_range`                      | date range    | Activity created date.                              |

Standard pagination/sort params:

```txt
page
limit
sort_by
sort_direction
```

Allowed `sort_by` values follow `ActivityLogQueryFields.find_and_sort_fields`.

### List Columns

| Column      | Render                                    |
| ----------- | ----------------------------------------- |
| S/N         | Serial cell                               |
| Actor       | Member/app summary when available         |
| Request ID  | Truncated text                            |
| Action      | Permission key formatted as readable text |
| Entity Type | Text/badge                                |
| Description | Main activity summary                     |
| IP Address  | Text                                      |
| User Agent  | Truncated tooltip                         |
| Status      | Success/failed badge                      |
| Created At  | Date                                      |
| Updated At  | Date                                      |

There is no create/edit/delete flow for activities.

## 4. Access Control

Purpose: manage roles, role permissions, and role assignments for member or registered app actors.

Frontend route: `/access-control`

### API Service Methods

| Method                       | HTTP/API Route                                              | Permission                                                  |
| ---------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `getRoleList`                | `GET /api/access-control/role/list`                         | `access_control_module.get_role_list`                       |
| `createRole`                 | `POST /api/access-control/role/create`                      | `access_control_module.create_role`                         |
| `updateRole`                 | `PATCH /api/access-control/role/:role_id/update`            | `access_control_module.update_role`                         |
| `getRolePermissionList`      | `GET /api/access-control/role/:role_id/permissions/list`    | `access_control_module.get_role_permission_list`            |
| `handleRolePermissionAction` | `POST /api/access-control/role/:role_id/permissions/action` | `access_control_module.assign_or_unassign_role_permissions` |
| `assignActorRoles`           | `POST /api/access-control/actor-role/assign`                | `access_control_module.assign_actor_roles`                  |
| `unassignActorRoles`         | `POST /api/access-control/actor-role/unassign`              | `access_control_module.unassign_actor_roles`                |

### Role List Filters

| Filter       | Query Param       | Type           |
| ------------ | ----------------- | -------------- |
| Search       | `search`          | search         |
| Member Group | `is_member_group` | boolean select |

Standard pagination/sort params:

```txt
page
limit
sort_by
sort_direction
preview_only
```

Allowed `sort_by` values follow `RoleQueryFields.find_and_sort_fields`.

### Role List Columns

| Column       | Render                                  |
| ------------ | --------------------------------------- |
| S/N + Select | Serial/select cell                      |
| Role         | Name, symbol, system/member-group badge |
| Type         | System role or member group             |
| Created By   | Member preview where included           |
| Updated By   | Member preview where included           |
| Created At   | Date                                    |
| Actions      | Row action menu                         |

### Role Forms

Create role:

```ts
interface CreateRolePayload {
    csrf_token: string;
    name: string;
    symbol: string;
    is_member_group: boolean;
}
```

Update role:

```ts
interface UpdateRolePayload {
    csrf_token: string;
    name?: string;
    symbol?: string;
    is_member_group?: boolean;
}
```

Backend note: role `symbol` cannot be changed after creation.

### Role Row Actions

| Action               | Flow                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| View                 | Open role profile modal.                                                                           |
| Edit                 | Open add/edit role modal.                                                                          |
| Assigned Permissions | Open permissions modal with `assignment_status=assigned`.                                          |
| Add Permissions      | Open permissions modal with `assignment_status=unassigned`, allow selecting permissions to assign. |

### Role Permission Modal

Fetch permissions:

```txt
GET /api/access-control/role/:role_id/permissions/list?assignment_status=assigned
GET /api/access-control/role/:role_id/permissions/list?assignment_status=unassigned
```

Action payload:

```ts
interface RolePermissionActionPayload {
    csrf_token: string;
    permission_ids: Array<number | string>;
    action: "assign" | "unassign";
}
```

Recommended UX:

- Assigned permissions view: list permission name/module/description, with remove action.
- Unassigned permissions view: multi-select permissions, submit assign action.
- Show affected/skipped counts from the response when useful.

### Actor Role Assignment

Use this from member profile role controls and registered app role controls when those screens need
role assignment.

Payload:

```ts
interface ActorRoleActionPayload {
    csrf_token: string;
    actor_type: "member" | "app";
    actor_id: string | number;
    role_ids: Array<number | string>;
}
```

Assignment:

```txt
POST /api/access-control/actor-role/assign
```

Unassignment:

```txt
POST /api/access-control/actor-role/unassign
```

Rules:

- Only super admin members can assign or unassign actor roles.
- Super admin role cannot be assigned or unassigned.
- Actors can have at most `MemberRoleLimits.MAX_ACTIVE_ROLES` active roles.
- Use `actor_type = "member"` and `actor_id = member.public_id` from member profile screens.
- Use `actor_type = "app"` and `actor_id = app.public_id` or app prefix from registered app screens.

Frontend form:

- View: `src/views/access_control/ActorRoleAssignmentFormView.vue`
- Controller: `src/controllers/access_control/actor_role_assignment_form_view_controller.ts`
- Action handler: `src/action_handlers/access_control/actor_role_assignment_form_view_action_handler.ts`
- Fields: `actor_id` select search and `role_ids` multi-select search.
- When opened from a member or registered app action menu, pass `actor_read_only: true` so the actor is preloaded and locked.
- Existing role selections can come from `record.roles`, `record.actor_roles[].role`, or an explicit `role_ids` array.
- On submit, the client diffs existing roles against the selected roles, then calls unassign for removed roles and assign for new roles.

Member profile modal payload sample:

```json
{
    "content_key": "content_resource.access_control_view_ui.modals_ui.actor_role_assignment_modal_ui",
    "animation_type": "slide_top",
    "body_component": "ActorRoleAssignmentFormView",
    "body_props": {
        "actor_type": "member",
        "actor_id": "mem_01HZX8M9Q2Y2YF1D7K",
        "actor_read_only": true,
        "record": {
            "public_id": "mem_01HZX8M9Q2Y2YF1D7K",
            "full_name": "Ada Lovelace",
            "email": "ada@example.com",
            "roles": [
                {
                    "id": 2,
                    "name": "Operations Manager",
                    "symbol": "OPS_MANAGER",
                    "display_name": "Operations Manager"
                }
            ]
        },
        "content_key": "content_resource.access_control_view_ui.modals_ui.actor_role_assignment_modal_ui"
    }
}
```

Registered app modal payload sample:

```json
{
    "content_key": "content_resource.access_control_view_ui.modals_ui.actor_role_assignment_modal_ui",
    "animation_type": "slide_top",
    "body_component": "ActorRoleAssignmentFormView",
    "body_props": {
        "actor_type": "app",
        "actor_id": "app_01HZX8N2Y5B9QT7WD",
        "actor_read_only": true,
        "record": {
            "public_id": "app_01HZX8N2Y5B9QT7WD",
            "prefix": "SHOP",
            "name": "Shop Portal",
            "roles": [
                {
                    "id": 4,
                    "name": "Checkout Service",
                    "symbol": "CHECKOUT_SERVICE",
                    "display_name": "Checkout Service"
                }
            ]
        },
        "content_key": "content_resource.access_control_view_ui.modals_ui.actor_role_assignment_modal_ui"
    }
}
```

Content JSON sample:

```json
{
    "access_control_view_ui": {
        "actor_role_assignment_form_view_ui": {
            "header_text": "Manage Actor Roles",
            "fieldset": {
                "actor_id_field": {
                    "label_text": "Actor",
                    "placeholder_text": "Search member or registered app",
                    "selected_text_prefix": "Selected"
                },
                "role_ids_field": {
                    "label_text": "Roles",
                    "placeholder_text": "Search and select up to 5 roles"
                },
                "btn_text": "Update Roles"
            }
        },
        "modals_ui": {
            "actor_role_assignment_modal_ui": {
                "title_text": "Manage Actor Roles"
            }
        }
    }
}
```

## Content Manager Shape

Use the existing content-resource naming style:

```txt
content_resource.member_profile_view_ui.list_view_ui
content_resource.member_profile_view_ui.form_view_ui
content_resource.member_profile_view_ui.profile_view_ui
content_resource.member_profile_view_ui.modals_ui.add_new_modal_ui
content_resource.member_profile_view_ui.modals_ui.update_modal_ui
content_resource.member_profile_view_ui.modals_ui.profile_details_modal_ui
content_resource.activity_view_ui.list_view_ui
content_resource.access_control_view_ui.list_view_ui
content_resource.access_control_view_ui.form_view_ui
content_resource.access_control_view_ui.profile_view_ui
```

Minimum sidebar content additions:

```json
{
    "label_text": "Members",
    "route": "/members",
    "permission": "member_profile_module.get_member_list"
}
```

Repeat for `Activities` and `Access Control`.

## Suggested Frontend File Structure

```txt
src/api_services/member_api_service.ts
src/api_services/activity_api_service.ts
src/api_services/access_control_api_service.ts

src/views/member/ListView.vue
src/views/member/AddEditFormView.vue
src/views/member/ProfileView.vue
src/views/member/DeleteView.vue
src/views/member/ActivationSetupView.vue

src/views/activity/ListView.vue

src/views/access_control/ListView.vue
src/views/access_control/AddEditRoleFormView.vue
src/views/access_control/RoleProfileView.vue
src/views/access_control/RolePermissionListView.vue
src/views/access_control/ActorRoleAssignmentFormView.vue
```

Use the existing controller/action-handler pattern:

- list view controller/action handler
- form view controller/action handler
- profile view controller/action handler
- delete/confirmation controller/action handler

## Implementation Order

Recommended order:

1. API service methods and TypeScript response/payload types.
2. Sidebar menu entries and route definitions.
3. Members list and create/edit form.
4. Member profile modal with Profile and Devices tabs.
5. Member activation/setup screens.
6. Activities list page with member/app/request filters.
7. Access control role list and role create/update form.
8. Role permissions assigned/unassigned modals.
9. Actor role assignment modal used from member profile and future registered app profile.
