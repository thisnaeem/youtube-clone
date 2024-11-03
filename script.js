// Theme Management
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    isDarkMode = savedTheme === 'dark';
    toggleTheme();
}

themeToggle.addEventListener('click', toggleTheme);

// Sidebar Management
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('sidebar-collapsed');
});

// Categories
const categories = [
    'All', 'Music', 'Gaming', 'News', 'Live', 'Sports', 
    'Education', 'Fashion', 'Technology', 'Cooking'
];

const categoriesBar = document.getElementById('categoriesBar');

categories.forEach(category => {
    const chip = document.createElement('div');
    chip.className = 'category-chip';
    chip.textContent = category;
    if (category === 'All') chip.classList.add('active');
    
    chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        loadVideos(category.toLowerCase());
    });
    
    categoriesBar.appendChild(chip);
});

// Search Functionality
const searchBox = document.querySelector('.search-box');
const searchSuggestions = document.getElementById('searchSuggestions');
let searchTimeout;

searchBox.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;
    
    if (query.length > 2) {
        searchTimeout = setTimeout(() => {
            // Simulate API call for search suggestions
            const suggestions = [
                `${query} - tutorial`,
                `${query} - best of`,
                `${query} - live`,
                `${query} - official`
            ];
            
            showSearchSuggestions(suggestions);
        }, 300);
    } else {
        searchSuggestions.style.display = 'none';
    }
});

function showSearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = suggestion;
        div.addEventListener('click', () => {
            searchBox.value = suggestion;
            searchSuggestions.style.display = 'none';
            loadVideos(suggestion);
        });
        searchSuggestions.appendChild(div);
    });
    searchSuggestions.style.display = 'block';
}

// Click outside to close search suggestions
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box-wrapper')) {
        searchSuggestions.style.display = 'none';
    }
});

// Video Data Management
let currentPage = 1;
const videosPerPage = 12;

