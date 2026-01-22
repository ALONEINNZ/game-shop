// REAL-TIME MOD REVIEWS & RATING SYSTEM
// Advanced review system with ratings, comments, helpful votes, and moderation

class ModReviewSystem {
    constructor() {
        this.reviews = {};
        this.userReviews = {};
        this.reviewStats = {};
        this.currentUser = null;
        this.moderationQueue = [];
        this.helpfulVotes = {};
        
        this.init();
    }

    init() {
        this.loadReviewData();
        this.loadUserData();
        this.createReviewUI();
        this.setupEventHandlers();
        this.startRealTimeUpdates();
        
        console.log('⭐ Mod Review System Initialized');
    }

    loadReviewData() {
        // Load existing reviews from localStorage or API
        const savedReviews = localStorage.getItem('exuscraft_reviews');
        if (savedReviews) {
            this.reviews = JSON.parse(savedReviews);
        }
        
        // Sample review data
        this.reviews = {
            'ultra-graphics-cyberpunk': [
                {
                    id: 'rev_001',
                    userId: 'user_123',
                    username: 'GraphicsEnthusiast',
                    avatar: this.generateAvatar('GraphicsEnthusiast'),
                    rating: 5,
                    title: 'Absolutely stunning visual upgrade!',
                    content: 'This mod completely transforms Cyberpunk 2077. The 8K textures are incredible and the ray tracing implementation is flawless. My RTX 4080 handles it perfectly at 1440p. Installation was straightforward with clear instructions. Highly recommended for anyone with a high-end GPU!',
                    timestamp: Date.now() - 86400000 * 2, // 2 days ago
                    helpful: 45,
                    notHelpful: 3,
                    verified: true,
                    playtime: '127 hours',
                    pros: ['Amazing visuals', 'Great performance optimization', 'Easy installation'],
                    cons: ['Requires high-end GPU', 'Large file size'],
                    images: [],
                    replies: [
                        {
                            id: 'reply_001',
                            userId: 'user_456',
                            username: 'ModAuthor',
                            content: 'Thank you for the detailed review! Glad you\'re enjoying the enhanced visuals.',
                            timestamp: Date.now() - 86400000,
                            isAuthor: true
                        }
                    ]
                },
                {
                    id: 'rev_002',
                    userId: 'user_789',
                    username: 'CyberGamer2077',
                    avatar: this.generateAvatar('CyberGamer2077'),
                    rating: 4,
                    title: 'Great mod but performance heavy',
                    content: 'The visual improvements are definitely noticeable, especially the lighting and reflections. However, it does impact performance significantly. I had to lower some settings to maintain 60fps on my RTX 3070. Still worth it for the visual upgrade.',
                    timestamp: Date.now() - 86400000 * 5,
                    helpful: 32,
                    notHelpful: 8,
                    verified: true,
                    playtime: '89 hours',
                    pros: ['Beautiful lighting', 'Improved reflections'],
                    cons: ['Performance impact', 'Some texture pop-in'],
                    images: [],
                    replies: []
                }
            ],
            'survival-overhaul-skyrim': [
                {
                    id: 'rev_003',
                    userId: 'user_321',
                    username: 'SkyrimVeteran',
                    avatar: this.generateAvatar('SkyrimVeteran'),
                    rating: 5,
                    title: 'The survival experience I\'ve been waiting for',
                    content: 'This mod adds so much depth to Skyrim. The hunger, thirst, and temperature mechanics feel natural and not overly punishing. The disease system is well-balanced and adds real consequences to exploration. Perfect for players who want a more immersive experience.',
                    timestamp: Date.now() - 86400000 * 7,
                    helpful: 67,
                    notHelpful: 2,
                    verified: true,
                    playtime: '234 hours',
                    pros: ['Well-balanced mechanics', 'Immersive experience', 'Great documentation'],
                    cons: ['Learning curve for new players'],
                    images: [],
                    replies: []
                }
            ]
        };
        
        this.calculateReviewStats();
    }

    loadUserData() {
        // Load current user data
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        } else {
            // Create guest user
            this.currentUser = {
                id: 'guest_' + Date.now(),
                username: 'Guest User',
                avatar: this.generateAvatar('Guest'),
                isGuest: true
            };
        }
        
