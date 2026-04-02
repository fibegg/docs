/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/marquee',
        'core-concepts/prop',
        'core-concepts/playspec',
        'core-concepts/playground',
        'core-concepts/job-mode',
        'core-concepts/audit-logs',
        'core-concepts/security',
        'core-concepts/onboarding-wizard',
        'core-concepts/profile',
        'core-concepts/teams',
        'core-concepts/billing',
        'core-concepts/automated-jobs',
      ],
    },
    {
      type: 'category',
      label: 'Genies',
      collapsed: false,
      items: [
        'genies/overview',
        'genies/authentication',
        'genies/playground-integration',
        'genies/artefacts-and-activity',
        'genies/mounted-files',
        'genies/bridge',
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
        'services/data-portability',
        'services/rate-limiting',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/marquees',
        'api/props',
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
