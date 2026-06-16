# Activation Content Payload

## Root Key

- `content_resource.activate_account_view_ui`

## Structure

```ts
{
  activate_account_view_ui: {
    header_text: string,
    content: {
      validating_text: string,
      invalid_token_text: string,
      invalid_token_help_text: string,
      password_instruction_text: string,
      two_factor_instruction_text: string,
      authenticator_apps_title_text: string,
      qr_instruction_text: string,
      otp_instruction_text: string,
      secret_key_title_text: string,
      secret_key_empty_text: string,
      copy_button_text: string,
      copied_button_text: string
    },
    fieldset: {
      password_field: { label_text: string, placeholder_text: string },
      password_confirm_field: { label_text: string, placeholder_text: string },
      otp_field: { label_text: string, placeholder_text: string },
      next_btn_text: string,
      submit_btn_text: string,
      back_btn_text: string,
      show_password_btn_text: string,
      hide_password_btn_text: string
    },
    api_responses: Record<string, string>
  }
}
```

## Sample

See [activate_account_view_content_sample.json](./samples/activate_account_view_content_sample.json).
