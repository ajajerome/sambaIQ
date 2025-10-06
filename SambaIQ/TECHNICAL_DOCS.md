# SambaIQ Technical Documentation 🛠️⚽

## 📋 Architecture Overview

### System Design
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Native  │────│    Supabase      │────│   External APIs │
│   Frontend      │    │    Backend       │    │                 │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • Screens       │    │ • PostgreSQL     │    │ • OpenAI GPT-4  │
│ • Components    │    │ • Auth           │    │ • Stripe        │
│ • Navigation    │    │ • Realtime       │    │ • Analytics     │
│ • State Mgmt    │    │ • Storage        │    │ • Push Notifs   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## 🏗️ Frontend Architecture

### Core Technologies
- **Framework:** React Native 0.74.5
- **SDK:** Expo 51.0.32 (upgraded from 54.0.0 in development)
- **Language:** TypeScript
- **Styling:** StyleSheet + LinearGradient
- **Navigation:** React Navigation v6 (Stack + Tab)

### Project Structure
```
SambaIQ/
├── App.tsx                    # Root component with GestureHandler
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── ProgressHeader.tsx     # Duolingo-style progress
│   │   │   ├── LevelUpModal.tsx       # Celebration animations
│   │   │   ├── QuestionScreen.tsx     # Theory phase UI
│   │   │   ├── VirtualJoystick.tsx    # FIFA Mobile style control
│   │   │   ├── ShootButton.tsx        # Action button component
│   │   │   └── PassButton.tsx         # Action button component
│   │   └── football/         # Football-specific components
│   │       ├── PremiumPitch.tsx       # Enhanced SVG pitch
│   │       ├── PitchMarking.tsx       # Tactical overlays
│   │       └── PlayerDirectionArrow.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   └── OnboardingScreen.tsx   # Cultural selection flow
│   │   ├── game/
│   │   │   ├── HomeScreen.tsx         # Dashboard with progression
│   │   │   ├── PlayScreen.tsx         # Scenario selection
│   │   │   └── GameScreen.tsx         # Interactive gameplay
│   │   ├── profile/
│   │   └── social/
│   ├── navigation/
│   │   └── AppNavigator.tsx          # Navigation hierarchy
│   ├── data/
│   │   ├── regions.ts               # Football culture definitions
│   │   ├── scenarios.ts             # Scenario content
│   │   └── progression.ts           # Levels, badges, XP system
│   ├── services/
│   │   └── supabase.ts             # Backend integration
│   └── types/
│       └── index.ts                # TypeScript interfaces
```

---

## 🎮 Core Systems

### 1. Cultural Selection System
**File:** `src/data/regions.ts`
```typescript
interface FootballRegion {
  id: string;
  name: string;
  philosophy: string;
  ageApproach: {
    positionAge: number;        // When to introduce positions
    specialization: 'early' | 'balanced' | 'late';
  };
  coachingStyle: {
    emphasis: string[];
    quotes: Array<{text: string; author: string}>;
  };
}
```

**Regions Implemented:**
- **Nordic** (Sweden/Norway/Denmark): Late specialization, joy-focused
- **Latin** (Brazil/Argentina): Creative flair, technical excellence
- **Systematic** (Germany/Netherlands): Structured progression
- **Competitive** (USA): Early specialization, performance-focused
- **Traditional** (England): Physical/mental toughness
- **Global Mix**: Best of all approaches

### 2. Progression System
**File:** `src/data/progression.ts`
```typescript
interface UserProgress {
  total_xp: number;
  current_level: number;
  daily_streak: DailyStreak;
  tactical_iq: {
    positioning: number;
    passing: number;
    defending: number;
    attacking: number;
    overall: number;
  };
  badges_earned: Badge[];
  scenarios_mastered: string[];
}
```

**Level Progression:** 20 levels from "Rookie Player" to "Football Legend"
**Badge System:** Bronze/Silver/Gold/Diamond/Legendary tiers
**Streak Rewards:** 3, 7, 14, 30, 50, 100 day milestones

### 3. Theory→Practice Learning System
**Implementation:** `GameScreen.tsx` + `QuestionScreen.tsx`

**Flow:**
1. **Theory Phase:** Multiple choice tactical question
2. **Transition:** Seamless switch to practice mode  
3. **Practice Phase:** Interactive positioning with joystick
4. **Validation:** Progressive feedback instead of binary success/fail
5. **Celebration:** XP gain, badge unlocks, level progression

