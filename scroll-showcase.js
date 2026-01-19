// Scroll-Triggered Mod Showcase
// Creates immersive mod showcase sections that appear as you scroll

class ScrollShowcase {
    constructor() {
        this.showcases = [];
        console.log('🎬 ScrollShowcase constructor called');
        this.init();
    }

    init() {
        console.log('🎬 ScrollShowcase init started');
        console.log('🎬 Looking for #games section...');
        
        const gamesSection = document.getElementById('games');
        console.log('🎬 #games section:', gamesSection);
        
        this.createShowcaseSections();
        this.setupScrollTriggers();
        
        console.log('🎬 Scroll Showcase initialized!');
        
        // Log how many showcases were created
        const createdShowcases = document.querySelectorAll('.scroll-showcase');
        console.log(`🎬 Total showcases in DOM: ${createdShowcases.length}`);
    }

    createShowcaseSections() {
        // Find where to insert showcases (after the "All Mods" section)
        const allModsSection = document.getElementById('games');
        if (!allModsSection) {
            console.error('❌ Could not find #games section');
            return;
        }

        console.log('✅ Found #games section, creating showcases...');

        // Create showcase sections for featured mods
        const showcaseData = [
            {
                title: "Most Popular Mod",
                subtitle: "Community Favorite",
                modName: "Ultra Graphics Overhaul",
                game: "Cyberpunk 2077",
                description: "Transform your game with stunning 8K textures, advanced ray tracing, and cinematic lighting. This comprehensive graphics mod pushes visual fidelity to the absolute limit.",
                features: [
                    "8K Ultra HD Textures",
                    "Advanced Ray Tracing",
                    "Cinematic Color Grading",
                    "Performance Optimized"
                ],
                stats: {
                    downloads: "250K+",
                    rating: "4.9",
                    size: "12.5 GB"
                },
                images: [
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop"
                ]
            },
            {
                title: "Editor's Choice",
                subtitle: "Staff Pick",
                modName: "Immersive Gameplay Rebalance",
                game: "Skyrim",
                description: "A complete overhaul of combat, magic, and progression systems. Experience Skyrim like never before with realistic difficulty and rewarding gameplay.",
                features: [
                    "Realistic Combat System",
                    "Magic Overhaul",
                    "Economy Rebalance",
                    "AI Improvements"
                ],
                stats: {
                    downloads: "180K+",
                    rating: "4.8",
                    size: "450 MB"
                },
                images: [
                    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop"
                ]
            },
            {
                title: "Rising Star",
                subtitle: "Trending Now",
                modName: "Next-Gen Vehicle Pack",
                game: "GTA V",
                description: "Add 50+ meticulously detailed vehicles to your game. From supercars to motorcycles, each vehicle features custom handling and realistic physics.",
                features: [
                    "50+ New Vehicles",
                    "Custom Handling",
                    "4K Textures",
                    "Lore-Friendly Design"
                ],
                stats: {
                    downloads: "95K+",
                    rating: "4.7",
                    size: "3.2 GB"
                },
                images: [
                    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=800&h=600&fit=crop"
                ]
            }
        ];

        showcaseData.forEach((data, index) => {
            const showcase = this.createShowcaseHTML(data, index);
            allModsSection.insertAdjacentHTML('afterend', showcase);
            console.log(`✅ Created showcase ${index + 1}: ${data.title}`);
        });

        console.log('✅ All showcases created!');
    }

