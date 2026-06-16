# Activity Content Payload

## Root Key

- `content_resource.activity_view_ui`

## Structure

```ts
{
  activity_view_ui: {
    list_view_ui: {
      breadcrumb_list: BreadcrumbContent[],
      header_section: { header_text: string, header_description: string },
      filters_section: {
        toggle_btn: ButtonContent,
        clear_filters_btn: ButtonContent,
        apply_filters_btn: ButtonContent,
        search_filter: FieldContent,
        registered_app_filter: SelectSearchContent,
        member_filter: SelectSearchContent,
        request_id_filter: FieldContent,
        entity_type_filter: FieldContent & { option_list: OptionContent[] },
        ip_address_filter: FieldContent,
        status_filter: FieldContent & { option_list: OptionContent[] },
        date_range_filter: DateRangeContent
      },
      table: TableContent
    },
    api_responses: Record<string, string>
  }
}
```

## Notes

This is a read-only module, so no `form_view_ui`, `delete_view_ui`, or mutation modal copy is expected.

## Sample

See [activity_list_view_content_sample.json](./samples/activity_list_view_content_sample.json).
