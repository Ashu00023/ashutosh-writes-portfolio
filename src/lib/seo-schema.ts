export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ashutosh Mahapatra",
  "url": "https://www.ashutoshwrites.online",
  "jobTitle": "Freelance SEO Blog Writer & YouTube Script Writer",
  "description": "Ashutosh Mahapatra is a freelance content writer specializing in 100% human-written SEO blogs and high-retention YouTube scripts.",
  "sameAs": [
    "https://www.linkedin.com/in/ashutosh-mahapatra-7b1b1b1b1", // Placeholder, will update if found
    "https://www.instagram.com/ashutosh.writes"
  ],
  "knowsAbout": [
    "SEO Blog Writing",
    "YouTube Script Writing",
    "Content Strategy",
    "Keyword Research"
  ]
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Content Writing",
  "provider": {
    "@type": "Person",
    "name": "Ashutosh Mahapatra"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Content Writing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Blog Writing",
          "description": "High-quality, keyword-optimized blog posts designed to rank on Google page 1. 100% human-written."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "YouTube Script Writing",
          "description": "High-retention, engaging scripts optimized for watch time and virality. 100% human-written."
        }
      }
    ]
  }
});
