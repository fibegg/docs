/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/playroom',
        'core-concepts/playzone',
        'core-concepts/playspec',
        'core-concepts/playground',
        'core-concepts/job-mode',
        'core-concepts/audit-logs',
        'core-concepts/security',
        'core-concepts/onboarding-wizard',
        'core-concepts/profile',
      ],
    },
    {
      type: 'category',
      label: 'Agents',
      collapsed: false,
      items: [
        'agents/overview',
        'agents/authentication',
        'agents/playground-integration',
        'agents/artefacts-and-activity',
        'agents/mounted-files',
      ],
    },
    {
      type: 'category',
      label: 'MCP Server',
      items: [
        'mcp/overview',
      ],
    },
    {
      type: 'category',
      label: 'Launch',
      items: [
        'launch/launch',
        'launch/stargate',
        'launch/my-fleet',
        'launch/templates',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      items: [
        'services/overview',
        'services/environment-variables',
        'services/networking',
        'services/advanced',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/playrooms',
        'api/playzones',
        'api/playspecs',
        'api/playgrounds',
        'api/repositories',
        'api/launch',
        'api/templates',
        'api/webhooks',
      ],
    },
  ],
};

export default sidebars;
