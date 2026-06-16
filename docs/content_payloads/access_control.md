# Access Control Content Payload

## Root Key

- `content_resource.access_control_view_ui`

## Structure

```ts
{
  access_control_view_ui: {
    list_view_ui: ListViewContent,
    form_view_ui: FormViewContent,
    profile_view_ui: ProfileViewContent,
    delete_view_ui: DeleteViewContent,
    permissions_view_ui: {
      header_section: { header_text: string, header_description: string },
      table: TableContent,
      action_btn: ButtonContent,
      assigned_empty_text: string,
      unassigned_empty_text: string
    },
    actor_role_assignment_form_view_ui: {
      header_section: { header_text: string, header_description: string },
      fieldset: Record<string, FieldContent | ButtonContent>
    },
    modals_ui: {
      add_new_modal_ui: ModalContent,
      update_modal_ui: ModalContent,
      profile_details_modal_ui: ModalContent,
      delete_modal_ui: ModalContent,
      permissions_modal_ui: ModalContent,
      actor_role_assignment_modal_ui: ModalContent
    },
    api_responses: Record<string, string>
  }
}
```

## Expected List Content

- Breadcrumbs: Home, Access Control.
- Header: title, description, add role button.
- Filters: search, member group.
- Table: serial/select, role, type, permissions summary, created at, actions.
- Actions: view, edit, assigned permissions, add permissions, delete.

## Sample

See [access_control_list_view_content_sample.json](./samples/access_control_list_view_content_sample.json).
