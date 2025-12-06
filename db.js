/* --- SAETTA CENTRAL DATABASE --- */

const db = {
    
    // 1. SYSTEMS DATA
    systems: [
        {
            title: "CIRAM Project",
            desc: "Context-based Information Recollection Model. An architecture for regenerating lecture scripts.",
            thumb: "[ IMAGE: CIRAM ]", // You can use "images/ciram.jpg" here later
            link: "sys-ciram.html",
            status: "ACTIVE" // Optional tag
        },
        {
            title: "SAETTA Toolkit",
            desc: "Structured OSINT methodology and collection framework for regional analysis.",
            thumb: "[ IMAGE: OSINT ]",
            link: "https://github.com/yourusername/toolkit",
            status: "PUBLIC"
        },
        {
            title: "S8 Deimos",
            desc: "Nonconformal target designation and tracker system.",
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