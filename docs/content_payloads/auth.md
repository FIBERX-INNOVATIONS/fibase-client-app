# Auth Content Payload

## Root Keys

- `content_resource.login_view_ui`
- `content_resource.two_factor_login_view_ui`
- `content_resource.logout_view_ui`

## Login Structure

```ts
{
  login_view_ui: {
    header_text: string,
    content: {
      description_text: string,
      forgot_password_text?: string
    },
    fieldset: {
      email_field: { label_text: string, placeholder_text: string },
      password_field: { label_text: string, placeholder_text: string },
      submit_btn_text: string,
      show_password_btn_text?: string,
      hide_password_btn_text?: string
    },
    api_responses: Record<string, string>
  }
}
```

## Two-Factor Structure

```ts
{
  two_factor_login_view_ui: {
    header_text: string,
    content: { instruction_text: string },
    fieldset: {
      otp_field: { label_text: string, placeholder_text: string },
      submit_btn_text: string
    },
    api_responses: Record<string, string>
  }
}
```

## Logout Structure

```ts
{
  logout_view_ui: {
    content: {
      logging_out_text: string,
      logged_out_text: string
    },
    api_responses: Record<string, string>
  }
}
```
