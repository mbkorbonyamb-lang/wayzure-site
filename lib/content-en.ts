// English version of lib/content.ts. Same structure, same slugs, same facts: translate, never add.
import type { Expertise, Item, Solution } from "./content";

export const EXPERTISES_EN: Expertise[] = [
  {
    slug: "data-intelligence-artificielle",
    name: "Data & Artificial Intelligence",
    short: "Data & AI",
    lead: "Turn your data into decisions, and AI into real gains.",
    intro:
      "The data already exists: in the ERP, the CRM, spreadsheets, emails. The problem is rarely volume. It is that nobody can trust it or read it at the right time. We start from the decisions you need to make, then work back to the data that informs them. AI comes next, where it saves time without creating risk.",
    problems: [
      "Every department has its own figures, and no two give the same total.",
      "Reports are rebuilt by hand every month from exports.",
      "AI comes up in board meetings, but nobody knows where to start.",
      "Repetitive tasks keep skilled people busy all week.",
    ],
    items: [
      { t: "Data analytics and business intelligence", d: "Data model, KPIs defined with the business teams, dashboards maintained over time." },
      { t: "Data management and value creation", d: "Source inventory, cleaning, deduplication, quality rules and GDPR compliance." },
      { t: "Artificial intelligence and generative AI", d: "Use cases chosen for measurable gains: document search, assisted writing, text analysis." },
      { t: "Intelligent automation and AI model integration", d: "Automated flows between your tools, and AI models plugged into your applications, with human review where it matters." },
    ],
    outcomes: [
      "One reference figure per indicator, known to everyone.",
      "Reports that update themselves.",
      "AI used within clear limits: protected data, verifiable results.",
    ],
    solutions: ["waypulse", "waypilot"],
    seo: "Data analytics, business intelligence, generative AI and intelligent automation for administrations, institutions and companies in France and Guinea.",
  },
  {
    slug: "conseil",
    name: "Consulting",
    short: "Consulting",
    lead: "Decide before you invest, then steer through to results.",
    intro:
      "A digital project becomes expensive when the tool is chosen before the problem is defined. We first look at how you work, what your systems cost and where the risks are. You leave with clear, costed priorities, including when the right answer is to buy nothing.",
    problems: [
      "Tools have piled up over the years and nobody has the full picture.",
      "An IT project is running late or over budget.",
      "Management wants to move forward on digital without knowing where to begin.",
      "Security and business continuity depend on one or two people.",
    ],
    items: [
      { t: "Digital strategy and transformation", d: "Assessment, roadmap, costed priorities and a realistic schedule." },
      { t: "IT and information systems consulting", d: "Systems mapping, tool selection, IT master plan, cost reduction." },
      { t: "IT and operational audit", d: "Review of tools, processes, contracts and risks, with an action plan." },
      { t: "Cybersecurity, cloud and infrastructure", d: "Access and backup review, security policy, hosting choices and cloud migration." },
      { t: "Project ownership support, IT governance and project management", d: "Requirements, specifications, vendor selection, steering and acceptance testing." },
      { t: "Organisation and process improvement", d: "Workflow analysis, removing double entry and steps that add no value." },
    ],
    outcomes: [
      "A decision based on facts, not on a sales demo.",
      "A project run with a budget, a schedule and named owners.",
      "Risks that are known, ranked and dealt with.",
    ],
    solutions: ["waypulse"],
    cases: [
      {
        client: "Africa Fight League (AFL)",
        logo: "/clients/afl.webp",
        context: "French combat sports league · 2024",
        text: "Strategy and organisation consulting, from the first concept to the league's first international fight night, held in Conakry. We also designed its logo.",
      },
      {
        client: "ASKALIA Logistique",
        logo: "/clients/askalia.webp",
        context: "Logistics and transport, Guinea · 2024",
        text: "Support in drafting its strategic documents, and design of its logo.",
      },
      {
        client: "Tastout Group SARL",
        context: "Guinea · 2021",
        text: "Consulting and support for the group. We also designed the logos of three of its brands: Villa Kijani, Écarlate and Khuru.",
      },
      {
        client: "CECL",
        logo: "/clients/cecl.webp",
        context: "Online training, Cairo · since 2022",
        text: "Support from the initial thinking through to the design of its online training centre.",
      },
    ],
    seo: "Digital strategy, information systems, IT audit, cybersecurity, cloud, project ownership support and process organisation consulting.",
  },
  {
    slug: "developpement-numerique",
    name: "Software Development",
    short: "Development",
    lead: "Design, build and run the software your business depends on.",
    intro:
      "When no off-the-shelf product fits the way you work, or when your tools don't talk to each other, we build what is missing. Work moves forward in short deliveries that you approve one by one. Access security and data protection are built in from the design stage.",
    problems: [
      "The business runs on shared spreadsheets and double entry.",
      "An existing application is ageing and nobody dares to touch it.",
      "The company's software tools exchange no data.",
      "Customers or field teams are waiting for a mobile app.",
    ],
    items: [
      { t: "Business software and applications", d: "Custom internal tools: management, activity tracking, customer and supplier portals." },
      { t: "Web and mobile development", d: "Fast, accessible websites and apps, designed for the phone first, including offline use." },
      { t: "SaaS platforms and APIs", d: "Online software products, subscriptions, documented APIs for your partners." },
      { t: "ERP and CRM integration", d: "Configuration, data migration and connection with your other tools." },
      { t: "Architecture, modernisation and application maintenance", d: "Taking over existing applications, cloud migration, fixes and enhancements over time." },
    ],
    outcomes: [
      "A tool that follows your processes, not the other way round.",
      "Data entered once and shared everywhere.",
      "Documented code and handed-over access: you remain the owner.",
    ],
    solutions: ["waylog", "waycare", "waypilot", "waypulse"],
    cases: [
      {
        client: "Direction générale du Fonds de l'hydraulique (DGFH)",
        logo: "/clients/dgfh.webp",
        context: "Public administration, Guinea · 2023",
        text: "Support with its digital transformation: design of the website, then the move from personal Gmail addresses to professional email for more than thirty people.",
      },
      {
        client: "Modpresco",
        logo: "/clients/modpresco.webp",
        context: "Construction and services",
        text: "Logo design, website development and support in bringing its services and marketing online.",
      },
      { client: "JAARAY", logo: "/clients/jaaray.webp", text: "Design and development of the jaaray.site website." },
      { client: "Larando Bio", text: "Design and development of the website." },
    ],
    seo: "Business software, web and mobile applications, SaaS platforms, APIs, ERP and CRM integration, application modernisation.",
  },
  {
    slug: "formation",
    name: "Training",
    short: "Training",
    lead: "Make sure your teams master their tools and get value from them.",
    intro:
      "A tool nobody uses earns nothing. Our training starts from your real cases and each person's level, in small groups, on site or remotely. We also support the change itself: explaining, reassuring, adjusting.",
    problems: [
      "A new tool has been rolled out, and teams slip back into old habits.",
      "Staff use AI on their own, with no rules.",
      "Good security habits are not in place.",
      "Data skills rest on a single person.",
    ],
    items: [
      { t: "Professional IT and digital training", d: "Office and collaboration tools, business software, the applications we deliver." },
      { t: "Data and artificial intelligence", d: "Reading and building a dashboard, using generative AI at work, knowing its limits." },
      { t: "Cybersecurity and digital tools", d: "Phishing, passwords, file sharing: the habits that prevent incidents." },
      { t: "Change management and support", d: "Communication plan, internal champions, materials and follow-up after roll-out." },
    ],
    outcomes: [
      "Teams that are autonomous with their tools.",
      "Clear rules for using AI and data.",
      "A roll-out that is adopted rather than endured.",
    ],
    solutions: [],
    seo: "Professional IT and digital training: data, artificial intelligence, cybersecurity and change management.",
  },
];

