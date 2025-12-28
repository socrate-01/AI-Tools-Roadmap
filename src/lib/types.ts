export interface PricingPlan {
    name: string;
    priceUSD: number;
    priceCAD: number;
    billing: string;
    features: string[];
}

export interface Tool {
    id: string;
    name: string;
    logo: string;
    logoFallback: string;
    pricing: 'free' | 'paid' | 'freemium';
    officialWebsite: string;
    shortDescription: string;
    fullDescription?: string;
    bestFor: string;
    categoryId: string; // Added categoryId link

    freeTier?: {
        available: boolean;
        features: string[];
    };
    paidPlans?: PricingPlan[];

    gettingStarted?: {
        installation: string[];
        setup: string[];
        basicUsage: string[];
    };

    useCases?: string[];
    pros?: string[];
    cons?: string[];

    resources?: {
        documentation?: string;
        community?: string;
        tutorials?: string[];
    };

    tags?: string[];
    position?: { x: number; y: number };
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    image?: string;
    description: string;
    color: string;
    toolCount?: number; // Optional count
}

export interface ToolsData {
    lastUpdated: string;
    version: string;
    categories: Category[]; // Categories metadata
    tools: Tool[]; // Flat list of tools is often easier, but keeping nested or separate?
    // The user's original structure was nested.
    // The new requirements imply a flat list might be easier for filtering, 
    // but let's stick to a structure that supports the UI.
    // Actually, the user asked for "Two-level navigation", 
    // organizing by category.
    // Let's keep the user's suggested structure or adapt.
    // The user's JSON snippet in the prompt showed `tools` nested in `categories`.
    // BUT, the critical fix #7 shows `category: "category-id"` inside the tool object.
    // This suggests a flat list of tools might be better or at least cross-referenced.
    // Let's stick to the Nested structure for now to match the original `map` logic 
    // OR switch to flat if it's cleaner. 
    // Given the prompt "Add ALL Tools with Real Data" and "Two-Level Navigation", 
    // separating Categories metadata from Tools list is often cleaner.
    // However, to minimize refactoring of existing code (which expects nested),
    // I will check the current `tools.json` structure I wrote in step 26.
    // It was nested.
    // I will define `Category` to include `tools: Tool[]` to match previous logic,
    // OR I will update the code to handle normalization.
    // Let's stick to Nested for simplicity of "Get Category -> Get Tools".
}

// Re-defining to match the likely desired structure for easy iteration
export interface CategoryWithTools extends Category {
    tools: Tool[];
}

export interface ToolsDataNested {
    lastUpdated: string;
    version: string;
    categories: CategoryWithTools[];
}
