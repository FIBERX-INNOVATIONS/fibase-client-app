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
   Code and name are required; description, provider type, logo, and website are optional and validated when provided.
3. Profile shows provider metadata, website, status, and audit fields.
4. Status toggle calls update-status.
5. Delete opens a confirmation modal and calls delete.
6. Record operations use the API record `id`; `code` remains a display and payload field.

## API Interactions

| Service Method                | Endpoint                                              | Method   |
| ----------------------------- | ----------------------------------------------------- | -------- |
| `getPaymentProviderList`      | `/payment-config/provider/list`                       | `GET`    |
| `getPaymentProvider`          | `/payment-config/provider/:provider_id`               | `GET`    |
| `createPaymentProvider`       | `/payment-config/provider/create`                     | `POST`   |
| `updatePaymentProvider`       | `/payment-config/provider/:provider_id/update`        | `PATCH`  |
| `updatePaymentProviderStatus` | `/payment-config/provider/:provider_id/update-status` | `PATCH`  |
| `deletePaymentProvider`       | `/payment-config/provider/:provider_id/delete`        | `DELETE` |
| `uploadFile`                  | `/file-storage/upload`                                | `POST`   |
