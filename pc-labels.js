// PC TOWER COMPONENT LABELS
// Interactive labels that appear during the exploded view

class PCLabels {
    constructor() {
        this.labels = [];
        this.container = null;
        this.isVisible = false;
        
        this.init();
    }

    init() {
        this.createLabelContainer();
        this.createLabels();
        this.setupScrollTrigger();
        
        console.log('🏷️ PC Component Labels Loaded!');
    }

    createLabelContainer() {
        this.container = document.createElement('div');
        this.container.id = 'pc-labels-container';
        this.container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.container);
        }
    }

    createLabels() {
        const labelData = [
            {
                id: 'cpu',
                title: 'CPU / Motherboard',
                description: 'The brain of your gaming rig',
                position: { x: '60%', y: '45%' },
                color: '#4a90e2',
                delay: 0
            },
            {
                id: 'gpu',
                title: 'Graphics Card',
                description: 'Powers stunning visuals and mods',
                position: { x: '65%', y: '55%' },
                color: '#5B8CFF',
                delay: 0.2
            },
            {
                id: 'ram',
                title: 'Memory (RAM)',
                description: 'Fast access to your favorite mods',
                position: { x: '55%', y: '35%' },
                color: '#2d5a2d',
                delay: 0.4
            },
            {
                id: 'storage',
                title: 'Storage (SSD/HDD)',
                description: 'Home for your mod collection',
                position: { x: '70%', y: '65%' },
                color: '#1a1a2d',
                delay: 0.6
            },
            {
                id: 'cooling',
                title: 'Cooling System',
                description: 'Keeps performance at peak',
                position: { x: '50%', y: '25%' },
                color: '#001a4d',
                delay: 0.8
            },
            {
                id: 'psu',
                title: 'Power Supply',
                description: 'Reliable power for intense gaming',
                position: { x: '60%', y: '75%' },
                color: '#4d4d00',
                delay: 1.0
            },
            {
                id: 'mods',
                title: 'ExusCraft Mods',
                description: 'Transform your gaming experience',
                position: { x: '45%', y: '50%' },
                color: '#C15CFF',
                delay: 1.2
            }
        ];

        labelData.forEach(data => {
            const label = this.createLabel(data);
            this.labels.push(label);
            this.container.appendChild(label.element);
        });
    }

    createLabel(data) {
        const labelElement = document.createElement('div');
        labelElement.className = 'pc-label';
        labelElement.id = `label-${data.id}`;
        labelElement.style.cssText = `
            position: absolute;
            left: ${data.position.x};
            top: ${data.position.y};
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            border: 2px solid ${data.color};
            border-radius: 12px;
            padding: 1rem 1.5rem;
            color: white;
            font-family: 'Inter', sans-serif;
            min-width: 200px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        `;

        labelElement.innerHTML = `
            <div class="label-header" style="
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.5rem;
            ">
                <div class="label-icon" style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: ${data.color};
                    box-shadow: 0 0 10px ${data.color};
                    animation: pulse 2s ease-in-out infinite;
                "></div>
                <h4 style="
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: ${data.color};
                ">${data.title}</h4>
            </div>
            <p style="
                margin: 0;
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.4;
            ">${data.description}</p>
            <div class="label-line" style="
                position: absolute;
                top: 50%;
                left: -20px;
                width: 20px;
                height: 2px;
                background: ${data.color};
                transform: translateY(-50%);
                opacity: 0.6;
            "></div>
        `;

        // Add pulse animation
        if (!document.getElementById('label-animations')) {
            const style = document.createElement('style');
            style.id = 'label-animations';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { 
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.6;
                        transform: scale(1.2);
                    }
                }
                
                .pc-label.visible {
                    opacity: 1 !important;
                    transform: translate(-50%, -50%) scale(1) !important;
                }
                
                .pc-label:hover {
                    transform: translate(-50%, -50%) scale(1.05) !important;
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7) !important;
                }
            `;
            document.head.appendChild(style);
        }

        return {
            element: labelElement,
            data: data,
            show: () => {
                setTimeout(() => {
                    labelElement.classList.add('visible');
                }, data.delay * 1000);
            },
            hide: () => {
                labelElement.classList.remove('visible');
            }
        };
    }

    setupScrollTrigger() {
        if (!window.gsap || !window.ScrollTrigger) {
            console.warn('GSAP ScrollTrigger not available for labels');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                this.updateLabels(progress);
            }
        });
    }

    updateLabels(progress) {
        // Show labels during explosion phase (0.4-0.8)
        if (progress >= 0.4 && progress <= 0.9) {
            if (!this.isVisible) {
                this.showLabels();
                this.isVisible = true;
            }
            
            // Animate individual labels based on progress
            const labelProgress = (progress - 0.4) / 0.5;
            this.container.style.opacity = Math.min(labelProgress * 2, 1);
            
        } else {
            if (this.isVisible) {
                this.hideLabels();
                this.isVisible = false;
            }
            this.container.style.opacity = '0';
        }
    }

    showLabels() {
        this.labels.forEach(label => {
            label.show();
        });
    }

    hideLabels() {
        this.labels.forEach(label => {
            label.hide();
        });
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

// Initialize labels after PC Tower
let pcLabels;
function initPCLabels() {
    if (window.gsap && window.ScrollTrigger) {
        pcLabels = new PCLabels();
    } else {
        setTimeout(initPCLabels, 1500);
    }
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initPCLabels, 2000);
    });
} else {
    setTimeout(initPCLabels, 2000);
}

window.pcLabels = pcLabels;