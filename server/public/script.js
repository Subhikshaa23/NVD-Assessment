
const resultsPerPage = (page, limit) => {
    window.location.href = `/cves/list?page=${page}&limit=${limit}`;
}

const cveInfo = (cveId) => {
    window.location = `/cves/${cveId}`;
} 

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    console.log("hi" + searchInput);
    
    const type = document.getElementById('typeSelect').value;
    console.log("ji" + type);

    let dataUrl;
    switch (type) {
        case 'id':
            window.location.replace(`http://localhost:3000/api/cves/${searchInput}`); 
            // dataUrl = `http://localhost:3000/api/cves/${searchInput}`;
            break;
        case 'year':
            window.location.replace(`http://localhost:3000/api/cves/year/${searchInput}`);
            // dataUrl = `/api/cves/year/${searchInput}`;
            break;
        case 'score':
            window.location.replace(`http://localhost:3000/api/cves/score/${searchInput}`);
            // dataUrl = `/api/cves/score/${searchInput}`;
            break;
        case 'lastModified':
            window.location.replace(`http://localhost:3000/api/cves/last-modified/${searchInput}`);
            // dataUrl = `/api/cves/last-modified/${searchInput}`;
            break;
        default:
            window.location.replace(`http://localhost:3000/cves/list`);
            break;
        
    }
});

function clickDisplay(){
    console.log("Hello");
}


