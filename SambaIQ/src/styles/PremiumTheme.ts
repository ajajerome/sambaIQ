// SambaIQ Premium Color System
export const PremiumColors = {
  // Primary Palette - Dark & Premium
  primary: {
    black: '#000000',
    charcoal: '#1C1C1E',
    darkGray: '#2C2C2E',
    mediumGray: '#48484A',
    lightGray: '#8E8E93'
  },
  
  // Gold Accents - Luxury Feel
  gold: {
    bright: '#FFD700',
    warm: '#FFA500', 
    deep: '#B8860B',
    subtle: '#F4E98A'
  },
  
  // Functional Colors
  success: '#FFD700',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#8E8E93',
    tertiary: '#48484A',
    inverse: '#000000'
  },
  
  // Background Colors
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
    card: 'rgba(28, 28, 30, 0.9)',
    overlay: 'rgba(0, 0, 0, 0.8)'
  },
  
  // Gradients
  gradients: {
    primary: ['#000000', '#1C1C1E'],
    gold: ['#FFD700', '#FFA500'],
    subtle: ['#1C1C1E', '#2C2C2E'],
    success: ['#FFD700', '#F4E98A']
  }
};

// Premium Theme Configuration
export const PremiumTheme = {
  colors: PremiumColors,
  
  // Typography
  typography: {
    h1: { fontSize: 32, fontWeight: '700', color: PremiumColors.text.primary },
    h2: { fontSize: 24, fontWeight: '600', color: PremiumColors.text.primary },
    h3: { fontSize: 20, fontWeight: '600', color: PremiumColors.text.primary },
    body: { fontSize: 16, fontWeight: '400', color: PremiumColors.text.secondary },
    caption: { fontSize: 12, fontWeight: '500', color: PremiumColors.text.tertiary }
  },
  
  // Shadows & Effects
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2
    },
    medium: {
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 10
    }
  },
  
  // Border Radius
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xl: 24
  }
};