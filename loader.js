/* --- CONTENT LOADER ENGINE V2.0 --- */

function loadTools() {
    const container = document.getElementById('tool-grid');
    if (!container) return;
    let html = '';
    db.tools.forEach(item => {
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

function loadPapers() {
    // 1. Load Primary Academic Papers
    const papersContainer = document.getElementById('paper-grid');
    if (papersContainer && db.papers) {
        renderReportGrid(db.papers, papersContainer);
    }

    // 2. Load Data Reports (The new category)
    const dataContainer = document.getElementById('data-reports-grid');
    if (dataContainer && db.dataReports) {
        renderReportGrid(db.dataReports, dataContainer);
    }
}

/**
 * Reusable helper to render report-style cards
 * @param {Array} dataArray - The array from db.js (e.g., db.papers or db.dataReports)
 * @param {HTMLElement} targetElement - The div where cards should be injected
 */
function renderReportGrid(dataArray, targetElement) {
    let html = '';
    dataArray.forEach(item => {
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
    targetElement.innerHTML = html;
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
    loadTools();
    loadPapers();
    loadVideos();
});