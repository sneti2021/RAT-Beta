import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l84dbt13";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("SANITY_API_TOKEN is required to seed content.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-29",
  token,
  useCdn: false,
});

const block = (text) => ({
  _type: "block",
  children: [{ _type: "span", text }],
});

const cta = (label, href, style = "primary") => ({
  _key: randomUUID(),
  _type: "link",
  label,
  href,
  style,
});

const item = ({ title, value, text, href }) => ({
  _key: randomUUID(),
  _type: "sectionItem",
  title,
  value,
  text,
  href,
});

const seo = (title, description, schemaType = "WebPage") => ({
  _type: "seo",
  metaTitle: title,
  metaDescription: description,
  keywords: ["SAP SuccessFactors", "HR tech", "AI HR", "Rolling Arrays"],
  ogTitle: title,
  ogDescription: description,
  schemaJson: JSON.stringify({
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    description,
  }),
});

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Rolling Arrays Technologies",
    gtmId: "",
    navigation: [
      cta("Home", "/", "secondary"),
      cta("Reimburse", "/solutions/reimburse", "secondary"),
      cta("ePFile", "/solutions/epfile", "secondary"),
      cta("Careers", "/career", "secondary"),
      cta("Contact", "/contact-us", "secondary"),
    ],
    footerLinks: [
      cta("Reimburse", "/solutions/reimburse", "secondary"),
      cta("ePFile", "/solutions/epfile", "secondary"),
      cta("Careers", "/career", "secondary"),
      cta("Contact", "/contact-us", "secondary"),
    ],
  },
  {
    _id: "page-home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    status: "published",
    pageType: "standard",
    seo: seo(
      "Rolling Arrays Technologies | SAP SuccessFactors Add-Ons",
      "Discover AI-powered HR tech solutions and SAP SuccessFactors add-ons that improve adoption, productivity, and employee experience.",
    ),
    sections: [
      {
        _key: "home-hero",
        _type: "heroSection",
        eyebrow: "Supercharging HR Tech",
        title: "Accelerate Your HR Brilliance",
        subtitle:
          "Discover AI-powered HR tech solutions and SAP SuccessFactors add-ons that integrate with your HRIS and unlock human brilliance at work.",
        ctas: [cta("Explore RA Tech Solutions", "/solutions/reimburse"), cta("Schedule a Demo", "/contact-us", "secondary")],
      },
      {
        _key: "home-latest",
        _type: "cardGridSection",
        eyebrow: "Latest from RA Tech",
        title: "SAP SuccessFactors insights and HR Tech trends",
        items: [
          item({ title: "AI-Powered Transformation at SAP NOW AI Tour Mumbai", text: "News and field notes from RA Tech's latest SAP ecosystem event." }),
          item({ title: "Digital HR as an Engagement Catalyst", text: "A whitepaper on building a human-centric employee experience." }),
          item({ title: "Modernizing Employee Benefits", text: "Why benefits management needs automation and better employee UX." }),
        ],
      },
      {
        _key: "home-stats",
        _type: "statsSection",
        eyebrow: "AI-first solutions",
        title: "Powering HR success with SAP SuccessFactors add-ons",
        items: [
          item({ value: "130,000+", text: "Global users across 50+ enterprises" }),
          item({ value: "62%", text: "Increased SAP SuccessFactors adoption" }),
          item({ value: "88%", text: "Improvement in workforce productivity" }),
        ],
      },
      {
        _key: "home-value",
        _type: "featureTabsSection",
        eyebrow: "Creating value",
        title: "Supercharged tech add-ons and easier days at work",
        items: [
          item({ title: "Learning & Development", text: "QR-based attendance, automated learning operations, and end-to-end program management." }),
          item({ title: "Recruitment", text: "AI resume screening, candidate conversations, status notifications, and recruiter dashboards." }),
          item({ title: "Payroll & Expenses", text: "One-click claims, OCR receipt scanning, fraud detection, benefits, and payroll integration." }),
          item({ title: "Talent Analytics", text: "AI-first workforce insights, pay transparency analysis, and predictive analytics." }),
          item({ title: "Employee Experience", text: "Document management, AI document generation, surveys, and employee analytics." }),
        ],
      },
      {
        _key: "home-about",
        _type: "richTextSection",
        eyebrow: "Discover who we are",
        title: "Rolling Arrays Technologies",
        body: [
          block("Rolling Arrays Technologies is an SAP Gold Partner delivering AI-powered add-ons built for SAP SuccessFactors. With 15+ years of experience across 20+ countries, the product portfolio helps automate expense management, recruiting, document management, HR analytics, and compliance."),
        ],
      },
      {
        _key: "home-products",
        _type: "cardGridSection",
        eyebrow: "HR Tech add-ons",
        title: "Technology solutions for your enterprise tech",
        items: [
          item({ title: "Reimburse", text: "Travel and Expense Management", href: "/solutions/reimburse" }),
          item({ title: "ePFile", text: "Document Management and Generation for SAP SuccessFactors", href: "/solutions/epfile" }),
          item({ title: "LSYNC", text: "Attendance and Admin Solution for LMS" }),
          item({ title: "Renefits", text: "Seamless Employee Benefits Management" }),
          item({ title: "ReeCap", text: "AI-first analytics for all things people" }),
          item({ title: "Rover", text: "Agentic AI for Enterprise HR and People Operations" }),
        ],
      },
      {
        _key: "home-outcomes",
        _type: "cardGridSection",
        eyebrow: "Decisive outcomes",
        title: "Human brilliance. Accelerated.",
        items: [
          item({ title: "Workforce Efficiency & Time Optimization", text: "Reduce administrative time by up to 95% through learning management, documentation, and compliance workflows." }),
          item({ title: "Seamless Process Automation", text: "Eliminate manual overhead in expenses, benefits, and claims management with AI-powered workflows." }),
          item({ title: "People Intelligence & Experience", text: "Use AI to hire smarter, engage deeper, and analyze faster across HR operations." }),
        ],
      },
      {
        _key: "home-proof",
        _type: "cardGridSection",
        eyebrow: "We accelerate brilliance",
        title: "Agile, AI-first, scalable, and future-ready HR solutions",
        items: [
          item({ title: "15+ Years of Expertise", text: "100+ successful implementations across Asia-Pacific and enterprises across 20+ countries." }),
          item({ title: "Native SAP BTP Architecture", text: "Built on SAP Business Technology Platform with SSO and role-based permissions." }),
          item({ title: "AI-Powered from Day One", text: "OCR, fraud detection, natural language processing, and predictive analytics across the portfolio." }),
          item({ title: "Enterprise-Grade Security", text: "SAP BTP foundation, secure HR data management, GDPR practices, and audit trails." }),
        ],
      },
      {
        _key: "home-clients",
        _type: "logoCloudSection",
        eyebrow: "Global clients supercharged",
        title: "Trusted by 50+ enterprises across 20+ countries",
        items: Array.from({ length: 10 }, (_, index) =>
          item({ title: `Client ${index + 1}` }),
        ),
      },
      {
        _key: "home-cta",
        _type: "ctaSection",
        title: "Discover how RA Tech add-ons transform SAP SuccessFactors operations",
        ctas: [cta("Talk to us", "/contact-us", "secondary")],
      },
    ],
  },
  {
    _id: "page-reimburse",
    _type: "page",
    title: "Reimburse",
    slug: { _type: "slug", current: "solutions/reimburse" },
    status: "published",
    pageType: "product",
    seo: seo(
      "Reimburse | Travel and Expense Management for SAP SuccessFactors",
      "Reimburse helps employees submit expenses quickly while HR and finance teams automate approvals, OCR validation, and payroll integration.",
      "Product",
    ),
    sections: [
      {
        _key: "reimburse-hero",
        _type: "heroSection",
        eyebrow: "Travel and Expense Management",
        title: "Automated reimbursements for faster expense operations",
        subtitle: "Digitize claims, receipt capture, policy checks, approvals, and payroll sync inside your SAP SuccessFactors landscape.",
        ctas: [cta("Request a Demo", "/contact-us"), cta("Download Overview", "/insights/hr-engagement-whitepaper", "secondary")],
      },
      {
        _key: "reimburse-features",
        _type: "cardGridSection",
        title: "Built for employees, finance, and HR operations",
        items: [
          item({ title: "One-click expense claims", text: "Employees scan receipts using mobile OCR and submit claims in minutes." }),
          item({ title: "AI fraud detection", text: "Flag duplicate claims, receipt mismatches, and policy violations before approval." }),
          item({ title: "Approval workflows", text: "Route claims to the right approvers with audit trails and automated notifications." }),
          item({ title: "Payroll integration", text: "Approved reimbursements sync with payroll and SuccessFactors processes." }),
        ],
      },
      {
        _key: "reimburse-stats",
        _type: "statsSection",
        title: "Expense management with measurable impact",
        items: [
          item({ value: "95%", text: "Reduction in manual claim processing effort" }),
          item({ value: "24/7", text: "Mobile-first employee submission experience" }),
          item({ value: "100%", text: "Audit-ready claim trails and policy visibility" }),
        ],
      },
      {
        _key: "reimburse-cta",
        _type: "ctaSection",
        title: "Make expense claims easier to submit, approve, and audit",
        ctas: [cta("Schedule a Demo", "/contact-us", "secondary")],
      },
    ],
  },
  {
    _id: "page-epfile",
    _type: "page",
    title: "ePFile",
    slug: { _type: "slug", current: "solutions/epfile" },
    status: "published",
    pageType: "product",
    seo: seo(
      "ePFile | Employee Document Management for SAP SuccessFactors",
      "ePFile centralizes employee documents, generation workflows, templates, approvals, and searchable HR records.",
      "Product",
    ),
    sections: [
      {
        _key: "epfile-hero",
        _type: "heroSection",
        eyebrow: "Document Management and Generation",
        title: "Centralized employee documents for SAP SuccessFactors",
        subtitle: "Create, store, search, govern, and automate employee documents with templates and secure workflows.",
        ctas: [cta("Request a Demo", "/contact-us")],
      },
      {
        _key: "epfile-features",
        _type: "cardGridSection",
        title: "Bring HR documents under control",
        items: [
          item({ title: "Central repository", text: "Store offer letters, contracts, appraisals, and HR documents in one searchable place." }),
          item({ title: "AI document generation", text: "Generate employee letters and forms from templates with conditional logic." }),
          item({ title: "Permissions and audit trails", text: "Control access and preserve document activity history for compliance." }),
          item({ title: "Employee lifecycle workflows", text: "Connect documents to onboarding, transfers, confirmation, and exits." }),
        ],
      },
      {
        _key: "epfile-media",
        _type: "mediaSection",
        eyebrow: "Designed for HR teams",
        title: "Reduce manual document work",
        subtitle: "Marketing can replace this copy, upload screenshots, add videos, and edit all proof points from Sanity.",
      },
      {
        _key: "epfile-cta",
        _type: "ctaSection",
        title: "Modernize employee document management",
        ctas: [cta("Talk to us", "/contact-us", "secondary")],
      },
    ],
  },
  {
    _id: "page-career",
    _type: "page",
    title: "Careers",
    slug: { _type: "slug", current: "career" },
    status: "published",
    pageType: "career",
    seo: seo(
      "Careers | Rolling Arrays Technologies",
      "Explore career opportunities at Rolling Arrays Technologies and build HR technology used by global enterprises.",
    ),
    sections: [
      {
        _key: "career-hero",
        _type: "heroSection",
        eyebrow: "Career Opportunities",
        title: "Build personal growth stories in the HR Tech landscape",
        subtitle: "Join teams building SAP SuccessFactors add-ons, AI-first HR products, and enterprise technology for global customers.",
        ctas: [cta("Contact Careers", "/contact-us")],
      },
      {
        _key: "career-values",
        _type: "cardGridSection",
        title: "Work on meaningful enterprise HR problems",
        items: [
          item({ title: "Product engineering", text: "Build scalable HR products used across enterprise environments." }),
          item({ title: "Implementation excellence", text: "Work with SAP SuccessFactors customers across regions and industries." }),
          item({ title: "Growth culture", text: "Learn through ownership, customer context, and cross-functional delivery." }),
        ],
      },
      {
        _key: "career-form",
        _type: "formSection",
        eyebrow: "Apply now",
        title: "Send your profile",
        subtitle: "This beta form can be replaced by a HubSpot form from Sanity later.",
        form: {
          provider: "native",
          title: "Career enquiry",
          fields: [
            { _key: "name", label: "Full name", name: "name", type: "text", required: true },
            { _key: "email", label: "Email", name: "email", type: "email", required: true },
            { _key: "role", label: "Role of interest", name: "role", type: "text" },
            { _key: "message", label: "Message", name: "message", type: "textarea" },
          ],
        },
      },
    ],
  },
  {
    _id: "page-contact",
    _type: "page",
    title: "Contact Us",
    slug: { _type: "slug", current: "contact-us" },
    status: "published",
    pageType: "contact",
    seo: seo(
      "Contact Rolling Arrays Technologies",
      "Contact Rolling Arrays Technologies to schedule a demo, request a quote, or discuss SAP SuccessFactors add-ons.",
    ),
    sections: [
      {
        _key: "contact-hero",
        _type: "heroSection",
        eyebrow: "Let us connect",
        title: "Talk to RA Tech",
        subtitle: "Schedule a demo, request a quote, or speak with the team about SAP SuccessFactors add-ons and AI-first HR solutions.",
      },
      {
        _key: "contact-form",
        _type: "formSection",
        title: "Send a message",
        subtitle: "For live deployment, this section can be switched to HubSpot by adding the portal ID and form ID in Sanity.",
        form: {
          provider: "native",
          title: "Contact form",
          fields: [
            { _key: "name", label: "Name", name: "name", type: "text", required: true },
            { _key: "email", label: "Business email", name: "email", type: "email", required: true },
            { _key: "phone", label: "Phone", name: "phone", type: "tel" },
            { _key: "message", label: "How can we help?", name: "message", type: "textarea", required: true },
          ],
        },
      },
    ],
  },
  {
    _id: "post-whitepaper",
    _type: "post",
    title: "Digital HR as an Engagement Catalyst",
    slug: { _type: "slug", current: "insights/hr-engagement-whitepaper" },
    status: "published",
    category: "Whitepaper",
    excerpt: "How a human-centric digital HR experience can improve engagement, adoption, and productivity.",
    publishedAt: new Date().toISOString(),
    body: [
      block("Employee experience is now shaped by every digital HR interaction. Slow workflows, fragmented documents, and manual approvals create friction that lowers adoption."),
      block("This beta post demonstrates a Sanity-managed article with editable SEO, schema, copy, imagery, and a whitepaper download block."),
    ],
    whitepaper: {
      title: "Download the Digital HR whitepaper",
      description: "Upload the final PDF in Sanity and this link will update automatically.",
    },
    seo: seo(
      "Digital HR as an Engagement Catalyst | Whitepaper",
      "Download the whitepaper on building a human-centric employee experience with digital HR.",
      "Article",
    ),
  },
  {
    _id: "redirect-old-reimburse",
    _type: "redirect",
    source: "/reimburse",
    destination: "/solutions/reimburse",
    permanent: true,
    enabled: true,
  },
];

const transaction = client.transaction();
for (const doc of docs) {
  transaction.createOrReplace(doc);
}

await transaction.commit();
console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}.`);
