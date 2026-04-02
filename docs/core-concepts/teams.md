---
sidebar_position: 8
title: Teams
description: Collaborate with others by sharing resources through team workspaces.
---

# Teams

**Teams** let you collaborate with other players by sharing resources in a structured workspace. Whether you are working with colleagues, clients, or open-source contributors, teams give everyone the right level of access without duplicating infrastructure.

:::info Availability
Teams is currently available to players who have been granted access. If you do not see the Teams section in your dashboard, reach out to support to request enablement.
:::

---

## Why Use Teams?

- **Share infrastructure** — Give teammates access to your [Marquees](/core-concepts/marquee), [Playspecs](/core-concepts/playspec), [Props](/core-concepts/prop), [Playgrounds](/core-concepts/playground), Genies, and Templates without sharing credentials.
- **Control permissions** — Decide whether shared resources are view-only or fully manageable.
- **Collaborate in real time** — Team members see shared resources alongside their own and can work on them directly.

---

## Creating a Team

1. Navigate to **Teams** in the sidebar.
2. Click **New Team**.
3. Give your team a descriptive name.
4. You are automatically assigned as the **Owner**.

---

## Roles

Every team member has one of three roles:

| Role | What they can do |
|------|-----------------|
| **Owner** | Full control over the team: manage members, change roles, share and remove resources, update settings, transfer leadership, and delete the team. There is exactly one Owner per team. |
| **Admin** | Manage members (invite, remove, change roles) and manage shared resources. Cannot delete the team or transfer leadership. |
| **Member** | View the team and access shared resources according to each resource's permission level. Cannot invite or manage other members. |

:::tip
Owners and Admins can promote a Member to Admin or demote an Admin to Member at any time. The Owner role can only change hands through [leadership transfer](#transfer-leadership).
:::

---

## Inviting Members

Owners and Admins can invite new members by GitHub handle:

1. Open your team page.
2. Enter the person's **GitHub username** in the invite field.
3. Click **Invite**.

The invitee receives a real-time notification with **Accept** and **Decline** buttons.

:::info Pending Invites
If the person you invite does not have a fibe.gg account yet, the invitation is saved as pending. It will automatically resolve and appear for them the moment they sign up with that GitHub account.
:::

---

## Accepting or Declining Invitations

When you receive a team invitation:

- A notification appears in your dashboard with the team name and who invited you.
- Click **Accept** to join the team immediately, or **Decline** to dismiss the invitation.
- You can also view all pending invitations from the **Teams** page.

---

## Sharing Resources

Team members can contribute their own resources to the team for others to access. Shareable resource types include:

- [Marquees](/core-concepts/marquee)
- [Playspecs](/core-concepts/playspec)
- [Props](/core-concepts/prop)
- [Playgrounds](/core-concepts/playground)
- Genies
- Templates

### Permission Levels

When sharing a resource, you choose a permission level:

| Permission | Access granted to team members |
|------------|-------------------------------|
| **Read** | View the resource and its details. Cannot modify, delete, or perform destructive actions. |
| **Manage** | Full access to the resource as if they owned it — view, edit, reconfigure, and delete. |

:::warning
A resource can only belong to one team at a time. You must remove it from its current team before contributing it to a different one.
:::

### Contributing a Resource

1. Open your team page.
2. Select the resource type you want to share.
3. Search for the specific resource by name.
4. Choose **Read** or **Manage** permission.
5. Click **Contribute**.

Only resources you own can be contributed. The contributor (or an Owner/Admin) can remove a shared resource from the team at any time.

---

## Team API Keys

When you create [API Keys](/core-concepts/security#api-keys), those keys can access team-shared resources according to their permission levels. This means your CI/CD pipelines and automation tools can work with shared Marquees, Playspecs, and other resources contributed to your teams.

---

## Leaving a Team

Any member (except the Owner) can leave a team at any time:

1. Open the team page.
2. Click **Leave Team**.

When you leave, you lose access to all resources shared within that team. Any resources you contributed remain with the team until an Owner or Admin removes them.

:::warning Owner Restriction
The team Owner cannot leave directly. You must first [transfer leadership](#transfer-leadership) to another member, then leave.
:::

---

## Transfer Leadership

If you are the Owner and want to hand over control:

1. Open the team page.
2. Select the member you want to promote.
3. Click **Transfer Leadership**.

The selected member becomes the new Owner, and you are moved to the Admin role. This action is immediate and cannot be undone without the new Owner's cooperation.

---

## Deleting a Team

Only the Owner can delete a team, and only when they are the **sole remaining member**. All other members must leave or be removed first.

1. Remove all other members (or wait for them to leave).
2. Click **Delete Team** on the team page.

:::warning
Deleting a team removes all resource sharing associations. The underlying resources themselves (Marquees, Playgrounds, etc.) are not deleted — they remain with their original owners.
:::
