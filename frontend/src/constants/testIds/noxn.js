export const NOXN = {
    // Header
    header: 'noxn-header',
    headerLogo: 'noxn-logo',
    headerNavServices: 'nav-link-services',
    headerNavProcess: 'nav-link-process',
    headerNavPricing: 'nav-link-pricing',
    headerNavFaq: 'nav-link-faq',
    headerCta: 'header-cta-begin',

    // Hero
    heroSection: 'hero-section',
    heroHeadline: 'hero-headline',
    heroSubcopy: 'hero-subcopy',
    heroCtaPrimary: 'hero-cta-begin',
    heroCtaSecondary: 'hero-cta-explore',

    // Services
    servicesSection: 'services-section',
    serviceCardCreation: 'service-card-ad-creation',
    serviceCardSpace: 'service-card-ad-space',

    // Process
    processSection: 'process-section',
    processStep: (n) => `process-step-${n}`,

    // Pricing
    pricingSection: 'pricing-section',
    pricingCard: (slug) => `pricing-card-${slug}`,
    pricingCta: (slug) => `pricing-cta-${slug}`,

    // FAQ
    faqSection: 'faq-section',
    faqItem: (i) => `faq-item-${i}`,

    // Form Modal
    formTrigger: 'open-assessment-form',
    formModal: 'assessment-form-modal',
    formStep: (n) => `form-step-${n}`,
    formNextBtn: 'form-next-btn',
    formPrevBtn: 'form-prev-btn',
    formSubmitBtn: 'form-submit-btn',
    formField: (name) => `form-field-${name}`,
    formSuccess: 'form-success-state',

    // Footer
    footer: 'noxn-footer',
};
