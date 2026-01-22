// ENHANCED MOD DETAILS & PREVIEW SYSTEM
// Advanced mod viewing with 3D previews, screenshots, videos, and interactive features

class EnhancedModDetails {
    constructor() {
        this.currentMod = null;
        this.currentImageIndex = 0;
        this.isPreviewMode = false;
        this.screenshots = [];
        this.videos = [];
        this.reviews = [];
        this.relatedMods = [];
        this.installationSteps = [];
        
        this.init();
    }

    init() {
        this.createModDetailsModal();
        this.createQuickPreviewModal();
        this.setupEventListeners();
        console.log('🎮 Enhanced Mod Details System Loaded!');
    }

    createModDetailsModal() {
        const modal = document.createElement('div');
        modal.id = 'enhanced-mod-details';
        modal.className = 'enhanced-mod-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: none;
            overflow-y: auto;
        `;

        modal.innerHTML = `
            <div class="mod-details-container">
                <div class="mod-details-header">
                    <button class="close-details" onclick="enhancedModDetails.closeDetails()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="mod-navigation">
                        <button class="nav-btn" onclick="enhancedModDetails.previousMod()">
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <button cl