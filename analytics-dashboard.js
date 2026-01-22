// ADVANCED ANALYTICS DASHBOARD
// Real-time analytics for mod performance, user engagement, and platform insights

class AnalyticsDashboard {
    constructor() {
        this.analytics = {
            mods: {},
            users: {},
            downloads: {},
            revenue: {},
            engagement: {},
            performance: {}
        };
        this.realTimeData = {};
        this.charts = {};
        this.isAdmin = false;
        this.updateInterval = null;
        
        this.init();
    }

    init() {
        this.checkAdminAccess();
        this.loadAnalyticsData();
        this.createAnalyticsUI();
        this.setupEventHandlers();
        this.startRealTimeUpdates();
        
        console.log('📊 Analytics Dashboard Initialized');
    }

    checkAdminAccess() {
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            const user = JSON.parse(userData);
            this.isAdmin = user.role === 'admin' || user.isAdmin === true;
        }
    }

    loadAnalyticsData() {
        // Load existing analytics or generate sample data
        const savedAnalytics = localStorage.getItem('exuscraft_analytics');
        if (savedAnalytics) {
            this.analytics = JSON.parse(savedAnalytics);
        } else {
            this.generateSampleAnalytics();
        }
    }

    generateSampleAnalytics() {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        // Generate 30 days of sample data
        this.analytics = {
            downloads: this.generateTimeSeriesData(30, 1000, 5000),
            revenue: this.generateTimeSeriesData(30, 500, 2000),
            users: this.generateTimeSeriesData(30, 50, 200),
            pageViews: this.generateTimeSeriesData(30, 2000, 10000),
            
            topMods: [
                { name: 'Ultra Graphics Pack', downloads: 250000, revenue: 0, rating: 4.9 },
                { name: 'Survival Overhaul', downloads: 180000, revenue: 4990, rating: 4.7 },
                { name: 'Shader Collection', downloads: 500000, revenue: 0, rating: 4.8 },
                { name: 'Physics Mod', downloads: 320000, revenue: 2990, rating: 4.6 },
                { name: 'Combat System', downloads: 275000, revenue: 3490, rating: 4.8 }
            ],
            
            topGames: [
                { name: 'Minecraft', mods: 450, downloads: 1200000 },
                { name: 'Skyrim', mods: 320, downloads: 890000 },
                { name: 'Cyberpunk 2077', mods: 180, downloads: 650000 },
                { name: 'GTA V', mods: 240, downloads: 720000 },
                { name: 'The Witcher 3', mods: 160, downloads: 480000 }
            ],
            
            userEngagement: {
                averageSessionTime: 1247, // seconds
                bounceRate: 0.23,
                pagesPerSession: 4.7,
                returnVisitorRate: 0.68
            },
            
            performance: {
                pageLoadTime: 1.2,
                serverResponseTime: 0.3,
                errorRate: 0.02,
                uptime: 0.999
            }
        };
    }

    generateTimeSeriesData(days, min, max) {
        const data = [];
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now - (i * oneDay));
            const value = Math.floor(Math.random() * (max - min) + min);
            data.push({
                date: date.toISOString().split('T')[0],
                value: value,
                timestamp: date.getTime()
            });
        }
        
        return data;
    }

    createAnalyticsUI() {
        // Add analytics button to admin navigation
        this.addAnalyticsButton();
        
        // Create analytics panel
        this.createAnalyticsPanel();
    }

    addAnalyticsButton() {
        if (!this.isAdmin) return;
        
        const adminLink = document.getElementById('adminLink');
        if (adminLink) {
            const analyticsLink = document.createElement('a');
            analyticsLink.href = '#';
            analyticsLink.innerHTML = '<i class="fas fa-chart-bar"></i> Analytics';
            analyticsLink.style.cssText = `
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1rem;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                transition: all 0.3s ease;
            `;
            
            analyticsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAnalyticsPanel();
            });
            
            // Insert after admin link
            adminLink.parentNode.insertBefore(analyticsLink, adminLink.nextSibling);
        }
        
        // Also add floating analytics button
        const floatingBtn = document.createElement('button');
        floatingBtn.id = 'analyticsFloatingBtn';
        floatingBtn.style.cssText = `
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #10B981, #059669);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
            transition: all 0.3s ease;
            display: ${this.isAdmin ? 'block' : 'none'};
        `;
        floatingBtn.innerHTML = '📊';
        floatingBtn.title = 'Analytics Dashboard';
        
        floatingBtn.addEventListener('click', () => {
            this.showAnalyticsPanel();
        });
        
        document.body.appendChild(floatingBtn);
    }

    createAnalyticsPanel() {
        const panel = document.createElement('div');
        panel.id = 'analyticsPanel';
        panel.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: none;
            overflow-y: auto;
        `;
        
        panel.innerHTML = `
            <div style="max-width: 1600px; margin: 0 auto; padding: 2rem;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <div>
                        <h1 style="color: white; margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 800;">
                            Analytics Dashboard
                        </h1>
                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 1.1rem;">
                            Real-time insights and performance metrics
                        </p>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <select id="analyticsTimeRange" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.5rem;
                            border-radius: 8px;
                        ">
                            <option value="7">Last 7 days</option>
                            <option value="30" selected>Last 30 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="365">Last year</option>
                        </select>
                        <button id="refreshAnalytics" style="
                            background: linear-gradient(135deg, #10B981, #059669);
                            border: none;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                        <button id="closeAnalyticsPanel" style="
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.6);
                            font-size: 2rem;
                            cursor: pointer;
                        ">×</button>
                    </div>
                </div>
                
                <!-- Key Metrics -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                    ${this.generateMetricCardsHTML()}
                </div>
                
                <!-- Charts Section -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 3rem;">
                    <!-- Main Chart -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Downloads Over Time</h3>
                        <canvas id="downloadsChart" width="600" height="300"></canvas>
                    </div>
                    
                    <!-- Top Mods -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Top Performing Mods</h3>
                        <div id="topModsList">
                            ${this.generateTopModsHTML()}
                        </div>
                    </div>
                </div>
                
                <!-- Secondary Charts -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                    <!-- Revenue Chart -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Revenue Trends</h3>
                        <canvas id="revenueChart" width="400" height="200"></canvas>
                    </div>
                    
                    <!-- User Growth -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">User Growth</h3>
                        <canvas id="usersChart" width="400" height="200"></canvas>
                    </div>
                </div>
                
                <!-- Detailed Tables -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <!-- Top Games -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Games by Popularity</h3>
                        <div id="topGamesList">
                            ${this.generateTopGamesHTML()}
                        </div>
                    </div>
                    
                    <!-- Performance Metrics -->
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                    ">
                        <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Performance Metrics</h3>
                        <div id="performanceMetrics">
                            ${this.generatePerformanceMetricsHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupAnalyticsHandlers();
    }

    generateMetricCardsHTML() {
        const totalDownloads = this.analytics.downloads.reduce((sum, item) => sum + item.value, 0);
        const totalRevenue = this.analytics.revenue.reduce((sum, item) => sum + item.value, 0);
        const totalUsers = this.analytics.users.reduce((sum, item) => sum + item.value, 0);
        const totalPageViews = this.analytics.pageViews.reduce((sum, item) => sum + item.value, 0);
        
        const metrics = [
            {
                title: 'Total Downloads',
                value: this.formatNumber(totalDownloads),
                change: '+12.5%',
                positive: true,
                icon: '📥',
                color: '#5B8CFF'
            },
            {
                title: 'Revenue',
                value: '$' + this.formatNumber(totalRevenue),
                change: '+8.3%',
                positive: true,
                icon: '💰',
                color: '#10B981'
            },
            {
                title: 'Active Users',
                value: this.formatNumber(totalUsers),
                change: '+15.7%',
                positive: true,
                icon: '👥',
                color: '#F59E0B'
            },
            {
                title: 'Page Views',
                value: this.formatNumber(totalPageViews),
                change: '-2.1%',
                positive: false,
                icon: '👁️',
                color: '#EF4444'
            }
        ];
        
        return metrics.map(metric => `
            <div style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 2rem;
                position: relative;
                overflow: hidden;
            ">
                <div style="
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    width: 80px;
                    height: 80px;
                    background: ${metric.color}20;
                    border-radius: 50%;
                "></div>
                
                <div style="position: relative; z-index: 1;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="
                            font-size: 2rem;
                            filter: grayscale(0.3);
                        ">${metric.icon}</div>
                        <div>
                            <h4 style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; font-weight: 500;">
                                ${metric.title}
                            </h4>
                            <div style="font-size: 2rem; font-weight: 700; color: white; margin: 0.5rem 0;">
                                ${metric.value}
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="
                            color: ${metric.positive ? '#10B981' : '#EF4444'};
                            font-weight: 600;
                            font-size: 0.9rem;
                        ">${metric.change}</span>
                        <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">vs last period</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateTopModsHTML() {
        return this.analytics.topMods.map((mod, index) => `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 24px;
                        height: 24px;
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 0.8rem;
                    ">${index + 1}</div>
                    <div>
                        <div style="color: white; font-weight: 600; font-size: 0.9rem;">${mod.name}</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                            ${this.formatNumber(mod.downloads)} downloads
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="color: #10B981; font-weight: 600; font-size: 0.9rem;">
                        ${mod.revenue > 0 ? '$' + this.formatNumber(mod.revenue) : 'Free'}
                    </div>
                    <div style="color: #FFD700; font-size: 0.8rem;">⭐ ${mod.rating}</div>
                </div>
            </div>
        `).join('');
    }

    generateTopGamesHTML() {
        return this.analytics.topGames.map((game, index) => `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 24px;
                        height: 24px;
                        background: linear-gradient(135deg, #F59E0B, #D97706);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 0.8rem;
                    ">${index + 1}</div>
                    <div>
                        <div style="color: white; font-weight: 600; font-size: 0.9rem;">${game.name}</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                            ${game.mods} mods
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="color: #5B8CFF; font-weight: 600; font-size: 0.9rem;">
                        ${this.formatNumber(game.downloads)}
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">downloads</div>
                </div>
            </div>
        `).join('');
    }

    generatePerformanceMetricsHTML() {
        const metrics = [
            { label: 'Avg. Session Time', value: this.formatTime(this.analytics.userEngagement.averageSessionTime), good: true },
            { label: 'Bounce Rate', value: (this.analytics.userEngagement.bounceRate * 100).toFixed(1) + '%', good: this.analytics.userEngagement.bounceRate < 0.3 },
            { label: 'Pages/Session', value: this.analytics.userEngagement.pagesPerSession.toFixed(1), good: true },
            { label: 'Return Visitors', value: (this.analytics.userEngagement.returnVisitorRate * 100).toFixed(1) + '%', good: true },
            { label: 'Page Load Time', value: this.analytics.performance.pageLoadTime.toFixed(1) + 's', good: this.analytics.performance.pageLoadTime < 2 },
            { label: 'Server Response', value: this.analytics.performance.serverResponseTime.toFixed(2) + 's', good: this.analytics.performance.serverResponseTime < 0.5 },
            { label: 'Error Rate', value: (this.analytics.performance.errorRate * 100).toFixed(2) + '%', good: this.analytics.performance.errorRate < 0.05 },
            { label: 'Uptime', value: (this.analytics.performance.uptime * 100).toFixed(2) + '%', good: this.analytics.performance.uptime > 0.99 }
        ];
        
        return metrics.map(metric => `
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">${metric.label}</span>
                <span style="
                    color: ${metric.good ? '#10B981' : '#EF4444'};
                    font-weight: 600;
                    font-size: 0.9rem;
                ">${metric.value}</span>
            </div>
        `).join('');
    }

    setupAnalyticsHandlers() {
        // Close panel
        document.getElementById('closeAnalyticsPanel').addEventListener('click', () => {
            document.getElementById('analyticsPanel').style.display = 'none';
        });
        
        // Refresh data
        document.getElementById('refreshAnalytics').addEventListener('click', () => {
            this.refreshAnalytics();
        });
        
        // Time range change
        document.getElementById('analyticsTimeRange').addEventListener('change', (e) => {
            this.updateTimeRange(parseInt(e.target.value));
        });
        
        // Close on outside click
        document.getElementById('analyticsPanel').addEventListener('click', (e) => {
            if (e.target.id === 'analyticsPanel') {
                document.getElementById('analyticsPanel').style.display = 'none';
            }
        });
        
        // Initialize charts after a short delay
        setTimeout(() => {
            this.initializeCharts();
        }, 500);
    }

    showAnalyticsPanel() {
        if (!this.isAdmin) {
            alert('Access denied. Admin privileges required.');
            return;
        }
        
        document.getElementById('analyticsPanel').style.display = 'block';
        
        // Refresh charts
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    }

    initializeCharts() {
        this.createDownloadsChart();
        this.createRevenueChart();
        this.createUsersChart();
    }

    createDownloadsChart() {
        const canvas = document.getElementById('downloadsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = this.analytics.downloads;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart dimensions
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        
        // Find min/max values
        const values = data.map(d => d.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const valueRange = maxValue - minValue;
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
        }
        
        // Draw line chart
        ctx.strokeStyle = '#5B8CFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#5B8CFF';
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Y-axis labels
        for (let i = 0; i <= 5; i++) {
            const value = minValue + (valueRange / 5) * (5 - i);
            const y = padding + (chartHeight / 5) * i;
            ctx.textAlign = 'right';
            ctx.fillText(this.formatNumber(Math.round(value)), padding - 10, y + 4);
        }
        
        // X-axis labels (show every 5th day)
        ctx.textAlign = 'center';
        data.forEach((point, index) => {
            if (index % 5 === 0 || index === data.length - 1) {
                const x = padding + (chartWidth / (data.length - 1)) * index;
                const date = new Date(point.timestamp);
                ctx.fillText(
                    (date.getMonth() + 1) + '/' + date.getDate(),
                    x,
                    canvas.height - 10
                );
            }
        });
    }

    createRevenueChart() {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = this.analytics.revenue;
        
        // Similar implementation to downloads chart but for revenue
        this.drawSimpleLineChart(ctx, canvas, data, '#10B981');
    }

    createUsersChart() {
        const canvas = document.getElementById('usersChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = this.analytics.users;
        
        // Similar implementation to downloads chart but for users
        this.drawSimpleLineChart(ctx, canvas, data, '#F59E0B');
    }

    drawSimpleLineChart(ctx, canvas, data, color) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 30;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        
        const values = data.map(d => d.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const valueRange = maxValue - minValue || 1;
        
        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw area under curve
        ctx.fillStyle = color + '20';
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.closePath();
        ctx.fill();
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateRealTimeData();
        }, 30000); // Update every 30 seconds
    }

    updateRealTimeData() {
        // Simulate real-time data updates
        const now = Date.now();
        const today = new Date().toISOString().split('T')[0];
        
        // Update today's data
        ['downloads', 'revenue', 'users', 'pageViews'].forEach(metric => {
            const todayData = this.analytics[metric].find(d => d.date === today);
            if (todayData) {
                todayData.value += Math.floor(Math.random() * 100);
            }
        });
        
        // Update UI if panel is visible
        const panel = document.getElementById('analyticsPanel');
        if (panel && panel.style.display === 'block') {
            this.refreshAnalytics();
        }
    }

    refreshAnalytics() {
        // Simulate data refresh
        const refreshBtn = document.getElementById('refreshAnalytics');
        const originalText = refreshBtn.innerHTML;
        
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            // Update metric cards
            const metricsContainer = document.querySelector('#analyticsPanel .grid');
            if (metricsContainer) {
                metricsContainer.innerHTML = this.generateMetricCardsHTML();
            }
            
            // Refresh charts
            this.initializeCharts();
            
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
            
            this.showNotification('Analytics data refreshed successfully!');
        }, 2000);
    }

    updateTimeRange(days) {
        // Generate new data for the selected time range
        this.analytics.downloads = this.generateTimeSeriesData(days, 1000, 5000);
        this.analytics.revenue = this.generateTimeSeriesData(days, 500, 2000);
        this.analytics.users = this.generateTimeSeriesData(days, 50, 200);
        this.analytics.pageViews = this.generateTimeSeriesData(days, 2000, 10000);
        
        this.refreshAnalytics();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
            z-index: 2001;
            transform: translateX(400px);
            transition: transform 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Public API methods
    trackEvent(eventName, data) {
        console.log('Analytics Event:', eventName, data);
        // In a real implementation, this would send data to analytics service
    }

    getAnalytics() {
        return this.analytics;
    }

    exportData() {
        const dataStr = JSON.stringify(this.analytics, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exuscraft-analytics-' + new Date().toISOString().split('T')[0] + '.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize Analytics Dashboard
let analyticsDashboard;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        analyticsDashboard = new AnalyticsDashboard();
    });
} else {
    analyticsDashboard = new AnalyticsDashboard();
}

window.analyticsDashboard = analyticsDashboard;