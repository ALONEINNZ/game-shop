const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const zlib = require('zlib');

const pipelineAsync = promisify(pipeline);

// Ensure directories exist
const dirs = ['uploads', 'uploads/mod-files', 'uploads/mod-images'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Sample mods with their content
const mods = [
    {
        name: 'OptiFine_HD',
        files: {
            'README.md': `# OptiFine HD - Performance & Graphics Enhancement

## Description
OptiFine is a Minecraft optimization mod that dramatically improves FPS and graphics quality.

## Features
- HD Textures Support (up to 512x512)
- Dynamic Lights
- Better Grass & Snow
- Connected Textures
- Custom Sky & Colors
- Shader Support
- FPS Boost (2-3x improvement)
- Variable Render Distance
- Smooth Lighting
- Antialiasing & Anisotropic Filtering

## Installation
1. Download OptiFine HD
2. Run the .jar file
3. Click "Install"
4. Launch Minecraft with OptiFine profile
5. Enjoy enhanced graphics!

## Requirements
- Minecraft 1.20.4
- Java 17 or higher

## Configuration
Access video settings in Minecraft:
- Options > Video Settings > Quality
- Options > Video Settings > Performance
- Options > Video Settings > Shaders

## Support
Visit https://exuscraft.com for help

## Credits
Created by sp614x
Distributed by ExusCraft
`,
            'config.properties': `# OptiFine Configuration
ofFogType=1
ofFogStart=0.8
ofMipmapType=0
ofOcclusionFancy=false
ofSmoothFps=false
ofSmoothWorld=false
ofAoLevel=1.0
ofClouds=0
ofCloudsHeight=0.0
ofTrees=0
ofDroppedItems=0
ofRain=0
ofAnimatedWater=0
ofAnimatedLava=0
ofAnimatedFire=true
ofAnimatedPortal=true
ofAnimatedRedstone=true
ofAnimatedExplosion=true
ofAnimatedFlame=true
ofAnimatedSmoke=true
ofVoidParticles=true
ofWaterParticles=true
ofPortalParticles=true
ofPotionParticles=true
ofFireworkParticles=true
ofDrippingWaterLava=true
ofAnimatedTerrain=true
ofAnimatedTextures=true
ofRainSplash=true
ofLagometer=false
ofShowFps=false
ofAutoSaveTicks=4000
ofBetterGrass=3
ofConnectedTextures=2
ofWeather=true
ofSky=true
ofStars=true
ofSunMoon=true
ofVignette=0
ofChunkUpdates=1
ofChunkUpdatesDynamic=false
ofTime=0
ofClearWater=false
ofAaLevel=0
ofAfLevel=1
ofProfiler=false
ofBetterSnow=false
ofSwampColors=true
ofRandomEntities=true
ofSmoothBiomes=true
ofCustomFonts=true
ofCustomColors=true
ofCustomSky=true
ofShowCapes=true
ofNaturalTextures=false
ofEmissiveTextures=true
ofLazyChunkLoading=true
ofRenderRegions=false
ofSmartAnimations=false
ofDynamicFov=true
ofAlternateBlocks=true
ofDynamicLights=3
ofScreenshotSize=1
ofCustomEntityModels=true
ofCustomGuis=true
ofShowGlErrors=true
ofFullscreenMode=Default
ofFastMath=false
ofFastRender=false
ofTranslucentBlocks=0
`,
            'changelog.txt': `OptiFine HD Changelog

Version 1.20.4:
- Added support for Minecraft 1.20.4
- Improved shader compatibility
- Fixed memory leak with large texture packs
- Enhanced dynamic lights performance
- Added new video settings options
- Fixed crash with certain mods
- Improved FPS in dense forests
- Better compatibility with Fabric mods

Version 1.20.3:
- Initial 1.20 support
- Major performance improvements
- New shader features
`
        }
    },
    {
        name: 'JourneyMap',
        files: {
            'README.md': `# JourneyMap - Real-time Mapping

## Features
- Real-time minimap
- Full-screen world map
- Waypoint system
- Mob radar
- Cave mapping
- Multiplayer support
- Web map viewer
- Death waypoints
- Customizable UI

## Installation
1. Install Forge/Fabric
2. Place JourneyMap in mods folder
3. Launch Minecraft
4. Press 'J' to open map

## Controls
- J: Toggle fullscreen map
- B: Create waypoint
- M: Minimap options
- U: Toggle underground mode

## Web Map
Access at: http://localhost:8080
`,
            'journeymap.config': `# JourneyMap Configuration
minimap.enabled=true
minimap.position=TopRight
minimap.size=256
waypoints.enabled=true
radar.enabled=true
caves.enabled=true
webmap.enabled=true
webmap.port=8080
`
        }
    },
    {
        name: 'Create_Mod',
        files: {
            'README.md': `# Create - Mechanical Contraptions

## Description
Build incredible mechanical contraptions with rotating components, conveyor belts, and automation systems.

## Features
- Rotating machinery
- Conveyor belts
- Mechanical crafting
- Windmills & Water wheels
- Gearboxes & Clutches
- Automated farms
- Item processing
- Fluid handling
- Redstone integration

## Getting Started
1. Craft a Wrench
2. Build a Water Wheel
3. Connect with Shafts
4. Add mechanical components
5. Automate everything!

## Recipes
Check in-game recipe book (Ponder system)
`,
            'create.config': `# Create Mod Configuration
maxRotationSpeed=256
stressImpact=1.0
enablePonder=true
enableFlywheel=true
`
        }
    }
];

console.log('Creating real .zip mod files...\n');

// Simple ZIP file creator (using stored method, no compression for simplicity)
function createZipFile(outputPath, files) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath);
        const archive = [];
        
        // Create a simple ZIP structure
        let centralDirectory = [];
        let offset = 0;
        
        Object.entries(files).forEach(([filename, content]) => {
            const data = Buffer.from(content, 'utf8');
            const crc32 = calculateCRC32(data);
            
            // Local file header
            const localHeader = Buffer.alloc(30 + filename.length);
            localHeader.writeUInt32LE(0x04034b50, 0); // Signature
            localHeader.writeUInt16LE(20, 4); // Version
            localHeader.writeUInt16LE(0, 6); // Flags
            localHeader.writeUInt16LE(0, 8); // Compression (0 = stored)
            localHeader.writeUInt16LE(0, 10); // Time
            localHeader.writeUInt16LE(0, 12); // Date
            localHeader.writeUInt32LE(crc32, 14); // CRC32
            localHeader.writeUInt32LE(data.length, 18); // Compressed size
            localHeader.writeUInt32LE(data.length, 22); // Uncompressed size
            localHeader.writeUInt16LE(filename.length, 26); // Filename length
            localHeader.writeUInt16LE(0, 28); // Extra field length
            localHeader.write(filename, 30);
            
            archive.push(localHeader);
            archive.push(data);
            
            // Store for central directory
            centralDirectory.push({
                filename,
                crc32,
                size: data.length,
                offset
            });
            
            offset += localHeader.length + data.length;
        });
        
        // Write all local file entries
        archive.forEach(buf => output.write(buf));
        
        // Central directory
        const centralDirStart = offset;
        centralDirectory.forEach(entry => {
            const cdHeader = Buffer.alloc(46 + entry.filename.length);
            cdHeader.writeUInt32LE(0x02014b50, 0); // Signature
            cdHeader.writeUInt16LE(20, 4); // Version made by
            cdHeader.writeUInt16LE(20, 6); // Version needed
            cdHeader.writeUInt16LE(0, 8); // Flags
            cdHeader.writeUInt16LE(0, 10); // Compression
            cdHeader.writeUInt16LE(0, 12); // Time
            cdHeader.writeUInt16LE(0, 14); // Date
            cdHeader.writeUInt32LE(entry.crc32, 16); // CRC32
            cdHeader.writeUInt32LE(entry.size, 20); // Compressed size
            cdHeader.writeUInt32LE(entry.size, 24); // Uncompressed size
            cdHeader.writeUInt16LE(entry.filename.length, 28); // Filename length
            cdHeader.writeUInt16LE(0, 30); // Extra field length
            cdHeader.writeUInt16LE(0, 32); // Comment length
            cdHeader.writeUInt16LE(0, 34); // Disk number
            cdHeader.writeUInt16LE(0, 36); // Internal attributes
            cdHeader.writeUInt32LE(0, 38); // External attributes
            cdHeader.writeUInt32LE(entry.offset, 42); // Offset
            cdHeader.write(entry.filename, 46);
            
            output.write(cdHeader);
            offset += cdHeader.length;
        });
        
        // End of central directory
        const eocd = Buffer.alloc(22);
        eocd.writeUInt32LE(0x06054b50, 0); // Signature
        eocd.writeUInt16LE(0, 4); // Disk number
        eocd.writeUInt16LE(0, 6); // Central dir disk
        eocd.writeUInt16LE(centralDirectory.length, 8); // Entries on disk
        eocd.writeUInt16LE(centralDirectory.length, 10); // Total entries
        eocd.writeUInt32LE(offset - centralDirStart, 12); // Central dir size
        eocd.writeUInt32LE(centralDirStart, 16); // Central dir offset
        eocd.writeUInt16LE(0, 20); // Comment length
        
        output.write(eocd);
        output.end();
        
        output.on('finish', () => {
            const stats = fs.statSync(outputPath);
            resolve(stats.size);
        });
        
        output.on('error', reject);
    });
}

