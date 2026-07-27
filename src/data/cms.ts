import type { CMSContent } from "@/types";

export const initialCMSContent: CMSContent = {
  about: {
    heroTitle: "About MobileHub",
    heroSubtitle:
      "Your trusted destination for premium smartphones and accessories",
    bannerImage: "/images/about-banner.jpg",
    story:
      "Founded in 2020, MobileHub started with a simple mission: to make premium smartphones accessible to everyone. What began as a small online store has grown into one of the most trusted destinations for mobile technology.",
    mission:
      "We believe everyone deserves access to the latest technology. Our mission is to provide authentic, high-quality smartphones at competitive prices, backed by exceptional customer service.",
    values: [
      {
        title: "Authenticity",
        desc: "Every product we sell is 100% authentic, sourced directly from manufacturers.",
      },
      {
        title: "Customer First",
        desc: "Our customers are at the heart of everything we do. We strive to exceed expectations.",
      },
      {
        title: "Innovation",
        desc: "We stay ahead of technology trends to bring you the latest and greatest devices.",
      },
      {
        title: "Transparency",
        desc: "Honest pricing, clear policies, and open communication define our business.",
      },
    ],
    team: [
      {
        name: "Sarah Chen",
        role: "CEO & Founder",
        bio: "Former tech executive with 15 years in the mobile industry.",
      },
      {
        name: "Michael Park",
        role: "CTO",
        bio: "Passionate about building seamless digital experiences.",
      },
      {
        name: "Emily Rodriguez",
        role: "Head of Operations",
        bio: "Expert in supply chain and logistics optimization.",
      },
    ],
  },
  contact: {
    heroTitle: "Get in Touch",
    heroSubtitle: "We're here to help with any questions or concerns",
    bannerImage: "/images/contact-banner.jpg",
    email: "support@mobilehub.com",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Fri 9AM-6PM EST",
    address: "123 Tech Street, San Francisco, CA 94105",
  },
  faq: {
    heroTitle: "Frequently Asked Questions",
    heroSubtitle: "Find answers to common questions about our products and services",
    bannerImage: "/images/faq-banner.jpg",
    categories: [
      {
        name: "Orders & Shipping",
        items: [
          {
            q: "How long does shipping take?",
            a: "Standard shipping takes 3-5 business days. Express shipping delivers within 1-2 business days.",
          },
          {
            q: "How can I track my order?",
            a: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard.",
          },
          {
            q: "Do you ship internationally?",
            a: "Yes, we ship to over 50 countries. International shipping rates and delivery times vary by location.",
          },
        ],
      },
      {
        name: "Returns & Refunds",
        items: [
          {
            q: "What is your return policy?",
            a: "We offer a 30-day return policy for all unused products in their original packaging.",
          },
          {
            q: "How long do refunds take?",
            a: "Refunds are processed within 5-7 business days after we receive your return.",
          },
          {
            q: "Can I exchange a product?",
            a: "Yes, you can exchange products within 30 days of purchase, subject to availability.",
          },
        ],
      },
      {
        name: "Product Information",
        items: [
          {
            q: "Are your products authentic?",
            a: "Yes, all our products are 100% authentic and sourced directly from manufacturers.",
          },
          {
            q: "Do you offer warranties?",
            a: "All products come with manufacturer warranty. We also offer extended warranty options.",
          },
          {
            q: "Can I compare products?",
            a: "Yes, use our comparison tool on the product listing page to compare up to 3 devices.",
          },
        ],
      },
    ],
  },
  shipping: {
    heroTitle: "Shipping Information",
    heroSubtitle: "Fast, reliable delivery to your doorstep",
    bannerImage: "/images/shipping-banner.jpg",
    methods: [
      {
        name: "Standard Shipping",
        price: "Free",
        time: "3-5 business days",
        desc: "Free on orders over $50",
      },
      {
        name: "Express Shipping",
        price: "$9.99",
        time: "1-2 business days",
        desc: "Priority handling and delivery",
      },
      {
        name: "Next Day Delivery",
        price: "$19.99",
        time: "Next business day",
        desc: "Order before 2PM for next day delivery",
      },
    ],
    notes: [
      "All orders are processed within 1-2 business days",
      "Tracking information is sent via email once shipped",
      "Signature may be required for high-value orders",
      "P.O. boxes are not accepted for express deliveries",
    ],
  },
  returns: {
    heroTitle: "Returns & Refunds",
    heroSubtitle: "Hassle-free returns within 30 days",
    bannerImage: "/images/returns-banner.jpg",
    steps: [
      {
        num: "1",
        title: "Initiate Return",
        desc: "Log into your account and select the order you want to return.",
      },
      {
        num: "2",
        title: "Print Label",
        desc: "Download and print your prepaid return shipping label.",
      },
      {
        num: "3",
        title: "Ship Item",
        desc: "Pack the item securely and drop off at your nearest shipping location.",
      },
      {
        num: "4",
        title: "Get Refund",
        desc: "Receive your refund within 5-7 business days of us receiving the return.",
      },
    ],
    policies: [
      {
        title: "30-Day Return Window",
        desc: "You have 30 days from the date of delivery to initiate a return.",
      },
      {
        title: "Original Condition",
        desc: "Items must be unused, undamaged, and in their original packaging.",
      },
      {
        title: "Free Returns",
        desc: "We provide prepaid return labels for all domestic returns.",
      },
      {
        title: "Refund Method",
        desc: "Refunds are issued to the original payment method within 5-7 business days.",
      },
    ],
  },
  careers: {
    heroTitle: "Join Our Team",
    heroSubtitle: "Build the future of mobile commerce with us",
    bannerImage: "/images/careers-banner.jpg",
    culture:
      "At MobileHub, we foster a culture of innovation, collaboration, and continuous learning. Our team is passionate about technology and committed to delivering exceptional experiences for our customers.",
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Annual learning budget",
      "Product discounts",
      "Team retreats and events",
    ],
    openings: [
      {
        title: "Senior Frontend Developer",
        team: "Engineering",
        location: "San Francisco, CA (Hybrid)",
        type: "Full-time",
        salary: "$150,000 - $180,000",
      },
      {
        title: "Product Manager",
        team: "Product",
        location: "San Francisco, CA (Remote)",
        type: "Full-time",
        salary: "$140,000 - $170,000",
      },
      {
        title: "UX Designer",
        team: "Design",
        location: "New York, NY (Hybrid)",
        type: "Full-time",
        salary: "$120,000 - $150,000",
      },
    ],
  },
  blog: {
    heroTitle: "Our Blog",
    heroSubtitle: "Latest news, reviews, and insights from the mobile world",
    posts: [
      {
        id: 1,
        title: "Top 10 Smartphones of 2025",
        excerpt:
          "A comprehensive guide to the best smartphones released this year, covering performance, camera quality, and value.",
        category: "Reviews",
        author: "Tech Team",
        date: "Jan 15, 2025",
        readTime: "8 min read",
        content:
          "The smartphone landscape in 2025 has been nothing short of remarkable...",
      },
      {
        id: 2,
        title: "The Rise of AI in Mobile Photography",
        excerpt:
          "How artificial intelligence is revolutionizing the way we take photos with our smartphones.",
        category: "Technology",
        author: "Emily Chen",
        date: "Jan 12, 2025",
        readTime: "6 min read",
        content:
          "AI-powered photography has become one of the defining features of modern smartphones...",
      },
      {
        id: 3,
        title: "5G Evolution: What's Next?",
        excerpt:
          "Exploring the future of 5G technology and how it will shape our mobile experiences.",
        category: "Industry",
        author: "Michael Park",
        date: "Jan 8, 2025",
        readTime: "5 min read",
        content:
          "As 5G networks continue to expand globally, we're seeing new possibilities...",
      },
      {
        id: 4,
        title: "Sustainable Tech: Eco-Friendly Phones",
        excerpt:
          "A look at how manufacturers are making their devices more environmentally friendly.",
        category: "Sustainability",
        author: "Sarah Chen",
        date: "Jan 5, 2025",
        readTime: "7 min read",
        content:
          "Sustainability has become a key focus in the mobile industry...",
      },
    ],
  },
  privacy: {
    heroTitle: "Privacy Policy",
    heroSubtitle: "How we collect, use, and protect your information",
    bannerImage: "/images/privacy-banner.jpg",
    content: `Last updated: January 1, 2025

1. Information We Collect
We collect information you provide directly, including name, email, phone number, shipping address, and payment information when you create an account or make a purchase.

2. How We Use Your Information
We use your information to process orders, send order updates, provide customer support, improve our services, and send marketing communications (with your consent).

3. Information Sharing
We do not sell your personal information. We share data with service providers who help us operate our business, such as shipping companies and payment processors.

4. Data Security
We implement industry-standard security measures to protect your personal information. All payment data is encrypted and processed securely.

5. Your Rights
You can access, update, or delete your personal information through your account settings or by contacting our support team.

6. Cookies
We use cookies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser.

7. Contact Us
For privacy-related inquiries, please contact privacy@mobilehub.com.`,
  },
  terms: {
    heroTitle: "Terms of Service",
    heroSubtitle: "Please read these terms carefully before using our services",
    bannerImage: "/images/terms-banner.jpg",
    content: `Last updated: January 1, 2025

1. Acceptance of Terms
By accessing or using MobileHub's website and services, you agree to be bound by these Terms of Service.

2. Account Registration
You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.

3. Orders and Purchases
All orders are subject to product availability. We reserve the right to cancel orders at our discretion. Prices are subject to change without notice.

4. Payment
We accept major credit cards, debit cards, and digital wallets. Payment must be received in full before order processing.

5. Shipping and Delivery
Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs processing.

6. Returns and Refunds
Returns are subject to our Return Policy. Products must be returned in original condition within 30 days of delivery.

7. Intellectual Property
All content on this website, including text, images, and logos, is the property of MobileHub and protected by copyright laws.

8. Limitation of Liability
MobileHub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.`,
  },
  cookies: {
    heroTitle: "Cookie Policy",
    heroSubtitle: "Understanding how we use cookies on our website",
    bannerImage: "/images/cookies-banner.jpg",
    content: `Last updated: January 1, 2025

1. What Are Cookies
Cookies are small text files stored on your device when you visit our website. They help us provide you with a better browsing experience.

2. Types of Cookies We Use
- Essential Cookies: Required for basic website functionality
- Analytics Cookies: Help us understand how visitors use our site
- Marketing Cookies: Used to deliver relevant advertisements
- Preference Cookies: Remember your settings and preferences

3. How to Control Cookies
You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.

4. Third-Party Cookies
We may use third-party services that set their own cookies, including Google Analytics and payment processors.

5. Updates to This Policy
We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.

6. Contact Us
For questions about our use of cookies, please contact privacy@mobilehub.com.`,
  },
};
