---
sidebar_position: 5
title: Data Portability
description: Export and import your fibe.gg configuration for backup, migration, or environment transfer.
---

# Data Portability

Data Portability lets you **export** and **import** your fibe.gg account configuration. Use it to create backups, migrate between environments, or transfer your setup to a different account.

## Exportable Data

The following entities can be included in an export:

| Entity | Description |
|--------|-------------|
| **Marquees** | Your configured remote hosts and their settings |
| **Props** | Connected repositories and their sync configuration |
| **Playspecs** | Environment blueprints including service definitions |
| **Genies** | Stored AI provider configurations and credentials |
| **Playgrounds** | Running or stopped environment instances |
| **Templates** | Reusable environment templates and their versions |
| **API Keys** | Your issued API keys |
| **Secrets** | Encrypted secrets from your Secret Vault |
| **Webhook Endpoints** | Configured webhook listeners |

## Exporting Your Data

1. Go to **Profile → Advanced Settings → Data Portability**
2. Select the entities you want to export
3. Optionally enable **email notification** to be alerted when the export is ready
4. Click **Export**
5. Once complete, download your file from the **History** tab

:::info Export Availability
Completed exports are available for download for **24 hours**. After that, the file is automatically removed.
:::

## Importing Data

1. Upload a `.jsonl` or `.jsonl.gz` file
2. Select which entities to import
3. Choose a **conflict strategy** (see below)
4. Click **Import**
5. Monitor progress in the **History** tab

:::tip
You can import data exported from any fibe.gg environment, making it straightforward to move configurations between staging and production setups.
:::

## Conflict Strategies

When importing data that overlaps with existing records, you choose how conflicts are handled:

| Strategy | Behaviour |
|----------|-----------|
| **Merge** | Update existing records with the imported data |
| **Skip** | Preserve existing records and only import new ones |

## History & Status

The **History** tab provides a real-time view of all your data transfers:

- Track the progress of running exports and imports
- Download completed export files
- View details and status of past transfers

## Rollback

If an import produces unexpected results, completed imports can be **rolled back**, restoring your data to its pre-import state.

## Limits

| Limit | Value |
|-------|-------|
| Concurrent transfers | **1** active transfer at a time |
| Maximum file size | **50 MB** |
| Maximum records | **5,000** per transfer |
