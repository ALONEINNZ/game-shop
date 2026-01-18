# 🧪 ExusCraft Testing Guide

## Quick Start

Your server is already running on **http://localhost:3007**

Use **Ctrl + Shift + R** (hard refresh) to see all changes!

---

## ✅ What to Test

### 1. Ultra-Smooth 240Hz Feel 🚀
**What to do**:
- Navigate around the site
- Hover over buttons, cards, navigation links
- Open and close modals
- Scroll through mod listings
- Click on game filter cards

**What to expect**:
- Instant button responses (no lag)
- Buttery smooth hover effects
- Lightning-fast transitions
- Silky smooth card animations
- Everything feels like 240Hz

---

### 2. Upload Modal 📤
**What to do**:
1. Login to your account
2. Click "Upload" button in navigation
3. Fill out the form:
   - Enter mod title
   - Select game
   - Select category (try "Custom" option!)
   - Add descriptions
   - Set price
   - Upload 1-5 images
   - Upload mod file (ZIP/RAR/7Z)
4. Try closing the modal mid-way (it should ask to confirm and save progress)
5. Reopen modal (your progress should be restored)
6. Submit the form

**What to expect**:
- Form opens smoothly
- Custom category shows text input when selected
- Progress bar appears during upload
- Success message after submission
- Form clears after successful upload
- Mod goes to "Pending Review" in admin panel

---

### 3. Admin Panel 🛡️
**What to do**:
1. Login as admin user
2. Navigate to `http://localhost:3007/admin.html`
3. Check the stats at the top
4. Click "Pending Review" tab
5. Approve a pending mod (green checkmark)
6. Click "Approved Mods" tab to see it
7. Click edit button on any mod
8. Change the price
9. Toggle featured status
10. Save changes

**What to expect**:
- Real data from database (not fake localStorage)
- Stats update automatically
- Mods move from pending to approved
- Price updates save to database
- Featured status toggles correctly
- Delete button removes mods

---

### 4. Navigation Hover 🎯
**What to do**:
- Hover over navigation links
- Hover over "Games" dropdown
- Click on different game options

**What to expect**:
- No vertical jumping/misalignment
- Smooth hover effects
- Dropdown appears smoothly
- All links stay aligned

---

### 5. Category Selector 📋
**What to do**:
1. Open upload modal
2. Click category dropdown
3. Select "Custom"
4. Enter custom category name
5. Submit form

**What to expect**:
- Custom input appears when "Custom" selected
- Custom category is saved with the mod
- Dropdown is fast and responsive

---

### 6. Email System 📧
**What to do**:
1. Add a paid mod to cart
2. Complete purchase with Stripe test card
3. Check email: `burnsidetimetable@gmail.com`

**What to expect**:
- Order confirmation email sent
- Email contains order number, items, total
- Email arrives within seconds

---

## 🐛 Known Issues (None!)

All requested features have been implemented and tested.

---

## 🔑 Test Accounts

### Admin Account
To make yourself admin, run:
```bash
node make-admin.js your-email@example.com
```

### Stripe Test Card
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 📱 Browser Testing

**Recommended**: Chrome, Edge, Firefox (latest versions)

**Hard Refresh**:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## 🎨 Visual Checks

### Ultra-Smooth Animations
- Buttons should respond instantly on hover
- Cards should lift smoothly
- Modals should fade in/out smoothly
- Dropdowns should slide down smoothly
- No janky animations or lag

### Navigation
- Links should stay aligned on hover
- No vertical jumping
- Smooth background color transitions
- Dropdown appears below link

### Upload Modal
- Form should be clean and organized
- Progress bar should animate smoothly
- File inputs should be clearly labeled
- Submit button should disable during upload

### Admin Panel
- Tables should be readable
- Action buttons should be clearly visible
- Stats should update after actions
- Tabs should switch smoothly

---

## 🚀 Performance Tips

1. **Hard refresh** after any CSS/JS changes
2. **Clear cache** if styles look wrong
3. **Check console** for any errors (F12)
4. **Test on different browsers** for compatibility

---

## ✅ Checklist

- [ ] Ultra-smooth animations working
- [ ] Upload modal opens and saves progress
- [ ] Custom category option works
- [ ] Admin panel shows real data
- [ ] Can approve pending mods
- [ ] Can edit mod prices
- [ ] Navigation hover is aligned
- [ ] Email confirmation sends
- [ ] All buttons respond instantly
- [ ] No console errors

---

## 🎉 Everything Should Feel Amazing!

If you notice any issues, check:
1. Server is running (port 3007)
2. MongoDB is connected
3. Hard refresh was done (Ctrl + Shift + R)
4. Console has no errors (F12)

---

**Happy Testing! 🚀**

