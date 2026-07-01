/* --- SAETTA NAVIGATION COMPONENT V7.0 --- */
const SAETTA_VERSION = "2.12";

const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <a href="index.html?v=${SAETTA_VERSION}" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
                <div class="identity">
                    <h1>Charles Kim</h1>
                    <div class="saetta-title">Global Threat Analyst</div>
                </div>
            </a>
        </div>
        <div class="nav-group">
            <nav>
                <a href="index.html?v=${SAETTA_VERSION}">Bio</a>
                <a href="tools.html?v=${SAETTA_VERSION}">Systems</a>
                <a href="papers.html?v=${SAETTA_VERSION}">Papers</a>
            </nav>
            <div class="socials"></div>
        </div>
    </div>
    <div class="contact-bar">
        <span class="contact-bar-item"><span class="contact-bar-label">Email</span><a href="mailto:charleskimisr@gmail.com">charleskimisr@gmail.com</a></span>
        <span class="contact-bar-sep">·</span>
        <span class="contact-bar-item"><span class="contact-bar-label">X</span><a href="https://x.com/S4ETTA" target="_blank">@S4ETTA</a></span>
        <span class="contact-bar-sep">·</span>
        <span class="contact-bar-item"><span class="contact-bar-label">Location</span>Seoul, Republic of Korea</span>
    </div>
`;

document.getElementById("saetta-nav").innerHTML = navHTML;

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('?')[0];
    if (linkPath === currentPath) link.classList.add('active');
});
