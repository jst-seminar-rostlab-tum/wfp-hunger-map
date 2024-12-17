export const siteConfig = {
  name: 'Global Hunger Map - WFP Initiative',
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
  domain: 'https://www.wfp-hungermap.com', // todo: update domain
};

export type SiteConfig = typeof siteConfig;
