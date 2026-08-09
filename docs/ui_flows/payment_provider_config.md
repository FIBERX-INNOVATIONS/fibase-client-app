# Payment Provider Config UI Flow

## Module

Manages environment-specific credentials and settings for payment provider accounts.

## Route

| Route                              | View                                         | Permission                                                        |
| ---------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| `/payment-config/provider-configs` | `views/payment_provider_config/ListView.vue` | `payment_provider_config_module.get_payment_provider_config_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`

## Flow

1. List view loads configs with search, provider, environment, account reference, creator, and date filters.
2. Create/edit use a modal form for provider, environment, credentials, and the complete typed settings payload.
   Existing settings are repopulated in edit mode; credential inputs remain blank and omitted unless replaced.
3. Profile shows config details. Credential values should only be fetched when explicitly requested by a permitted user.
4. This module has no status toggle in the current service.
5. Delete opens confirmation and calls delete.

## API Interactions

| Service Method                        | Endpoint                                                  | Method   |
| ------------------------------------- | --------------------------------------------------------- | -------- |
| `getPaymentProviderConfigList`        | `/payment-config/provider-configs/list`                   | `GET`    |
| `getPaymentProviderConfig`            | `/payment-config/provider-configs/:config_id`             | `GET`    |
| `getPaymentProviderConfigCredentials` | `/payment-config/provider-configs/:config_id/credentials` | `GET`    |
| `createPaymentProviderConfig`         | `/payment-config/provider-configs/create`                 | `POST`   |
| `updatePaymentProviderConfig`         | `/payment-config/provider-configs/:config_id/update`      | `PATCH`  |
| `deletePaymentProviderConfig`         | `/payment-config/provider-configs/:config_id/delete`      | `DELETE` |