    createShowcaseHTML(data, index) {
        return `
            <section class="scroll-showcase" id="showcase-${index}" data-showcase="${index}">
                <div class="showcase-container">
                    <!-- Badge -->
                    <div class="showcase-badge">
                        <span class="badge-icon">⭐</span>
                        <span class="badge-text">${data.subtitle}</span>
                    </div>

                    <!-- Title -->
                    <h2 class="showcase-title">${data.title}</h2>

                    <!-- Content Grid -->
                    <div class="showcase-grid">
                        <!-- Left: 3D Rotating Card -->
                        <div class="showcase-card-container">
                            <div class="showcase-3d-card" data-card="${index}">
                                <div class="card-face card-front">
                                    <img src="${data.images[0]}" alt="${data.modName}">
                                    <div class="card-overlay">
                                        <h3>${data.modName}</h3>
                                        <p>${data.game}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Details -->
                        <div class="showcase-details">
                            <h3 class="mod-name">${data.modName}</h3>
                            <p class="mod-game">for ${data.game}</p>
                            <p class="mod-description">${data.description}</p>

                            <!-- Features -->
                            <div class="mod-features">
                                <h4>Key Features</h4>
                                <ul>
                                    ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                                </ul>
                            </div>

                            <!-- Stats -->
                            <div class="mod-stats">
                                <div class="stat">
                                    <i class="fas fa-download"></i>
                                    <span>${data.stats.downloads}</span>
                                    <small>Downloads</small>
                                </div>
                                <div class="stat">
                                    <i class="fas fa-star"></i>
                                    <span>${data.stats.rating}</span>
                                    <small>Rating</small>
                                </div>
                                <div class="stat">
                                    <i class="fas fa-hdd"></i>
                                    <span>${data.stats.size}</span>
                                    <small>Size</small>
                                </div>
                            </div>

                            <!-- CTA -->
                            <button class="showcase-cta" onclick="alert('View mod details')">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                        </div>
                    </div>

                    <!-- Image Gallery -->
                    <div class="showcase-gallery">
                        ${data.images.map((img, i) => `
                            <div class="gallery-item" data-index="${i}">
                                <img src="${img}" alt="Screenshot ${i + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    setupScrollTriggers() {
        const showcases = document.querySelectorAll('.scroll-showcase');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateShowcase(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        showcases.forEach(showcase => {
            observer.observe(showcase);
        });

        // Setup 3D card rotation on scroll
        this.setup3DCardRotation();
    }

    animateShowcase(showcase) {
        const badge = showcase.querySelector('.showcase-badge');
        const title = showcase.querySelector('.showcase-title');
        const card = showcase.querySelector('.showcase-3d-card');
        const details = showcase.querySelector('.showcase-details');
        const gallery = showcase.querySelectorAll('.gallery-item');

        // Staggered animations
        setTimeout(() => badge?.classList.add('animate'), 100);
        setTimeout(() => title?.classList.add('animate'), 200);
        setTimeout(() => card?.classList.add('animate'), 300);
        setTimeout(() => details?.classList.add('animate'), 400);
        
        gallery.forEach((item, i) => {
            setTimeout(() => item.classList.add('animate'), 500 + i * 100);
        });
    }

    setup3DCardRotation() {
        const cards = document.querySelectorAll('.showcase-3d-card');
        
        cards.forEach(card => {
            let rotation = 0;
            
            // Auto-rotate on scroll
            window.addEventListener('smoothscroll', (e) => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    rotation += 0.5;
                    card.style.transform = `
                        perspective(1500px)
                        rotateY(${rotation}deg)
                        translateZ(20px)
                    `;
                }
            });

            // Interactive rotation on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * 15;
                const rotateY = ((x - centerX) / centerX) * 15;
                
                card.style.transform = `
                    perspective(1500px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(30px)
                    scale(1.05)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `
                    perspective(1500px)
                    rotateY(${rotation}deg)
                    translateZ(20px)
                `;
            });
        });
    }
}

// Add CSS for showcases
const style = document.createElement('style');
style.textContent = `
    .scroll-showcase {
        min-height: 100vh;
        padding: 8rem 2rem;
        position: relative;
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(180deg, transparent 0%, rgba(10, 14, 20, 0.5) 50%, transparent 100%);
        z-index: 10;
    }

    .scroll-showcase.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .showcase-container {
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
        z-index: 11;
    }

    .showcase-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, rgba(91, 140, 255, 0.2), rgba(124, 92, 255, 0.2));
        border: 1px solid rgba(91, 140, 255, 0.3);
        border-radius: 50px;
        margin-bottom: 2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .showcase-badge.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .badge-icon {
        font-size: 1.5rem;
    }

    .badge-text {
        font-weight: 600;
        color: #5B8CFF;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
    }

    .showcase-title {
        font-size: 4rem;
        font-weight: 800;
        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 4rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
    }

    .showcase-title.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .showcase-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        margin-bottom: 4rem;
        align-items: center;
    }

    .showcase-card-container {
        perspective: 1500px;
    }

    .showcase-3d-card {
        width: 100%;
        aspect-ratio: 4/3;
        transform-style: preserve-3d;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateX(-50px) rotateY(-20deg);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        cursor: pointer;
    }

    .showcase-3d-card.animate {
        opacity: 1;
        transform: translateX(0) rotateY(0deg);
    }

    .card-face {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    }

    .card-face img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    }

    .card-overlay h3 {
        font-size: 2rem;
        margin: 0 0 0.5rem 0;
        color: white;
    }

    .card-overlay p {
        margin: 0;
        color: #5B8CFF;
        font-weight: 600;
    }

    .showcase-details {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
    }

    .showcase-details.animate {
        opacity: 1;
        transform: translateX(0);
    }

    .mod-name {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: white;
    }

    .mod-game {
        color: #5B8CFF;
        font-size: 1.2rem;
        margin: 0 0 1.5rem 0;
        font-weight: 600;
    }

    .mod-description {
        font-size: 1.1rem;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2rem;
    }

    .mod-features h4 {
        font-size: 1.3rem;
        margin: 0 0 1rem 0;
        color: white;
    }

    .mod-features ul {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem 0;
    }

    .mod-features li {
        padding: 0.75rem 0;
        font-size: 1.05rem;
        color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .mod-features li i {
        color: #5B8CFF;
        font-size: 1.2rem;
    }

    .mod-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 2rem;
        background: rgba(91, 140, 255, 0.1);
        border: 1px solid rgba(91, 140, 255, 0.2);
        border-radius: 15px;
    }

    .stat {
        text-align: center;
    }

    .stat i {
        font-size: 2rem;
        color: #5B8CFF;
        margin-bottom: 0.5rem;
        display: block;
    }

    .stat span {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 0.25rem;
    }

    .stat small {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
    }

    .showcase-cta {
        width: 100%;
        padding: 1.5rem;
        font-size: 1.2rem;
        font-weight: 600;
        background: linear-gradient(135deg, #5B8CFF, #7C5CFF);
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
    }

    .showcase-cta:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(91, 140, 255, 0.4);
    }

    .showcase-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .gallery-item {
        aspect-ratio: 16/9;
        border-radius: 15px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }

    .gallery-item.animate {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .gallery-item:hover {
        transform: translateY(-10px) scale(1.05);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover img {
        transform: scale(1.1);
    }

    @media (max-width: 1024px) {
        .showcase-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        .showcase-title {
            font-size: 3rem;
        }

        .mod-stats {
            grid-template-columns: repeat(3, 1fr);
        }

        .showcase-gallery {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .scroll-showcase {
            padding: 4rem 1rem;
        }

        .showcase-title {
            font-size: 2.5rem;
        }

        .mod-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .showcase-gallery {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Add delay to ensure all mods are loaded
        setTimeout(() => {
            new ScrollShowcase();
        }, 2000);
    });
} else {
    // Add delay to ensure all mods are loaded
    setTimeout(() => {
        new ScrollShowcase();
    }, 2000);
}

console.log('🎬 Scroll Showcase Script Loaded!');
