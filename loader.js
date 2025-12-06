/* --- CONTENT LOADER ENGINE --- */

// Function to generate HTML for a SYSTEM card
function loadSystems() {
    const container = document.getElementById('system-grid');
    if (!container) return; // Stop if we aren't on the systems page

    let html = '';
    db.systems.forEach(item => {
        html += `
            <div class="system-card">
                <div class="sys-thumb">${item.thumb}</div>
                <div class="sys-content">
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" class="sys-link">ACCESS >></a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Function to generate HTML for a REPORT card
function loadReports() {
    const container = document.getElementById('report-grid');
    if (!container) return;

    let html = '';
    db.reports.forEach(item => {
        html += `
            <div class="module">
                <div class="sys-content">
                    <div style="font-size:0.7rem; color:#666; margin-bottom:5px;">ID: ${item.id}</div>
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" target="_blank" class="btn">[ DOWNLOAD PDF ]</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Function to generate HTML for a VIDEO card
function loadVideos() {
    const container = document.getElementById('video-grid');
    if (!container) return;

    let html = '';
    db.videos.forEach(item => {
        html += `
            <div class="system-card">
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${item.youtubeID}" allowfullscreen></iframe>
                </div>
                <div class="sys-content">
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// EXECUTE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    loadSystems();
    loadReports();
    loadVideos();
});