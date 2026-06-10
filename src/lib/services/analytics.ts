import { prisma } from "../db";

export interface IdeaBreakdown {
  industry: string;
  targetAudience: string;
  businessModel: string;
  revenueModel: string;
  complexityLevel: "Low" | "Medium" | "High" | "Very High";
  technologyCategory: string;
}

export interface SimilarStartupInfo {
  name: string;
  status: string;
  industry: string;
  fundingRaised: number;
  foundedYear: number;
  closedYear: number | null;
  description: string;
  website: string | null;
}

export interface FailurePatternPoint {
  category: string;
  score: number; // 0 to 100
  description: string;
}

export interface RiskScores {
  productMarketFitRisk: number; // 0-100
  competitionRisk: number;
  executionDifficulty: number;
  fundingDifficulty: number;
  technicalComplexity: number;
  marketTimingRisk: number;
  overallRiskScore: number;
}

export interface MarketOpportunity {
  marketReadiness: number; // 0-100
  industryGrowth: number; // percentage growth rate
  competitionSaturation: number; // 0-100
  aiAdvantage: number; // 0-100
  revenuePotential: number; // 0-100
  overallOpportunityScore: number;
}

export interface LessonInsight {
  id: string;
  lesson: string;
  category: string;
}

export interface PivotSuggestion {
  title: string;
  description: string;
  reasoning: string;
}

export interface FinalVerdict {
  strengths: string[];
  weaknesses: string[];
  majorRisks: string[];
  recommendedNextSteps: string[];
  overallRecommendation: "Proceed" | "Pivot Recommended" | "High Risk - Avoid";
  verdictSummary: string;
}

export interface StartupAnalysisResult {
  name: string;
  idea: string;
  breakdown: IdeaBreakdown;
  similarStartups: SimilarStartupInfo[];
  failurePatterns: FailurePatternPoint[];
  risks: RiskScores;
  lessons: LessonInsight[];
  opportunity: MarketOpportunity;
  pivots: PivotSuggestion[];
  verdict: FinalVerdict;
}

// Analytics Service Layer class/functions
export async function analyzeIdea(name: string, description: string): Promise<StartupAnalysisResult> {
  const lowercaseDesc = description.toLowerCase();
  const lowercaseName = name.toLowerCase();
  const text = `${lowercaseName} ${lowercaseDesc}`;

  // 1. Determine Industry & Breakdown
  const breakdown = getIdeaBreakdown(text);

  // 2. Find Similar Startups from DB
  const similarStartups = await findSimilarStartups(breakdown.industry, text);

  // 3. Calculate Risk Scores
  const risks = calculateRiskScore(text, breakdown);

  // 4. Calculate Opportunity Scores
  const opportunity = calculateOpportunityScore(text, breakdown);

  // 5. Generate Failure Insights (Failure Patterns)
  const failurePatterns = generateFailureInsights(text, risks);

  // 6. Fetch / Generate Lessons Learned from Similar Startups
  const lessons = await getLessonsLearned(similarStartups);

  // 7. Generate Pivot Suggestions
  const pivots = generatePivotSuggestions(name, text, breakdown);

  // 8. Generate Final Verdict
  const verdict = generateFinalVerdict(breakdown, risks, opportunity);

  return {
    name,
    idea: description,
    breakdown,
    similarStartups,
    failurePatterns,
    risks,
    lessons,
    opportunity,
    pivots,
    verdict,
  };
}

