// BLOCKCHAIN INTEGRATION SYSTEM - NFT mods, crypto payments, and decentralized features
console.log('⛓️ Loading Blockchain Integration System...');

class BlockchainIntegrationSystem {
    constructor() {
        this.wallet = null;
        this.nftMods = new Map();
        this.cryptoPayments = new Map();
        this.smartContracts = new Map();
        this.decentralizedStorage = new Map();
        this.init();
    }

    init() {
        this.createBlockchainInterface();
        this.setupWalletConnection();
        this.loadNFTMods();
        this.initializeCryptoPayments();
        this.setupSmartContracts();
        console.log('✅ Blockchain Integration System initialized');
    }

    createBlockchainInterface() {
        // Add blockchain section to main page
        this.addBlockchainSection();
        
        // Create wallet connection interface
        this.createWalletInterface();
        
        // Create NFT marketplace
        this.createNFTMarketplace();
        
        // Add blockchain navigation
        this.addBlockchainNav();
    }

    addBlockchainSection() {
        const streamingSection = document.getElementById('streaming');
        if (streamingSection) {
            const blockchainSection = document.createElement('section');
            blockchainSection.className = 'section blockchain-section';
            blockchainSection.id = 'blockchain';
            blockchainSection.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">
                            <i class="fas fa-link"></i> Blockchain & NFT Mods
                        </h2>
                        <p class="section-subtitle">Own, trade, and create unique NFT mods with blockchain technology</p>
                    </div>
                    
                    <div class="blockchain-features">
                        <div class="blockchain-feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-gem"></i>
                            </div>
                            <h3>NFT Mods</h3>
                            <p>Unique, collectible mods that you truly own</p>
                            <button onclick="exploreNFTMods()" class="btn btn-primary">
                                Explore NFTs
                            </button>
                        </div>
                        
                        <div class="blockchain-feature-card">
                            <div class="feature-icon">
                                <i class="fab fa-bitcoin"></i>
                            </div>
                            <h3>Crypto Payments</h3>
                            <p>Pay with Bitcoin, Ethereum, and other cryptocurrencies</p>
                            <button onclick="setupCryptoPayments()" class="btn btn-primary">
                                Setup Wallet
                            </button>
                        </div>
                        
                        <div class="blockchain-feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-exchange-alt"></i>
                            </div>
                            <h3>Decentralized Trading</h3>
                            <p>Trade mods directly with other users</p>
                            <button onclick="openTradingHub()" class="btn btn-primary">
                                Start Trading
                            </button>
                        </div>
                        
                        <div class="blockchain-feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-vote-yea"></i>
                            </div>
                            <h3>DAO Governance</h3>
                            <p>Vote on platform decisions and improvements</p>
                            <button onclick="joinDAO()" class="btn btn-primary">
                                Join DAO
                            </button>
                        </div>
                    </div>
                    
                    <div class="blockchain-stats">
                        <div class="blockchain-stat">
                            <div class="stat-value" id="totalNFTMods">1,247</div>
                            <div class="stat-label">NFT Mods</div>
                        </div>
                        <div class="blockchain-stat">
                            <div class="stat-value" id="totalVolume">₿ 12.5</div>
                            <div class="stat-label">Trading Volume</div>
                        </div>
                        <div class="blockchain-stat">
                            <div class="stat-value" id="totalHolders">3,892</div>
                            <div class="stat-label">NFT Holders</div>
                        </div>
                        <div class="blockchain-stat">
                            <div class="stat-value" id="daoMembers">2,156</div>
                            <div class="stat-label">DAO Members</div>
                        </div>
                    </div>
                    
                    <div class="nft-showcase" id="nftShowcase">
                        <h3>Featured NFT Mods</h3>
                        <div class="nft-grid" id="nftGrid">
                            <!-- NFT mods will be loaded here -->
                        </div>
                    </div>
                </div>
            `;
            
            streamingSection.parentNode.insertBefore(blockchainSection, streamingSection.nextSibling);
        }
    }

    createWalletInterface() {
        const walletInterface = document.createElement('div');
        walletInterface.id = 'walletInterface';
        walletInterface.className = 'wallet-interface';
        walletInterface.innerHTML = `
            <div class="wallet-content">
                <div class="wallet-header">
                    <h3><i class="fas fa-wallet"></i> Crypto Wallet</h3>
                    <button onclick="toggleWalletInterface()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="wallet-status" id="walletStatus">
                    <div class="wallet-disconnected">
                        <div class="wallet-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <h4>Connect Your Wallet</h4>
                        <p>Connect your crypto wallet to access blockchain features</p>
                        <div class="wallet-options">
                            <button onclick="connectWallet('metamask')" class="wallet-option">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iI0Y2ODUxQiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5NPC90ZXh0Pjwvc3ZnPg==" alt="MetaMask">
                                <span>MetaMask</span>
                            </button>
                            <button onclick="connectWallet('walletconnect')" class="wallet-option">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM5OTlGRiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5XPC90ZXh0Pjwvc3ZnPg==" alt="WalletConnect">
                                <span>WalletConnect</span>
                            </button>
                            <button onclick="connectWallet('coinbase')" class="wallet-option">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzAwNTJGRiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5DPC90ZXh0Pjwvc3ZnPg==" alt="Coinbase">
                                <span>Coinbase</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="wallet-connected" style="display: none;">
                        <div class="wallet-info">
                            <div class="wallet-address" id="walletAddress">0x1234...5678</div>
                            <div class="wallet-network" id="walletNetwork">Ethereum Mainnet</div>
                        </div>
                        
                        <div class="wallet-balances">
                            <div class="balance-item">
                                <span class="balance-label">ETH</span>
                                <span class="balance-value" id="ethBalance">2.45</span>
                            </div>
                            <div class="balance-item">
                                <span class="balance-label">BTC</span>
                                <span class="balance-value" id="btcBalance">0.12</span>
                            </div>
                            <div class="balance-item">
                                <span class="balance-label">USDC</span>
                                <span class="balance-value" id="usdcBalance">1,250.00</span>
                            </div>
                        </div>
                        
                        <div class="wallet-actions">
                            <button onclick="showSendCrypto()" class="btn btn-primary btn-sm">
                                <i class="fas fa-paper-plane"></i> Send
                            </button>
                            <button onclick="showReceiveCrypto()" class="btn btn-outline btn-sm">
                                <i class="fas fa-qrcode"></i> Receive
                            </button>
                            <button onclick="disconnectWallet()" class="btn btn-outline btn-sm">
                                <i class="fas fa-sign-out-alt"></i> Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(walletInterface);
    }

    createNFTMarketplace() {
        const nftMarketplace = document.createElement('div');
        nftMarketplace.id = 'nftMarketplace';
        nftMarketplace.className = 'nft-marketplace modal';
        nftMarketplace.innerHTML = `
            <div class="modal-content nft-modal-content">
                <span class="close" onclick="closeNFTMarketplace()">&times;</span>
                <div class="nft-marketplace-content">
                    <div class="nft-header">
                        <h2><i class="fas fa-gem"></i> NFT Mod Marketplace</h2>
                        <div class="nft-actions">
                            <button onclick="createNFTMod()" class="btn btn-primary">
                                <i class="fas fa-plus"></i> Create NFT
                            </button>
                            <button onclick="showMyNFTs()" class="btn btn-outline">
                                <i class="fas fa-user"></i> My NFTs
                            </button>
                        </div>
                    </div>
                    
                    <div class="nft-filters">
                        <div class="filter-group">
                            <select onchange="filterNFTs(this.value)">
                                <option value="all">All Categories</option>
                                <option value="legendary">Legendary</option>
                                <option value="epic">Epic</option>
                                <option value="rare">Rare</option>
                                <option value="common">Common</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <select onchange="sortNFTs(this.value)">
                                <option value="price-high">Price: High to Low</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="newest">Newest First</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                        <div class="search-group">
                            <input type="text" placeholder="Search NFT mods..." onkeyup="searchNFTs(this.value)">
                        </div>
                    </div>
                    
                    <div class="nft-marketplace-grid" id="nftMarketplaceGrid">
                        <!-- NFT mods will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(nftMarketplace);
    }

    addBlockchainNav() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const blockchainNav = document.createElement('div');
            blockchainNav.className = 'nav-dropdown';
            blockchainNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleBlockchainDropdown()">
                    Blockchain <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="blockchainDropdown">
                    <a href="#blockchain" onclick="scrollToBlockchain()"><i class="fas fa-link"></i> Blockchain Hub</a>
                    <a href="#" onclick="exploreNFTMods()"><i class="fas fa-gem"></i> NFT Marketplace</a>
                    <a href="#" onclick="toggleWalletInterface()"><i class="fas fa-wallet"></i> Crypto Wallet</a>
                    <a href="#" onclick="openTradingHub()"><i class="fas fa-exchange-alt"></i> Trading Hub</a>
                    <a href="#" onclick="joinDAO()"><i class="fas fa-vote-yea"></i> DAO Governance</a>
                    <a href="#" onclick="showStaking()"><i class="fas fa-coins"></i> Staking</a>
                </div>
            `;
            navMenu.insertBefore(blockchainNav, navMenu.children[6]);
        }
    }