        // Load user's helpful votes
        const helpfulVotes = localStorage.getItem('exuscraft_helpful_votes');
        if (helpfulVotes) {
            this.helpfulVotes = JSON.parse(helpfulVotes);
        }
    }

    generateAvatar(username) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        const color = colors[username.length % colors.length];
        const initial = username.charAt(0).toUpperCase();
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='${encodeURIComponent(color)}' width='40' height='40' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3E${initial}%3C/text%3E%3C/svg%3E`;
    }

    calculateReviewStats() {
        Object.keys(this.reviews).forEach(modId => {
            const modReviews = this.reviews[modId];
            const totalReviews = modReviews.length;
            
            if (totalReviews === 0) {
                this.reviewStats[modId] = {
                    averageRating: 0,
                    totalReviews: 0,
                    ratingDistribution: [0, 0, 0, 0, 0]
                };
                return;
            }
            
            const totalRating = modReviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / totalReviews;
            
            const ratingDistribution = [0, 0, 0, 0, 0];
            modReviews.forEach(review => {
                ratingDistribution[review.rating - 1]++;
            });
            
            this.reviewStats[modId] = {
                averageRating: Math.round(averageRating * 10) / 10,
                totalReviews: totalReviews,
                ratingDistribution: ratingDistribution
            };
        });
    }

    createReviewUI() {
        // Add review sections to existing mod cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-details-btn') || e.target.closest('.game-card')) {
                setTimeout(() => {
                    this.injectReviewSection();
                }, 500);
            }
        });
    }

    injectReviewSection() {
        // Find mod details modal or section
        const modModal = document.querySelector('.modal-content') || document.querySelector('.mod-details');
        if (!modModal) return;
        
        // Get mod ID from modal (you'd need to implement this based on your modal structure)
        const modId = this.extractModIdFromModal(modModal);
        if (!modId) return;
        
        // Check if review section already exists
        if (modModal.querySelector('.review-section')) return;
        
        const reviewSection = document.createElement('div');
        reviewSection.className = 'review-section';
        reviewSection.innerHTML = this.createReviewSectionHTML(modId);
        
        // Insert before the last element (usually buttons)
        const lastChild = modModal.lastElementChild;
        modModal.insertBefore(reviewSection, lastChild);
        
        this.setupReviewHandlers(modId);
    }

    extractModIdFromModal(modal) {
        // This would extract the mod ID from the modal
        // Implementation depends on your modal structure
        const titleElement = modal.querySelector('h2, h3, .mod-title');
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes('ultra graphics')) return 'ultra-graphics-cyberpunk';
            if (title.includes('survival overhaul')) return 'survival-overhaul-skyrim';
        }
        return 'ultra-graphics-cyberpunk'; // Default for demo
    }

    createReviewSectionHTML(modId) {
        const stats = this.reviewStats[modId] || { averageRating: 0, totalReviews: 0, ratingDistribution: [0, 0, 0, 0, 0] };
        const reviews = this.reviews[modId] || [];
        
        return `
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <!-- Review Summary -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: white; margin: 0 0 1rem 0; font-size: 1.3rem;">Reviews & Ratings</h3>
                    
                    <div style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: center;">
                        <!-- Overall Rating -->
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; font-weight: 700; color: #5B8CFF; margin-bottom: 0.5rem;">
                                ${stats.averageRating.toFixed(1)}
                            </div>
                            <div style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
                                ${this.generateStarRating(stats.averageRating, 1.2)}
                            </div>
                            <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
                                ${stats.totalReviews} review${stats.totalReviews !== 1 ? 's' : ''}
                            </div>
                        </div>
                        
                        <!-- Rating Distribution -->
                        <div>
                            ${stats.ratingDistribution.map((count, index) => {
                                const rating = 5 - index;
                                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                                return `
                                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                                        <span style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; min-width: 20px;">${rating}</span>
                                        <div style="flex: 1; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                                            <div style="
                                                height: 100%;
                                                width: ${percentage}%;
                                                background: linear-gradient(90deg, #5B8CFF, #C15CFF);
                                                transition: width 0.5s ease;
                                            "></div>
                                        </div>
                                        <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; min-width: 30px;">${count}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Write Review Button -->
                <div style="margin-bottom: 2rem;">
                    <button id="writeReviewBtn" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 600;
                        transition: transform 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <i class="fas fa-star" style="margin-right: 0.5rem;"></i>
                        Write a Review
                    </button>
                </div>
                
                <!-- Review Filters -->
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <select id="reviewSort" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        font-size: 0.9rem;
                    ">
                        <option value="helpful">Most Helpful</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                    </select>
                    
                    <select id="reviewFilter" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        font-size: 0.9rem;
                    ">
                        <option value="all">All Reviews</option>
                        <option value="5">5 Stars Only</option>
                        <option value="4">4 Stars Only</option>
                        <option value="3">3 Stars Only</option>
                        <option value="2">2 Stars Only</option>
                        <option value="1">1 Star Only</option>
                        <option value="verified">Verified Only</option>
                    </select>
                </div>
                
                <!-- Reviews List -->
                <div id="reviewsList">
                    ${this.generateReviewsHTML(reviews)}
                </div>
                
                <!-- Load More Reviews -->
                ${reviews.length > 3 ? `
                    <div style="text-align: center; margin-top: 2rem;">
                        <button id="loadMoreReviews" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">Load More Reviews</button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    generateStarRating(rating, size = 1) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += `<i class="fas fa-star" style="color: #FFD700; font-size: ${size}rem; margin-right: 0.1rem;"></i>`;
        }
        
        // Half star
        if (hasHalfStar) {
            stars += `<i class="fas fa-star-half-alt" style="color: #FFD700; font-size: ${size}rem; margin-right: 0.1rem;"></i>`;
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += `<i class="far fa-star" style="color: rgba(255, 255, 255, 0.3); font-size: ${size}rem; margin-right: 0.1rem;"></i>`;
        }
        
        return stars;
    }

    generateReviewsHTML(reviews) {
        if (reviews.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.6);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
                    <h4 style="margin: 0 0 0.5rem 0; color: rgba(255, 255, 255, 0.8);">No reviews yet</h4>
                    <p style="margin: 0;">Be the first to review this mod!</p>
                </div>
            `;
        }
        
        return reviews.slice(0, 3).map(review => this.generateReviewHTML(review)).join('');
    }

    generateReviewHTML(review) {
        const timeAgo = this.getTimeAgo(review.timestamp);
        const hasVoted = this.helpfulVotes[review.id];
        
        return `
            <div class="review-item" style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            ">
                <!-- Review Header -->
                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                    <img src="${review.avatar}" alt="${review.username}" style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        flex-shrink: 0;
                    ">
                    
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                            <h4 style="margin: 0; color: white; font-size: 1rem; font-weight: 600;">
                                ${review.username}
                            </h4>
                            ${review.verified ? `
                                <span style="
                                    background: linear-gradient(135deg, #22C55E, #16A34A);
                                    color: white;
                                    padding: 0.2rem 0.5rem;
                                    border-radius: 8px;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                ">✓ Verified</span>
                            ` : ''}
                            ${review.playtime ? `
                                <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                                    ${review.playtime} played
                                </span>
                            ` : ''}
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div>${this.generateStarRating(review.rating, 0.9)}</div>
                            <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${timeAgo}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Review Content -->
                <div style="margin-bottom: 1rem;">
                    <h5 style="margin: 0 0 0.75rem 0; color: white; font-size: 1.1rem; font-weight: 600;">
                        ${review.title}
                    </h5>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.8); line-height: 1.6; font-size: 0.95rem;">
                        ${review.content}
                    </p>
                </div>
                
                <!-- Pros and Cons -->
                ${review.pros && review.pros.length > 0 || review.cons && review.cons.length > 0 ? `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        ${review.pros && review.pros.length > 0 ? `
                            <div>
                                <h6 style="margin: 0 0 0.5rem 0; color: #22C55E; font-size: 0.9rem; font-weight: 600;">
                                    👍 Pros
                                </h6>
                                <ul style="margin: 0; padding-left: 1rem; color: rgba(255, 255, 255, 0.8); font-size: 0.85rem;">
                                    ${review.pros.map(pro => `<li>${pro}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${review.cons && review.cons.length > 0 ? `
                            <div>
                                <h6 style="margin: 0 0 0.5rem 0; color: #EF4444; font-size: 0.9rem; font-weight: 600;">
                                    👎 Cons
                                </h6>
                                <ul style="margin: 0; padding-left: 1rem; color: rgba(255, 255, 255, 0.8); font-size: 0.85rem;">
                                    ${review.cons.map(con => `<li>${con}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <!-- Review Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; gap: 1rem;">
                        <button class="helpful-btn" data-review-id="${review.id}" data-type="helpful" style="
                            background: ${hasVoted === 'helpful' ? 'rgba(34, 197, 94, 0.2)' : 'none'};
                            border: 1px solid ${hasVoted === 'helpful' ? '#22C55E' : 'rgba(255, 255, 255, 0.2)'};
                            color: ${hasVoted === 'helpful' ? '#22C55E' : 'rgba(255, 255, 255, 0.7)'};
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                            transition: all 0.3s ease;
                        ">
                            👍 Helpful (${review.helpful})
                        </button>
                        
                        <button class="helpful-btn" data-review-id="${review.id}" data-type="not-helpful" style="
                            background: ${hasVoted === 'not-helpful' ? 'rgba(239, 68, 68, 0.2)' : 'none'};
                            border: 1px solid ${hasVoted === 'not-helpful' ? '#EF4444' : 'rgba(255, 255, 255, 0.2)'};
                            color: ${hasVoted === 'not-helpful' ? '#EF4444' : 'rgba(255, 255, 255, 0.7)'};
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                            transition: all 0.3s ease;
                        ">
                            👎 Not Helpful (${review.notHelpful})
                        </button>
                    </div>
                    
                    <button class="reply-btn" data-review-id="${review.id}" style="
                        background: none;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: rgba(255, 255, 255, 0.7);
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">
                        💬 Reply
                    </button>
                </div>
                
                <!-- Replies -->
                ${review.replies && review.replies.length > 0 ? `
                    <div style="margin-top: 1rem; padding-left: 2rem; border-left: 2px solid rgba(91, 140, 255, 0.3);">
                        ${review.replies.map(reply => `
                            <div style="
                                background: rgba(91, 140, 255, 0.1);
                                border-radius: 8px;
                                padding: 1rem;
                                margin-bottom: 0.75rem;
                            ">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <strong style="color: white; font-size: 0.9rem;">${reply.username}</strong>
                                    ${reply.isAuthor ? `
                                        <span style="
                                            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                            color: white;
                                            padding: 0.1rem 0.4rem;
                                            border-radius: 6px;
                                            font-size: 0.7rem;
                                            font-weight: 600;
                                        ">Author</span>
                                    ` : ''}
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                                        ${this.getTimeAgo(reply.timestamp)}
                                    </span>
                                </div>
                                <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; line-height: 1.5;">
                                    ${reply.content}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    setupReviewHandlers(modId) {
        // Write review button
        const writeReviewBtn = document.getElementById('writeReviewBtn');
        if (writeReviewBtn) {
            writeReviewBtn.addEventListener('click', () => {
                this.showWriteReviewModal(modId);
            });
        }
        
        // Helpful/Not helpful buttons
        document.querySelectorAll('.helpful-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reviewId = e.target.dataset.reviewId;
                const type = e.target.dataset.type;
                this.voteOnReview(reviewId, type);
            });
        });
        
        // Reply buttons
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reviewId = e.target.dataset.reviewId;
                this.showReplyModal(reviewId);
            });
        });
        
        // Sort and filter handlers
        const sortSelect = document.getElementById('reviewSort');
        const filterSelect = document.getElementById('reviewFilter');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.updateReviewsList(modId);
            });
        }
        
        if (filterSelect) {
            filterSelect.addEventListener('change', () => {
                this.updateReviewsList(modId);
            });
        }
    }

    showWriteReviewModal(modId) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h3 style="margin: 0; color: white; font-size: 1.3rem;">Write a Review</h3>
                    <button id="closeReviewModal" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1.5rem;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <form id="reviewForm">
                    <!-- Rating -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Overall Rating *
                        </label>
                        <div id="starRating" style="display: flex; gap: 0.25rem; margin-bottom: 0.5rem;">
                            ${[1, 2, 3, 4, 5].map(rating => `
                                <button type="button" class="star-btn" data-rating="${rating}" style="
                                    background: none;
                                    border: none;
                                    font-size: 2rem;
                                    color: rgba(255, 255, 255, 0.3);
                                    cursor: pointer;
                                    transition: color 0.2s ease;
                                ">★</button>
                            `).join('')}
                        </div>
                        <input type="hidden" id="ratingValue" name="rating" required>
                    </div>
                    
                    <!-- Title -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Review Title *
                        </label>
                        <input type="text" id="reviewTitle" name="title" required style="
                            width: 100%;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem;
                            border-radius: 8px;
                            font-size: 1rem;
                        " placeholder="Summarize your experience...">
                    </div>
                    
                    <!-- Content -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Detailed Review *
                        </label>
                        <textarea id="reviewContent" name="content" required style="
                            width: 100%;
                            height: 120px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem;
                            border-radius: 8px;
                            font-size: 1rem;
                            resize: vertical;
                        " placeholder="Share your detailed experience with this mod..."></textarea>
                    </div>
                    
                    <!-- Pros -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            What did you like? (Optional)
                        </label>
                        <div id="prosContainer">
                            <input type="text" class="pros-input" style="
                                width: 100%;
                                background: rgba(255, 255, 255, 0.1);
                                border: 1px solid rgba(255, 255, 255, 0.2);
                                color: white;
                                padding: 0.5rem;
                                border-radius: 6px;
                                font-size: 0.9rem;
                                margin-bottom: 0.5rem;
                            " placeholder="Add a positive point...">
                        </div>
                        <button type="button" id="addPro" style="
                            background: none;
                            border: 1px solid rgba(34, 197, 94, 0.5);
                            color: #22C55E;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                        ">+ Add Pro</button>
                    </div>
                    
                    <!-- Cons -->
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            What could be improved? (Optional)
                        </label>
                        <div id="consContainer">
                            <input type="text" class="cons-input" style="
                                width: 100%;
                                background: rgba(255, 255, 255, 0.1);
                                border: 1px solid rgba(255, 255, 255, 0.2);
                                color: white;
                                padding: 0.5rem;
                                border-radius: 6px;
                                font-size: 0.9rem;
                                margin-bottom: 0.5rem;
                            " placeholder="Add a point for improvement...">
                        </div>
                        <button type="button" id="addCon" style="
                            background: none;
                            border: 1px solid rgba(239, 68, 68, 0.5);
                            color: #EF4444;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                        ">+ Add Con</button>
                    </div>
                    
                    <!-- Submit -->
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" onclick="this.closest('.review-modal').remove()" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">Cancel</button>
                        
                        <button type="submit" style="
                            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                            border: none;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                        ">Submit Review</button>
                    </div>
                </form>
            </div>
        `;
        
        modal.className = 'review-modal';
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        this.setupWriteReviewHandlers(modal, modId);
    }

    setupWriteReviewHandlers(modal, modId) {
        // Star rating
        const starBtns = modal.querySelectorAll('.star-btn');
        const ratingValue = modal.querySelector('#ratingValue');
        
        starBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const rating = parseInt(btn.dataset.rating);
                ratingValue.value = rating;
                
                starBtns.forEach((star, index) => {
                    star.style.color = index < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.3)';
                });
            });
            
            btn.addEventListener('mouseover', () => {
                const rating = parseInt(btn.dataset.rating);
                starBtns.forEach((star, index) => {
                    star.style.color = index < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.3)';
                });
            });
        });
        
        // Add pros/cons
        modal.querySelector('#addPro').addEventListener('click', () => {
            const container = modal.querySelector('#prosContainer');
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'pros-input';
            input.style.cssText = container.querySelector('.pros-input').style.cssText;
            input.placeholder = 'Add another positive point...';
            container.appendChild(input);
        });
        
        modal.querySelector('#addCon').addEventListener('click', () => {
            const container = modal.querySelector('#consContainer');
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'cons-input';
            input.style.cssText = container.querySelector('.cons-input').style.cssText;
            input.placeholder = 'Add another point for improvement...';
            container.appendChild(input);
        });
        
        // Form submission
        modal.querySelector('#reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview(modal, modId);
        });
        
        // Close modal
        modal.querySelector('#closeReviewModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    submitReview(modal, modId) {
        const formData = new FormData(modal.querySelector('#reviewForm'));
        const pros = Array.from(modal.querySelectorAll('.pros-input'))
            .map(input => input.value.trim())
            .filter(value => value.length > 0);
        const cons = Array.from(modal.querySelectorAll('.cons-input'))
            .map(input => input.value.trim())
            .filter(value => value.length > 0);
        
        const review = {
            id: 'rev_' + Date.now(),
            userId: this.currentUser.id,
            username: this.currentUser.username,
            avatar: this.currentUser.avatar,
            rating: parseInt(formData.get('rating')),
            title: formData.get('title'),
            content: formData.get('content'),
            timestamp: Date.now(),
            helpful: 0,
            notHelpful: 0,
            verified: !this.currentUser.isGuest,
            playtime: this.currentUser.isGuest ? null : '42 hours', // Mock playtime
            pros: pros,
            cons: cons,
            images: [],
            replies: []
        };
        
        // Add review to data
        if (!this.reviews[modId]) {
            this.reviews[modId] = [];
        }
        this.reviews[modId].unshift(review);
        
        // Save to localStorage
        localStorage.setItem('exuscraft_reviews', JSON.stringify(this.reviews));
        
        // Recalculate stats
        this.calculateReviewStats();
        
        // Update UI
        this.updateReviewsList(modId);
        
        // Close modal
        modal.remove();
        
        // Show success message
        this.showNotification('Review submitted successfully! Thank you for your feedback.', 'success');
    }

    voteOnReview(reviewId, type) {
        // Check if user already voted
        if (this.helpfulVotes[reviewId]) {
            this.showNotification('You have already voted on this review.', 'warning');
            return;
        }
        
        // Find and update review
        Object.keys(this.reviews).forEach(modId => {
            const review = this.reviews[modId].find(r => r.id === reviewId);
            if (review) {
                if (type === 'helpful') {
                    review.helpful++;
                } else {
                    review.notHelpful++;
                }
                
                // Record vote
                this.helpfulVotes[reviewId] = type;
                localStorage.setItem('exuscraft_helpful_votes', JSON.stringify(this.helpfulVotes));
                localStorage.setItem('exuscraft_reviews', JSON.stringify(this.reviews));
                
                // Update UI
                this.updateReviewsList(modId);
                
                this.showNotification('Thank you for your feedback!', 'success');
            }
        });
    }

    updateReviewsList(modId) {
        const reviewsList = document.getElementById('reviewsList');
        if (!reviewsList) return;
        
        const reviews = this.reviews[modId] || [];
        const sortedAndFiltered = this.sortAndFilterReviews(reviews);
        
        reviewsList.innerHTML = this.generateReviewsHTML(sortedAndFiltered);
        this.setupReviewHandlers(modId);
    }

    sortAndFilterReviews(reviews) {
        const sortSelect = document.getElementById('reviewSort');
        const filterSelect = document.getElementById('reviewFilter');
        
        let filtered = [...reviews];
        
        // Apply filters
        if (filterSelect) {
            const filterValue = filterSelect.value;
            if (filterValue !== 'all') {
                if (filterValue === 'verified') {
                    filtered = filtered.filter(review => review.verified);
                } else {
                    const rating = parseInt(filterValue);
                    filtered = filtered.filter(review => review.rating === rating);
                }
            }
        }
        
        // Apply sorting
        if (sortSelect) {
            const sortValue = sortSelect.value;
            switch (sortValue) {
                case 'helpful':
                    filtered.sort((a, b) => b.helpful - a.helpful);
                    break;
                case 'newest':
                    filtered.sort((a, b) => b.timestamp - a.timestamp);
                    break;
                case 'oldest':
                    filtered.sort((a, b) => a.timestamp - b.timestamp);
                    break;
                case 'highest':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'lowest':
                    filtered.sort((a, b) => a.rating - b.rating);
                    break;
            }
        }
        
        return filtered;
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
        
        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#5B8CFF'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    setupEventHandlers() {
        // Global event handlers for review system
        document.addEventListener('click', (e) => {
            // Handle review-related clicks
            if (e.target.closest('.review-btn')) {
                // Handle review button clicks
            }
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time updates (in a real app, this would be WebSocket or polling)
        setInterval(() => {
            // Check for new reviews, updates, etc.
            this.checkForUpdates();
        }, 30000); // Check every 30 seconds
    }

    checkForUpdates() {
        // In a real application, this would check for new reviews from the server
        // For now, we'll just log that we're checking
        console.log('🔄 Checking for review updates...');
    }

    // Public API methods
    getReviewStats(modId) {
        return this.reviewStats[modId] || { averageRating: 0, totalReviews: 0, ratingDistribution: [0, 0, 0, 0, 0] };
    }

    getReviews(modId) {
        return this.reviews[modId] || [];
    }

    addReview(modId, review) {
        if (!this.reviews[modId]) {
            this.reviews[modId] = [];
        }
        this.reviews[modId].unshift(review);
        this.calculateReviewStats();
        localStorage.setItem('exuscraft_reviews', JSON.stringify(this.reviews));
    }
}

// Initialize Review System
let modReviewSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modReviewSystem = new ModReviewSystem();
    });
} else {
    modReviewSystem = new ModReviewSystem();
}

window.modReviewSystem = modReviewSystem;