function getIdeaBreakdown(text: string): IdeaBreakdown {
  if (
    text.includes("interview") ||
    text.includes("hiring") ||
    text.includes("job") ||
    text.includes("career") ||
    text.includes("resume") ||
    text.includes("college") ||
    text.includes("student") ||
    text.includes("learn") ||
    text.includes("education")
  ) {
    return {
      industry: "Media & Entertainment", // Maps to Quibi/MoviePass/Color
      targetAudience: "College Students & Job Seekers",
      businessModel: "B2C Subscription & Premium SaaS",
      revenueModel: "Freemium Subscription / Pay-per-Use",
      complexityLevel: "Medium",
      technologyCategory: "AI Matching & Video Software",
    };
  }

  if (
    text.includes("food") ||
    text.includes("delivery") ||
    text.includes("grocery") ||
    text.includes("restaurant") ||
    text.includes("cleaning") ||
    text.includes("home") ||
    text.includes("on-demand") ||
    text.includes("juice") ||
    text.includes("car") ||
    text.includes("ride")
  ) {
    return {
      industry: "On-Demand Services", // Maps to Homejoy/Beepi/Juicero
      targetAudience: "Busy Urban Professionals",
      businessModel: "Gig Economy Marketplace",
      revenueModel: "Transaction Commission",
      complexityLevel: "High",
      technologyCategory: "Logistics Routing & Dispatch Infrastructure",
    };
  }

  if (
    text.includes("health") ||
    text.includes("medical") ||
    text.includes("doctor") ||
    text.includes("blood") ||
    text.includes("diagnose") ||
    text.includes("diagnostics") ||
    text.includes("biotech") ||
    text.includes("dna")
  ) {
    return {
      industry: "Healthcare & Biotech", // Maps to Theranos
      targetAudience: "Patients & Clinical Providers",
      businessModel: "B2B Enterprise & Consumer Diagnostics",
      revenueModel: "Direct Device Sales & Testing Fees",
      complexityLevel: "Very High",
      technologyCategory: "Biomedical Hardware & Diagnostics",
    };
  }

  if (
    text.includes("fintech") ||
    text.includes("payment") ||
    text.includes("checkout") ||
    text.includes("wallet") ||
    text.includes("crypto") ||
    text.includes("blockchain") ||
    text.includes("finance") ||
    text.includes("card")
  ) {
    return {
      industry: "Fintech & Payments", // Maps to Fast
      targetAudience: "Online Merchants & Retail Consumers",
      businessModel: "B2B SaaS / Payment Platform",
      revenueModel: "Percentage Transaction Fees + Monthly SaaS",
      complexityLevel: "High",
      technologyCategory: "API Integration & Financial Rails",
    };
  }

  if (
    text.includes("social") ||
    text.includes("network") ||
    text.includes("chat") ||
    text.includes("messaging") ||
    text.includes("anonymous") ||
    text.includes("photo") ||
    text.includes("video share")
  ) {
    return {
      industry: "Social Networking", // Maps to Secret, Color Labs
      targetAudience: "Gen Z & Tech Enthusiasts",
      businessModel: "Ad-Supported Community Platform",
      revenueModel: "Sponsorships, Ads, & Virtual Goods",
      complexityLevel: "Medium",
      technologyCategory: "Real-time Communication & Media Servers",
    };
  }

  if (
    text.includes("ecommerce") ||
    text.includes("shop") ||
    text.includes("retail") ||
    text.includes("sell") ||
    text.includes("store") ||
    text.includes("marketplace") ||
    text.includes("design")
  ) {
    return {
      industry: "E-commerce & Design", // Maps to Fab.com, Beepi
      targetAudience: "Design Lovers & Online Shoppers",
      businessModel: "Flash Sales / Retail E-commerce",
      revenueModel: "Direct Product Margins",
      complexityLevel: "Medium",
      technologyCategory: "E-commerce Engine & Inventory API",
    };
  }

  // Default fallback
  return {
    industry: "Enterprise Software",
    targetAudience: "SMEs & Enterprise Operations",
    businessModel: "B2B SaaS",
    revenueModel: "Tiered Seat-based Subscription",
    complexityLevel: "Medium",
    technologyCategory: "SaaS Workflow & Cloud Database",
  };
}