    setupWalletConnection() {
        // Mock wallet connection setup
        this.walletProviders = {
            metamask: {
                name: 'MetaMask',
                available: typeof window.ethereum !== 'undefined',
                connect: () => this.connectMetaMask()
            },
            walletconnect: {
                name: 'WalletConnect',
                available: true,
                connect: () => this.connectWalletConnect()
            },
            coinbase: {
                name: 'Coinbase Wallet',
                available: true,
                connect: () => this.connectCoinbase()
            }
        };
    }

    loadNFTMods() {
        const sampleNFTs = [
            {
                id: 1,
                name: 'Legendary Dragon Armor',
                description: 'Ultra-rare dragon armor set with unique animations',
                game: 'Skyrim',
                rarity: 'legendary',
                price: '2.5 ETH',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop',
                creator: 'DragonMaster',
                edition: '1/1',
                traits: ['Animated', 'Glowing', 'Sound Effects']
            },
            {
                id: 2,
                name: 'Cyberpunk Vehicle Pack',
                description: 'Exclusive futuristic vehicles collection',
                game: 'Cyberpunk 2077',
                rarity: 'epic',
                price: '1.8 ETH',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
                creator: 'CyberCreator',
                edition: '5/10',
                traits: ['Neon Lights', 'Custom Sounds', 'Rare Materials']
            },
            {
                id: 3,
                name: 'Minecraft Castle Blueprint',
                description: 'Architectural masterpiece with detailed interiors',
                game: 'Minecraft',
                rarity: 'rare',
                price: '0.9 ETH',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
                creator: 'ArchitectPro',
                edition: '12/25',
                traits: ['Detailed Interior', 'Custom Textures', 'Redstone Circuits']
            }
        ];

        sampleNFTs.forEach(nft => {
            this.nftMods.set(nft.id, nft);
        });

        this.renderNFTMods();
    }

