import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
  console.log("Cleaning database...");
  await prisma.failureReason.deleteMany();
  await prisma.lessonLearned.deleteMany();
  await prisma.startup.deleteMany();
  await prisma.marketTrend.deleteMany();

  console.log("Seeding startups...");

  // Quibi
  await prisma.startup.create({
    data: {
      name: "Quibi",
      description: "A short-form streaming platform designed for mobile devices, founded by Jeffrey Katzenberg and led by Meg Whitman. It raised massive venture capital to produce high-budget, Hollywood-quality content broken into 10-minute 'quick bites' or 'chapters'. Despite star-studded production, it failed shortly after launch due to poor user adoption, rigid platform constraints (initially mobile-only with screenshotting blocked), and launching right as the COVID-19 pandemic kept consumers at home in front of large-screen TVs.",
      industry: "Media & Entertainment",
      businessModel: "B2C Subscription",
      status: "Failed",
      fundingRaised: 1750.0,
      foundedYear: 2018,
      closedYear: 2020,
      website: "https://quibi.com",
      failureReasons: {
        create: [
          { category: "Product Market Fit", description: "Launched with a rigid mobile-only viewing model that restricted users from sharing screenshots or casting to TVs, ignoring standard content-sharing behaviors." },
          { category: "Market Timing", description: "Launched in April 2020 at the onset of COVID-19 pandemic lockdowns, when consumer demand shifted heavily to home TV viewing rather than mobile commute-time consumption." },
          { category: "Customer Acquisition Cost", description: "Spent excessively on high-profile talent and heavy marketing campaign ($400M+ in year one) without validating user willingness to pay a premium subscription fee for short-form clips." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Mobile-only consumption models must stay fluid and integrate with larger device ecosystems to capture shifting user behavior." },
          { lesson: "Content sharing and social loops (like memes, screenshots, and sharing clips) are essential for modern product distribution and virality." },
          { lesson: "Do not scale production budgets to Hollywood levels before verifying base consumer willingness to pay." }
        ]
      }
    }
  });

  // Juicero
  await prisma.startup.create({
    data: {
      name: "Juicero",
      description: "Juicero was a consumer hardware startup that designed and manufactured a high-tech, internet-connected cold-press juicer. The device cost $400 to $700 and required proprietary produce packets containing pre-chopped fruits and vegetables. The company shut down after a Bloomberg article demonstrated that the custom-engineered produce bags could be squeezed by hand just as fast and effectively, rendering the expensive machine obsolete.",
      industry: "Hardware & Consumer Goods",
      businessModel: "Direct-to-Consumer / Razor & Blade",
      status: "Failed",
      fundingRaised: 118.5,
      foundedYear: 2013,
      closedYear: 2017,
      website: "https://juicero.com",
      failureReasons: {
        create: [
          { category: "Technology", description: "Over-engineered a $700 hardware press that exerted 4 tons of force, when a human hand could squeeze the proprietary juice bags with identical results." },
          { category: "Monetization", description: "A razor-and-blade model where the 'razor' (the machine) was too expensive for consumers, and the 'blade' (produce bags) had a short shelf-life and high logistics cost." },
          { category: "Product Market Fit", description: "Built a complex solution for a simple problem, failing to identify that users wanted convenience and affordability over connected-home status symbols." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Avoid building high-cost, over-engineered hardware when a simpler, low-cost mechanical solution or manual process suffices." },
          { lesson: "Always test the absolute minimum functional requirement of your hardware and validate consumer price tolerance." },
          { lesson: "Do not hide a lack of utility behind technological complexity and internet connectivity." }
        ]
      }
    }
  });

  // Beepi
  await prisma.startup.create({
    data: {
      name: "Beepi",
      description: "Beepi was a peer-to-peer online marketplace for buying and selling used cars. It aimed to disrupt the dealership model by managing inspections, paperwork, and shipping. Despite reaching a high valuation, Beepi suffered from massive operational inefficiencies, high executive salaries, and excessive marketing spend, leading to cash depletion and subsequent liquidation.",
      industry: "Automotive & E-commerce",
      businessModel: "Peer-to-Peer Marketplace",
      status: "Failed",
      fundingRaised: 149.0,
      foundedYear: 2013,
      closedYear: 2017,
      website: "https://beepi.com",
      failureReasons: {
        create: [
          { category: "Operations", description: "Excessive operational overhead, including multi-point manual inspections and high-touch delivery processes, resulting in negative unit economics." },
          { category: "Team Issues", description: "Poor financial management by leadership, characterized by high salaries, expensive office rentals, and luxurious perks that burned capital." },
          { category: "Customer Acquisition Cost", description: "Spent aggressively on mass-market ads (like airport billboards) before nailing the local transaction unit economics." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Prioritize positive unit economics and operational efficiency before aggressively scaling a high-touch marketplace." },
          { lesson: "Keep burn rates low and monitor cash runways closely, especially when operating in low-margin, high-ticket size industries." },
          { lesson: "Align executive compensation and company culture with the startup's stage of development." }
        ]
      }
    }
  });

  // Homejoy
  await prisma.startup.create({
    data: {
      name: "Homejoy",
      description: "Homejoy was an on-demand platform matching independent home cleaners with customers. It scaled rapidly across the US and Europe, fueled by low-price customer acquisition campaigns (e.g., $19 cleaning promotions). However, the platform faced high customer churn, cleaner dissatisfaction, legal disputes over worker classification, and unsustainable unit economics, forcing its closure.",
      industry: "On-Demand Services",
      businessModel: "Gig Economy / Marketplace",
      status: "Failed",
      fundingRaised: 40.0,
      foundedYear: 2012,
      closedYear: 2015,
      website: "https://homejoy.com",
      failureReasons: {
        create: [
          { category: "Customer Acquisition Cost", description: "Relied on subsidized promotional pricing ($19 for first cleaning) which attracted one-time deal hunters who rarely retained at full price." },
          { category: "Monetization", description: "Low retention rates and high leakage, as cleaners and clients took their relationships offline to avoid platform service fees." },
          { category: "Operations", description: "Incurred high legal overhead and compliance costs due to worker classification lawsuits in multiple states." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Growth metrics are deceptive if customer retention and repeat purchase behavior are low." },
          { lesson: "Address marketplace leakage by providing ongoing value-add tools (e.g. scheduling, insurance, payment protection) to both buyers and sellers." },
          { lesson: "In gig economy models, regulatory risk and worker classification should be designed into the business model early." }
        ]
      }
    }
  });

  // Fast
  await prisma.startup.create({
    data: {
      name: "Fast",
      description: "Fast was a fintech startup offering a one-click checkout solution for e-commerce platforms. It raised massive funds to build a checkout button that bypassed shopping cart complexity. However, Fast suffered from extremely low transaction volumes and a staggeringly high burn rate (including hiring hundreds of engineers and sponsoring major sports teams), causing it to shut down within years.",
      industry: "Fintech & Payments",
      businessModel: "SaaS / Transaction Fees",
      status: "Failed",
      fundingRaised: 124.5,
      foundedYear: 2019,
      closedYear: 2022,
      website: "https://fast.co",
      failureReasons: {
        create: [
          { category: "Monetization", description: "Staggeringly low revenue (less than $100K annually) compared to an estimated $10M+ monthly burn rate." },
          { category: "Competition", description: "Faced severe competition from established checkout systems like Stripe Link, Bolt, Shopify Shop Pay, and PayPal." },
          { category: "Team Issues", description: "Aggressive hiring of over 400 staff members and major branding sponsorships before securing sustainable transactional volume." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Keep team scaling in lockstep with transaction volume and actual customer integrations." },
          { lesson: "In high-margin sectors like fintech, your value proposition must be distinct enough to displace massive incumbents." },
          { lesson: "Fundraising announcements are not a proxy for product traction or revenue." }
        ]
      }
    }
  });

  // Theranos
  await prisma.startup.create({
    data: {
      name: "Theranos",
      description: "Theranos was a consumer healthcare technology company that claimed to have revolutionized blood testing by performing dozens of tests using just a single drop of blood from a fingerprick. The company collapsed in scandal after investigative reporting revealed the technology did not work, and the firm was secretly using commercial third-party analyzers to run tests while falsifying results.",
      industry: "Healthcare & Biotech",
      businessModel: "B2B / B2C Diagnostics",
      status: "Failed",
      fundingRaised: 700.0,
      foundedYear: 2003,
      closedYear: 2018,
      website: "https://theranos.com",
      failureReasons: {
        create: [
          { category: "Technology", description: "Scientific and engineering failure: the proprietary 'Edison' machine could not deliver accurate results due to sample dilution and fluid dynamics." },
          { category: "Team Issues", description: "A culture of extreme secrecy, deception of board members and regulators, and whistleblower retaliation." },
          { category: "Operations", description: "Failed regulatory standards, resulting in immediate bans on running diagnostic labs and criminal fraud indictments." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Biotech and medical hardware require scientific transparency, peer review, and clinical validation. Do not 'fake it till you make it' when lives are on the line." },
          { lesson: "A board composed of political leaders rather than industry-specific domain experts can lead to severe governance failures." },
          { lesson: "Encourage transparent internal criticism; punishing whistleblowers is a sign of systemic failure." }
        ]
      }
    }
  });

  // MoviePass
  await prisma.startup.create({
    data: {
      name: "MoviePass",
      description: "MoviePass was a subscription service that allowed users to see a movie a day in cinemas for a low flat monthly fee ($9.95). It scaled to millions of users but lost money on every ticket purchase since it had to pay full price to major cinema chains. The business burned through cash, changed rules frequently, and eventually collapsed due to the unsustainable business model.",
      industry: "Media & Entertainment",
      businessModel: "B2C Subscription",
      status: "Failed",
      fundingRaised: 68.7,
      foundedYear: 2011,
      closedYear: 2019,
      website: "https://moviepass.com",
      failureReasons: {
        create: [
          { category: "Monetization", description: "Sold unlimited tickets for $9.95/month while paying theaters $12-$15 per ticket, creating a negative margin loop where scaling increased losses." },
          { category: "Product Market Fit", description: "Failed to negotiate revenue-share or concessions-share agreements with major theater chains (AMC, Regal) before scaling the subscriber base." },
          { category: "Operations", description: "Suffered severe cash flow issues, including temporarily shutting down the service because they ran out of cash to pay card processors." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Ensure that customer lifetime value (LTV) can mathematically exceed customer acquisition and variable costs (CAC + COGS) at scale." },
          { lesson: "Do not rely on future, uncontracted partnerships (e.g., expecting theaters to share ticket sales) as the foundation of your core business model." },
          { lesson: "Frequent, reactive modifications to subscription terms alienate users and damage brand trust." }
        ]
      }
    }
  });

  // Color Labs
  await prisma.startup.create({
    data: {
      name: "Color Labs",
      description: "Color Labs was a photo-sharing app that raised $41 million before launch based on a social-networking concept that matched users based on physical proximity. However, the app launched with a complex, confusing interface, and without a critical mass of users in any single location, it felt empty and was quickly abandoned.",
      industry: "Social Networking",
      businessModel: "Ad-Supported",
      status: "Failed",
      fundingRaised: 41.0,
      foundedYear: 2010,
      closedYear: 2012,
      website: "https://color.com",
      failureReasons: {
        create: [
          { category: "Product Market Fit", description: "The product failed to establish a clear value proposition, and the proximity-based photo-sharing concept did not resonate with consumers." },
          { category: "Market Timing", description: "Launched with high hype before standard user habits around mobile photo-sharing were fully formed and before testing the app's local network density." },
          { category: "Customer Acquisition Cost", description: "Spent heavily on acquiring premium domains and office spaces before validating product-market fit or user retention." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Start with a localized test or minimum viable community before scaling a social network that relies on proximity density." },
          { lesson: "Avoid launching with massive funding and hype if the core product interface and user experience have not been tested." },
          { lesson: "Clear, simple user onboarding is more critical than complex proximity algorithms." }
        ]
      }
    }
  });

  // Fab.com
  await prisma.startup.create({
    data: {
      name: "Fab.com",
      description: "Fab.com started as a design-focused flash sales e-commerce site and grew rapidly to a $1 billion valuation. However, it attempted to transition from a flash-sales model to a traditional inventory-holding e-commerce store, expanded prematurely into Europe, and burned through over $300 million, leading to a fire sale.",
      industry: "E-commerce & Design",
      businessModel: "Flash Sales / Retail E-commerce",
      status: "Failed",
      fundingRaised: 336.3,
      foundedYear: 2010,
      closedYear: 2015,
      website: "https://fab.com",
      failureReasons: {
        create: [
          { category: "Operations", description: "Premature international expansion through acquisitions in Europe, which created massive operational integration overhead and inventory write-offs." },
          { category: "Monetization", description: "Abandoned the high-margin design flash sales model to become a low-margin general e-commerce catalog, destroying their brand identity." },
          { category: "Product Market Fit", description: "Scale of inventory outpaced user demand, resulting in high warehouse holding costs and fire sales of unsold items." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Pivot with caution; transforming your core business model and category can alienate your most valuable audience." },
          { lesson: "International expansion should follow a proven domestic model with positive unit economics, rather than using capital to buy growth." },
          { lesson: "Inventory management and logistics costs can quickly bankrupt an e-commerce startup if sales velocity drops." }
        ]
      }
    }
  });

  // Secret
  await prisma.startup.create({
    data: {
      name: "Secret",
      description: "Secret was a mobile app that allowed users to share anonymous posts and secrets with people in their contacts circle and nearby. The app went viral and raised substantial venture capital. However, it quickly devolved into a platform for cyberbullying, gossip, and harassment, leading to regulatory warnings, severe brand damage, and a rapid exodus of users.",
      industry: "Social Networking",
      businessModel: "Ad-Supported",
      status: "Failed",
      fundingRaised: 35.0,
      foundedYear: 2013,
      closedYear: 2015,
      website: "https://secret.ly",
      failureReasons: {
        create: [
          { category: "Product Market Fit", description: "Anonymity drove toxic engagement which initially looked like high usage but quickly degraded user safety and triggered high churn." },
          { category: "Operations", description: "Failed to implement adequate moderation and filtering tools to curb bullying and malicious rumors." },
          { category: "Team Issues", description: "Co-founders realized the product's negative societal impact did not align with their personal values, leading to a decision to shut down and return remaining capital." }
        ]
      },
      lessonsLearned: {
        create: [
          { lesson: "Anonymous platforms require proactive, automated moderation systems to ensure user safety and prevent toxicity." },
          { lesson: "Viral loops based on controversy or negativity are unsustainable and ruin monetization potential (brands won't advertise next to toxic posts)." },
          { lesson: "Align product growth metrics with positive user utility and long-term societal value." }
        ]
      }
    }
  });

  console.log("Seeding market trends...");
  const trends = [
    { industry: "Artificial Intelligence", trend: "Generative AI is moving from wrapper interfaces to deeply integrated workflow automation. High interest in agentic workflows but rising concern over API compute costs and model reliability.", growthRate: 37.5 },
    { industry: "Healthcare & Biotech", trend: "Increased regulatory scrutiny on clinical diagnostics post-Theranos. Growing focus on AI-driven drug discovery, remote patient monitoring, and digital therapeutics.", growthRate: 8.2 },
    { industry: "Fintech & Payments", trend: "Embedded finance APIs allow non-financial products to offer banking services. Transition to real-time instant checkout networks. Focus on transaction fee optimization and compliance.", growthRate: 12.4 },
    { industry: "On-Demand Services", trend: "Stabilization of gig platforms. Focus on labor laws, worker benefits, and positive unit economics rather than growth subsidies.", growthRate: 5.1 },
    { industry: "E-commerce & Design", trend: "Direct-to-consumer models are shifting toward omni-channel presence. Social commerce integrations (e.g. TikTok Shop) and AI-personalized recommendations are primary growth engines.", growthRate: 9.8 },
    { industry: "Media & Streaming", trend: "Subscription fatigue is leading to rise of ad-supported tiers (AVOD). Shift toward bundle models and premium localized content.", growthRate: 6.4 },
    { industry: "Social Networking", trend: "Transition from public squares to private messaging circles (micro-communities). Rising concern over data privacy, misinformation, and toxicity moderation.", growthRate: 4.2 }
  ];

  for (const t of trends) {
    await prisma.marketTrend.create({ data: t });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
