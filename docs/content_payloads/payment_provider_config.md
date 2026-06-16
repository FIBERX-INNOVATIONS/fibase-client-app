# Payment Provider Config Content Payload

## Root Key

- `content_resource.payment_provider_config_view_ui`

## Structure

```ts
{
  payment_provider_config_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    credentials_view_ui?: {
      reveal_btn: ButtonContent,
      hide_btn: ButtonContent,
      empty_value_text: string,
      sensitive_value_label_text: string
    },
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

- Filters: search, provider, environment, account reference, created by, date range.
- Form fields: provider, environment, account reference, credentials object fields, settings object fields.
- Table columns: serial/select, provider, environment, account reference, created by, created at, actions.
- No status toggle content is expected for the current service.

## Sample

See [payment_provider_config_list_view_content_sample.json](./samples/payment_provider_config_list_view_content_sample.json).
