# Registered App UI Flow

## Module

Manages client applications that integrate with the platform. The module supports list, create, edit, profile, delete, status toggle, role assignment, and activation credentials display.

## Route

| Route              | View                                | Permission                                      |
| ------------------ | ----------------------------------- | ----------------------------------------------- |
| `/registered-apps` | `views/registered_app/ListView.vue` | `registered_app_module.get_registered_app_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`
- `ActivationCredentialsView.vue`

## Flow

1. List view loads apps with filters, pagination, sorting, and row actions.
2. Header create action opens the add form modal.
3. Edit opens the same form with the selected record.
4. Profile opens a read-only detail modal.
5. Status toggle calls the update-status endpoint and, when activation credentials are returned, opens the activation credentials modal.
6. Manage roles opens the access-control actor-role assignment modal for the selected app.
7. Delete opens a confirmation modal and calls the delete endpoint.

## API Interactions

| Service Method              | Endpoint                                   | Method   |
| --------------------------- | ------------------------------------------ | -------- |
| `getRegisteredAppList`      | `/registered-app/list`                     | `GET`    |
| `getRegisteredApp`          | `/registered-app/:public_id`               | `GET`    |
| `createRegisteredApp`       | `/registered-app/create`                   | `POST`   |
| `updateRegisteredApp`       | `/registered-app/:public_id/update`        | `PATCH`  |
| `updateRegisteredAppStatus` | `/registered-app/:public_id/update-status` | `PATCH`  |
| `deleteRegisteredApp`       | `/registered-app/:public_id/delete`        | `DELETE` |
| `assignActorRoles`          | `/access-control/actor-role/assign`        | `POST`   |
| `unassignActorRoles`        | `/access-control/actor-role/unassign`      | `POST`   |
