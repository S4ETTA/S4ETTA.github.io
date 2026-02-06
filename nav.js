/* --- SAETTA NAVIGATION COMPONENT V6.1 --- */
const SAETTA_VERSION = "1.60";

const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <a href="index.html?v=${SAETTA_VERSION}" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
                <div class="identity" style="margin-left:0;">
                    <h1 style="font-size: 2.5rem; font-weight: bold; letter-spacing: -1px;">Charles Kim</h1>
                </div>
            </a>
        </div>
        <div class="nav-group">
            <nav>
                <a href="index.html?v=${SAETTA_VERSION}">Bio</a>
                <a href="tools.html?v=${SAETTA_VERSION}">Tools</a>
                <a href="papers.html?v=${SAETTA_VERSION}">Papers</a>
                <a href="reports.html?v=${SAETTA_VERSION}">Reports</a>
            </nav>
            <div class="socials">
                <!-- Socials removed as requested -->
            </div>
        </div>
    </div>
`;

document.getElementById("saetta-nav").innerHTML = navHTML;

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('?')[0];
    if (linkPath === currentPath) link.classList.add('active');
});