    renderNFTMods() {
        const nftGrid = document.getElementById('nftGrid');
        const nftMarketplaceGrid = document.getElementById('nftMarketplaceGrid');
        
        const nftHTML = Array.from(this.nftMods.values()).map(nft => `
            <div class="nft-card ${nft.rarity}" onclick="viewNFTDetails(${nft.id})">
                <div class="nft-image">
                    <img src="${nft.image}" alt="${nft.name}">
                    <div class="nft-rarity ${nft.rarity}">${nft.rarity}</div>
                    <div class="nft-edition">${nft.edition}</div>
                </div>
                <div class="nft-info">
                    <h4 class="nft-name">${nft.name}</h4>
                    <div class="nft-game">${nft.game}</div>
                    <div class="nft-creator">by ${nft.creator}</div>
                    <div class="nft-traits">
                        ${nft.traits.slice(0, 2).map(trait => `<span class="nft-trait">${trait}</span>`).join('')}
                    </div>
                    <div class="nft-price">${nft.price}</div>
                </div>
                <div class="nft-actions">
                    <button onclick="event.stopPropagation(); buyNFT(${nft.id})" class="btn btn-primary btn-sm">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <button onclick="event.stopPropagation(); makeOffer(${nft.id})" class="btn btn-outline btn-sm">
                        <i class="fas fa-hand-holding-usd"></i> Make Offer
                    </button>
                </div>
            </div>
        `).join('');

        if (nftGrid) nftGrid.innerHTML = nftHTML;
        if (nftMarketplaceGrid) nftMarketplaceGrid.innerHTML = nftHTML;
    }

