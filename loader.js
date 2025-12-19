/* --- CONTENT LOADER ENGINE V2.0 --- */

function loadSystems() {
    const container = document.getElementById('system-grid');
    if (!container) return;
    let html = '';
    db.systems.forEach(item => {
        html += `
            <div class="system-card">
                <div class="sys-thumb">${item.thumb}</div>
                <div class="sys-content">
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" class="btn">ACCESS >></a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadReports() {
    const container = document.getElementById('report-grid');
    if (!container) return;
    let html = '';
    db.reports.forEach(item => {
        html += `
            <div class="report-card">
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

document.addEventListener('DOMContentLoaded', () => {
    loadSystems();
    loadReports();
    loadVideos();
});