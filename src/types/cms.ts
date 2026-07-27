export interface CMSAbout {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  story: string;
  mission: string;
  values: { title: string; desc: string }[];
  team: { name: string; role: string; bio: string }[];
}

export interface CMSContact {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  email: string;
  phone: string;
  hours: string;
  address: string;
}

export interface CMSFAQItem {
  q: string;
  a: string;
}

export interface CMSFAQCategory {
  name: string;
  items: CMSFAQItem[];
}

export interface CMSFAQ {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  categories: CMSFAQCategory[];
}

export interface CMSShippingMethod {
  name: string;
  price: string;
  time: string;
  desc: string;
}

export interface CMSShipping {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  methods: CMSShippingMethod[];
  notes: string[];
}

export interface CMSReturnStep {
  num: string;
  title: string;
  desc: string;
}

export interface CMSReturnPolicy {
  title: string;
  desc: string;
}

export interface CMSReturns {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  steps: CMSReturnStep[];
  policies: CMSReturnPolicy[];
}

export interface CMSCareersOpening {
  title: string;
  team: string;
  location: string;
  type: string;
  salary: string;
}

export interface CMSCareers {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  culture: string;
  perks: string[];
  openings: CMSCareersOpening[];
}

export interface CMSBlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  image?: string;
}

export interface CMSBlog {
  heroTitle: string;
  heroSubtitle: string;
  posts: CMSBlogPost[];
}

export interface CMSLegal {
  heroTitle: string;
  heroSubtitle: string;
  bannerImage: string;
  content: string;
  title?: string;
  subtitle?: string;
}

export interface CMSContent {
  about: CMSAbout;
  contact: CMSContact;
  faq: CMSFAQ;
  shipping: CMSShipping;
  returns: CMSReturns;
  careers: CMSCareers;
  blog: CMSBlog;
  privacy: CMSLegal;
  terms: CMSLegal;
  cookies: CMSLegal;
}
