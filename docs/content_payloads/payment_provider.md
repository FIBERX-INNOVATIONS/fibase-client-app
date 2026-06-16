# Payment Provider Content Payload

## Root Key

- `content_resource.payment_provider_view_ui`

## Structure

```ts
{
  payment_provider_view_ui: {
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

- Filters: search, status, provider type, created by, date range.
- Form fields: code, name, description, provider type, logo URL/upload, website URL.
- Table columns: serial/select, provider, provider type, website, status, created by, created at, actions.

## Sample

See [payment_provider_list_view_content_sample.json](./samples/payment_provider_list_view_content_sample.json).