export async function findSimilarStartups(industry: string, text: string): Promise<SimilarStartupInfo[]> {
  // Try to find startups in the database by matching industry or name
  const dbStartups = await prisma.startup.findMany({
    include: {
      failureReasons: true,
    },
  });

  // Score them based on similarity
  const scored = dbStartups.map((s) => {
    let score = 0;
    if (s.industry.toLowerCase() === industry.toLowerCase()) score += 5;
    
    // Check keyword intersections
    const nameWords = s.name.toLowerCase().split(" ");
    const descWords = s.description.toLowerCase().split(" ");
    
    nameWords.forEach((w) => {
      if (w.length > 2 && text.includes(w)) score += 2;
    });

    descWords.forEach((w) => {
      if (w.length > 3 && text.includes(w)) score += 0.5;
    });

    return { startup: s, score };
  });

  // Sort and pick top 2-3 similar startups
  const sorted = scored.sort((a, b) => b.score - a.score);
  const selected = sorted.slice(0, 3).map((item) => ({
    name: item.startup.name,
    status: item.startup.status,
    industry: item.startup.industry,
    fundingRaised: item.startup.fundingRaised,
    foundedYear: item.startup.foundedYear,
    closedYear: item.startup.closedYear,
    description: item.startup.description,
    website: item.startup.website,
  }));

  // If no good match, just return first 3 failed startups in database
  if (selected.length === 0 || sorted[0].score < 1) {
    return dbStartups.slice(0, 3).map((s) => ({
      name: s.name,
      status: s.status,
      industry: s.industry,
      fundingRaised: s.fundingRaised,
      foundedYear: s.foundedYear,
      closedYear: s.closedYear,
      description: s.description,
      website: s.website,
    }));
  }

  return selected;
}

export function calculateRiskScore(text: string, breakdown: IdeaBreakdown): RiskScores {
  // Base weights based on complexity level
  let baseComplexity = 45;
  if (breakdown.complexityLevel === "Low") baseComplexity = 25;
  if (breakdown.complexityLevel === "High") baseComplexity = 65;
  if (breakdown.complexityLevel === "Very High") baseComplexity = 85;

  let pmfRisk = Math.floor(Math.random() * 20) + 50; // default 50-70
  let competitionRisk = Math.floor(Math.random() * 20) + 45;
  let executionDifficulty = baseComplexity + Math.floor(Math.random() * 10) - 5;
  let fundingDifficulty = Math.floor(Math.random() * 20) + 50;
  let technicalComplexity = baseComplexity + Math.floor(Math.random() * 10) - 10;
  let marketTimingRisk = Math.floor(Math.random() * 30) + 40;

  // Custom adjustments based on keywords
  if (text.includes("ai") || text.includes("artificial intelligence")) {
    competitionRisk = Math.min(competitionRisk + 20, 95); // High competition in AI
    pmfRisk = Math.max(pmfRisk - 10, 30); // PMF risk lower initially due to demand
    fundingDifficulty = Math.max(fundingDifficulty - 15, 30); // Easier to fund AI
    technicalComplexity = Math.min(technicalComplexity + 15, 95);
  }

  if (text.includes("delivery") || text.includes("grocery") || text.includes("gig")) {
    executionDifficulty = Math.min(executionDifficulty + 20, 95);
    competitionRisk = Math.min(competitionRisk + 15, 95);
    pmfRisk = Math.min(pmfRisk + 15, 95); // Hard to retain customers
  }

  if (text.includes("crypto") || text.includes("blockchain")) {
    marketTimingRisk = Math.min(marketTimingRisk + 25, 95);
    fundingDifficulty = Math.min(fundingDifficulty + 15, 95);
  }

  const overallRiskScore = Math.round(
    (pmfRisk * 0.25) +
    (competitionRisk * 0.15) +
    (executionDifficulty * 0.2) +
    (fundingDifficulty * 0.15) +
    (technicalComplexity * 0.1) +
    (marketTimingRisk * 0.15)
  );

  return {
    productMarketFitRisk: pmfRisk,
    competitionRisk,
    executionDifficulty,
    fundingDifficulty,
    technicalComplexity,
    marketTimingRisk,
    overallRiskScore,
  };
}

