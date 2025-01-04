
document.getElementById('shortenButton').addEventListener('click', async () => {
    const input = document.getElementById('urlInput').value;
    const urls = input.split('\n').map(url => url.trim()).filter(url => url);

    if (!urls.length) {
        alert('Please enter at least one URL!');
        return;
    }

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '<p>Shortening your links...</p>';

    const shortenedLinks = await Promise.all(urls.map(shortenUrl));

    resultContainer.innerHTML = '';
    shortenedLinks.forEach(shortened => {
        const div = document.createElement('div');
        div.className = 'result';
        div.innerHTML = `
            <p>${shortened.original_url} → <a href="${shortened.shortened_url}" target="_blank">${shortened.shortened_url}</a></p>
            <button class="copy-btn" onclick="navigator.clipboard.writeText('${shortened.shortened_url}')">Copy</button>
        `;
        resultContainer.appendChild(div);
    });
});

async function shortenUrl(url) {
    const response = await fetch('http://127.0.0.1:5000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    return await response.json();
}
