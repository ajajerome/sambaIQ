# SambaIQ Development Setup Guide 🛠️⚽

## ☁️ **Cloud Development Environment**

### **GitHub Codespaces (Recommended)**
1. **Öppna GitHub repo** i browser
2. **Klicka "Code" → "Codespaces" → "Create codespace"**
3. **Vänta 2-3 minuter** för setup
4. **Ready to develop!** - Alla tools pre-installerade

### **Benefits:**
- ✅ **Always latest code** - No git pull needed
- ✅ **Pre-configured environment** - EAS CLI, Expo, Node.js ready
- ✅ **Cloud computing power** - Fast builds
- ✅ **Access anywhere** - Any device with browser

## 🚀 **Automated Deployment Pipeline**

### **How It Works:**
```
Code Change → Git Push → GitHub Actions → EAS Build → TestFlight → Notification
```

### **Timeline:**
- **Code to TestFlight:** 20-30 minutes total
- **Apple Review:** 1-24 hours  
- **Available for Testing:** Automatic notification

### **Manual Trigger (If Needed):**
```bash
# In Codespaces terminal:
cd SambaIQ
eas build --platform ios --profile preview --message "Manual test build"
```

## 📱 **Testing Workflow**

### **Daily Development Cycle:**
1. **Morning:** Check TestFlight for new builds
2. **Test session:** 10-15 minutes focused testing
3. **Feedback:** Quick notes on what needs improvement
4. **Development:** Fixes pushed to cloud automatically
5. **Evening:** New build ready for tomorrow

### **No More:**
- ❌ Git pull commands
- ❌ Local environment issues
- ❌ Manual build processes  
- ❌ Deployment troubleshooting
- ❌ Version confusion

## 🎯 **Emergency Procedures**

### **If Build Fails:**
- **Check GitHub Actions** tab for error logs
- **Manual intervention** available via Codespaces
- **Rollback capability** to last working version

### **If App Crashes:**
- **Automatic crash reporting** (planned)
- **Hot fixes** via EAS updates
- **Stable fallback** versions available

## 🛠️ **Development Standards**

### **Code Quality:**
- **TypeScript strict mode** - Catch errors early
- **ESLint + Prettier** - Consistent code style
- **Automated testing** - Prevent regressions (planned)

### **Performance:**
- **60fps target** on iPhone SE and newer
- **Memory profiling** for long sessions
- **Bundle size optimization** for fast downloads

### **Stability:**
- **Crash-free core flows** - Onboarding, gameplay, navigation
- **Graceful error handling** - No white screens of death
- **Offline capability** - Core features work without internet

---

*Setup once, develop forever. Focus on product, not infrastructure.*