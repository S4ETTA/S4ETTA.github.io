/* --- SAETTA CENTRAL DATABASE --- */

const db = {
    
    // 1. SYSTEMS DATA
    systems: [
        {
            title: "PHOBOS",
            desc: "Ontology-based Global Early Warning and Threat Assessment Platform.",
            thumb: "[ IMAGE: PHOBOS ]", // You can use "images/phobos.jpg" here later
            link: "sys-phobos.html",
            status: "ACTIVE" // Optional tag
        },
        {
            title: "WARNINGSTAR",
            desc: "Discord-bound Data Aggregator with Flexible Sources and Keyword Triggers",
            thumb: "[ IMAGE: WARNINGSTAR ]",
            link: "https://github.com/yourusername/toolkit",
            status: "ACTIVE"
        },
        {
            title: "DEIMOS (In development)",
            desc: "Adaptive Open-Source Investigation Platform.",
            thumb: "[ IMAGE: DEIMOS ]",
            link: "#",
            status: "DEV"
        }
    ],

    // 2. REPORTS DATA
    reports: [
        {
            title: "Protocol 5A Analysis",
            desc: "Security protocols in high-risk zones. Focus on non-kinetic escalation.",
            link: "reports/report1.pdf",
            id: "DOC-001"
        },
        {
            title: "East Asia Dynamics",
            desc: "Treaty shifts and non-kinetic escalation patterns on the peninsula.",
            link: "reports/report2.pdf",
            id: "DOC-002"
        }
    ],

    // 3. VIDEOS DATA
    videos: [
        {
            title: "Conflict Progression",
            desc: "2024 Timeline Analysis and regional escalation points.",
            youtubeID: "dQw4w9WgXcQ" // Just the ID, not the full URL
        },
        {
            title: "CIRAM-2 Demo",
            desc: "Architecture breakdown of the information recollection model.",
            youtubeID: "dQw4w9WgXcQ"
        }
    ]
};