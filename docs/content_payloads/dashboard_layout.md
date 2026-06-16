# Dashboard Layout Content Payload

## Root Key

- `content_resource.dashboard_layout_ui`

## Structure

```ts
{
  dashboard_layout_ui: {
    side_bar_ui: {
      nav_menu_list: Array<{
        menu_text: string,
        menu_icon: string,
        menu_link?: string,
        menu_permission_text?: string,
        children?: Array<{
          menu_text: string,
          menu_icon?: string,
          menu_link: string,
          menu_permission_text?: string
        }>
      }>
    },
    top_bar_ui?: {
      my_profile_menu_text?: string,
      logout_menu_text?: string
    },
    modal_ui?: Record<string, unknown>,
    alert_status_ui?: Record<string, string>
  }
}
```

## Notes

Sidebar menu items are permission-gated by `menu_permission_text`. Payment configuration routes may be grouped under a `Payment Config` parent menu, while Members, Activities, and Access Control are separate top-level items.
