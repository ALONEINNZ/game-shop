// Mod Details Modal Functions

function openModDetails(modId) {
    console.log('Opening mod details for:', modId);
    
    const modData = {
        'ultra-graphics': {
            title: 'Ultra Graphics Overhaul',
            game: 'Cyberpunk 2077',
            price: '$12.99',
            images: [
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop'
            ],
            description: 'Transform your Cyberpunk 2077 experience with this comprehensive graphics overhaul. Featuring 8K textures, advanced ray tracing, and cinematic color grading.',
            features: ['8K Ultra HD Textures', 'Advanced Ray Tracing', 'Cinematic Color Grading', 'Performance Optimized', 'HDR Support', 'DLSS 3.0 Compatible'],
            requirements: ['Cyberpunk 2077 v2.0+', 'RTX 3070 or better', '16GB RAM', '15GB free space'],
            changelog: ['v2.1: Added DLSS 3.0 support', 'v2.0: Complete texture overhaul', 'v1.5: Performance improvements']
        },
        'gameplay-rebalance': {
            title: 'Immersive Gameplay Rebalance',
            game: 'Skyrim',
            price: '$8.99',
            images: [
                'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=800&fit=crop'
            ],
            description: 'A complete overhaul of Skyrim\'s combat, magic, and progression systems. Experience realistic difficulty and rewarding gameplay.',
            features: ['Realistic Combat System', 'Magic Overhaul', 'Economy Rebalance', 'AI Improvements', 'Perk Tree Redesign', 'Loot System Overhaul'],
            requirements: ['Skyrim Special Edition', 'SKSE64', '8GB RAM', '500MB free space'],
            changelog: ['v3.2: AI behavior improvements', 'v3.0: Complete magic system overhaul', 'v2.5: Combat rebalance']
        },
        'vehicle-pack': {
            title: 'Next-Gen Vehicle Pack',
            game: 'GTA V',
            price: '$15.99',
            images: [
                'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=1200&h=800&fit=crop'
            ],
            description: 'Add 50+ meticulously detailed vehicles to GTA V. Each vehicle features custom handling, 4K textures, and realistic physics.',
            features: ['50+ New Vehicles', 'Custom Handling', '4K Textures', 'Lore-Friendly Design', 'Multiplayer Compatible', 'Regular Updates'],
            requirements: ['GTA V Latest Version', 'ScriptHookV', '8GB RAM', '5GB free space'],
            changelog: ['v1.8: Added 10 new vehicles', 'v1.5: Performance optimization', 'v1.0: Initial release']
        }
    };

    const mod = modData[modId];
    if (!mod) {
        console.error('Mod not found:', modId);
        return;
    }

    const content = `
        <div style="padding: 2rem;">
            <h1 style="font-size: 3rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #5B8CFF, #C15CFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${mod.title}</h1>
            <p style="font-size: 1.5rem; color: #5B8CFF; margin-bottom: 2rem;">for ${mod.game}</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 3rem;">
                ${mod.images.map(img => `<img src="${img}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px;" />`).join('')}
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Description</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">${mod.description}</p>

                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Features</h2>
                    <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                        ${mod.features.map(f => `<li style="padding: 0.75rem 0; font-size: 1.05rem; display: flex; align-items: center; gap: 1rem;"><i class="fas fa-check" style="color: #5B8CFF;"></i> ${f}</li>`).join('')}
                    </ul>

                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Requirements</h2>
                    <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                        ${mod.requirements.map(r => `<li style="padding: 0.5rem 0; font-size: 1rem; color: rgba(255, 255, 255, 0.7);"><i class="fas fa-circle" style="font-size: 0.5rem; color: #5B8CFF; margin-right: 0.75rem;"></i> ${r}</li>`).join('')}
                    </ul>

                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Changelog</h2>
                    <ul style="list-style: none; padding: 0;">
                        ${mod.changelog.map(c => `<li style="padding: 0.5rem 0; font-size: 1rem; color: rgba(255, 255, 255, 0.7);"><i class="fas fa-code-branch" style="color: #5B8CFF; margin-right: 0.75rem;"></i> ${c}</li>`).join('')}
                    </ul>
                </div>

                <div>
                    <div style="background: rgba(91, 140, 255, 0.1); border: 1px solid rgba(91, 140, 255, 0.3); border-radius: 15px; padding: 2rem; position: sticky; top: 2rem;">
                        <div style="font-size: 3rem; font-weight: 700; color: white; margin-bottom: 1rem;">${mod.price}</div>
                        <button class="btn btn-primary" style="width: 100%; padding: 1.25rem; font-size: 1.1rem; margin-bottom: 1rem;" onclick="alert('Add to cart functionality')">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline" style="width: 100%; padding: 1.25rem; font-size: 1.1rem;" onclick="alert('Wishlist functionality')">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                        
                        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span style="color: rgba(255, 255, 255, 0.6);">Downloads</span>
                                <span style="font-weight: 600;">250K+</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span style="color: rgba(255, 255, 255, 0.6);">Rating</span>
                                <span style="font-weight: 600;">⭐ 4.9/5</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: rgba(255, 255, 255, 0.6);">Last Updated</span>
                                <span style="font-weight: 600;">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalContent = document.getElementById('modDetailsContent');
    const modal = document.getElementById('modDetailsModal');
    
    if (modalContent && modal) {
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal elements not found');
    }
}

function closeModDetails() {
    const modal = document.getElementById('modDetailsModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Modal closed');
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modDetailsModal');
    if (e.target === modal) {
        closeModDetails();
    }
});

console.log('✅ Mod Details script loaded!');
