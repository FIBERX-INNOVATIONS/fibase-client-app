# Member Profile Content Payload

## Root Key

- `content_resource.member_profile_view_ui`

## Structure

```ts
{
  member_profile_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    restore_member_view_ui: DecisionViewContent,
    send_activation_link_view_ui: DecisionViewContent,
    member_devices_view_ui: ListViewContent,
    member_device_decision_view_ui: DecisionViewContent,
    modals_ui: {
      add_new_modal_ui: ModalContent,
      update_modal_ui: ModalContent,
      profile_details_modal_ui: ModalContent,
      delete_modal_ui: ModalContent,
      restore_member_modal_ui: ModalContent,
      send_activation_link_modal_ui: ModalContent,
      member_devices_modal_ui: ModalContent,
      member_device_decision_modal_ui: ModalContent
    },
    api_responses: Record<string, string>
  }
}
```

## Expected List Content

- Breadcrumbs: Home, Members.
- Header: title, description, create button.
- Filters: search, status, verified, 2FA, locked, deleted, role, gender, date range.
- Table: serial/select, member, username, roles, security, status, deleted, created at, actions.
- Actions: view, edit, activate/deactivate, send activation link, activity, delete, restore.

## Form Payload Copy

Include labels for first name, last name, email, phone, DOB, gender, profile photo, password fields where applicable, and submit/cancel buttons.

## Sample

See [member_profile_list_view_content_sample.json](./samples/member_profile_list_view_content_sample.json).