    initializeCryptoPayments() {
        // Mock crypto payment setup
        this.supportedCryptos = [
            { symbol: 'BTC', name: 'Bitcoin', rate: 45000 },
            { symbol: 'ETH', name: 'Ethereum', rate: 3200 },
            { symbol: 'USDC', name: 'USD Coin', rate: 1 },
            { symbol: 'MATIC', name: 'Polygon', rate: 0.85 }
        ];
    }

    setupSmartContracts() {
        // Mock smart contract setup
        this.contracts = {
            nftMods: {
                address: '0x1234567890abcdef1234567890abcdef12345678',
                abi: [], // Would contain actual ABI
                functions: ['mint', 'transfer', 'approve', 'setApprovalForAll']
            },
            marketplace: {
                address: '0xabcdef1234567890abcdef1234567890abcdef12',
                abi: [],
                functions: ['listItem', 'buyItem', 'makeOffer', 'acceptOffer']
            },
            dao: {
                address: '0x567890abcdef1234567890abcdef1234567890ab',
                abi: [],
                functions: ['propose', 'vote', 'execute', 'delegate']
            }
        };
    }

    connectMetaMask() {
        console.log('🦊 Connecting to MetaMask...');
        // Simulate MetaMask connection
        setTimeout(() => {
            this.wallet = {
                provider: 'metamask',
                address: '0x1234567890abcdef1234567890abcdef12345678',
                network: 'Ethereum Mainnet',
                connected: true
            };
            this.updateWalletUI();
        }, 2000);
    }

    connectWalletConnect() {
        console.log('🔗 Connecting via WalletConnect...');
        // Simulate WalletConnect connection
        setTimeout(() => {
            this.wallet = {
                provider: 'walletconnect',
                address: '0xabcdef1234567890abcdef1234567890abcdef12',
                network: 'Ethereum Mainnet',
                connected: true
            };
            this.updateWalletUI();
        }, 2000);
    }

    connectCoinbase() {
        console.log('🏦 Connecting to Coinbase Wallet...');
        // Simulate Coinbase connection
        setTimeout(() => {
            this.wallet = {
                provider: 'coinbase',
                address: '0x567890abcdef1234567890abcdef1234567890ab',
                network: 'Ethereum Mainnet',
                connected: true
            };
            this.updateWalletUI();
        }, 2000);
    }

    updateWalletUI() {
        const walletStatus = document.getElementById('walletStatus');
        if (walletStatus && this.wallet) {
            const disconnected = walletStatus.querySelector('.wallet-disconnected');
            const connected = walletStatus.querySelector('.wallet-connected');
            
            if (disconnected) disconnected.style.display = 'none';
            if (connected) {
                connected.style.display = 'block';
                
                // Update wallet info
                const addressEl = document.getElementById('walletAddress');
                if (addressEl) {
                    addressEl.textContent = this.wallet.address.slice(0, 6) + '...' + this.wallet.address.slice(-4);
                }
                
                const networkEl = document.getElementById('walletNetwork');
                if (networkEl) {
                    networkEl.textContent = this.wallet.network;
                }
                
                // Simulate balance updates
                this.updateBalances();
            }
        }
    }

