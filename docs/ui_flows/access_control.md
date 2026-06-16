# Access Control UI Flow

## Module

Manages roles, permission assignment, and actor role assignment for members or registered apps.

## Route

| Route                   | View                                | Permission                            |
| ----------------------- | ----------------------------------- | ------------------------------------- |
| `/access-control/roles` | `views/access_control/ListView.vue` | `access_control_module.get_role_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`
- `PermissionsView.vue`
- `ActorRoleAssignmentFormView.vue`

## Flow

1. List view loads role records with search and member-group filters.
2. Create opens the role form modal.
3. Edit opens the role form modal with the selected role.
4. Profile opens role details.
5. Assigned permissions opens the permissions modal in assigned mode.
6. Add permissions opens the permissions modal in unassigned mode.
7. Permission actions submit selected permission IDs to the permission action endpoint.
8. Actor role assignment is opened by other modules, such as registered apps, and submits assign/unassign actions.
9. Delete opens a confirmation modal and deletes the selected role.

## API Interactions

| Service Method               | Endpoint                                           | Method   |
| ---------------------------- | -------------------------------------------------- | -------- |
| `getRoleList`                | `/access-control/role/list`                        | `GET`    |
| `createRole`                 | `/access-control/role/create`                      | `POST`   |
| `updateRole`                 | `/access-control/role/:role_id/update`             | `PATCH`  |
| `deleteRole`                 | `/access-control/role/:role_id/delete`             | `DELETE` |
| `getRolePermissionList`      | `/access-control/role/:role_id/permissions/list`   | `GET`    |
| `handleRolePermissionAction` | `/access-control/role/:role_id/permissions/action` | `POST`   |
| `assignActorRoles`           | `/access-control/actor-role/assign`                | `POST`   |
| `unassignActorRoles`         | `/access-control/actor-role/unassign`              | `POST`   |
