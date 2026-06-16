# Payment Method Content Payload

## Root Key

- `content_resource.payment_method_view_ui`

## Structure

```ts
{
  payment_method_view_ui: {
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

- Filters: search, status, display group, supports deposit, supports withdrawal, supports refund, requires redirect, created by, date range.
- Form fields: code, name, description, icon URL/upload, sort order, display name, display description, display group, processing time, fee label, supported countries, supported currencies, requires redirect, capability checkboxes, min amount, max amount.
- Table columns: serial/select, method, display group, capabilities, sort order, status, created by, created at, actions.
