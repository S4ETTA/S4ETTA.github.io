/* --- SAETTA NAVIGATION COMPONENT V6.1 --- */
const SAETTA_VERSION = "1.5.0"; 

const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <img src="assets/logo.png" alt="Logo" class="logo-img">
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
                <a href="https://x.com/S4ETTA" target="_blank"><img src="assets/x.png" class="social-icon" alt="X"></a>
                <a href="https://youtube.com/@S4ETTA" target="_blank"><img src="assets/yt.png" class="social-icon" alt="YT"></a>
                <a href="mailto:charleskimisr@gmail.com"><img src="assets/email.png" class="social-icon" alt="Email"></a>
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