# Payment Provider Method Content Payload

## Root Key

- `content_resource.payment_provider_method_view_ui`

## Structure

```ts
{
  payment_provider_method_view_ui: {
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

- Filters: search, status, provider, payment method, direction, created by, date range.
- Form fields: provider, payment method, direction, provider method code, minimum amount, and maximum amount.
- Table columns: serial/select, provider, payment method, direction, provider method code, status, linked by, created at, actions.

## Sample

See [payment_provider_method_list_view_content_sample.json](./samples/payment_provider_method_list_view_content_sample.json).
