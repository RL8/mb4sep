// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Handle special cases
    if (pageId === 'discography-page') {
        // Reset to co-writers tab when entering discography
        switchTab('co-writers');
    }
}

// Tab Switching
function switchTab(tabName) {
    // Update main tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Handle sub-navigation
    const subNav = document.getElementById('sub-nav');
    if (tabName === 'lyrics' || tabName === 'audio') {
        subNav.style.display = 'flex';
        updateAlbumGrid(tabName, 'word-count'); // Default to first sub-tab
    } else {
        subNav.style.display = 'none';
        updateAlbumGrid(tabName);
    }
}

// Sub-tab switching
function switchSubTab(subTabName) {
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeSubTab = document.querySelector(`[data-sub="${subTabName}"]`);
    if (activeSubTab) {
        activeSubTab.classList.add('active');
    }
    
    // Get current main tab
    const activeMainTab = document.querySelector('.tab.active');
    if (activeMainTab) {
        const mainTabName = activeMainTab.getAttribute('data-tab');
        updateAlbumGrid(mainTabName, subTabName);
    }
}

// Update album grid based on selected tab
function updateAlbumGrid(tabName, subTabName = null) {
    const albumTiles = document.querySelectorAll('.album-tile');
    
    albumTiles.forEach(tile => {
        const albumName = tile.querySelector('h4').textContent;
        
        if (tabName === 'co-writers') {
            // Show co-writer count
            const coWriterCount = getCoWriterCount(albumName);
            tile.querySelector('.songs').textContent = `${coWriterCount} co-writers`;
        } else if (tabName === 'lyrics') {
            // Show lyrical characteristic
            const lyricValue = getLyricValue(albumName, subTabName);
            tile.querySelector('.songs').textContent = lyricValue;
        } else if (tabName === 'audio') {
            // Show audio feature
            const audioValue = getAudioValue(albumName, subTabName);
            tile.querySelector('.songs').textContent = audioValue;
        }
    });
}

// Mock data functions
function getCoWriterCount(albumName) {
    const coWriterData = {
        'Taylor Swift': 3,
        'Fearless': 5,
        'Speak Now': 2,
        'Red': 8,
        '1989': 6,
        'Reputation': 4,
        'Lover': 7,
        'Folklore': 9,
        'Evermore': 8,
        'Midnights': 5,
        'The Tortured Poets Department': 4,
        "Taylor's Version": 6
    };
    return coWriterData[albumName] || 0;
}

function getLyricValue(albumName, characteristic) {
    const lyricData = {
        'word-count': {
            'Taylor Swift': '2,847 words',
            'Fearless': '3,124 words',
            'Speak Now': '3,567 words',
            'Red': '4,892 words',
            '1989': '3,234 words',
            'Reputation': '3,789 words',
            'Lover': '4,567 words',
            'Folklore': '5,234 words',
            'Evermore': '4,890 words',
            'Midnights': '3,456 words',
            'The Tortured Poets Department': '4,123 words',
            "Taylor's Version": '3,789 words'
        },
        'complexity': {
            'Taylor Swift': 'Medium',
            'Fearless': 'Medium',
            'Speak Now': 'High',
            'Red': 'Very High',
            '1989': 'Medium',
            'Reputation': 'High',
            'Lover': 'Medium',
            'Folklore': 'Very High',
            'Evermore': 'Very High',
            'Midnights': 'High',
            'The Tortured Poets Department': 'Very High',
            "Taylor's Version": 'High'
        },
        'themes': {
            'Taylor Swift': 'Love, Youth',
            'Fearless': 'Love, Courage',
            'Speak Now': 'Love, Heartbreak',
            'Red': 'Love, Loss, Growth',
            '1989': 'Love, Freedom',
            'Reputation': 'Love, Revenge',
            'Lover': 'Love, Happiness',
            'Folklore': 'Storytelling, Nature',
            'Evermore': 'Storytelling, Winter',
            'Midnights': 'Love, Reflection',
            'The Tortured Poets Department': 'Love, Poetry',
            "Taylor's Version": 'Love, Nostalgia'
        }
    };
    return lyricData[characteristic]?.[albumName] || 'N/A';
}