export function calculateOpportunityScore(text: string, breakdown: IdeaBreakdown): MarketOpportunity {
  let growth = 5.0; // default 5%
  let readiness = 60;
  let saturation = 50;
  let aiAdvantage = 30;
  let potential = 55;

  if (breakdown.industry === "Media & Entertainment") {
    growth = 6.4;
    readiness = 65;
    saturation = 70;
    aiAdvantage = 45;
    potential = 60;
  } else if (breakdown.industry === "On-Demand Services") {
    growth = 5.1;
    readiness = 75;
    saturation = 80;
    aiAdvantage = 35;
    potential = 50;
  } else if (breakdown.industry === "Healthcare & Biotech") {
    growth = 8.2;
    readiness = 50;
    saturation = 40;
    aiAdvantage = 70;
    potential = 85;
  } else if (breakdown.industry === "Fintech & Payments") {
    growth = 12.4;
    readiness = 70;
    saturation = 75;
    aiAdvantage = 60;
    potential = 75;
  } else if (breakdown.industry === "Social Networking") {
    growth = 4.2;
    readiness = 65;
    saturation = 85;
    aiAdvantage = 50;
    potential = 65;
  }

  // Adjustments
  if (text.includes("ai") || text.includes("artificial intelligence")) {
    growth = 37.5;
    aiAdvantage = Math.min(aiAdvantage + 35, 98);
    readiness = Math.min(readiness + 15, 90);
    potential = Math.min(potential + 20, 95);
  }

  const overallOpportunityScore = Math.round(
    (readiness * 0.25) +
    ((100 - saturation) * 0.2) + // lower saturation increases opportunity score
    (aiAdvantage * 0.25) +
    (potential * 0.3)
  );

  return {
    marketReadiness: readiness,
    industryGrowth: growth,
    competitionSaturation: saturation,
    aiAdvantage,
    revenuePotential: potential,
    overallOpportunityScore,
  };
}

export function generateFailureInsights(text: string, risks: RiskScores): FailurePatternPoint[] {
  // Return descriptions and scores for the chart
  const categories = [
    {
      category: "Product Market Fit",
      score: risks.productMarketFitRisk,
      description: risks.productMarketFitRisk > 70
        ? "Severe risk of building features that customers like in theory but do not use or pay for in practice."
        : "Moderate alignment risk. Core value proposition must be verified with early customer pilots."
    },
    {
      category: "Customer Acquisition Cost",
      score: Math.round((risks.competitionRisk + risks.productMarketFitRisk) / 2),
      description: "Organic channels are unproven; high reliance on paid digital ads may lead to unsustainable CAC/LTV ratio."
    },
    {
      category: "Monetization",
      score: Math.round((risks.fundingDifficulty + risks.productMarketFitRisk) / 2),
      description: "Low pricing margin or high customer churn might cause cash bleed before reaching unit profitability."
    },
    {
      category: "Competition",
      score: risks.competitionRisk,
      description: risks.competitionRisk > 75
        ? "Heavy crowding by well-funded incumbents. Standing out will require an order-of-magnitude better product."
        : "Sparse direct competitors, but secondary alternatives and standard manual workflows pose passive resistance."
    },
    {
      category: "Market Timing",
      score: risks.marketTimingRisk,
      description: risks.marketTimingRisk > 70
        ? "Either too early (requiring heavy user education) or late to a saturated hype cycle."
        : "Fair timing window. Market maturity matches customer readiness."
    },
    {
      category: "Operations",
      score: risks.executionDifficulty,
      description: "High execution complexity regarding logistics, contractor onboarding, or customer support scale-up."
    },
    {
      category: "Technology",
      score: risks.technicalComplexity,
      description: risks.technicalComplexity > 75
        ? "Significant R&D risk. The core product relies on complex technical capabilities that are hard to scale."
        : "Standard web/app implementation, low scientific research risk, high reliance on third-party APIs."
    },
    {
      category: "Team Issues",
      score: Math.round((risks.executionDifficulty + risks.fundingDifficulty) / 2),
      description: "Operations-heavy businesses require cross-functional leadership (ops + tech) that is difficult to align."
    }
  ];

  return categories;
}

async function getLessonsLearned(similarStartups: SimilarStartupInfo[]): Promise<LessonInsight[]> {
  // Find lessons in DB matching the similar startups
  const startupNames = similarStartups.map((s) => s.name);
  const lessons = await prisma.lessonLearned.findMany({
    where: {
      startup: {
        name: {
          in: startupNames,
        },
      },
    },
    include: {
      startup: true,
    },
  });

  return lessons.map((l) => ({
    id: l.id,
    lesson: l.lesson,
    category: l.startup.name, // Using startup name as category for UI separation
  }));
}

