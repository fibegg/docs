---
sidebar_position: 5
title: Security
description: Protect your account with two-factor authentication, security keys, session management, API keys, and webhooks.
---

# Security

fibe.gg provides multiple layers of protection for your account — from **two-factor authentication** and **security keys** to **session management**, **API keys**, and **webhooks**. This page covers everything you need to keep your account and integrations secure.

---

## Two-Factor Authentication (2FA)

Two-factor authentication adds an extra layer of security to your account. Even if someone obtains your password, they cannot access your account without a valid one-time code from your authenticator app.

### Enabling 2FA

1. Go to **Profile → Security**
2. Click **Enable Two-Factor Authentication**
3. Scan the QR code with your preferred authenticator app (e.g., Google Authenticator, Authy, 1Password)
4. Enter the 6-digit code from your authenticator app to verify the setup

Once verified, you will be presented with a set of **recovery codes**.

### Recovery Codes

When you enable 2FA, fibe.gg generates **10 single-use recovery codes**. You must confirm one of these codes to complete the setup process.

Each recovery code can only be used **once**. After using a code, it is permanently consumed.

If you are running low on recovery codes, you can regenerate a fresh set from **Profile → Security**. Regenerating codes invalidates all previously issued codes.

:::caution
Store your recovery codes in a safe place — such as a password manager or a secure physical location. If you lose access to both your authenticator app and your recovery codes, you may be locked out of your account.
:::

### Disabling 2FA

To disable two-factor authentication, go to **Profile → Security** and click **Disable 2FA**. You will need to enter a valid 6-digit code from your authenticator app to confirm.

### Session Trust

After enabling 2FA, your existing sessions will need to be re-verified. Until a session is verified with a valid TOTP code, recovery code, or security key, it will be considered untrusted and you will be prompted to verify before performing sensitive actions.

---

## Security Keys (WebAuthn)

Security keys provide a phishing-resistant way to verify your identity. fibe.gg supports **FIDO2/U2F hardware keys** (such as YubiKey) as well as **platform authenticators** (such as Touch ID, Face ID, or Windows Hello).

### Adding a Security Key

1. Go to **Profile → Security**
2. Click **Add Security Key**
3. Give your key a recognizable name (e.g., `YubiKey 5C` or `MacBook Touch ID`)
4. Follow your browser's prompt to register the key

You can add multiple security keys to your account for redundancy.

### Using Security Keys

Security keys can be used for:

- **Sudo mode verification** — confirm sensitive actions without entering a TOTP code
- **Session trust restoration** — re-verify an untrusted session after enabling 2FA

When prompted for verification, simply select the security key option and follow your browser's instructions.

### Removing a Security Key

To remove a security key, go to **Profile → Security**, find the key you want to remove, and click **Remove**. Removing a security key requires **sudo mode** to be active.

:::tip
For maximum account security, use security keys **alongside** TOTP-based two-factor authentication. This gives you multiple verification methods and reduces the risk of being locked out.
:::

---

## Session Management

fibe.gg lets you monitor and control all active sessions on your account, so you always know where you are signed in.

### Session Expiry

Sessions are valid for **30 days** from the last activity. After that, you will need to sign in again.

### Viewing Active Sessions

Go to **Profile → Security** to see a list of all your active sessions. For each session, you can see:

- **IP address** from which the session was created
- **Browser and operating system** used
- **Last active** timestamp
- Whether the session is your **current session**

### Revoking Sessions

- **Revoke a single session**: Click the revoke button next to any session to end it immediately. That device will need to sign in again.
- **Revoke all other sessions**: Click **Revoke All Other Sessions** to end every session except the one you are currently using. This action requires **sudo mode**.

### Session Trust and 2FA

If you have 2FA enabled, sessions must be **trusted** before you can perform sensitive actions. A session becomes trusted when you verify it with one of the following:

- A **TOTP code** from your authenticator app
- A **recovery code**
- A **security key**

Trust can be restored at any time from the verification prompt that appears when you attempt a protected action.

---

## Sudo Mode

Certain sensitive actions in fibe.gg require you to re-verify your identity, even if you are already signed in. This is called **sudo mode** — a short-lived elevated state that confirms it is really you performing the action.

### How It Works

When you attempt a sensitive action, fibe.gg will prompt you to verify your identity. Once verified, sudo mode remains active for **15 minutes**, during which you can perform additional sensitive actions without being prompted again.

### Actions That Require Sudo Mode

- Creating or destroying **API keys**
- Creating, revealing, or destroying **secrets**
- Creating or destroying **webhook endpoints**
- Revealing webhook signing secrets
- Revoking all other **sessions**
- Adding or removing **security keys**

