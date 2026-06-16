# My Profile Content Payload

## Root Key

- `content_resource.my_profile_view_ui`

## Structure

```ts
{
  my_profile_view_ui: {
    form_view_ui: {
      header_text: string,
      content: {
        eyebrow_text: string,
        fallback_title_text: string,
        description_text: string,
        profile_information_title_text: string,
        password_title_text: string,
        uploading_photo_text: string,
        roles_label_text: string,
        active_account_text: string,
        verified_member_text: string,
        two_factor_enabled_text: string
      },
      fieldset: {
        first_name_field: FieldContent,
        last_name_field: FieldContent,
        email_field: FieldContent,
        phone_field: FieldContent,
        dob_field: FieldContent,
        gender_field: FieldContent & { options_list: Array<OptionContent> },
        profile_photo_link_field: FieldContent,
        new_password_field: FieldContent,
        password_confirm_field: FieldContent,
        submit_btn_text: string
      },
      api_responses: Record<string, string>
    }
  }
}
```

## Sample

See [my_profile_view_content_sample.json](./samples/my_profile_view_content_sample.json).
