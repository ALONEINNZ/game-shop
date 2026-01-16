const fs = require('fs');
const path = require('path');

// Create uploads directories if they don't exist
const dirs = ['uploads', 'uploads/mod-files', 'uploads/mod-images'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Sample mod files to create (just text files for now)
const sampleMods = [
    { name: 'OptiFine_HD', size: 6 },
    { name: 'JourneyMap', size: 8 },
    { name: 'Create_Mod', size: 12 },
    { name: 'SkyUI', size: 2 },
    { name: 'Unofficial_Skyrim_Patch', size: 18 },
    { name: 'NaturalVision_Evolved', size: 50 },
    { name: 'LSPDFR', size: 30 },
    { name: 'Rust_Admin_Tools', size: 1 },
    { name: 'Cyber_Engine_Tweaks', size: 15 },
    { name: 'HD_Reworked_Project', size: 50 }
];

console.log('Creating sample mod files...\n');

sampleMods.forEach((mod) => {
    const fileName = `${mod.name}_v1.0.txt`;
    const filePath = path.join('uploads', 'mod-files', fileName);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${fileName} already exists`);
        return;
    }
    
    // Create mod file content
    const content = `
===========================================
${mod.name.replace(/_/g, ' ')} - v1.0
===========================================

INSTALLATION INSTRUCTIONS:
1. Download this mod file
2. Extract to your game's mod folder
3. Enable in mod manager
4. Restart game

FEATURES:
- Enhanced gameplay
- Improved graphics  
- Bug fixes
- Performance optimizations

REQUIREMENTS:
- Game version: Latest
- Dependencies: None

SUPPORT:
Visit https://exuscraft.com for support

CREDITS:
Created by ExusCraft community

---
Thank you for downloading from ExusCraft!

This is a sample mod file for demonstration purposes.
In production, this would be an actual mod archive (.zip, .rar, etc.)

File Size: ${mod.size} MB
`.repeat(Math.max(1, Math.floor(mod.size / 2))); // Repeat to make file bigger
    
    fs.writeFileSync(filePath, content);
    const stats = fs.statSync(filePath);
    console.log(`✓ Created ${fileName} (${(stats.size / 1024).toFixed(2)} KB)`);
});

console.log('\nSample mod files created successfully!');
console.log('Files are located in: uploads/mod-files/');
console.log('\nNote: These are text files for demo. In production, upload actual .zip mod files.');