### Entering Sudo Mode

You can verify your identity using any of the following methods:

- Enter a **TOTP code** from your authenticator app
- Enter a **recovery code** (single-use)
- Authenticate with a **security key**

After verification, you will be returned to the action you were attempting.

---

## API Keys

API Keys let you authenticate programmatically — for CI/CD pipelines, the MCP server, or any custom tooling.

### Creating an API Key

1. Go to **Profile → API Keys**
2. Click **New API Key**
3. Give it a descriptive label (e.g., `GitHub Actions CI`)
4. Select the **scopes** you need
5. Copy your key — it will only be shown once

:::caution
Store your key securely. fibe.gg only shows the full token at creation time.
:::

### Scopes

API keys are scoped — they only grant access to what you explicitly allow:

| Scope | Access |
|-------|--------|
| `marquees:read` | List and view Marquees |
| `marquees:write` | Create Marquees |
| `marquees:delete` | Delete Marquees |
| `playspecs:read` | List and view Playspecs |
| `playspecs:write` | Create and update Playspecs |
| `playspecs:delete` | Delete Playspecs |
| `playgrounds:read` | List and view Playgrounds |
| `playgrounds:write` | Create, extend, and recreate Playgrounds |
| `playgrounds:delete` | Destroy Playgrounds |
| `props:read` | List and view Props |
| `props:write` | Create Props |
| `import_templates:read` | Browse and search templates |
| `import_templates:write` | Create and manage templates |
| `genies:read` | List and view genies and their data |
| `genies:write` | Manage genie data |
| `webhooks:read` | View webhook endpoints and deliveries |
| `webhooks:write` | Create and update webhook endpoints |
| `webhooks:delete` | Delete webhook endpoints |
| `mcp:access` | Connect to the MCP server |
| `repos:write` | Create repositories and push files |

### Key Lifecycle

- **Expiry**: Set an optional expiration date
- **Rotation**: Revoke and re-create keys at any time from your profile
- **Last Used**: Track when the key was last used for security auditing

---

## Secret Vault

The Secret Vault allows you to store sensitive credentials securely. This is especially useful for securely providing credentials to AI genies connected via the MCP (Model Context Protocol).

### Managing Secrets

Secrets are stored as Key-Value pairs with an optional description.

1. Go to **Profile → Advanced Settings** (or find the dedicated **Secrets** section).
2. Click **New Secret**.
3. Provide a unique alphanumeric **Key** (e.g., `OPENAI_API_KEY`).
4. Provide the sensitive **Value**.
5. Optionally add a description.

:::important
Values are encrypted at rest. Be cautious about who or which genies have access to retrieve your secrets. AI genies with the correct MCP tools can retrieve these values automatically.
:::

---

## Webhooks

Webhooks let external services receive real-time notifications when things happen in fibe.gg.

### Supported Events

| Event | Triggered When |
|-------|---------------|
| `playground.created` | A Playground is successfully created |
| `playground.started` | A Playground starts running |
| `playground.stopped` | A Playground is stopped |
| `playground.destroyed` | A Playground is destroyed |
| `playground.error` | A Playground enters an error state |
| `playground.expiring` | A Playground is about to expire |
| `playground.recreated` | A Playground is recreated from scratch |
| `marquee.created` | A new Marquee is registered |
| `marquee.deleted` | A Marquee is deleted |
| `playspec.created` | A new Playspec is created |
| `playspec.deleted` | A Playspec is deleted |

### Creating a Webhook Endpoint

1. Go to **Profile → Webhooks**
2. Click **New Webhook**
3. Enter the target **URL** (must be HTTPS)
4. Select the **events** you want to receive
5. Optionally set a **Secret** to sign requests
6. Click **Save**

### Payload Format

All webhook events are delivered as HTTP POST requests:

```json
{
  "event": "playground.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 123,
    "name": "My Playground",
    "status": "running"
  }
}
```

### Verifying Signatures

If you set a secret, fibe.gg signs each request with an `X-Playground-Signature` header:

```
X-Playground-Signature: sha256=abc123...
```

Verify it in your handler by computing `HMAC-SHA256(secret, raw_body)` and comparing.

### Delivery Logs

Every webhook delivery is logged. Navigate to the webhook endpoint to inspect:
- **Response status** for each delivery
- **Request/Response headers and body**
- **Failure reason** if delivery failed
- **Retry history** for failed deliveries

:::tip Testing
Use **Test Webhook** to send a sample `playground.created` event to your endpoint and verify it's working correctly.
:::