function generateVideoData(category = 'all') {
    const titles = [
        'Complete Web Development Course 2024',
        'Music Mix - Best of 2024',
        'Gaming Highlights - Weekly Compilation',
        'Tech News Roundup',
        'Cooking Masterclass - Italian Cuisine',
        'Travel Vlog - Hidden Gems of Europe'
    ];
    
    const channels = [
        'Dev Academy',
        'Music World',
        'Gaming Central',
        'Tech Today',
        'Cooking Masters',
        'Travel Guide'
    ];
    
    return Array.from({ length: videosPerPage }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        title: titles[Math.floor(Math.random() * titles.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        views: `${Math.floor(Math.random() * 1000)}K`,
        timestamp: `${Math.floor(Math.random() * 30) + 1} days ago`,
        duration: `${Math.floor(Math.random() * 15) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        likes: Math.floor(Math.random() * 100000),
        subscribers: `${Math.floor(Math.random() * 1000)}K`
    }));
}

// ... (previous theme and sidebar management code remains the same)

// Video Data Management

function getRandomThumbnail() {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomId}/400/225`;
}

function generateVideoData(category = 'all') {
    const videoTypes = {
        all: {
            titles: [
                'Complete Web Development Course 2024',
                'Music Mix - Best of 2024',
                'Gaming Highlights - Weekly Compilation',
                'Tech News Roundup',
                'Cooking Masterclass - Italian Cuisine',
                'Travel Vlog - Hidden Gems of Europe'
            ],
            channels: [
                'Dev Academy',
                'Music World',
                'Gaming Central',
                'Tech Today',
                'Cooking Masters',
                'Travel Guide'
            ]
        },
        music: {
            titles: [
                'Top Hits 2024 - Music Mix',
                'Classical Piano Concert',
                'Electronic Dance Music Festival',
                'Jazz Club Live Session',
                'Rock Legends Concert',
                'Indie Artists Compilation'
            ],
            channels: [
                'Music World',
                'Classical Hub',
                'EDM Central',
                'Jazz & Blues',
                'Rock Station',
                'Indie Scene'
            ]
        },
        gaming: {
            titles: [
                'Minecraft Ultimate Build Challenge',
                'Call of Duty Best Plays',
                'League of Legends Pro Match',
                'Fortnite Victory Royale',
                'GTA V Funny Moments',
                'Among Us Big Brain Plays'
            ],
            channels: [
                'Gaming Central',
                'Pro Gamers Hub',
                'ESports Daily',
                'Gaming Highlights',
                'Game Masters',
                'PlayTime'
            ]
        },
        tech: {
            titles: [
                'Latest iPhone Review',
                'Building a Gaming PC',
                'Coding Tutorial - React JS',
                'AI Technology Explained',
                'New Tech Gadgets 2024',
                'Cybersecurity Basics'
            ],
            channels: [
                'Tech Review',
                'PC Builder',
                'Code Master',
                'AI Daily',
                'Gadget Guide',
                'Tech Insider'
            ]
        }
    };

    const selectedType = videoTypes[category] || videoTypes.all;
    
    return Array.from({ length: videosPerPage }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        title: selectedType.titles[Math.floor(Math.random() * selectedType.titles.length)],
        channel: selectedType.channels[Math.floor(Math.random() * selectedType.channels.length)],
        thumbnail: getRandomThumbnail(),
        views: `${Math.floor(Math.random() * 1000)}K`,
        timestamp: `${Math.floor(Math.random() * 30) + 1} days ago`,
        duration: `${Math.floor(Math.random() * 15) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        likes: Math.floor(Math.random() * 100000),
        subscribers: `${Math.floor(Math.random() * 1000)}K`,
        verified: Math.random() > 0.5
    }));
}

function createVideoCard(video) {
    return `
        <div class="video-card" data-video-id="${video.id}">
            <div class="thumbnail">
                <img src="${video.thumbnail}" alt="Video thumbnail" loading="lazy">
                <div class="video-duration">${video.duration}</div>
                <div class="video-progress" style="width: ${Math.random() > 0.7 ? Math.floor(Math.random() * 100) : 0}%"></div>
            </div>
            <div class="video-info">
                <div class="channel-avatar" style="background-image: url(${getRandomThumbnail()})"></div>
                <div class="video-details">
                    <div class="video-title">${video.title}</div>
                    <div class="channel-name">
                        ${video.channel} ${video.verified ? '<span class="verified-badge">✓</span>' : ''}
                    </div>
                    <div class="video-metadata">
                        ${video.views} views • ${video.timestamp}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add these styles to your CSS file
const additionalStyles = `
.video-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: red;
    transition: width 0.2s ease;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background-color: #aaa;
    border-radius: 50%;
    font-size: 10px;
    color: white;
    margin-left: 4px;
}

.channel-avatar {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.thumbnail img {
    transition: transform 0.3s ease;
}

.video-card:hover .thumbnail img {
    transform: scale(1.05);
}

.hover-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-size: cover;
    background-position: center;
}

.video-card:hover .hover-preview {
    opacity: 1;
}
`;

// Add hover preview functionality
function addHoverPreview() {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.thumbnail');
        const previewUrls = Array.from({ length: 4 }, () => getRandomThumbnail());
        let currentPreview = 0;
        let previewInterval;

        card.addEventListener('mouseenter', () => {
            const preview = document.createElement('div');
            preview.className = 'hover-preview';
            preview.style.backgroundImage = `url(${previewUrls[0]})`;
            thumbnail.appendChild(preview);

            previewInterval = setInterval(() => {
                currentPreview = (currentPreview + 1) % previewUrls.length;
                preview.style.backgroundImage = `url(${previewUrls[currentPreview]})`;
            }, 1000);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(previewInterval);
            const preview = thumbnail.querySelector('.hover-preview');
            if (preview) preview.remove();
        });
    });
}

// Modified loadVideos function
function loadVideos(category = 'all', append = false) {
    const videos = generateVideoData(category);
    const videoGrid = document.getElementById('videoGrid');
    
    if (!append) {
        videoGrid.innerHTML = '';
        currentPage = 1;
    }
    
    videos.forEach(video => {
        videoGrid.insertAdjacentHTML('beforeend', createVideoCard(video));
    });
    
    addHoverPreview();
    
    // Add click event listeners to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => openVideoPlayer(card.dataset.videoId));
    });
}

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ... (rest of the previous code remains the same)

function loadVideos(category = 'all', append = false) {
    const videos = generateVideoData(category);
    const videoGrid = document.getElementById('videoGrid');
    
    if (!append) {
        videoGrid.innerHTML = '';
        currentPage = 1;
    }
    
    videos.forEach(video => {
        videoGrid.insertAdjacentHTML('beforeend', createVideoCard(video));
    });
    
    // Add click event listeners to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => openVideoPlayer(card.dataset.videoId));
    });
}

// Load More Functionality
const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadVideos(document.querySelector('.category-chip.active').textContent.toLowerCase(), true);
});

// Video Player Modal
const modal = document.getElementById('videoPlayerModal');
const closeModal = document.querySelector('.close-modal');

function openVideoPlayer(videoId) {
    const video = generateVideoData().find(v => v.id === videoId);
    if (!video) return;
    
    const modalTitle = modal.querySelector('.modal-video-title');
    const channelName = modal.querySelector('.channel-name');
    const subscriberCount = modal.querySelector('.subscriber-count');
    const likeCount = modal.querySelector('.like-btn span');
    
    modalTitle.textContent = video.title;
    channelName.textContent = video.channel;
    subscriberCount.textContent = `${video.subscribers} subscribers`;
    likeCount.textContent = video.likes.toLocaleString();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Initial load
loadVideos();

// Subscribe button functionality
document.querySelectorAll('.subscribe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const isSubscribed = btn.classList.contains('subscribed');
        btn.classList.toggle('subscribed');
        btn.textContent = isSubscribed ? 'Subscribe' : 'Subscribed';
        btn.style.backgroundColor = isSubscribed ? 'var(--primary-color)' : '#606060';
    });
});

// Like/Dislike functionality
document.querySelectorAll('.like-btn, .dislike-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const count = btn.querySelector('span');
        const currentCount = parseInt(count.textContent.replace(/,/g, ''));
        const isActive = btn.classList.contains('active');
        
        btn.classList.toggle('active');
        count.textContent = isActive ? 
            (currentCount - 1).toLocaleString() : 
            (currentCount + 1).toLocaleString();
    });
});