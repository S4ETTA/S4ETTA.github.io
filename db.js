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
        { text: "A massive air assault is about to begin. Multiple USAF tankers have just taken off from Israel.", date: "APR 07, 2026", url: "https://x.com/S4ETTA/status/2041538296518766752?s=20", type: "tweet", tags: ["Israel", "US", "Iran"] },
        { text: "INSIGHT: US Asset Loss Curve & Asymmetric Attrition SensitivityThe united States military operates under a strict casualty aversion threshold when engaging non-peer or asymmetric adversaries in conflicts lacking an existential threat to the homeland. Unlike Russian military…", date: "APR 05, 2026", url: "https://x.com/S4ETTA/status/2040822344487465269?s=20", type: "tweet", tags: ["US"] },
        { text: "INSIGHT: Lets take a look at the areas of effect following a possible strike of the oil tanks on Kharg Island. Zone 1: The extreme heat will create a localised hypoxic environment surrounding the tanks. Personnel within are likely to suffer thermal radiation, incapacitation…", date: "MAR 30, 2026", url: "https://x.com/S4ETTA/status/2038631476045259153?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Image from inside USS Boxer (LHD-4) Amphibious Assault Ship en route to the ongoing conflict region. LCAC (Landing Craft Air Cushion), LAV-25 reconnaissance vehicles, and humvees are also visible.", date: "MAR 30, 2026", url: "https://x.com/S4ETTA/status/2038611637167612210?s=20", type: "tweet", tags: ["US"] },
        { text: "82nd Airborne Division Deployment & JFE VulnerabilitiesOverview: The 82nd Airborne Division serves as the United States' option to deploy a brigade level force globally within a small timeframe. The division specialises in Joint Forcible Entry (JFE) operations, utilising…", date: "MAR 27, 2026", url: "https://x.com/S4ETTA/status/2037540342430572753?s=20", type: "tweet", tags: ["US"] },
        { text: "With the risk of Houthi involvement in closing the Gulf of Aden as a defensive measure ever rising, here are two structures at Hodeidah Airport that we've been tracking. They remain untouched as of today.", date: "MAR 26, 2026", url: "https://x.com/S4ETTA/status/2036963857911210183?s=20", type: "tweet", tags: ["Gulf", "Yemen", "Iran"] },
        { text: "Profile of Mohammad Bagher Zolghadr, Newly Appointed SNSC.", date: "MAR 24, 2026", url: "https://x.com/S4ETTA/status/2036408054883951091", type: "tweet", tags: ["Iran"] },
        { text: "The possible European target range with the missile used by Iran to target Diego Garcia. While the attacks on the island were unsuccessful, the range it was aiming for is alarming.", date: "MAR 21, 2026", url: "https://x.com/S4ETTA/status/2035377995935056068", type: "tweet", tags: ["Iran", "Europe", "Asia"] },
        { text: "INSIGHT: HOUTHI GULF OF ADEN BLOCKADE. Since the start of the 2026 Iranian conflict, the Houthis (Ansar-Allah) have maintained a lowkey readiness posture, pressuring US naval assets in the region but not actively joining medium range offences against targets in the region.", date: "MAR 21, 2026", url: "https://x.com/S4ETTA/status/2035374336069308460", type: "tweet", tags: ["Gulf", "US", "Iran"] },
        { text: "Profile of Saeed Jalili, likely SNSC (Secretary of the National Security Council of Iran) Successor.", date: "MAR 20, 2026", url: "https://x.com/S4ETTA/status/2035011490391175476", type: "tweet", tags: ["Iran"] },
        { text: "Iranian Cluster Munition Pivot & Area Denial Threats: Iran has executed a major shift in offensive options, transitioning a major portion of its MRBM (Medium Range Ballistic Missiles) warheads, namely the Khorramshahr, Emad, and Shabab-3s, from high-explosive to cluster munition variants.", date: "MAR 19, 2026", url: "https://x.com/S4ETTA/status/2034659184529264954", type: "tweet", tags: ["Iran"] },
        { text: "An Israeli oil refinery in Haifa has been struck by a missile. Direct source from local report.", date: "MAR 19, 2026", url: "https://x.com/S4ETTA/status/2034650118885081551", type: "tweet", tags: ["Israel", "Iran"] },
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
        { text: "Iranian drone strike sites on Habshan oil facilities and substations. Coordinates marked on crosshairs.", date: "APR 04, 2026", url: "https://x.com/S4ETTA/status/2040443675113865526?s=20", type: "tweet", tags: ["Gulf", "Iran", "UAE"] },
        { text: "SAR Imagery of the Strait of Hormuz, with new movements as of 3rd of April. Crossing attempts are increasing, but are extremely rare according to AIS data.", date: "APR 04, 2026", url: "https://x.com/S4ETTA/status/2040438187693326452?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "SAR Imagery of vessel movements on Kharg Island, 2nd of April.", date: "APR 04, 2026", url: "https://x.com/S4ETTA/status/2040437269979644397?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "3m resolution true colour imagery of Kharg Island today. Marked are the new vessel movements.", date: "MAR 29, 2026", url: "https://x.com/S4ETTA/status/2038252320916754827?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "[SAR Imagery] Large number of vessel movements captured around Kharg Island today. The seemingly inactive and docked tanker on the Eastern terminal has departed, replaced by clusters of smaller vessels.", date: "MAR 27, 2026", url: "https://x.com/S4ETTA/status/2037530769325994314?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "SAR Imagery of Kharg Island today. Multiple small vessels can be seen in addition to routine large vessel arrivals.", date: "MAR 26, 2026", url: "https://x.com/S4ETTA/status/2036970938923946071?s=20", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "SAR Imagery of Strait of Hormuz, compared between 19 MAR and 22 MAR. Noticeably higher number of ships amassing at the entrance.", date: "MAR 24, 2026", url: "https://x.com/S4ETTA/status/2036434655671619741", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Tel Aviv Iranian ballistic missile hit location.", date: "MAR 24, 2026", url: "https://x.com/S4ETTA/status/2036433176013447297", type: "tweet", tags: ["Israel", "Iran"] },
        { text: "Optical imagery of the 5 primary power plants of Iran. Should US strikes arrive, these will be targeted.", date: "MAR 22, 2026", url: "https://x.com/S4ETTA/status/2035532276319277312", type: "tweet", tags: ["Iran", "US"] },
        { text: "NIR-Optical Satellite Imagery of the Natanz Nuclear Enrichment Facilities, right before the strikes this morning. For comparison purposes.", date: "MAR 21, 2026", url: "https://x.com/S4ETTA/status/2035370217589838327", type: "tweet", tags: ["Iran"] },
        { text: "SAR Imagery of Strait of Hormuz, as of 20 MAR.", date: "MAR 20, 2026", url: "https://x.com/S4ETTA/status/2035030448972460434", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Exact location of Israeli-Lebanese firefight in Al Khiam, Lebanon.", date: "MAR 17, 2026", url: "https://x.com/S4ETTA/status/2033939709186216023", type: "tweet", tags: ["Israel", "Hezbollah", "Iran"] },
        { text: "Tracking movement of tankers on Eastern and Western deep-water terminals of Kharg Island, Iran, from 15th of March to 17th of March.", date: "MAR 17, 2026", url: "https://x.com/S4ETTA/status/2033929709218893888", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Strait of Hormuz, 15 MAR 2026. SAR imagery compared to AIS data. Idle and rerouting vessel clusters are visible as white flecks in areas of interest.", date: "MAR 16, 2026", url: "https://x.com/S4ETTA/status/2033574066070909031", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Impact point of Israeli strike on Hamedan Telecom centre, Iran.", date: "MAR 15, 2026", url: "https://x.com/S4ETTA/status/2033202741099786501", type: "tweet", tags: ["Iran", "Israel"] },
        { text: "SWIR Imagery of Shahed-136 attack on Port Salalah, Dhofar, Oman", date: "MAR 15, 2026", url: "https://x.com/S4ETTA/status/2033197517077385256", type: "tweet", tags: ["Gulf"] },
        { text: "Exact impact point of Shahed-136 attack on US Embassy in Iraq, captured by SAETTA Strikemaster.", date: "MAR 14, 2026", url: "https://x.com/S4ETTA/status/2032663859526512882", type: "tweet", tags: ["Iran", "US"] },
        { text: "Likely point of blast at US Embassy in Norway. So far no injuries have been reported.", date: "MAR 08, 2026", url: "https://x.com/S4ETTA/status/2030474631854092713", type: "tweet", tags: ["Europe"] },
        { text: "Strike on US Embassy in Kuwait, and their points of captures (Tracked through NDVI imagery and wind direction)", date: "MAR 02, 2026", url: "https://x.com/S4ETTA/status/2028345525767131636", type: "tweet", tags: ["Iran", "Gulf"] },
        { text: "Target Profiles of the Hits on Ali Al Salem AB, Kuwait", date: "MAR 01, 2026", url: "https://x.com/S4ETTA/status/2027920708815491484?s=20", type: "tweet", tags: ["Gulf"] }
    ]
};