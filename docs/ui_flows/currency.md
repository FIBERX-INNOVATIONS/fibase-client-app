# Currency UI Flow

## Module

Manages currency catalog records and app currency assignment/default state.

## Route

| Route         | View                          | Permission                          |
| ------------- | ----------------------------- | ----------------------------------- |
| `/currencies` | `views/currency/ListView.vue` | `currency_module.get_currency_list` |

## Views

- `ListView.vue`
- `AddEditFormView.vue`
- `ProfileView.vue`
- `DeleteView.vue`
- `AssignCurrencyFormView.vue`
- `SetDefaultCurrencyView.vue`
- `UnAssignCurrencyView.vue`

## Flow

1. List view loads currency records with filters for search, active state, fiat state, network symbol, creator, precision, minor unit, numeric code, app assignment, and date range.
2. Create/edit use the currency form modal, collect a crypto network symbol where applicable, and upload icon/logo files through file storage when needed.
3. Profile opens currency details and displays network information when the currency includes it.
4. Status toggle calls the update-status endpoint.
5. Delete opens confirmation and calls delete.
6. Assign/unassign app currency flows submit the app currency action endpoint.
7. Set default currency submits the default currency endpoint.

## API Interactions

| Service Method            | Endpoint                                         | Method   |
| ------------------------- | ------------------------------------------------ | -------- |
| `getCurrencyList`         | `/currency/list`                                 | `GET`    |
| `getCurrency`             | `/currency/:currency_id`                         | `GET`    |
| `createCurrency`          | `/currency/create`                               | `POST`   |
| `updateCurrency`          | `/currency/:currency_id/update`                  | `PATCH`  |
| `updateCurrencyStatus`    | `/currency/:currency_id/update-status`           | `PATCH`  |
| `deleteCurrency`          | `/currency/:currency_id/delete`                  | `DELETE` |
| `handleAppCurrencyAction` | `/currency/app-currency/action`                  | `POST`   |
| `toggleDefaultCurrency`   | `/currency/app-currency/update-default-currency` | `POST`   |
| `uploadFile`              | `/file-storage/upload`                           | `POST`   |