// Simple CRC32 calculation
function calculateCRC32(buffer) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buffer.length; i++) {
        crc = crc ^ buffer[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Create all mod zips
async function createAllMods() {
    for (const mod of mods) {
        const zipPath = path.join('uploads', 'mod-files', `${mod.name}_v1.0.zip`);
        
        try {
            const size = await createZipFile(zipPath, mod.files);
            console.log(`✓ Created ${mod.name}_v1.0.zip (${(size / 1024).toFixed(2)} KB)`);
        } catch (error) {
            console.error(`✗ Error creating ${mod.name}:`, error.message);
        }
    }
    
    // Create simple zips for the rest
    const simpleModNames = [
        'SkyUI', 'Unofficial_Skyrim_Patch', 'Realistic_Combat_Overhaul',
        'NaturalVision_Evolved', 'LSPDFR', 'Vehicle_Mega_Pack',
        'Rust_Admin_Tools', 'Economics_System', 'Cyber_Engine_Tweaks',
        'Better_Vehicle_Handling', 'HD_Reworked_Project', 'Ghost_Mode',
        'Sim_Settlements_2', 'Weaponsmith_Extended'
    ];
    
    for (const modName of simpleModNames) {
        const zipPath = path.join('uploads', 'mod-files', `${modName}_v1.0.zip`);
        
        const files = {
            'README.txt': `${modName.replace(/_/g, ' ')} - v1.0

Thank you for downloading from ExusCraft!

This is a sample mod file for demonstration purposes.
In production, this would contain the actual mod files.

Installation:
1. Extract this archive
2. Copy files to your game's mod folder
3. Enable in mod manager
4. Restart game

Visit https://exuscraft.com for support.
`,
            'mod.info': `name=${modName}
version=1.0
author=ExusCraft Community
description=Sample mod for ExusCraft platform
`,
            'changelog.txt': `Version 1.0:
- Initial release
- Core features implemented
- Bug fixes
`
        };
        
        try {
            const size = await createZipFile(zipPath, files);
            console.log(`✓ Created ${modName}_v1.0.zip (${(size / 1024).toFixed(2)} KB)`);
        } catch (error) {
            console.error(`✗ Error creating ${modName}:`, error.message);
        }
    }
    
    console.log('\n✅ All .zip mod files created successfully!');
    console.log('Files are located in: uploads/mod-files/');
}

createAllMods().catch(console.error);
