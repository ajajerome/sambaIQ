# ⚽ SambaIQ - "Duolingo för Fotboll"

AI-driven fotbollsscenarier för barn 7-16 år

## 🎯 Vision

SambaIQ är "Duolingo för fotboll" - en interaktiv app som lär barn fotbollstaktik genom roliga, AI-genererade scenarier. Barn drar spelare på en fotbollsplan, får omedelbar feedback och utvecklas genom ett gamifierat system inspirerat av Duolingos framgångsrecept.

## 🎮 Funktioner

### ⚡ Kärnfunktioner
- **Interaktiva Scenarier**: Drag & drop-spelare på fotbollsplan
- **AI-driven Innehåll**: Oändligt med nya scenarier baserade på SVFF/UEFA-standarder  
- **Åldersanpassning**: 7-9 år (7v7), 10-12 år (9v9), 13-16 år (11v11)
- **Gamification**: XP-system, badges, streaks, levels
- **Pedagogisk Feedback**: Citat från kända spelare och tränare

### 🎨 Design (FC 25-26 Inspirerad)
- **Modern Glassmorphism**: Genomskinliga kort med blur-effekter
- **Gradient Bakgrunder**: Fotbollsgröna till blå övergångar  
- **Smooth Animationer**: Premium-känsla med polerade transitions
- **Dark/Light Themes**: Automatiskt baserat på tid på dagen

### 🔔 Engagement
- **Push Notiser**: Smart timing för streak-påminnelser
- **Vänner System**: Jämför progress, utmaningar, leaderboards
- **Social Features**: Dela achievements, team challenges

## 📱 Teknisk Stack

- **Frontend**: React Native + Expo SDK 49
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **AI Integration**: OpenAI/Claude via Supabase Edge Functions  
- **Authentication**: Supabase Auth
- **Realtime**: Supabase Realtime för social features
- **Platform**: iOS-först, sedan Android

## 🚀 Installation & Setup

### Förutsättningar
- Node.js (v16+)
- npm eller yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator eller Android Emulator (eller Expo Go app)

### Steg 1: Klona och installera
```bash
cd SambaIQ
npm install
```

### Steg 2: Konfiguration
1. Skapa ett Supabase-projekt på [supabase.com](https://supabase.com)
2. Kopiera din Supabase URL och anon key
3. Uppdatera `src/services/supabase.ts` med dina credentials

### Steg 3: Kör appen
```bash
# Starta Expo development server
npm start

# Eller kör direkt på plattform
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## 📁 Projektstruktur

```
SambaIQ/
├── src/
│   ├── components/     # Återanvändbara komponenter
│   ├── navigation/     # React Navigation setup
│   ├── screens/        # App screens
│   │   ├── auth/       # Onboarding, login
│   │   ├── game/       # Hem, spel, scenarier
│   │   ├── profile/    # Användarprofil
│   │   └── social/     # Vänner, leaderboards
│   ├── services/       # API calls, Supabase
│   ├── types/          # TypeScript definitioner
│   └── utils/          # Hjälpfunktioner
├── assets/             # Bilder, fonts, ljud
└── docs/               # Dokumentation
```

## 🎯 MVP Funktioner (Nuvarande Status)

✅ **Färdiga**:
- Modern React Native + Expo setup
- Navigation med React Navigation
- Interaktiv onboarding flow
- FC 25-26 inspirerad design
- Hemskärm med stats & gamification
- Scenariovalsskärm med kategorier
- Grundläggande fotbollsplan med drag & drop
- Success-modaler med coaching feedback

🚧 **Pågående**:
- Mer avancerade fotbollsscenarier
- AI-integration för scenariogenerering
- Supabase backend-setup
- Användarprofiler och autentisering

⏳ **Planerade**:
- Push notifications
- Vänner och social features  
- Offline-funktionalitet
- iOS TestFlight deployment

## 🧠 AI Content Sources

SambaIQ baserar sitt innehåll på etablerade fotbollsorganisationer:

- **FIFA/UEFA**: Officiella regler och utvecklingsprogram
- **SVFF**: Svenska fotbollsförbundets spelarutveckling
- **Elite Academier**: Barcelona La Masia, Ajax, Manchester City
- **Expert Tränare**: Guardiola, Klopp, Cruyff metodiker

Se `AI_CONTENT_SOURCES.md` för fullständig lista.

## 🎓 Pedagogisk Approach

Baserat på Duolingos beprövade metoder:
- **Micro-learning**: 5-10 minuters sessioner
- **Spaced Repetition**: Återkommande koncept
- **Immediate Feedback**: Direkt rätt/fel med förklaring  
- **Progressive Difficulty**: Gradvis ökande komplexitet
- **Social Learning**: Tävla med vänner, dela framsteg

## 🏆 Målgrupper

### 7-9 år: "Mini Champions"
- 7v7 fotbollsplan
- Grundläggande: bollkontroll, passing, shooting
- Stora knappar, enkla animationer, roliga ljud

### 10-12 år: "Tactical Minds"  
- 9v9 fotbollsplan
- Taktiska grunder: formationer, offside, set pieces
- Mer detaljerad plan, komplexa drag

### 13-16 år: "Academy Level"
- 11v11 fullstor plan
- Avancerad taktik: pressing, speluppbyggnad, game management
- Professionell design, avancerade analytics

## 🚀 Deployment

Appen är förberedd för deployment med Expo Application Services (EAS):

```bash
# Installera EAS CLI
npm install -g eas-cli

# Konfigurera projekt
eas build:configure

# Bygg för iOS TestFlight
eas build --platform ios

# Bygg för Android Play Store
eas build --platform android
```

## 🤝 Bidrag

Vi välkomnar bidrag! Fokusområden:

1. **Fler Fotbollsscenarier**: Nya taktiska situationer
2. **AI-förbättringar**: Bättre scenariogenerering
3. **UX-förbättringar**: Smoothare animationer, bättre feedback
4. **Prestanda**: Optimering för äldre enheter
5. **Tillgänglighet**: Support för funktionsnedsättningar

## 📊 Roadmap

### Q1 2024: MVP Launch
- [ ] iOS TestFlight beta
- [ ] 15 hand-crafted scenarios  
- [ ] Basic gamification
- [ ] User testing with 100 kids

### Q2 2024: AI Integration
- [ ] OpenAI scenario generation
- [ ] Personalized difficulty  
- [ ] Android launch
- [ ] 1000+ active users

### Q3 2024: Social Features  
- [ ] Friends system
- [ ] Leaderboards
- [ ] Coach portal
- [ ] 5000+ active users

### Q4 2024: Scale
- [ ] Multiple languages
- [ ] Club partnerships
- [ ] AI coaching insights
- [ ] 25000+ active users

## 📄 Licens

MIT License - se LICENSE fil för detaljer.

## 👨‍💻 Team

Utvecklat med ❤️ av fotbollsentusiaster som tror på att teknik kan göra fotbollsutbildning tillgänglig för alla barn.

---

**"Fotboll spelas med hjärnan först. SambaIQ tränar den hjärnan." - SambaIQ Team**

⚽🧠🏆