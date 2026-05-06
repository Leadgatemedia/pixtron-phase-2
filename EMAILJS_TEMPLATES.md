# EmailJS Templates

These templates match the current Pixtron contact forms:

- Signature Series form: name, email, phone number, restaurant name, note.
- Custom Series form: name, email, phone number, business / brand name, note.

The app sends both templates from `app/contact/emailjs.ts`. The admin template uses `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID`; the client confirmation template uses `NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID`.

In the EmailJS dashboard, set the template recipients this way:

- Admin notification template `To Email`: `{{admin_to_email}}`
- Client confirmation template `To Email`: `{{client_to_email}}` or `{{to_email}}`
- Admin notification template `Subject`: `{{admin_subject}}`
- Client confirmation template `Subject`: `{{client_subject}}`

If the admin template also uses `{{to_email}}`, the app now overrides that value to `ops@pixtron.net` by default so the customer does not receive the admin copy. You can change that with `NEXT_PUBLIC_EMAILJS_ADMIN_TO_EMAIL`.

## Client Confirmation Template

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#F5F5F5" style="margin:0;padding:0;width:100%;background-color:#F5F5F5;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="720" style="width:100%;max-width:720px;background-color:#FFFFFF;border:1px solid #E0DFDF;border-radius:20px;overflow:hidden;">
        <tr>
          <td bgcolor="#268128" style="padding:28px 32px;background-color:#268128;">
            <div style="margin:0;font-family:Arial,sans-serif;font-size:28px;line-height:36px;font-weight:700;color:#FFFFFF;">
              Thanks for your {{audience_label}} inquiry
            </div>
            <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#EAF7EA;">
              We received your message.
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;background-color:#FFFFFF;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#EAF2FF" style="padding:10px 14px;background-color:#EAF2FF;border-radius:999px;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#1168D8;">
                  {{audience_label}}
                </td>
              </tr>
            </table>

            <div style="margin-top:24px;font-family:Arial,sans-serif;font-size:16px;line-height:28px;color:#222222;">
              Hi {{sender_name}},
            </div>

            <div style="margin-top:14px;font-family:Arial,sans-serif;font-size:16px;line-height:28px;color:#222222;">
              Thanks for contacting {{site_name}} about {{client_intro}}. Our team will review your details and get back to you soon.
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;width:100%;border:1px solid #E0DFDF;background-color:#F5F5F5;border-radius:16px;">
              <tr>
                <td style="padding:20px;font-family:Arial,sans-serif;">
                  <div style="font-size:14px;line-height:22px;color:#666666;">{{business_label}}</div>
                  <div style="margin-top:4px;font-size:18px;line-height:28px;font-weight:700;color:#141414;">{{business_name}}</div>

                  <div style="margin-top:18px;font-size:14px;line-height:22px;color:#666666;">Phone Number</div>
                  <div style="margin-top:4px;font-size:16px;line-height:26px;color:#222222;">{{phone_number}}</div>

                  <div style="margin-top:18px;font-size:14px;line-height:22px;color:#666666;">Your note</div>
                  <div style="margin-top:6px;font-size:16px;line-height:28px;color:#222222;">{{message}}</div>
                </td>
              </tr>
            </table>

            <div style="margin-top:24px;font-family:Arial,sans-serif;font-size:16px;line-height:28px;color:#222222;">
              We will reply to <strong>{{sender_email}}</strong>.
            </div>

            <div style="margin-top:28px;font-family:Arial,sans-serif;font-size:16px;line-height:28px;color:#222222;">
              Best,<br />{{site_name}}
            </div>

            <div style="margin-top:20px;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#666666;">
              <a href="{{site_url}}" style="color:#1168D8;text-decoration:none;">Visit {{site_name}}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## Admin Notification Template

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#F5F5F5" style="margin:0;padding:0;width:100%;background-color:#F5F5F5;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="720" style="width:100%;max-width:720px;background-color:#FFFFFF;border:1px solid #E0DFDF;">
        <tr>
          <td bgcolor="#268128" style="padding:28px 32px;background-color:#268128;">
            <div style="margin:0;font-family:Arial,sans-serif;font-size:28px;line-height:36px;font-weight:700;color:#FFFFFF;">
              New {{audience_label}} Inquiry
            </div>
            <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#EAF7EA;">
              {{inquiry_label}}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;background-color:#FFFFFF;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#EAF2FF" style="padding:10px 14px;background-color:#EAF2FF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#1168D8;">
                  {{audience_label}}
                </td>
              </tr>
            </table>

            <div style="margin-top:24px;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#444444;">
              Submitted on {{submitted_at}}
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;border-collapse:collapse;width:100%;">
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">Name</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#141414;">{{sender_name}}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">Email</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;">
                  <a href="mailto:{{sender_email}}" style="color:#1168D8;text-decoration:none;">{{sender_email}}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">Phone Number</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#141414;">{{phone_number}}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">Inquiry Type</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#141414;">{{audience_label}}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">{{business_label}}</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#141414;">{{business_name}}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;font-weight:700;color:#141414;">Page</td>
                <td align="right" style="padding:14px 0;border-top:1px solid #E0DFDF;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#141414;">{{page_title}}</td>
              </tr>
            </table>

            <div style="margin-top:28px;font-family:Arial,sans-serif;font-size:18px;line-height:28px;font-weight:700;color:#141414;">
              Message
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:12px;width:100%;border:1px solid #E0DFDF;background-color:#F5F5F5;">
              <tr>
                <td style="padding:20px;font-family:Arial,sans-serif;font-size:16px;line-height:28px;color:#222222;">
                  {{message}}
                </td>
              </tr>
            </table>

            <div style="margin-top:28px;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#666666;">
              Sent from {{site_name}}<br />
              <a href="{{page_url}}" style="color:#1168D8;text-decoration:none;">{{page_url}}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```
