---
sidebar_position: 4
title: Artefacts & Activity
description: Monitor agent thinking processes and manage file attachments.
---

# Artefacts & Activity

fibe.gg introduces powerful new ways to interact with and monitor your AI Agents during their operation, ensuring transparency and providing seamless file management.

## Agent Activity

The **Agent Activity** panel gives you a real-time window into your agent's operation. When an agent is attached to a Playground or running in a standalone chat session, you can monitor its process transparently.

### Key Features
- **Online Activity Timeline:** View a continuous chronological timeline of the agent's actions, commands run, and responses.
- **Thinking Chain Visualization:** See exactly how the agent is reasoning before it takes action. The UI displays the agent's internal "thinking" processes (e.g., specific to advanced models that expose their reasoning).
- **Grouped Commands:** If an agent runs multiple commands consecutively (3+), they are grouped automatically into a collapsible block to keep the chat interface clean and readable.
- **Activity History:** Access and download full activity history.
- **Public Timelines:** Enable "Build in Public" to generate a shareable URL where anyone can follow your agent's progress. This features a premium, real-time timeline of all actions and artefacts.
- **Persistent Sidebar:** The activity panel remains persistently available on desktop views, allowing you to debug and monitor the agent without leaving your workspace.

## Agent Mutters

**Mutters** represent the agent's internal "thinking" or reasoning process. While these are often technical or analytical, they are exposed to you for maximum transparency.

- **Real-time Streaming:** Watch the agent's thoughts as they are generated.
- **Toggle Visibility:** You can collapse or expand mutters to focus on the final actions or the reasoning behind them.
- **Feedback Integration:** You can provide feedback specifically on a mutter (see below).

## Agent Feedback & Comments

You can interact directly with your agent's output and reasoning using the **Feedback System**.

- **Text Selection:** Highlight any text within an **Artefact** or a **Mutter** to leave a comment or suggestion.
- **Contextual Guidance:** Your feedback is injected directly into the agent's context, helping it correct course or refine its approach based on your specific needs.
- **Visual Indicators:** Integrated markers show where feedback has been provided in the timeline.

## Agent Artefacts

**Agent Artefacts** allow you to seamlessly transfer files to and from your AI agents using a dedicated, secure S3-backed storage bucket.

### Managing Artefacts
- **Drag-and-Drop:** Easily upload files to the agent's environment by dragging them directly into the chat interface.
- **Multi-type Uploads:** Support for multiple file types, automatically categorized with relevant attachment icons.
- **Dynamic File Explorer:** View an organized file tree of all the artefacts the agent has generated, downloaded, or that you have provided.
- **Storage:** Artefacts can be up to 10MB each and are safely isolated within the agent's running context.
- **Playground Association:** Each artefact, feedback, and mutter can be associated with a specific `playground_id`, indicating which workspace it originated from. Use `?playground_id=ID` when listing via the API to filter by workspace.

## Logs and Debugging

For deeper technical inspection, fibe.gg provides comprehensive **Agent Logs** and **Audit Logs**.
- **Agent Logs:** Display real-time standard output and standard error from the agent sidecar container.
- **Playground Audit Logs:** Track all major lifecycle events for the environment to keep an accountable history of creations, updates, and Agent interactions.
