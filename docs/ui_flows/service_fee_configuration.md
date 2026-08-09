# Service Fee Configuration UI Flow

## Module

Manages hierarchical transaction fee configurations by currency, application, provider, and identity.

## Route

| Route                 | View                                           | Permission                                                            |
| --------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| `/fee-configurations` | `views/service_fee_configuration/ListView.vue` | `service_fee_configuration_module.get_service_fee_configuration_list` |

## List Flow

1. The list loads through `GET /fee-configuration/list` using 12 records per page and newest-first ordering.
2. Filters cover status, scope relationships, transaction type, configuration level, fee type, effective state,
   amount bounds, creator/updater, and relevant date ranges.
3. The create button is visible only with `service_fee_configuration_module.create_service_fee_configuration`.
4. The status toggle is visible only with
   `service_fee_configuration_module.update_service_fee_configuration_status` and obtains a dedicated CSRF token.
5. The row action menu supports record selection and permission-gated editing.

## Profile Flow

1. The permission-gated View action opens `ProfileView.vue` with the selected list record.
2. The profile refreshes the full record through `GET /fee-configuration/:fee_configuration_id`.
3. The view presents configuration, scope, fee, lifecycle, creator/updater, and all range-tier details.

## Create and Edit Flow

1. The create button opens `AddEditFormView.vue` in the add-new modal.
2. The edit menu opens the same form and passes the selected record so all persisted inputs, including range rows,
   are prefilled.
3. Currency is required. Application, provider, and identity are optional scopes that determine the backend
   configuration level. Each optional search includes a `No selection` option that clears its API value to `null`.
4. Flat and percentage fees require one amount. Range fees replace that input with repeatable minimum, optional
   maximum, range fee type, and amount fields.
5. Frontend validation mirrors backend-safe business rules: decimal values allow up to 18 integer and 18 fractional
   digits, percentages cannot exceed 100, scopes follow application → provider → identity, and range tiers must start
   at zero, remain exactly contiguous, and finish with an open-ended tier.
6. Create and update submissions obtain a `SERVICE_FEE_CONFIGURATION` CSRF token and call their respective API
   endpoints. A successful response refreshes the list and closes the modal through the shared record event.

## API Interactions

| Service Method                        | Endpoint                                                 | Method  |
| ------------------------------------- | -------------------------------------------------------- | ------- |
| `getServiceFeeConfigurationList`      | `/fee-configuration/list`                                | `GET`   |
| `getServiceFeeConfiguration`          | `/fee-configuration/:fee_configuration_id`               | `GET`   |
| `createServiceFeeConfiguration`       | `/fee-configuration/create`                              | `POST`  |
| `updateServiceFeeConfiguration`       | `/fee-configuration/:fee_configuration_id/update`        | `PATCH` |
| `updateServiceFeeConfigurationStatus` | `/fee-configuration/:fee_configuration_id/update-status` | `PATCH` |
