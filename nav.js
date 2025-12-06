// SAETTA NAVIGATION COMPONENT V2.0 (Socials Integrated)
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
                <a href="https://x.com/yourhandle" target="_blank">
                    <img src="x.png" class="social-icon" alt="X">
                </a>
                <a href="https://youtube.com/yourchannel" target="_blank">
                    <img src="yt.png" class="social-icon" alt="YT">
                </a>
            </div>
        </div>
    </div>
`;

document.getElementById("saetta-nav").innerHTML = navHTML;

// Highlight Active Link
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active');
    }
});