/* --- CONTENT LOADER ENGINE V3.1 --- */

function loadTools() {
    const container = document.getElementById('tool-grid');
    if (!container) return;
    let html = '';
    db.tools.forEach(item => {
        html += `
            <div class="system-card">
                <div style="width:100%; height:160px; overflow:hidden; border-bottom:2px solid var(--ink-color);">
                    <img src="${item.thumb}" style="width:100%; height:100%; object-fit:cover;">
                </div>
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
    const papersContainer = document.getElementById('paper-grid');
    if (papersContainer && db.papers) {
        renderReportGrid(db.papers, papersContainer);
    }
    const dataContainer = document.getElementById('data-reports-grid');
    if (dataContainer && db.dataReports) {
        renderReportGrid(db.dataReports, dataContainer);
    }
}

function renderReportGrid(dataArray, targetElement) {
    let html = '';
    dataArray.forEach(item => {
        html += `
            <div class="report-card">
                <div class="sys-content">
                    <div style="font-size:0.7rem; opacity:0.6; margin-bottom:5px;">ID: ${item.id}</div>
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" target="_blank" class="btn">[ ACCESS ]</a>
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
                <div style="position:relative; width:100%; padding-bottom:56.25%; background:#000; border-bottom:1px solid var(--ink-color);">
                    <iframe src="https://www.youtube.com/embed/${item.youtubeID}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
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