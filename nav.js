/* --- SAETTA NAVIGATION COMPONENT V3.0 (Final Deployment) --- */
const navHTML = `
    <div class="top-bar">
        <div class="identity-block">
            <img src="logo.png" alt="Logo" class="logo-img">
            <div class="identity">
                <h1>Min Ha "Charles" Kim</h1>
                <div class="saetta-title">SYS: SAETTA // ANALYST</div>
            </div>
        </div>

        <div class="nav-group">
            <nav>
                <a href="index.html">Bio</a>
                <a href="systems.html">Systems</a>
                <a href="reports.html">Reports</a>
                <a href="videos.html">Videos</a>
            </nav>
            
            <div class="socials">
                <a href="https://x.com/yourhandle" target="_blank" title="X / Twitter">
                    <img src="x.png" class="social-icon" alt="X">
                </a>
                <a href="https://youtube.com/@yourchannel" target="_blank" title="YouTube Archive">
                    <img src="yt.png" class="social-icon" alt="YT">
                </a>
                <a href="mailto:saetta.mkim@gmail.com" title="Direct Contact">
                    <img src="email.png" class="social-icon" alt="Email">
                </a>
            </div>
        </div>
    </div>
`;

document.getElementById("saetta-nav").innerHTML = navHTML;

// Active Link Highlighter
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});