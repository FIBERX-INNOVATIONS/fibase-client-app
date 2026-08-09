# Payment Method UI Flow

## Module

Manages the payment rail catalog, such as card, bank transfer, wallet, and mobile money.

## Route

| Route                     | View                                | Permission                                      |
| ------------------------- | ----------------------------------- | ----------------------------------------------- |
| `/payment-config/methods` | `views/payment_method/ListView.vue` | `payment_method_module.get_payment_method_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`

## Flow

1. List view loads records with search, status, display group, capability, creator, and date filters.
2. Create/edit use a modal form and may upload an icon through file storage.
   Code and name are required; description, sort order, and metadata fields are optional and validated when provided.
3. Profile shows method metadata, capabilities, supported countries/currencies, and audit fields.
4. Status toggle calls update-status.
5. Delete opens a confirmation modal and calls delete.
6. Record operations use the API record `id`; `code` remains a display and payload field.

## API Interactions

| Service Method              | Endpoint                                          | Method   |
| --------------------------- | ------------------------------------------------- | -------- |
| `getPaymentMethodList`      | `/payment-config/method/list`                     | `GET`    |
| `getPaymentMethod`          | `/payment-config/method/:method_id`               | `GET`    |
| `createPaymentMethod`       | `/payment-config/method/create`                   | `POST`   |
| `updatePaymentMethod`       | `/payment-config/method/:method_id/update`        | `PATCH`  |
| `updatePaymentMethodStatus` | `/payment-config/method/:method_id/update-status` | `PATCH`  |
| `deletePaymentMethod`       | `/payment-config/method/:method_id/delete`        | `DELETE` |
| `uploadFile`                | `/file-storage/upload`                            | `POST`   |
