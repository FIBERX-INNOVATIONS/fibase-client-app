# Currency Content Payload

## Root Key

- `content_resource.currency_view_ui`

## Structure

```ts
{
  currency_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    assign_currency_form_view_ui: FormViewContent,
    set_default_currency_view_ui: DecisionViewContent,
    unassign_currency_view_ui: DecisionViewContent,
    modals_ui: {
      add_new_modal_ui: ModalContent,
      update_modal_ui: ModalContent,
      profile_details_modal_ui: ModalContent,
      delete_modal_ui: ModalContent,
      assign_currency_modal_ui: ModalContent,
      set_default_currency_modal_ui: ModalContent,
      unassign_currency_modal_ui: ModalContent,
      bulk_unassign_currency_modal_ui: ModalContent
    },
    api_responses: Record<string, string>
  }
}
```

## Expected List Content

- Filters: search, status, fiat, created by, precision, minor unit, numeric code, app assignment, date range.
- Table: serial/select, currency name/code, symbol, fiat state, precision/minor unit, status, created by, created at, actions.
- Actions: view, edit, toggle status, assign, unassign, set default, delete.
