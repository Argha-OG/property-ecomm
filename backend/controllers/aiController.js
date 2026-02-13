const Property = require('../models/Property');

exports.parseQuery = async (req, res) => {
    try {
        const { query } = req.body;
        console.log("AI Search Query:", query);

        if (!query) {
            return res.status(400).json({ message: "Query string is required" });
        }

        const filters = {};
        const lowerQuery = query.toLowerCase();

        // 1. Extract Location (Naive implementation based on known locations)
        const locations = ['kuala lumpur', 'selangor', 'penang', 'johor', 'mont kiara', 'bangsar', 'petaling jaya', 'cheras', 'subang jaya', 'cyberjaya', 'klcc', 'damansara'];
        for (const loc of locations) {
            if (lowerQuery.includes(loc)) {
                filters.locationText = loc; // Send text back to frontend
                filters.location = new RegExp(loc, 'i'); // Keep regex for internal logic if we were using it here, but actually we are just sending it back.
                break;
            }
        }

        // 2. Extract Property Type
        if (lowerQuery.includes('condo') || lowerQuery.includes('apartment')) filters.type = 'Residential';
        if (lowerQuery.includes('bungalow') || lowerQuery.includes('villa') || lowerQuery.includes('house')) filters.type = 'Residential';
        if (lowerQuery.includes('office') || lowerQuery.includes('shop') || lowerQuery.includes('commercial')) filters.type = 'Commercial';
        if (lowerQuery.includes('land')) filters.type = 'Land';

        // 3. Extract Budget / Price
        // Patterns: "under 1.5 million", "below 500k", "max 2m"
        const priceMatch = lowerQuery.match(/(?:under|below|max|budget)\s+(?:rm\s*)?(\d+(?:\.\d+)?)\s*(k|m|million)/i);
        if (priceMatch) {
            let amount = parseFloat(priceMatch[1]);
            const unit = priceMatch[2].toLowerCase();

            if (unit === 'k') amount *= 1000;
            if (unit === 'm' || unit === 'million') amount *= 1000000;

            // Since we store price as string currently (e.g. "RM 1,200,000"), we can't easily do a mongo $lt range query
            // without complex aggregation or schema change. 
            // For this Mock/Demo, we will filter AFTER fetching or just ignore price if it's too complex for the current schema.
            // However, let's try to pass it to the frontend to handle, or handle simplistic fitering here.

            // NOTE: The current schema stores price as formatted string "RM 1,500,000".
            // We'll pass the parsed maxPrice back to the frontend, and let the frontend or the existing search API handle it if possible.
            filters.maxPrice = amount;
        }

        // 4. Extract Bedrooms
        const bedMatch = lowerQuery.match(/(\d+)\s*(?:bed|room)/i);
        if (bedMatch) {
            filters.bedrooms = parseInt(bedMatch[1]);
        }

        console.log("Parsed Filters:", filters);

        // Construct a redirect URL or structured criteria to return
        // We will return the criteria so the frontend can redirect the user to the listing page with these params
        res.json({
            original: query,
            parsed: filters,
            explanation: `I found these criteria: Location=${filters.location || 'Any'}, Type=${filters.type || 'Any'}, Beds=${filters.bedrooms || 'Any'}`
        });

    } catch (err) {
        console.error("AI Parse Error:", err);
        res.status(500).json({ message: "Failed to parse query" });
    }
};
