# 🧪 SambaIQ Test Scenarios

## 🎯 Scenario 1: "Ditt Första Mål"
**Typ:** Shooting
**Ålder:** 7-9 år

### Test Steps:
1. **Situation:** Spelare framför mål, målvakt på fel sida
2. **Instruktion:** "🎯 Rita linje från spelare till mål för att skjuta"
3. **Förväntad Action:** Rita rak linje från blå spelare till tomma målhörnet
4. **Resultat:** Animation av skott → "MÅÅÅL!" → +50 XP

### Vad att testa:
- ✏️ Rita olika linjer (rak, kurvig, kort, lång)
- 🎯 Testa rita utanför målet vs i mål
- 🔄 Tryck "Rensa" för att börja om
- ↩️ Tryck "Spela Igen" efter success

---

## ⚽ Scenario 2: "Hjälp din Kompis" 
**Typ:** Passing
**Ålder:** 7-9 år

### Test Steps:
1. **Situation:** Lagkamrat Marcus fri framför mål, försvarare blockerar dig
2. **Instruktion:** "⚽ Rita linje från spelare till lagkamrat för att passa"
3. **Förväntad Action:** Rita linje från dig (blå) till Marcus (grön)
4. **Resultat:** Pass-animation → Marcus skjuter → "PERFEKT PASS!" → +75 XP

### Vad att testa:
- 🎯 Rita till rätt lagkamrat (grön cirkel)
- ❌ Rita till motståndare (röd cirkel) - borde ge fel
- 📐 Testa olika passningsvinklar
- 🔄 Jämför med joystick-läge (välj "Spela (Joystick)" från menu)

---

## 🛡️ Scenario 3: "Smart Försvar"
**Typ:** Theory→Practice (Mest avancerad)
**Ålder:** 10-12 år

### Test Steps:
1. **Theory Phase:** Flervalsfråga om defensiv positionering
   - Läs frågan: "Du är back och anfallaren springer mot dig..."
   - Välj rätt svar: "🛡️ Stå mellan boll och mål"
   - Få förklaring varför det är rätt

2. **Practice Phase:** Rita din position
   - **Instruktion:** "🎯 Rita cirkel där du ska positionera dig"
   - **Förväntad Action:** Rita cirkel i gul markerad zon
   - **Resultat:** "PERFEKT DEFENSIV POSITIONERING!" → +100 XP

### Vad att testa:
- 🧠 Theory-fasen: Testa fel svar först, sedan rätt
- 🎯 Practice: Rita cirkel i olika positioner
- ⭕ Testa rita cirkel vs linje vs pil
- 📚 Läs Maldini-citatet i feedback

---

## 🎮 Gesture Recognition Test

### Rita olika former och se vad systemet känner igen:

#### **Linje/Pil (Pass/Skott):**
- Rita rak linje → Borde bli blå streckad linje
- Rita lång linje → Känns igen som "arrow"
- Rita kort linje → Känns igen som "line"

#### **Cirkel (Positionering):**
- Rita cirkel → Borde bli gul fylld cirkel
- Börja och sluta nära samma punkt
- Systemet känner igen som "circle"

#### **Komplex Ritning:**
- Rita flera linjer i följd
- Testa kombinationer
- Se hur systemet tolkar

---

## 🔧 Technical Testing

### Performance Test:
- Rita snabbt och se om det laggar
- Testa på olika enheter
- Kontrollera 60fps smooth drawing

### Error Handling:
- Vad händer om du ritar utanför planen?
- Tryck "Rensa" mitt i ritning
- Navigera bort och tillbaka

### Navigation Test:
- Gå fram och tillbaka mellan scenarios
- Testa båda spellägen (Rita vs Joystick)
- Kontrollera att state sparas korrekt

---

## 📊 Expected Results

### ✅ Success Indicators:
- Smooth ritning utan lag
- Korrekt gesture recognition
- Animationer spelar korrekt
- XP och feedback visas
- Navigation fungerar smidigt

### ❌ Issues att rapportera:
- Ritning känns seg eller hackig
- Fel gesture recognition
- Animationer buggar
- Crash eller freeze
- Navigation-problem

---

## 🎯 Focus Areas för Testing:

1. **User Experience:** Känns ritningen naturlig?
2. **Gesture Recognition:** Känner systemet igen dina intentioner?
3. **Pedagogik:** Är instruktionerna tydliga?
4. **Performance:** Går allt smidigt?
5. **Innovation:** Känns detta bättre än joystick?

**🎨 Detta är världens första "Rita ditt svar" fotbollsapp - testa och upplev revolutionen! ⚽🚀**