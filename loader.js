/* --- CONTENT LOADER ENGINE V3.1 --- */

function loadTools() {
    const container = document.getElementById('tool-grid');
    if (!container) return;
    let html = '';
    db.tools.forEach(item => {
        let isLarge = item.title.includes("S7") || item.title.includes("S9") || item.title.includes("S2");
        let cardClass = isLarge ? "system-card large-system-card" : "system-card";
        
        html += `
            <div class="${cardClass}">
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

function renderMixedGrid(dataArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const limitAttr = container.getAttribute('data-limit');
    let items = dataArray;
    if (limitAttr) {
        const limit = parseInt(limitAttr, 10);
        if (limit > 0) items = dataArray.slice(0, limit);
    }

    const isCompact = containerId === 'insight-grid';

    let html = '';
    items.forEach(item => {
        if (item.type === 'html' || item.thumb) {
            html += `
            <div class="system-card">
                <div class="card-img-container"><img src="${item.thumb}"></div>
                <div class="sys-content">
                    <div class="sys-id-tag">ID: ${item.id}</div>
                    <h3 class="sys-title">${item.title}</h3>
                    <div class="sys-date-tag">${item.date}</div>
                    <p class="sys-desc">${item.desc}</p>
                    <a href="${item.link}" class="btn">ACCESS</a>
                </div>
            </div>
            `;
        } else {
            let limitChars = item.text.length > 80 ? item.text.substring(0, 80) + "..." : item.text;
            html += `
            <div class="tweet-card compact-tweet-card" style="padding: 15px;">
                <div class="tweet-content">
                    <div class="tweet-title" style="margin-bottom: 5px; font-size: 1rem;">${limitChars}</div>
                    <div class="tweet-date" style="font-size: 0.75rem;">${item.date}</div>
                </div>
                <a href="${item.url}" target="_blank" class="btn btn-primary" style="margin-top:15px; width: 100%; padding: 8px;">READ REPORT</a>
            </div>
            `;
        }
    });
    container.innerHTML = html;
}

function loadReportsAndTweets() {
    if (db.insightReports) renderMixedGrid(db.insightReports, 'insight-grid');
    if (db.geointReports) renderMixedGrid(db.geointReports, 'geoint-grid');

    const latestReportsList = document.getElementById('latest-reports-list');
    if (latestReportsList && db.insightReports) {
        let html = '';
        const limitItems = db.insightReports.filter(i => i.type === 'tweet').slice(0, 4);
        limitItems.forEach(item => {
            html += `<li style="line-height: 1.2; margin-bottom: 15px;"><a href="${item.url}" target="_blank" style="color: var(--bg-color); text-decoration: underline;">${item.text}</a></li>`;
        });
        latestReportsList.innerHTML = html;
    }

    const listContainer = document.getElementById('tweets-list-container');
    if (listContainer) {
        // Tag all items with their source category
        let insight = (db.insightReports || []).map(i => ({...i, category: 'insight'}));
        let geoint = (db.geointReports || []).map(i => ({...i, category: 'geoint'}));
        let dataP = (db.dataPackages || []).map(i => ({...i, category: 'data'}));
        
        let allReports = [...insight, ...geoint, ...dataP];
        
        allReports.sort((a,b) => new Date(b.date) - new Date(a.date));
        
        function renderList(filter) {
            let filtered = filter === 'all' ? allReports : allReports.filter(i => i.category === filter || (i.tags && i.tags.includes(filter)));
            
            let html = '<ul class="tweet-list">';
            filtered.forEach(item => {
                let badgeColor = '';
                let badgeText = '';
                if(item.category === 'insight') { badgeColor = 'var(--ink-color)'; badgeText = 'INSIGHT'; }
                if(item.category === 'geoint') { badgeColor = 'var(--accent-red)'; badgeText = 'GEOINT'; }
                if(item.category === 'data') { badgeColor = 'var(--secondary-color)'; badgeText = 'DATA PACKAGE'; }

                let titleOrText = item.text || item.title;
                let finalLink = item.url || item.link;

                // Added text-align: left to force everything left regardless of category
                html += `
                    <li style="text-align: left;">
                        <a href="${finalLink}" target="_blank" class="tweet-list-item" style="text-align: left;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div class="tweet-list-date">${item.date}</div>
                                <div style="font-size: 0.65rem; font-weight: bold; background: ${badgeColor}; color: var(--bg-color); padding: 3px 8px; border-radius: 2px;">${badgeText}</div>
                            </div>
                            <div class="tweet-list-text">${titleOrText}</div>
                        </a>
                    </li>
                `;
            });
            html += '</ul>';
            listContainer.innerHTML = html;
        }

        // Initial render
        renderList('all');

        // Setup filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderList(e.target.getAttribute('data-filter'));
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTools();
    loadPapers();
    loadReportsAndTweets();
});