export const IT_SERVICES_EN: Expertise = {
  slug: "services-it",
  name: "IT Services",
  short: "IT Services",
  lead: "IT that keeps running, and users who get an answer.",
  intro:
    "Day to day, IT simply has to work: workstations, accounts, email, network, backups. We take on all or part of that work, with a single point of contact for your users.",
  problems: [
    "User requests arrive through every channel and get lost.",
    "Nobody really knows who has access to what.",
    "Updates and backups happen when someone remembers.",
  ],
  items: [
    { t: "User support and helpdesk", d: "A single point of contact, requests tracked until they are resolved." },
    { t: "Systems and network administration", d: "Accounts, access rights, professional email, network, backups." },
    { t: "Maintenance", d: "Updates, patches, monitoring of equipment and licences." },
    { t: "Managed IT services", d: "We run all or part of your IT, within a written scope." },
  ],
  outcomes: [
    "A single contact for incidents and requests.",
    "Access rights and backups under control.",
  ],
  solutions: [],
  cases: [
    {
      client: "Savané Industrie International",
      logo: "/clients/savane.webp",
      context: "Industry",
      text: "Maintenance of the IT system, the computer equipment and the CCTV cameras.",
    },
  ],
  seo: "User support, helpdesk, systems and network administration, maintenance and managed IT services.",
};

