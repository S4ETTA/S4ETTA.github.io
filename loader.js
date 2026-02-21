/* --- CONTENT LOADER ENGINE V3.1 --- */

function loadTools() {
    const container = document.getElementById('tool-grid');
    if (!container) return;
    let html = '';
    db.tools.forEach(item => {
        html += `
            <div class="system-card">
                <div class="card-img-container">
                    <img src="${item.thumb}">
                </div>
                <div class="sys-content">
                    <h3 class="sys-title">${item.title}</h3>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" class="btn">ACCESS</a>
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
        const isLinkInvalid = !item.link || item.link === '#' || item.link === '';
        const btnClass = isLinkInvalid ? 'btn disabled' : 'btn';
        const hrefAttr = isLinkInvalid ? '' : `href="${item.link}"`;

        html += `
            <div class="report-card">
                <div class="sys-content">
                    <div class="sys-id-tag">ID: ${item.id}</div>
                    <h3 class="sys-title">${item.title}</h3>
                    ${item.date ? `<div class="sys-date-tag">${item.date}</div>` : ''}
                    <p class="sys-desc">${item.desc}</p>
                    <a ${hrefAttr} target="_blank" class="${btnClass}">ACCESS</a>
                </div>
            </div>
        `;
    });
    targetElement.innerHTML = html;
}

function loadReports() {
    const container = document.getElementById('report-grid');
    if (!container) return;
    let html = '';
    // Use dataReports or fallback to empty
    const reports = db.dataReports || [];
    reports.forEach(item => {
        let finalLink = item.link;
        if (item.type === 'local') {
            finalLink = `viewer.html?id=${encodeURIComponent(item.title)}`;
            // We'll map title to file in viewer or pass file path?
            // Simpler: Pass the file path in ID or look it up in DB. 
            // `viewer.html` needs to know the PDF path.
            // Let's pass the ID we set in DB? 
            // In DB I didn't set a unique machine ID, I used "id" for category (Terrorism).
            // I should probably use the array index or a new unique slug.
            // For now, I'll pass the array index or title.
            // Let's update viewer.html to assume it gets a `file` param or look up by title? 
            // The plan said "Look up metadata in db.js".
            // So I'll pass `id` parameter as the title or a slug.
            // Let's generate a slug from title.
        }

        // Image handling
        let imageBlock = '';
        if (item.thumb) {
            imageBlock = `<div class="card-img-container">
                            <img src="${item.thumb}">
                          </div>`;
        } else {
            imageBlock = `<div class="card-img-fallback">
                             <h1>REF</h1>
                        </div>`;
        }

        let isLinkInvalid = !item.link || item.link === '#' || item.link === '';
        // If type is local, we constructed finalLink, but if item.link was originally empty/missing, we might consider it disabled unless we have a specific file logic
        // But for local reports, we usually have a file.
        // Let's rely on finalLink being valid.
        if (item.type === 'local' && item.link) isLinkInvalid = false; // Override if local logic used

        const btnClass = isLinkInvalid ? 'btn disabled' : 'btn';
        const hrefAttr = isLinkInvalid ? '' : `href="${finalLink}"`;

        html += `
            <div class="system-card">
                ${imageBlock}
                <div class="sys-content">
                    <div class="sys-id-tag">ID: ${item.id}</div>
                    <h3 class="sys-title">${item.title}</h3>
                    ${item.date ? `<div class="sys-date-tag">${item.date}</div>` : ''}
                    <p class="sys-desc">${item.desc}</p>
                    <a ${hrefAttr} class="${btnClass}" ${item.type === 'external' ? 'target="_blank"' : ''}>ACCESS</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadTools();
    loadPapers();
    loadReports();
});