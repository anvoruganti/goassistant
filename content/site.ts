// Site-wide copy, SEO defaults, and footer links — single source for non-section content.
export const siteConfig = {
  name: "GO Assistant",
  domain: "goassistant.in",
  url: "https://goassistant.in",
  contactEmail: "help@gobigai.org",
  description:
    "GO Assistant is a conversational sales associate for your online store. It understands how customers actually describe what they want.",
  thesisLine:
    "It doesn't matter what you sell. Your customers already know how to describe what they want. Right now, they have no one to say it to.",
  parentBrand: {
    name: "GOBIGAI",
    url: "https://gobigai.org",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/anirudh-voruganti",
  },
} as const;

export const seoDefaults = {
  title: "GO Assistant: the salesperson your online store is missing",
  description: siteConfig.description,
  ogTitle: "GO Assistant",
  ogDescription: siteConfig.thesisLine,
} as const;
