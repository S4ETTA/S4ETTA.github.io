/* --- SAETTA CENTRAL DATABASE V5.0 --- */
const db = {
    // 1. TOOLS DATA
    tools: [
        { 
            title: "WARNINGSTAR", 
            desc: "Discord-bound Data Aggregator with Flexible Sources and Keyword Triggers.", 
            thumb: "[ WARNINGSTAR_UI ]", 
            link: "tool-warningstar.html" 
        },
        { 
            title: "PHOBOS", 
            desc: "Ontology-based Global Early Warning and Threat Assessment Platform.", 
            thumb: "[ PHOBOS_v1 ]", 
            link: "tool-phobos.html" 
        },
        { 
            title: "DEIMOS", 
            desc: "Nonconformal target designation and tracker for investigation and response.", 
            thumb: "[ DEIMOS_DEV ]", 
            link: "#" 
        }
    ],

    // 2. PAPERS DATA
    papers: [
        { 
            title: "Protocol 5A Analysis", 
            desc: "Security protocols in high-risk zones focusing on primary themes and example cases.", 
            link: "papers/protocol-5a.pdf", 
            id: "PAPER-5A" 
        },
        { 
            title: "Counterterrorism Finance", 
            desc: "Analysis of economic sanction failures against hybrid actors like Hezbollah.", 
            link: "papers/ct-finance.pdf", 
            id: "PAPER-CTF" 
        }
    ],

    // 3. VIDEOS DATA
    videos: [
        { title: "Conflict Progression", desc: "Regional escalation points and non-kinetic patterns.", youtubeID: "dQw4w9WgXcQ" },
        { title: "CIRAM-2 Demo", desc: "Regenerating entire lecture scripts from sporadic notes using local Gemini API.", youtubeID: "dQw4w9WgXcQ" }
    ]
};