export function generatePivotSuggestions(name: string, text: string, breakdown: IdeaBreakdown): PivotSuggestion[] {
  // Generate 3 custom pivots based on name and industry
  if (breakdown.industry === "Media & Entertainment") {
    return [
      {
        title: `Enterprise Training Short-Form LMS`,
        description: `Transition the micro-content delivery format from consumer entertainment to B2B corporate compliance and micro-learning.`,
        reasoning: `Corporate training budgets are recurring and less sensitive to entertainment fatigue. Commuters will watch training clips if subsidized/mandated by employers.`
      },
      {
        title: `Premium Interactive E-Learning for Kids`,
        description: `Pivot to short-form, gamified educational courses targeting children (K-12) with parents paying the subscription.`,
        reasoning: `Parents have a high willingness to pay for educational products, and short-form interactive segments are highly effective for children's attention spans.`
      },
      {
        title: `Niche Industry Vertical Hub (e.g. Healthcare Video Diagnostics)`,
        description: `Repurpose the low-latency streaming infrastructure for highly secure, professional telemedicine and training streams.`,
        reasoning: `Bypasses consumer streaming wars entirely by focusing on high-ticket enterprise healthcare contracts.`
      }
    ];
  }

  if (breakdown.industry === "On-Demand Services") {
    return [
      {
        title: `B2B Enterprise Facilities Management API`,
        description: `Pivot from direct consumer cleaning/gig marketplace to licensing the dispatch, scheduling, and logistics software to commercial office cleaning firms.`,
        reasoning: `Higher average contract values, long-term retainers, and zero consumer marketing/promotion spend, solving the low-retention CAC problem.`
      },
      {
        title: `Subcontractor Management SaaS for Local Agencies`,
        description: `Sell the scheduling and client matching tools directly to existing local cleaning agencies as a white-labeled software subscription.`,
        reasoning: `Bypasses regulatory worker-classification risks and marketplace leakage by enabling agencies to manage their own staff.`
      },
      {
        title: `Luxury Concierge Subscription for Real Estate`,
        description: `Partner directly with high-end property management companies to bundle home cleaning and maintenance as a built-in luxury apartment amenity.`,
        reasoning: `Secures a steady, bulk volume of customers per building, drastically reducing logistics travel time and customer acquisition cost.`
      }
    ];
  }

  if (breakdown.industry === "Healthcare & Biotech") {
    return [
      {
        title: `Specialized Clinical Lab Workflow Software`,
        description: `Pivot from developing proprietary diagnostics hardware to building the operating system and analytics layer for existing FDA-approved medical analyzers.`,
        reasoning: `Bypasses deep R&D and hardware engineering risks while solving a key bottleneck in lab data integration and compliance reporting.`
      },
      {
        title: `B2B Research Assays for Pharmaceutical Trials`,
        description: `Focus the micro-testing technology solely on animal-testing stages of pharmaceutical drug research, rather than human clinical diagnostics.`,
        reasoning: `Lower immediate regulatory barriers compared to human clinical testing, while validating the biochemistry under research partnership grants.`
      },
      {
        title: `Digital Diagnostics Companion App`,
        description: `A software-only telehealth platform that helps users monitor chronic conditions using standard off-the-shelf medical devices (e.g., smartwatches, home cuffs).`,
        reasoning: `Eliminates high-risk hardware manufacturing and distribution pipelines, allowing standard SaaS margins and quick distribution.`
      }
    ];
  }

  if (breakdown.industry === "Fintech & Payments") {
    return [
      {
        title: `White-Labeled Checkout SDK for Niche Verticals`,
        description: `License the one-click checkout engine directly to specific high-friction e-commerce platforms like digital downloads, ticketing, or cannabis e-retailers.`,
        reasoning: `Incumbents like Stripe or Shopify often restrict or overcharge these verticals, leaving high-margin opportunities with less direct competition.`
      },
      {
        title: `Fraud Detection & Cart Recovery API`,
        description: `Use checkout tracking data to sell cart-abandonment analysis and identity-verification services to large enterprise merchants.`,
        reasoning: `Shifts the monetization from low-margin transaction commissions to high-margin fraud prevention SaaS.`
      },
      {
        title: `Direct Ledger Sync for E-commerce ERPs`,
        description: `Pivot checkout actions into instant ledger reconciliations for multi-channel merchants using Netsuite or SAP.`,
        reasoning: `Higher contract value business focusing on backend finance department pain points rather than front-end consumer checkout button placement.`
      }
    ];
  }

  // Default / fallback
  return [
    {
      title: `${name} B2B SaaS Workflow Platform`,
      description: `Target mid-market enterprise teams instead of individual consumers or freelancers, adding robust collaboration and security features.`,
      reasoning: `Enables higher pricing tiers, lower churn rates, and longer contracts (annual/multi-year) which improves unit economics.`
    },
    {
      title: `${name} White-Labeled API Infrastructure`,
      description: `Package the core software functionality as an API/SDK that developers can easily integrate into their existing products.`,
      reasoning: `Lowers customer support overhead and shifts user acquisition cost onto client developers who build their own front-ends.`
    },
    {
      title: `${name} Managed Services Hybrid`,
      description: `Combine the software tool with a managed service (agency/experts) who operate the tool on behalf of the customer.`,
      reasoning: `Speeds up initial revenue generation, validates product usability, and allows charging high consultation fees while the software scales.`
    }
  ];
}