function getAudioValue(albumName, feature) {
    const audioData = {
        'word-count': { // Using word-count as danceability for demo
            'Taylor Swift': 'Danceability: 65%',
            'Fearless': 'Danceability: 72%',
            'Speak Now': 'Danceability: 58%',
            'Red': 'Danceability: 68%',
            '1989': 'Danceability: 85%',
            'Reputation': 'Danceability: 78%',
            'Lover': 'Danceability: 75%',
            'Folklore': 'Danceability: 45%',
            'Evermore': 'Danceability: 42%',
            'Midnights': 'Danceability: 70%',
            'The Tortured Poets Department': 'Danceability: 55%',
            "Taylor's Version": 'Danceability: 68%'
        },
        'complexity': { // Using complexity as energy for demo
            'Taylor Swift': 'Energy: 70%',
            'Fearless': 'Energy: 75%',
            'Speak Now': 'Energy: 68%',
            'Red': 'Energy: 72%',
            '1989': 'Energy: 88%',
            'Reputation': 'Energy: 82%',
            'Lover': 'Energy: 78%',
            'Folklore': 'Energy: 45%',
            'Evermore': 'Energy: 42%',
            'Midnights': 'Energy: 75%',
            'The Tortured Poets Department': 'Energy: 60%',
            "Taylor's Version": 'Energy: 72%'
        },
        'themes': { // Using themes as acousticness for demo
            'Taylor Swift': 'Acousticness: 40%',
            'Fearless': 'Acousticness: 35%',
            'Speak Now': 'Acousticness: 45%',
            'Red': 'Acousticness: 30%',
            '1989': 'Acousticness: 15%',
            'Reputation': 'Acousticness: 25%',
            'Lover': 'Acousticness: 30%',
            'Folklore': 'Acousticness: 85%',
            'Evermore': 'Acousticness: 88%',
            'Midnights': 'Acousticness: 35%',
            'The Tortured Poets Department': 'Acousticness: 70%',
            "Taylor's Version": 'Acousticness: 40%'
        }
    };
    return audioData[feature]?.[albumName] || 'N/A';
}

