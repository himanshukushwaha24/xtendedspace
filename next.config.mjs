
/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['xtendedspace.s3.ap-south-1.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/easystorage',
        destination: `/easy-storage`,
        permanent: false,
      },
      {
        source: '/blog/moving-and-packing-tips',
        destination: `https://web.xtendedspace.com/blog/moving-and-packing-tips/`,
        permanent: false,
      },
      {
        source: '/blog/organizing-decorations-with-seasonal-storage-ideas',
        destination: `https://web.xtendedspace.com/blog/organizing-decorations-with-seasonal-storage-ideas/`,
        permanent: false,
      },
      {
        source: '/blog/advantages-of-opting-for-professional-storage-services',
        destination: `https://web.xtendedspace.com/blog/advantages-of-opting-for-professional-storage-services/`,
        permanent: false,
      },
      {
        source: '/blog/arrange-space-with-storage-advice-and-guides',
        destination: `https://web.xtendedspace.com/blog/arrange-space-with-storage-advice-and-guides/`,
        permanent: false,
      },
      {
        source: '/blog/seasonal-storage-to-clear-your-home-of-clutter',
        destination: `https://web.xtendedspace.com/blog/seasonal-storage-to-clear-your-home-of-clutter/`,
        permanent: false,
      },
      {
        source: '/blog/packing-and-moving-guides-for-hassle-free-relocation-in-india',
        destination: `https://web.xtendedspace.com/blog/packing-and-moving-guides-for-hassle-free-relocation-in-india/`,
        permanent: false,
      },
      {
        source: '/blog/benefits-of-using-professional-storage-services',
        destination: `https://web.xtendedspace.com/blog/benefits-of-using-professional-storage-services/`,
        permanent: false,
      },
      {
        source: '/blog/best-storage-option-in-delhi-ncr-is-xtended-space',
        destination: `https://web.xtendedspace.com/blog/best-storage-option-in-delhi-ncr-is-xtended-space/`,
        permanent: false,
      },
      {
        source: '/blog/self-storage-units-in-india',
        destination: `https://web.xtendedspace.com/blog/self-storage-units-in-india/`,
        permanent: false,
      },
      {
        source: '/blog/how-and-where-store-items-while-renovations-are-underway',
        destination: `https://web.xtendedspace.com/blog/how-and-where-store-items-while-renovations-are-underway/`,
        permanent: false,
      },
      {
        source: '/blog/long-term-storage-unit',
        destination: `https://web.xtendedspace.com/blog/long-term-storage-unit/`,
        permanent: false,
      },
      {
        source: '/blog/how-to-make-house-a-home-by-adding-essential-rental-household-items',
        destination: `https://web.xtendedspace.com/blog/how-to-make-house-a-home-by-adding-essential-rental-household-items/`,
        permanent: false,
      },
      {
        source: '/blog/increasing-organization-and-efficiency-in-warehouse-storage-facility',
        destination: `https://web.xtendedspace.com/blog/increasing-organization-and-efficiency-in-warehouse-storage-facility/`,
        permanent: false,
      },
      {
        source: '/blog/storage-solutions-in-noida',
        destination: `https://web.xtendedspace.com/blog/storage-solutions-in-noida/`,
        permanent: false,
      },
      {
        source: '/blog/maximize-space-with-creative-home-storage-ideas',
        destination: `https://web.xtendedspace.com/blog/maximize-space-with-creative-home-storage-ideas/`,
        permanent: false,
      },
      {
        source: '/blog/organizing-chaos-at-house-means-organizing-lifestyle',
        destination: `https://web.xtendedspace.com/blog/organizing-chaos-at-house-means-organizing-lifestyle/`,
        permanent: false,
      },
      {
        source: '/blog/art-of-decluttering-the-cooking-space',
        destination: `https://web.xtendedspace.com/blog/art-of-decluttering-the-cooking-space/`,
        permanent: false,
      },
      {
        source: '/blog/how-xtended-space-is-contributing-environment-by-using-smart-logistics',
        destination: 'https://web.xtendedspace.com/blog/how-xtended-space-is-contributing-environment-by-using-smart-logistics/',
        permanent: false,
      },
      {
        source: '/blog/xtended-space-is-your-ultimate-solution-for-storing-with-comfort',
        destination: 'https://web.xtendedspace.com/blog/xtended-space-is-your-ultimate-solution-for-storing-with-comfort/',
        permanent: false,
      },
      {
        source: '/blog/secure-warehouse-storage-and-budget-friendly-solutions',
        destination: 'https://web.xtendedspace.com/blog/secure-warehouse-storage-and-budget-friendly-solutions/',
        permanent: false,
      },
      {
        source: '/blog/top-10-decluttering-tips-for-streamlining-and-organizing-space',
        destination: 'https://web.xtendedspace.com/blog/top-10-decluttering-tips-for-streamlining-and-organizing-space/',
        permanent: false,
      },
      {
        source: '/blog/some-tips-for-organizing-your-small-office-to-increase-productivity',
        destination: 'https://web.xtendedspace.com/blog/some-tips-for-organizing-your-small-office-to-increase-productivity/',
        permanent: false,
      },
      {
        source: '/blog/how-members-and-coworking-operators-can-benefit-from-self-storage',
        destination: 'https://web.xtendedspace.com/blog/how-members-and-coworking-operators-can-benefit-from-self-storage/',
        permanent: false,
      },
      {
        source: '/blog/9-considerations-for-document-storage-in-self-storage',
        destination: 'https://web.xtendedspace.com/blog/9-considerations-for-document-storage-in-self-storage/',
        permanent: false,
      },
      {
        source: '/blog/strategies-for-using-self-storage-facility-in-your-company',
        destination: 'https://web.xtendedspace.com/blog/strategies-for-using-self-storage-facility-in-your-company/',
        permanent: false,
      },
      {
        source: '/blog/benefits-of-using-xtended-space-services',
        destination: 'https://web.xtendedspace.com/blog/benefits-of-using-xtended-space-services/',
        permanent: false,
      },
      {
        source: '/blog/earn-passive-income-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/earn-passive-income-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/optimizing-your-living-space-with-practical-storage-solutions',
        destination: 'https://web.xtendedspace.com/blog/optimizing-your-living-space-with-practical-storage-solutions/',
        permanent: false,
      },
      {
        source: '/blog/simple-guide-to-decluttering-storage-space-in-your-home',
        destination: 'https://web.xtendedspace.com/blog/simple-guide-to-decluttering-storage-space-in-your-home/',
        permanent: false,
      },
      {
        source: '/blog/advantages-of-self-storage-while-remodeling',
        destination: 'https://web.xtendedspace.com/blog/advantages-of-self-storage-while-remodeling/',
        permanent: false,
      },
      {
        source: '/blog/organizing-your-space-with-style',
        destination: 'https://web.xtendedspace.com/blog/organizing-your-space-with-style/',
        permanent: false,
      },
      {
        source: '/blog/planning-your-home-renovation',
        destination: 'https://web.xtendedspace.com/blog/planning-your-home-renovation/',
        permanent: false,
      },
      {
        source: '/blog/smart-storage-for-sustainable-future',
        destination: 'https://web.xtendedspace.com/blog/smart-storage-for-sustainable-future/',
        permanent: false,
      },
      {
        source: '/blog/get-10-days-free-storage-services-at-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/get-10-days-free-storage-services-at-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/how-xtended-space-helps-business-stay-flexible',
        destination: 'https://web.xtendedspace.com/blog/how-xtended-space-helps-business-stay-flexible/',
        permanent: false,
      },
      {
        source: '/blog/five-creative-methods-for-setting-up-craft-room',
        destination: 'https://web.xtendedspace.com/blog/five-creative-methods-for-setting-up-craft-room/',
        permanent: false,
      },
      {
        source: '/blog/furniture-safety-tips-for-secure-storage',
        destination: 'https://web.xtendedspace.com/blog/furniture-safety-tips-for-secure-storage/',
        permanent: false,
      },
      {
        source: '/blog/tips-for-safely-moving-your-furniture',
        destination: 'https://web.xtendedspace.com/blog/tips-for-safely-moving-your-furniture/',
        permanent: false,
      },
      {
        source: '/blog/tips-from-experts-on-safely-packing-fragile-items-for-storage',
        destination: 'https://web.xtendedspace.com/blog/tips-from-experts-on-safely-packing-fragile-items-for-storage/',
        permanent: false,
      },
      {
        source: '/blog/budget-friendly-home-renovation-ideas',
        destination: 'https://web.xtendedspace.com/blog/budget-friendly-home-renovation-ideas/',
        permanent: false,
      },
      {
        source: '/blog/where-your-business-inventory-finds-perfect-home',
        destination: 'https://web.xtendedspace.com/blog/where-your-business-inventory-finds-perfect-home/',
        permanent: false,
      },
      {
        source: '/blog/storage-for-businesses-and-homes',
        destination: 'https://web.xtendedspace.com/blog/storage-for-businesses-and-homes/',
        permanent: false,
      },
      {
        source: '/blog/xtended-space-save-your-time-while-providing-storage-services',
        destination: 'https://web.xtendedspace.com/blog/xtended-space-save-your-time-while-providing-storage-services/',
        permanent: false,
      },
      {
        source: '/blog/organized-weekends-and-happy-families-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/organized-weekends-and-happy-families-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/seamless-career-growth-and-life-balance-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/seamless-career-growth-and-life-balance-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/how-self-storage-can-make-life-simpler',
        destination: 'https://web.xtendedspace.com/blog/how-self-storage-can-make-life-simpler/',
        permanent: false,
      },
      {
        source: '/blog/comprehensive-guide-to-stress-free-travel',
        destination: 'https://web.xtendedspace.com/blog/comprehensive-guide-to-stress-free-travel/',
        permanent: false,
      },
      {
        source: '/blog/benefits-of-self-storage-for-small-enterprises',
        destination: 'https://web.xtendedspace.com/blog/benefits-of-self-storage-for-small-enterprises/',
        permanent: false,
      },
      {
        source: '/blog/effective-storage-during-renovation-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/effective-storage-during-renovation-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/xtended-space-empowering-dreams-unlimited',
        destination: 'https://web.xtendedspace.com/blog/xtended-space-empowering-dreams-unlimited/',
        permanent: false,
      },
      {
        source: '/blog/live-happy-life-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/live-happy-life-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/xtended-space-making-space-exploration-simple-and-exciting',
        destination: 'https://web.xtendedspace.com/blog/xtended-space-making-space-exploration-simple-and-exciting/',
        permanent: false,
      },
      {
        source: '/blog/here-are-some-pointers-to-keep-furniture-safe-during-storage',
        destination: 'https://web.xtendedspace.com/blog/here-are-some-pointers-to-keep-furniture-safe-during-storage/',
        permanent: false,
      },
      {
        source: '/blog/how-to-pack-boxes-for-move-without-making-these-mistakes',
        destination: 'https://web.xtendedspace.com/blog/how-to-pack-boxes-for-move-without-making-these-mistakes/',
        permanent: false,
      },
      {
        source: '/blog/how-to-store-stuff-and-where-put-during-renovations',
        destination: 'https://web.xtendedspace.com/blog/how-to-store-stuff-and-where-put-during-renovations/',
        permanent: false,
      },
      {
        source: '/blog/fantastic-camping-storage-solutions-and-tips-for-hassle-free-trip',
        destination: 'https://web.xtendedspace.com/blog/fantastic-camping-storage-solutions-and-tips-for-hassle-free-trip/',
        permanent: false,
      },
      {
        source: '/blog/storage-solutions-for-compact-homes-maximizing-space-with-ease',
        destination: 'https://web.xtendedspace.com/blog/storage-solutions-for-compact-homes-maximizing-space-with-ease/',
        permanent: false,
      },
      {
        source: '/blog/roommate-suggestions-for-moving-in-overview-help-through-the-shift',
        destination: 'https://web.xtendedspace.com/blog/roommate-suggestions-for-moving-in-overview-help-through-the-shift/',
        permanent: false,
      },
      {
        source: '/blog/using-compass-self-storage-to-streamline-and-organize-spare-room',
        destination: 'https://web.xtendedspace.com/blog/using-compass-self-storage-to-streamline-and-organize-spare-room/',
        permanent: false,
      },
      {
        source: '/blog/be-responsible-and-disciplined-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/be-responsible-and-disciplined-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/storage-solution-for-emerging-business',
        destination: 'https://web.xtendedspace.com/blog/storage-solution-for-emerging-business/',
        permanent: false,
      },
      {
        source: '/blog/storage-service-journey-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/storage-service-journey-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/storage-space-comfort-is-our-concern',
        destination: 'https://web.xtendedspace.com/blog/storage-space-comfort-is-our-concern/',
        permanent: false,
      },
      {
        source: '/blog/storage-facilities-in-gurgaon-become-super-easy-with-xtended-space',
        destination: 'https://web.xtendedspace.com/blog/storage-facilities-in-gurgaon-become-super-easy-with-xtended-space/',
        permanent: false,
      },
      {
        source: '/blog/facing-big-challenges-during-unavailability-of-landlord-during-relocation',
        destination: 'https://web.xtendedspace.com/blog/facing-big-challenges-during-unavailability-of-landlord-during-relocation/',
        permanent: false,
      },
      {
        source: '/blog/importance-of-proper-mattress-storage',
        destination: 'https://web.xtendedspace.com/blog/importance-of-proper-mattress-storage/',
        permanent: false,
      },
      {
        source: '/blog/unlocking-convenience-of-self-storage-in-noida',
        destination: 'https://web.xtendedspace.com/blog/unlocking-convenience-of-self-storage-in-noida/',
        permanent: false,
      },
    
      
    
    ]
  },
  reactStrictMode: true,
  transpilePackages: [
    'rc-util',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand', 'leva', 'antd',
    'rc-pagination',
    'rc-picker'
  ],};
  
export default nextConfig;
