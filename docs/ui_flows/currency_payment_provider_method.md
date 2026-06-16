# Currency Payment Provider Method UI Flow

## Module

Manages currency-specific availability and limits for provider payment methods.

## Route

| Route                                       | View                                                  | Permission                                                                          |
| ------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/payment-config/currency-provider-methods` | `views/currency_payment_provider_method/ListView.vue` | `currency_payment_provider_method_module.get_currency_payment_provider_method_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`

## Flow

1. List view loads records with search, status, currency, provider, payment method, provider method, direction, creator, and date filters.
2. Create/edit use a modal form for currency, provider method, limits, fees, and status-sensitive settings.
3. Profile shows currency, provider, method, direction, limits, fees, status, and audit details.
4. Status toggle calls update-status.
5. Delete opens confirmation and calls delete.

## API Interactions

| Service Method                              | Endpoint                                                                               | Method   |
| ------------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| `getCurrencyPaymentProviderMethodList`      | `/payment-config/currency-provider-methods/list`                                       | `GET`    |
| `getCurrencyPaymentProviderMethod`          | `/payment-config/currency-provider-methods/:currency_provider_method_id`               | `GET`    |
| `createCurrencyPaymentProviderMethod`       | `/payment-config/currency-provider-methods/create`                                     | `POST`   |
| `updateCurrencyPaymentProviderMethod`       | `/payment-config/currency-provider-methods/:currency_provider_method_id/update`        | `PATCH`  |
| `updateCurrencyPaymentProviderMethodStatus` | `/payment-config/currency-provider-methods/:currency_provider_method_id/update-status` | `PATCH`  |
| `deleteCurrencyPaymentProviderMethod`       | `/payment-config/currency-provider-methods/:currency_provider_method_id/delete`        | `DELETE` |