// Album tile click handler
function handleAlbumClick(albumName, tabName, subTabName = null) {
    const modal = document.getElementById('song-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = `${albumName} - Songs`;
    
    // Generate song list based on tab
    let songList = '';
    if (tabName === 'co-writers') {
        songList = generateCoWriterSongList(albumName);
    } else if (tabName === 'lyrics') {
        songList = generateLyricSongList(albumName, subTabName);
    } else if (tabName === 'audio') {
        songList = generateAudioSongList(albumName, subTabName);
    }
    
    modalBody.innerHTML = songList;
    modal.style.display = 'block';
}

// Generate song lists for different tabs
function generateCoWriterSongList(albumName) {
    const songData = {
        'Taylor Swift': [
            { title: 'Tim McGraw', coWriters: 'Taylor Swift, Liz Rose' },
            { title: 'Picture to Burn', coWriters: 'Taylor Swift, Liz Rose' },
            { title: 'Teardrops on My Guitar', coWriters: 'Taylor Swift, Liz Rose' }
        ],
        'Fearless': [
            { title: 'Love Story', coWriters: 'Taylor Swift' },
            { title: 'You Belong with Me', coWriters: 'Taylor Swift, Liz Rose' },
            { title: 'Fifteen', coWriters: 'Taylor Swift' }
        ],
        'Speak Now': [
            { title: 'Mine', coWriters: 'Taylor Swift' },
            { title: 'Sparks Fly', coWriters: 'Taylor Swift' },
            { title: 'Back to December', coWriters: 'Taylor Swift' }
        ]
    };
    
    const songs = songData[albumName] || [
        { title: 'Sample Song 1', coWriters: 'Taylor Swift, Co-writer 1' },
        { title: 'Sample Song 2', coWriters: 'Taylor Swift, Co-writer 2' },
        { title: 'Sample Song 3', coWriters: 'Taylor Swift, Co-writer 3' }
    ];
    
    return songs.map(song => `
        <div class="song-item">
            <h4>${song.title}</h4>
            <p><strong>Co-writers:</strong> ${song.coWriters}</p>
        </div>
    `).join('');
}

function generateLyricSongList(albumName, characteristic) {
    const songData = {
        'word-count': {
            'Taylor Swift': [
                { title: 'Tim McGraw', value: '245 words' },
                { title: 'Picture to Burn', value: '198 words' },
                { title: 'Teardrops on My Guitar', value: '267 words' }
            ]
        },
        'complexity': {
            'Taylor Swift': [
                { title: 'Tim McGraw', value: 'Medium' },
                { title: 'Picture to Burn', value: 'Low' },
                { title: 'Teardrops on My Guitar', value: 'Medium' }
            ]
        }
    };
    
    const songs = songData[characteristic]?.[albumName] || [
        { title: 'Sample Song 1', value: 'Sample Value' },
        { title: 'Sample Song 2', value: 'Sample Value' },
        { title: 'Sample Song 3', value: 'Sample Value' }
    ];
    
    return songs.map(song => `
        <div class="song-item">
            <h4>${song.title}</h4>
            <p><strong>${characteristic}:</strong> ${song.value}</p>
        </div>
    `).join('');
}

function generateAudioSongList(albumName, feature) {
    const songData = {
        'word-count': { // Using word-count as danceability for demo
            'Taylor Swift': [
                { title: 'Tim McGraw', value: 'Danceability: 60%' },
                { title: 'Picture to Burn', value: 'Danceability: 70%' },
                { title: 'Teardrops on My Guitar', value: 'Danceability: 65%' }
            ]
        }
    };
    
    const songs = songData[feature]?.[albumName] || [
        { title: 'Sample Song 1', value: 'Sample Feature: 75%' },
        { title: 'Sample Song 2', value: 'Sample Feature: 68%' },
        { title: 'Sample Song 3', value: 'Sample Feature: 82%' }
    ];
    
    return songs.map(song => `
        <div class="song-item">
            <h4>${song.title}</h4>
            <p><strong>${feature}:</strong> ${song.value}</p>
        </div>
    `).join('');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('song-modal');
    modal.style.display = 'none';
}

// Submit artist form
function submitArtist(event) {
    event.preventDefault();
    
    const artistName = document.getElementById('artist-name').value;
    const artistComment = document.getElementById('artist-comment').value;
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
    
    // Reset form
    document.getElementById('artist-name').value = '';
    document.getElementById('artist-comment').value = '';
    
    // Redirect back to homepage
    setTimeout(() => {
        showPage('homepage');
    }, 1500);
}

// Toggle FAB menu
function toggleMenu() {
    // This function is handled by CSS hover for simplicity
    // In a real app, you might want to add click functionality
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to album tiles
    const albumTiles = document.querySelectorAll('.album-tile');
    albumTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const albumName = this.querySelector('h4').textContent;
            const activeTab = document.querySelector('.tab.active');
            const activeSubTab = document.querySelector('.sub-tab.active');
            
            if (activeTab) {
                const tabName = activeTab.getAttribute('data-tab');
                const subTabName = activeSubTab ? activeSubTab.getAttribute('data-sub') : null;
                handleAlbumClick(albumName, tabName, subTabName);
            }
        });
    });
    
    // Add click handlers to sub-tabs
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const subTabName = this.getAttribute('data-sub');
            switchSubTab(subTabName);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('song-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Initialize the app
    showPage('homepage');
});

// Add some CSS for song items in modal
const style = document.createElement('style');
style.textContent = `
    .song-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
    }
    
    .song-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .song-item h4 {
        color: #333;
        margin-bottom: 8px;
    }
    
    .song-item p {
        color: #666;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
