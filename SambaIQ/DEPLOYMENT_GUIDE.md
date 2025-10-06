# 🚀 SambaIQ Deployment Guide

## 📱 Så här bygger och testar du SambaIQ

### Förberedelser:
1. **Expo konto**: Skapa på https://expo.dev
2. **Apple Developer**: För iOS TestFlight (99 USD/år)
3. **EAS CLI**: Redan installerat i projektet

## 🛠️ Steg-för-steg Deployment:

### **Steg 1: Logga in på EAS**
```bash
cd SambaIQ
eas login
# Logga in med ditt Expo-konto
```

### **Steg 2: Konfiguration (Redan klart!)**
✅ `eas.json` - EAS build konfiguration
✅ `app.json` - App metadata och inställningar  
✅ iOS bundle identifier: `com.sambaiq.app`
✅ Project ID: `sambaiq-football-app`

### **Steg 3: iOS Build (TestFlight)**
```bash
# Development build (snabbast)
eas build --platform ios --profile development

# Production build (för App Store)
eas build --platform ios --profile production
```

### **Steg 4: Android Build**  
```bash
# Development APK
eas build --platform android --profile development

# Production AAB (Google Play)
eas build --platform android --profile production
```

### **Steg 5: TestFlight Deployment**
```bash
# Efter iOS build är klar:
eas submit --platform ios --profile production
# Följ instruktionerna för App Store Connect
```

## 📱 **Testning Alternativ:**

### **Option A: Development Build (Rekommenderat)**
- Snabbast att bygga
- Kan installeras direkt på din iPhone
- Stöder hot reloading för utveckling
- Perfekt för testing av SambaIQ

### **Option B: Expo Go (Begränsat)**
- Fungerar inte med alla native dependencies
- Bra för snabb prototyping
- Kanske inte fungerar med alla SambaIQ features

### **Option C: Web Version (Redan klar!)**
```bash
npm run web
# Öppna http://localhost:8081
```

## 🎯 **Rekommenderad Workflow:**

### **För snabb testning:**
```bash
# 1. Logga in
eas login

# 2. Bygg development version
eas build --platform ios --profile development

# 3. Installera på din iPhone via QR-kod
# (EAS ger dig en QR-kod när bygget är klart)
```

### **För production:**
```bash
# 1. Bygg production
eas build --platform ios --profile production

# 2. Submit till TestFlight  
eas submit --platform ios --profile production

# 3. Testa via TestFlight
# 4. Submit till App Store när redo
```

## 📋 **Checklist innan du bygger:**

✅ **Expo konto skapat**
✅ **Apple Developer konto** (för iOS)
✅ **EAS.json konfigurerad**
✅ **App.json uppdaterad**  
✅ **Bundle identifiers satta**
✅ **Assets (ikoner) på plats**

## 🚨 **Vanliga Problem & Lösningar:**

### **"Missing bundle identifier"**
- Redan fixat i `app.json`: `com.sambaiq.app`

### **"Missing project ID"**  
- Redan satt: `sambaiq-football-app`

### **"Assets not found"**
- Assets finns i `/assets` mappen

### **"Native dependencies issues"**
- Alla dependencies är Expo-kompatibla ✅

## 🎉 **När bygget är klart:**

1. **QR-kod** - Scanna för att installera på din telefon
2. **URL** - Direktlänk för installation  
3. **TestFlight** - Automatisk efter submit
4. **Share link** - Skicka till andra för testning

## ⏱️ **Build Times:**
- **Development iOS:** ~10-15 minuter
- **Production iOS:** ~15-20 minuter  
- **Android:** ~10-15 minuter

## 🎯 **Nästa steg efter testing:**
1. Testa alla features på riktigt enhet
2. Samla feedback från barn 7-16 år
3. Iterera baserat på användarfeedback
4. Lägg till AI-integration för fler scenarier
5. Implementera social features

---

**SambaIQ är nu redo för deploy! 🚀⚽**

*Kör `eas login` och sedan `eas build --platform ios --profile development` så har du appen på din telefon inom 15 minuter!*