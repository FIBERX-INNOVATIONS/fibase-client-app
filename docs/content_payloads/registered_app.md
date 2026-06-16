# Registered App Content Payload

## Root Key

- `content_resource.registered_app_view_ui`

## Structure

```ts
{
  registered_app_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    activation_credentials_view_ui: {
      header_section: { header_text: string, header_description: string },
      empty_value_text: string,
      copy_button: { text: string, icon: string },
      copied_button: { text: string, icon: string },
      credentials_section: { items: Record<string, { title_text: string, title_icon: string }> },
      private_key_section: { title_text: string, title_icon: string }
    },
    modals_ui: {
      add_new_modal_ui: ModalContent,
      update_modal_ui: ModalContent,
      profile_details_modal_ui: ModalContent,
      delete_modal_ui: ModalContent,
      activation_credentials_modal_ui: ModalContent
    },
    api_responses: Record<string, string>
  }
}
```

## Expected List Content

- Breadcrumbs: Home, Registered Apps.
- Header: title, description, create button.
- Filters: search, status, created by, key version, date range.
- Table: serial/select, app, prefix/base URL, status, key version, created by, created at, actions.
- Actions: view, edit, manage roles, toggle status, delete.

## Samples

See [registered_app_activation_credentials_view_content_sample.json](./samples/registered_app_activation_credentials_view_content_sample.json).
