/* db.js */
const db = {
    tools: [
        {
            title: "S7",
            desc: "Ontology-based global early warning and threat assessment platform.",
            thumb: "assets/phobos_logo2.png",
            link: "tool-phobos.html"
        },
        {
            title: "S2A",
            desc: "Discord-bound data aggregator with customisable sources and keyword triggers.",
            thumb: "assets/warningstar_news.png",
            link: "tool-warningstar.html"
        },
        {
            title: "S9",
            desc: "Regional vulnerability assessment and combat analysis platform (In Process).",
            thumb: "assets/strikemaster_logo2.png",
            link: "tool-strikemaster.html"
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
    // Videos removed
    dataReports: [
        {
            title: "Hezbollah Target Sheet (JAN 2026)",
            desc: "Comprehensive visual database of known Hezbollah facilities and assets",
            link: "report-hezbollah.html",
            thumb: "assets/hezbollah.png",
            id: "Terrorism",
            type: "html" // Direct HTML page
        },
        {
            title: "BLA Attack Analysis (FEB 2026)",
            desc: "Breakdown of the coordinated BLA attack and the ensuing Pakistani state counteroffensives.",
            link: "reports/COIN Operations Following Operation Herof 2.pdf",
            thumb: "assets/bla.png",
            id: "Insurgency",
            type: "local"
        }
    ]
};