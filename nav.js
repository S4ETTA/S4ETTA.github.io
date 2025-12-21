/* --- SAETTA NAVIGATION COMPONENT V5.1 --- */
/* Master Version Control - Increment this to force global cache update */
const SAETTA_VERSION = "1.0.3"; 

const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <img src="logo.png" alt="Logo" class="logo-img">
            <div class="identity">
                <h1>Charles (Min Ha) Kim</h1>
                <div class="saetta-title">INTELLIGENCE ANALYST</div>
            </div>
        </div>

        <div class="nav-group">
            <nav>
                <a href="index.html?v=${SAETTA_VERSION}">Bio</a>
                <a href="tools.html?v=${SAETTA_VERSION}">Tools</a>
                <a href="papers.html?v=${SAETTA_VERSION}">Papers</a>
                <a href="videos.html?v=${SAETTA_VERSION}">Videos</a>
            </nav>
            
            <div class="socials">
                <a href="https://x.com/S4ETTA" target="_blank" title="X / Twitter">
                    <img src="x.png" class="social-icon" alt="X">
                </a>
                <a href="https://youtube.com/@S4ETTA" target="_blank" title="YouTube Archive">
                    <img src="yt.png" class="social-icon" alt="YT">
                </a>
                <a href="mailto:charleskimisr@gmail.com" title="Direct Contact">
                    <img src="email.png" class="social-icon" alt="Email">
                </a>
            </div>
        </div>
    </div>
`;

// Inject the navigation HTML into the placeholder
document.getElementById("saetta-nav").innerHTML = navHTML;

// Active Link Logic: Detects current page and applies the .active style
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    // We strip the query string (?v=...) to compare paths accurately
    const linkPath = link.getAttribute('href').split('?')[0];
    if (linkPath === currentPath) {
        link.classList.add('active');
    }
});