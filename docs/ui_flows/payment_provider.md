# Payment Provider UI Flow

## Module

Manages payment processor/provider records, such as gateways, banking partners, wallet providers, and other integrations.

## Route

| Route                       | View                                  | Permission                                          |
| --------------------------- | ------------------------------------- | --------------------------------------------------- |
| `/payment-config/providers` | `views/payment_provider/ListView.vue` | `payment_provider_module.get_payment_provider_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`

## Flow

1. List view loads provider records with search, status, provider type, creator, and date filters.
2. Create/edit use a modal form and may upload a logo through file storage.
3. Profile shows provider metadata, website, status, and audit fields.
4. Status toggle calls update-status.
5. Delete opens a confirmation modal and calls delete.

## API Interactions

| Service Method                | Endpoint                                               | Method   |
| ----------------------------- | ------------------------------------------------------ | -------- |
| `getPaymentProviderList`      | `/payment-config/providers/list`                       | `GET`    |
| `getPaymentProvider`          | `/payment-config/providers/:provider_id`               | `GET`    |
| `createPaymentProvider`       | `/payment-config/providers/create`                     | `POST`   |
| `updatePaymentProvider`       | `/payment-config/providers/:provider_id/update`        | `PATCH`  |
| `updatePaymentProviderStatus` | `/payment-config/providers/:provider_id/update-status` | `PATCH`  |
| `deletePaymentProvider`       | `/payment-config/providers/:provider_id/delete`        | `DELETE` |
| `uploadFile`                  | `/file-storage/upload`                                 | `POST`   |
