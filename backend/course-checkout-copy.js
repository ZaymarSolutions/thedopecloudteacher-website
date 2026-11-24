'use strict';
// Product copy shown on Stripe-hosted Checkout. Keep it accurate, concise,
// and aligned to the details generated for every course on the DCT review page.
// The Stripe-hosted payment form's layout cannot be replaced with custom HTML.
const COURSE_CHECKOUT_COPY = Object.freeze({
  'cloud-fundamentals-101': 'One self-paced Cloud Fundamentals course: cloud services, delivery models and practical examples. Includes written lessons, curated official videos, learning activities and knowledge checks. Exam fees and live classes are separate.',
  'az-900-azure-fundamentals': 'One self-paced Microsoft Azure fundamentals course: cloud concepts, Azure services, management and governance. Includes written lessons, curated official videos, activities and knowledge checks. Microsoft exam fee separate.',
  'az-104-azure-administrator': 'One self-paced Azure Administrator course: identity, computing, storage, networking and monitoring. Includes structured lessons, curated official videos, activities and knowledge checks. Azure resource charges and exam fees separate.',
  'az-305-azure-solutions-architect': 'One self-paced Azure Solutions Architect course: architecture decisions, identity, data, infrastructure and business continuity. Includes written lessons, curated official videos, activities and knowledge checks. Microsoft exam fee separate.',
  'ai-901-azure-ai-fundamentals': 'One self-paced Azure AI course: AI concepts, common use cases, Microsoft AI services and responsible use. Includes written lessons, curated official videos, activities and knowledge checks. Certification exam fee separate.',
  'ai-fundamentals-everyday-ai': 'One self-paced Everyday AI course: useful prompts, evaluating responses and privacy-aware AI habits. Includes written lessons, curated official videos, activities and knowledge checks. Live instruction and external tool charges separate.',
  'cloud-security': 'One self-paced Cloud Security course: identity, access, data protection and shared security responsibilities. Includes written lessons, curated official videos, activities and knowledge checks. Vendor exams and live instruction separate.',
  'ai-security-responsible-governance': 'One self-paced AI Security and Governance course: protecting information, responsible AI use and oversight. Includes structured lessons, curated official videos, activities and knowledge checks. Certification exams and live instruction separate.',
  'cyber-basics-stay-safer-online': 'One beginner-friendly, self-paced Cyber Basics course: spot scams, protect sign-ins and practice safer daily technology habits. Includes written lessons, curated official videos, activities and knowledge checks. No subscription; live instruction separate.'
});
module.exports = {COURSE_CHECKOUT_COPY};
