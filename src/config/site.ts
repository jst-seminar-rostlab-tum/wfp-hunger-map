export const siteConfig = {
  name: 'HungerMap LIVE',
  description:
    'Explore the Global Hunger Map by WFP for real-time insights on global hunger trends, food insecurity data, and regional analysis to support humanitarian initiatives.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
  ],
  navMenuItems: [],
  links: {},
  keywords: [
    'global hunger map',
    'WFP hunger data',
    'food insecurity trends',
    'humanitarian aid insights',
    'hunger statistics',
    'real-time hunger data',
    'WFP hunger map',
  ],
  domain: 'https://www.wfp-hungermap.com', // TODO: update domain after real prod
};

export type SiteConfig = typeof siteConfig;