    updateBalances() {
        // Simulate balance updates
        const balances = {
            eth: (Math.random() * 5).toFixed(2),
            btc: (Math.random() * 0.5).toFixed(3),
            usdc: (Math.random() * 2000).toFixed(2)
        };

        const ethBalance = document.getElementById('ethBalance');
        const btcBalance = document.getElementById('btcBalance');
        const usdcBalance = document.getElementById('usdcBalance');

        if (ethBalance) ethBalance.textContent = balances.eth;
        if (btcBalance) btcBalance.textContent = balances.btc;
        if (usdcBalance) usdcBalance.textContent = balances.usdc;
    }

    addBlockchainStyles() {
        const styles = `
            <style>
            .blockchain-section {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 140, 0, 0.05));
                border-top: 1px solid rgba(255, 215, 0, 0.2);
            }
            
            .blockchain-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }
            
            .blockchain-feature-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            .blockchain-feature-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                border-color: #FFD700;
            }
            
            .feature-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
                color: white;
            }
            
            .blockchain-feature-card h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 1rem 0;
            }
            
            .blockchain-feature-card p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .blockchain-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
                padding: 2rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .blockchain-stat {
                text-align: center;
            }
            
            .blockchain-stat .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                color: #FFD700;
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .blockchain-stat .stat-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .nft-showcase h3 {
                font-size: 2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .nft-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            .nft-card {
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .nft-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            }
            
            .nft-card.legendary {
                border-color: #FFD700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            }
            
            .nft-card.epic {
                border-color: #9D4EDD;
                box-shadow: 0 0 20px rgba(157, 78, 221, 0.3);
            }
            
            .nft-card.rare {
                border-color: #3B82F6;
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            }
            
            .nft-card.common {
                border-color: #6B7280;
            }
            
            .nft-image {
                position: relative;
                aspect-ratio: 1;
                overflow: hidden;
            }
            
            .nft-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .nft-card:hover .nft-image img {
                transform: scale(1.1);
            }
            
            .nft-rarity {
                position: absolute;
                top: 10px;
                left: 10px;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .nft-rarity.legendary {
                background: #FFD700;
                color: #000;
            }
            
            .nft-rarity.epic {
                background: #9D4EDD;
                color: white;
            }
            
            .nft-rarity.rare {
                background: #3B82F6;
                color: white;
            }
            
            .nft-rarity.common {
                background: #6B7280;
                color: white;
            }
            
            .nft-edition {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .nft-info {
                padding: 1.5rem;
            }
            
            .nft-name {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .nft-game {
                color: var(--accent-primary);
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            
            .nft-creator {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .nft-traits {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .nft-trait {
                background: rgba(255, 215, 0, 0.2);
                color: #FFD700;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .nft-price {
                font-size: 1.3rem;
                font-weight: 700;
                color: #FFD700;
                margin-bottom: 1rem;
            }
            
            .nft-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .wallet-interface {
                position: fixed;
                top: 0;
                right: -400px;
                width: 400px;
                height: 100vh;
                background: var(--bg-primary);
                border-left: 1px solid var(--border-color);
                z-index: 10004;
                transition: right 0.3s ease;
                overflow-y: auto;
            }
            
            .wallet-interface.active {
                right: 0;
            }
            
            .wallet-content {
                padding: 1.5rem;
            }
            
            .wallet-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .wallet-disconnected {
                text-align: center;
                padding: 2rem 0;
            }
            
            .wallet-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
                color: white;
            }
            
            .wallet-disconnected h4 {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 1rem 0;
            }
            
            .wallet-disconnected p {
                color: var(--text-secondary);
                margin-bottom: 2rem;
            }
            
            .wallet-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .wallet-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }
            
            .wallet-option:hover {
                background: var(--bg-tertiary);
                border-color: var(--accent-primary);
            }
            
            .wallet-option img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
            
            .wallet-connected {
                padding: 1rem 0;
            }
            
            .wallet-info {
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            
            .wallet-address {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
                font-family: monospace;
            }
            
            .wallet-network {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .wallet-balances {
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .balance-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            .balance-item:last-child {
                border-bottom: none;
            }
            
            .balance-label {
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .balance-value {
                font-weight: 700;
                color: #FFD700;
                font-family: monospace;
            }
            
            .wallet-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .nft-modal-content {
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .nft-marketplace-content {
                padding: 2rem;
            }
            
            .nft-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .nft-filters {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                align-items: center;
            }
            
            .nft-filters select,
            .nft-filters input {
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .nft-marketplace-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            @media (max-width: 768px) {
                .blockchain-features {
                    grid-template-columns: 1fr;
                }
                
                .blockchain-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .nft-grid,
                .nft-marketplace-grid {
                    grid-template-columns: 1fr;
                }
                
                .wallet-interface {
                    width: 100%;
                    right: -100%;
                }
                
                .nft-filters {
                    flex-direction: column;
                    align-items: stretch;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for blockchain features
window.toggleBlockchainDropdown = function() {
    const dropdown = document.getElementById('blockchainDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.scrollToBlockchain = function() {
    const section = document.getElementById('blockchain');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

window.exploreNFTMods = function() {
    const marketplace = document.getElementById('nftMarketplace');
    if (marketplace) {
        marketplace.style.display = 'flex';
    }
};

window.closeNFTMarketplace = function() {
    const marketplace = document.getElementById('nftMarketplace');
    if (marketplace) {
        marketplace.style.display = 'none';
    }
};

window.toggleWalletInterface = function() {
    const wallet = document.getElementById('walletInterface');
    if (wallet) {
        wallet.classList.toggle('active');
    }
};

window.connectWallet = function(provider) {
    console.log('🔗 Connecting wallet:', provider);
    
    if (window.blockchainIntegration) {
        switch(provider) {
            case 'metamask':
                window.blockchainIntegration.connectMetaMask();
                break;
            case 'walletconnect':
                window.blockchainIntegration.connectWalletConnect();
                break;
            case 'coinbase':
                window.blockchainIntegration.connectCoinbase();
                break;
        }
    }
};

window.disconnectWallet = function() {
    console.log('🔌 Disconnecting wallet...');
    
    if (window.blockchainIntegration) {
        window.blockchainIntegration.wallet = null;
        
        const walletStatus = document.getElementById('walletStatus');
        if (walletStatus) {
            const disconnected = walletStatus.querySelector('.wallet-disconnected');
            const connected = walletStatus.querySelector('.wallet-connected');
            
            if (disconnected) disconnected.style.display = 'block';
            if (connected) connected.style.display = 'none';
        }
    }
};

window.viewNFTDetails = function(nftId) {
    console.log('👁️ Viewing NFT details:', nftId);
    // Implementation for NFT details modal
};

window.buyNFT = function(nftId) {
    console.log('💰 Buying NFT:', nftId);
    // Implementation for NFT purchase
};

window.makeOffer = function(nftId) {
    console.log('💸 Making offer on NFT:', nftId);
    // Implementation for making offers
};

window.createNFTMod = function() {
    console.log('🎨 Creating NFT mod...');
    // Implementation for NFT creation
};

window.openTradingHub = function() {
    console.log('📈 Opening trading hub...');
    // Implementation for trading hub
};

window.joinDAO = function() {
    console.log('🗳️ Joining DAO...');
    // Implementation for DAO participation
};

// Initialize Blockchain Integration System
document.addEventListener('DOMContentLoaded', () => {
    window.blockchainIntegration = new BlockchainIntegrationSystem();
    
    // Add styles after DOM is loaded
    setTimeout(() => {
        window.blockchainIntegration.addBlockchainStyles();
    }, 100);
});

console.log('✅ Blockchain Integration System loaded successfully!');