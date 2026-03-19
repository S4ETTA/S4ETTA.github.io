/* db.js */
const db = {
    tools: [
        {
            title: "S7 PHOBOS",
            desc: "Node-based global early warning and threat assessment platform. Continuously aggregates data across geospatial markers to provide active situational awareness.",
            thumb: "assets/phobos_logo3.png",
            link: "tool-phobos.html"
        },
        {
            title: "S9 STRIKEMASTER",
            desc: "Multipurpose geospatial analysis platform. Advanced target plotting, precise munition simulation, and geographical topography evaluation integrated into one dashboard.",
            thumb: "assets/strikemaster_zoomcover.png",
            link: "tool-strikemaster.html"
        },
        {
            title: "S2A WARNINGSTAR",
            desc: "Discord-bound data aggregator with customisable sources and keyword triggers.",
            thumb: "assets/warningstar_news.png",
            link: "tool-warningstar.html"
        }
    ],
    papers: [
        {
            title: "Failure of Economic Sanctions against MENA Hybrid Actors",
            desc: "Research into modernisation efforts and sanction evasion techniques by Hezbollah and the Houthis (Ansar-Allah).",
            link: "https://smallwarsjournal.com/2026/02/05/failure-economic-statecraft/",
            id: "Economic Statecraft, Terrorism"
        },
        {
            title: "The Tomahawk Effect",
            desc: "The risks of tertiary proliferation of long range precision guided munitions in non-state actors.",
            link: "#",
            id: "Weapons Systems, Terrorism"
        }
    ],
    dataPackages: [
        {
            title: "Hezbollah Target Sheet",
            date: "JAN 2026",
            desc: "Comprehensive visual database of known Hezbollah facilities and assets",
            link: "report-hezbollah.html",
            thumb: "assets/hezbollah.png",
            id: "Terrorism",
            type: "html"
        }
    ],
    insightReports: [
        { text: "PRC Escalations & INDOPACOM Asset Drain: Beijing is actively exploiting the U.S. military pivot to the Middle East through synchronised multi-domain pressure.", date: "MAR 15, 2026", url: "https://x.com/S4ETTA/status/2033184695094059219", type: "tweet", tags: ["China"] },
        { text: "MEF Deployment & Possible Kharg Island Stationing: A 2,500-count MEF element is mobilising to establish a forward operating base in support of the US missions.", date: "MAR 14, 2026", url: "https://x.com/S4ETTA/status/2032673708998041831", type: "tweet", tags: ["Iran"] },
        { text: "Hormuz Closure and Economic Attrition: CENTCOM rapidly neutralised Iran's conventional surface fleet.", date: "MAR 13, 2026", url: "https://x.com/S4ETTA/status/2032481421361840541", type: "tweet", tags: ["Iran"] },
        { text: "Gulf Air Defence Deficiencies and Exposure to Drone Saturation", date: "MAR 03, 2026", url: "https://x.com/S4ETTA/status/2028854962961395749", type: "tweet", tags: ["Gulf"] },
        { text: "Gulf State Offensive Integration & Air Order of Battle", date: "MAR 01, 2026", url: "https://x.com/S4ETTA/status/2028059841437257892?s=20", type: "tweet", tags: ["Gulf"] },
        { text: "Operation Lion's Roar & The Iranian Front", date: "FEB 28, 2026", url: "https://x.com/S4ETTA/status/2027665592959045682?s=20", type: "tweet", tags: ["Iran"] },
        { text: "Major Pakistani Military Escalation Against Afghanistan", date: "FEB 26, 2026", url: "https://x.com/S4ETTA/status/2027280313513398629?s=20", type: "tweet", tags: ["Asia"] },
        { text: "CJNG Nationwide Retaliatory Counteroffensive", date: "FEB 25, 2026", url: "https://x.com/S4ETTA/status/2026462444126876138?s=20", type: "tweet", tags: ["Americas"] },
        { text: "Death of CJNG Cartel Leader Nemesio Oseguera Cervantes", date: "FEB 24, 2026", url: "https://x.com/S4ETTA/status/2025959275219280138?s=20", type: "tweet", tags: ["Americas"] },
        { text: "Reading the Indications of Imminent US strikes into Iran", date: "FEB 21, 2026", url: "https://x.com/S4ETTA/status/2025166167716012508?s=20", type: "tweet", tags: ["Iran", "US"] },
        { text: "Bombing of Khadija al-Kubra Imambargah Shia mosque in Islamabad, Pakistan", date: "FEB 06, 2026", url: "https://x.com/S4ETTA/status/2019788034867335205?s=20", type: "tweet", tags: ["Asia"] }
    ],
    geointReports: [
        { text: "Impact point of Israeli strike on Hamedan Telecom centre, Iran.", date: "MAR 15, 2026", url: "https://x.com/S4ETTA/status/2033202741099786501", type: "tweet", tags: ["Iran", "Israel"] },
        { text: "SWIR Imagery of Shahed-136 attack on Port Salalah, Dhofar, Oman", date: "MAR 15, 2026", url: "https://x.com/S4ETTA/status/2033197517077385256", type: "tweet", tags: ["Gulf"] },
        { text: "Exact impact point of Shahed-136 attack on US Embassy in Iraq, captured by SAETTA Strikemaster.", date: "MAR 14, 2026", url: "https://x.com/S4ETTA/status/2032663859526512882", type: "tweet", tags: ["Iran", "US"] },
        { text: "Likely point of blast at US Embassy in Norway. So far no injuries have been reported.", date: "MAR 08, 2026", url: "https://x.com/S4ETTA/status/2030474631854092713", type: "tweet", tags: ["Europe"] },
        { text: "Strike on US Embassy in Kuwait, and their points of captures (Tracked through NDVI imagery and wind direction)", date: "MAR 02, 2026", url: "https://x.com/S4ETTA/status/2028345525767131636", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Target Profiles of the Hits on Ali Al Salem AB, Kuwait", date: "MAR 01, 2026", url: "https://x.com/S4ETTA/status/2027920708815491484?s=20", type: "tweet", tags: ["Gulf"] }
    ]
};