export function generateFinalVerdict(breakdown: IdeaBreakdown, risks: RiskScores, opportunity: MarketOpportunity): FinalVerdict {
  const score = risks.overallRiskScore;

  let recommendation: "Proceed" | "Pivot Recommended" | "High Risk - Avoid" = "Pivot Recommended";
  let summary = "";
  let steps: string[] = [];
  let strengths: string[] = [];
  let weaknesses: string[] = [];
  let majorRisks: string[] = [];

  if (score < 45) {
    recommendation = "Proceed";
    summary = "This idea displays low-to-moderate systemic risk. Market demand is healthy, and execution barriers are manageable. Focus on building a high-quality product and capturing early customer validation.";
    steps = [
      "Build a minimal functional mockup to validate core value proposition.",
      "Conduct 15 structured user interviews to establish initial price point.",
      "Acquire first 5 paying beta customers using organic networking."
    ];
  } else if (score >= 45 && score < 70) {
    recommendation = "Pivot Recommended";
    summary = "The core startup idea has potential but suffers from notable structural risks, such as high customer acquisition costs or strong incumbents. A slight pivot to a B2B model or specialized niche is recommended before scaling.";
    steps = [
      "Re-evaluate target audience; check if a high-margin enterprise niche exists.",
      "Calculate your theoretical unit economics (LTV/CAC) with conservative assumptions.",
      "Test consumer acquisition cost using low-budget search ads landing pages before writing code."
    ];
  } else {
    recommendation = "High Risk - Avoid";
    summary = "This idea carries extremely high structural risk, mimicking several high-profile startup failures in operations-heavy execution, intense competition, and high capital intensity. Launching in its current form is highly cautioned.";
    steps = [
      "Review similar historical failures in our database (e.g. compare with Theranos or Juicero depending on the domain).",
      "Draft a completely revised business model that cuts capital dependency by 70%.",
      "Run extensive pre-sales checks to see if enterprise buyers will sign letters of intent (LOI) before any development."
    ];
  }

  // Generate generic list based on industry complexity
  if (breakdown.complexityLevel === "Very High") {
    majorRisks.push("Scientific R&D / Tech delivery failure: technology might not perform as promised.");
    majorRisks.push("Extreme regulatory overhead (FDA, HIPAA, or SEC compliance audits).");
    weaknesses.push("Long product cycle and high capital burn rate before launch.");
    weaknesses.push("Requires specialized, high-cost research talent.");
    strengths.push("Deep technological defensibility (IP moat) if successful.");
  } else {
    majorRisks.push("Distribution bottleneck: customer acquisition cost (CAC) might outpace customer lifetime value.");
    majorRisks.push("Low switching barriers: customers can easily migrate to free/alternative platforms.");
    weaknesses.push("Low competitive barriers; easy for competitors to clone features.");
    weaknesses.push("Heavily dependent on continuous user activity / social loop density.");
    strengths.push("Short time-to-market; MVP can be completed within 6-8 weeks.");
  }

  strengths.push(`Strong alignment with modern ${breakdown.technologyCategory} workflows.`);
  if (opportunity.overallOpportunityScore > 70) {
    strengths.push("Operates in a fast-growing industry sector with solid macro headwinds.");
  }
  weaknesses.push("Lack of proprietary data distribution loops in initial phase.");

  return {
    strengths,
    weaknesses,
    majorRisks,
    recommendedNextSteps: steps,
    overallRecommendation: recommendation,
    verdictSummary: summary
  };
}