export const SOLUTIONS_EN: Solution[] = [
  {
    slug: "waypulse",
    name: "WayPulse",
    category: "Intelligent sales prospecting",
    tagline: "From buying signal to loyal customer.",
    summary:
      "WayPulse finds the companies that have a real reason to buy, identifies the right people, prepares an approach that you approve, and follows the relationship through to signature and beyond.",
    problem:
      "Prospecting takes time and yields little when you write at random. The right moment to reach out does exist, but it is scattered across legal notices, public tenders and company websites.",
    features: [
      { t: "Search", d: "Companies in your target market from the official French business register, and the people to talk to. Contact details taken from websites, never guessed." },
      { t: "Detect", d: "Every morning, the companies that have just moved: BODACC notices, BOAMP tenders, hiring, slow websites. Every signal is dated and sourced." },
      { t: "Approve", d: "A draft approach that cites what was observed. Nothing goes out without your approval." },
      { t: "Close and grow", d: "Replies sorted, opportunities tracked, quotes accepted online, the relationship followed after signature." },
    ],
    audience: "Business owners and B2B sales teams.",
    market: "France",
    url: "https://waypulse.wayzure.com",
    seo: "WayPulse, B2B sales prospecting software: buying signal detection, verified contacts, approved outreach, follow-up through to signature.",
  },
  {
    slug: "waypilot",
    name: "WayPilot",
    category: "E-commerce catalogue quality control",
    tagline: "The errors that block your sales, found and fixed.",
    summary:
      "WayPilot finds the products in a WooCommerce or Shopify store that customers cannot order, wrong prices and duplicate variations, then fixes them once you approve.",
    problem:
      "A size that is displayed but cannot be ordered, a price of zero, a duplicate variation: the store admin does not flag it, and the customer leaves without a word.",
    features: [
      { t: "Blocked sales", d: "Sizes or options with no orderable variation, duplicate variations, missing or zero prices." },
      { t: "Conflicting prices", d: "Price in the description different from the displayed price, sale price higher than the regular price." },
      { t: "Poorly maintained catalogue", d: "Missing or duplicate SKUs, repeated images, products with no category or description." },
      { t: "Visibility on Google", d: "Invalid barcodes, images too small for Google Shopping, missing alt text." },
    ],
    audience: "Online merchants and agencies managing WooCommerce or Shopify stores.",
    market: "France",
    url: "https://waypilot.wayzure.com",
    proof: "Case study published with the agreement of the JAARAY store: 55 corrections applied after approval, with no failures.",
    seo: "WayPilot, audit and correction of WooCommerce and Shopify catalogues: blocked sales, conflicting prices, product data and Google visibility.",
  },
  {
    slug: "waylog",
    name: "WayLog",
    category: "Logistics and operations management",
    tagline: "Paper delivery notes get lost. A signed proof doesn't.",
    summary:
      "WayLog replaces the paper delivery note with a proof of delivery signed on the driver's phone, with photo, GPS position and time, and gives the shipper a live view of every round.",
    problem:
      "Disputed quantities, a lost note, a truck gone with no news: without a record at the moment of delivery, it is one word against another, and invoicing waits.",
    features: [
      { t: "Digital delivery note", d: "Customer, goods and driver entered at the office, with a tracking number and QR code." },
      { t: "Signature on site", d: "The customer checks the quantities and signs with a finger. Time and position are attached to the proof." },
      { t: "Documented reservations", d: "For shortages or damage, a photo and a reason are required, and the note is flagged as disputed." },
      { t: "Built for the field", d: "Works without a network, proof protected by a digital fingerprint, PDF note sent to the customer." },
    ],
    audience: "Wholesalers, distributors and carriers.",
    market: "Guinea",
    url: "https://waylog.wayzure.com",
    seo: "WayLog, digital delivery notes and signed proof of delivery for wholesalers, distributors and carriers in Guinea.",
  },
  {
    slug: "waycare",
    name: "Waycare",
    category: "Digital health platform",
    tagline: "Healthcare, simply organised, in Guinea and from the diaspora.",
    summary:
      "Waycare lets people find a verified doctor in Guinea, book an appointment, consult remotely and keep their medical records. Members of the diaspora can pay remotely for a relative's care.",
    problem:
      "Finding the right doctor, keeping prescriptions, paying for a relative's care back home: it still all goes through word of mouth, paper and money transfers.",
    features: [
      { t: "Directory and appointments", d: "Verified doctors by specialty and neighbourhood, online booking." },
      { t: "Medical records", d: "Prescriptions, reports and documents, encrypted and accessible to the patient only." },
      { t: "Diaspora option", d: "Remote payment for a medical service; the relative receives a QR code for the consultation or the medicines." },
      { t: "Tele-expertise", d: "A doctor in Guinea can ask a colleague for an opinion, in Guinea or abroad." },
    ],
    audience: "Patients in Guinea, members of the diaspora and healthcare professionals.",
    market: "Guinea and diaspora",
    url: "https://www.waycare.care",
    proof: "Health data hosted in the European Union on HDS-certified infrastructure. The app works for several hours without a network.",
    seo: "Waycare, digital health platform in Guinea: doctor directory, appointments, teleconsultation, medical records and diaspora option.",
  },
];

export const STEPS_EN: Item[] = [
  { t: "A first conversation", d: "Thirty minutes, by video or phone. You explain the situation, we ask the questions that matter." },
  { t: "A written proposal", d: "What will be done, what won't, the timeline and the price. If we don't think the project is worthwhile, we say so." },
  { t: "Short deliveries", d: "Work moves forward in stages of a few weeks. You see the result and approve it before the next step." },
  { t: "Support after go-live", d: "Maintenance, enhancements and training: your teams must be able to use it without us." },
];

export const KEY_FIGURES_EN = [
  { value: 2021, prefix: "since", label: "Serving public and private organisations", detail: "Wayzure was founded in 2021 in Clamart, just outside Paris." },
  { value: 2, label: "Markets", detail: "France and Guinea, with a company in each country." },
  { value: 4, label: "Software products", detail: "WayPulse, WayPilot, WayLog and Waycare, in service." },
  { value: 20, suffix: "+", label: "Major projects delivered", detail: "For companies, institutions and non-profits." },
];
