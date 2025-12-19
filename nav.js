/* --- SAETTA NAVIGATION COMPONENT V5.0 --- */
const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <img src="logo.png" alt="Logo" class="logo-img">
            <div class="identity">
                <h1>Min Ha (Charles) Kim</h1>
                <div class="saetta-title">SYS: SAETTA // ANALYST</div>
            </div>
        </div>

        <div class="nav-group">
            <nav>
                <a href="index.html">Bio</a>
                <a href="tools.html">Tools</a>
                <a href="papers.html">Papers</a>
                <a href="videos.html">Videos</a>
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

document.getElementById("saetta-nav").innerHTML = navHTML;

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});