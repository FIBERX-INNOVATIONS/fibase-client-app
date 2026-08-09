# Payment Provider Method UI Flow

## Module

Links payment providers to payment methods and transaction directions.

## Route

| Route                              | View                                         | Permission                                                        |
| ---------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| `/payment-config/provider-methods` | `views/payment_provider_method/ListView.vue` | `payment_provider_method_module.get_payment_provider_method_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`

## Flow

1. List view loads provider-method records with search, status, provider, payment method, direction, creator, and date filters.
2. Create/edit use a modal form to choose provider, payment method, direction, provider method code, and amount limits.
   Provider, payment method, and direction are required; provider method code and amount limits are optional.
3. Profile shows provider, method, direction, capability, status, and audit details.
4. Status toggle calls update-status.
5. Delete opens confirmation and calls delete.

## API Interactions

| Service Method                      | Endpoint                                                            | Method   |
| ----------------------------------- | ------------------------------------------------------------------- | -------- |
| `getPaymentProviderMethodList`      | `/payment-config/provider-method/list`                              | `GET`    |
| `getPaymentProviderMethod`          | `/payment-config/provider-method/:provider_method_id`               | `GET`    |
| `createPaymentProviderMethod`       | `/payment-config/provider-method/create`                            | `POST`   |
| `updatePaymentProviderMethod`       | `/payment-config/provider-method/:provider_method_id/update`        | `PATCH`  |
| `updatePaymentProviderMethodStatus` | `/payment-config/provider-method/:provider_method_id/update-status` | `PATCH`  |
| `deletePaymentProviderMethod`       | `/payment-config/provider-method/:provider_method_id/delete`        | `DELETE` |