### 4. Interactive Gameplay
**Controls:** Custom `VirtualJoystick` component with FIFA Mobile styling
**Graphics:** Enhanced SVG pitch with gradients and professional markings
**Physics:** Smooth animations using React Native Animated API
**Orientation:** Forced landscape mode for immersive gaming

---

## 🗄️ Data Models

### Scenarios
```typescript
interface ScenarioType {
  id: string;
  title: string;
  type: 'shooting' | 'passing' | 'positioning' | 'theory_practice';
  setup: {
    playerPosition: Position;
    ballPosition: Position;
    teammates?: Array<{id: string; position: Position}>;
    opponents?: Array<{id: string; position: Position}>;
    markings?: Array<PitchMarking>;
  };
  question?: {
    text: string;
    options: QuestionOption[];
  };
  correctSolution: {
    explanation: string;
    targetX: number;
    targetY: number;
  };
}
```

### User State Management
**Current:** React useState + AsyncStorage
**Future:** Redux Toolkit + Supabase realtime

---

## 🚀 Deployment Pipeline

### EAS Build Configuration
**File:** `eas.json`
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Update Strategy
- **Development:** EAS development builds for major features
- **Testing:** TestFlight for milestone releases  
- **Hot Fixes:** EAS OTA updates for JavaScript changes
- **CI/CD:** GitHub Actions for automated deployment (planned)

---

## 🔧 Development Workflow

### Local Development
```bash
# Start development server
npx expo start --dev-client

# For web testing (limited features)
npx expo start --web

# Build for device testing
eas build --platform ios --profile development
```

### Update Deployment
```bash
# Quick JavaScript updates (30 seconds)
eas update --branch production --message "Bug fixes"

# Full rebuild for native changes (15 minutes)  
eas build --platform ios --profile preview
```

### Testing Strategy
- **Manual Testing:** Physical device with TestFlight
- **Automated Testing:** Jest unit tests (to be implemented)
- **Performance:** 60fps target on iPhone SE and newer

---

## 📊 Performance Considerations

### Optimization Techniques
- **SVG Caching:** Reuse pitch components
- **Animation Performance:** useNativeDriver where possible
- **Memory Management:** Proper cleanup of timers and listeners
- **Bundle Size:** Tree shaking and code splitting

### Monitoring
- **Metrics:** Frame rate, memory usage, crash reports
- **Tools:** Flipper (development), Sentry (production planned)
- **Targets:** <100ms interaction response, 60fps animations

---

## 🔒 Security & Privacy

### Data Protection
- **Local Storage:** AsyncStorage for user preferences
- **Backend Security:** Supabase Row Level Security (RLS)
- **COPPA Compliance:** Parental consent for users under 13
- **GDPR Ready:** Data export and deletion capabilities

### Authentication
- **Current:** Simple onboarding flow
- **Planned:** Supabase Auth with social logins
- **Parental Controls:** Age verification and monitoring

---

## 🧪 Testing Framework

### Current Testing
- **Manual QA:** Device testing with real scenarios
- **User Feedback:** Direct iteration based on usage
- **Performance:** Visual frame rate monitoring

### Planned Testing
- **Unit Tests:** Jest + React Native Testing Library
- **E2E Tests:** Detox for critical user flows
- **Analytics:** User behavior tracking and funnel analysis

---

## 📈 Scalability Planning

### Performance Scaling
- **Code Splitting:** Lazy load scenario content
- **Caching Strategy:** Offline-first architecture
- **CDN Integration:** Asset delivery optimization

### Content Scaling  
- **AI Generation:** Dynamic scenario creation
- **Localization:** Multi-language support framework
- **A/B Testing:** Experimental feature rollouts

---

## 🚧 Known Technical Debt

### High Priority Fixes
- [ ] Replace mock data with Supabase integration
- [ ] Implement proper error handling and retry logic
- [ ] Add comprehensive TypeScript type coverage
- [ ] Optimize bundle size and startup time

### Medium Priority Improvements
- [ ] Implement automated testing suite
- [ ] Add accessibility features (VoiceOver, etc.)
- [ ] Performance monitoring and crash reporting
- [ ] Offline mode for core scenarios

---

## 🔄 Migration Notes

### Expo SDK Upgrades
- **Current:** SDK 54 (development)
- **Target:** Latest stable SDK for production
- **Considerations:** Native dependency compatibility

### React Native Updates
- **Current:** 0.74.5
- **Strategy:** Conservative updates after stability testing
- **Breaking Changes:** Architecture migration plan documented

---

*Technical documentation maintained by development team*
*Last updated: 2025-10-04*
*Next review: After major feature releases*