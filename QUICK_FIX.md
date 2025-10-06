# 🚑 SNABBFIX för PremiumTheme Error

## Problem:
`TypeError: Cannot read property 'primary' of undefined`

## Lösning:
Ersätt PremiumTheme med hårdkodade färger tills vi löser import-problemet.

## Färger att använda:
- **Background:** `#0F0F0F` (mörk)
- **Surface:** `#1E1E1E` (kort)
- **Accent:** `#FFD700` (guld)
- **Text Primary:** `#FFFFFF` (vit)
- **Text Secondary:** `#CCCCCC` (ljusgrå)

## Snabbt kommando:
```bash
# Ta bort alla PremiumTheme imports temporärt
sed -i '/PremiumTheme/d' src/**/*.tsx
```