# Currency Payment Provider Method Content Payload

## Root Key

- `content_resource.currency_payment_provider_method_view_ui`

## Structure

```ts
{
  currency_payment_provider_method_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    modals_ui: {
      add_new_modal_ui: ModalContent,
      update_modal_ui: ModalContent,
      profile_details_modal_ui: ModalContent,
      delete_modal_ui: ModalContent
    },
    api_responses: Record<string, string>
  }
}
```

## Expected Content

- Filters: search, status, currency, provider, payment method, provider method, direction, created by, date range.
- Form fields: currency, provider method, direction, min amount, max amount, fee configuration, settlement/processing metadata.
- Table columns: serial/select, currency, provider, payment method, direction, limits, status, created by, created at, actions.

## Sample

See [currency_payment_provider_method_list_view_content_sample.json](./samples/currency_payment_provider_method_list_view_content_sample.json).
