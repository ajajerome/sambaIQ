// SambaIQ Premium Dark Theme
export const PremiumTheme = {
  // Primary Colors
  primary: '#FFD700',        // Premium Gold
  primaryDark: '#FFC107',    // Darker Gold
  secondary: '#1A1A1A',      // Deep Black
  background: '#0F0F0F',     // Almost Black
  surface: '#1E1E1E',        // Dark Surface
  
  // Accent Colors
  accent: '#FFD700',         // Gold Accent
  success: '#00D4AA',        // Success Green
  warning: '#FF9500',        // Warning Orange
  error: '#FF3B30',          // Error Red
  info: '#007AFF',           // Info Blue
  
  // Text Colors
  text: {
    primary: '#FFFFFF',      // White Text
    secondary: '#CCCCCC',    // Light Gray
    tertiary: '#999999',     // Medium Gray
    disabled: '#666666',     // Dark Gray
    inverse: '#000000',      // Black Text (for light backgrounds)
  },
  
  // Football Specific
  football: {
    pitch: '#0F5132',       // Dark Green Pitch
    pitchLines: '#FFFFFF',  // White Lines
    homeTeam: '#007AFF',    // Blue Team
    awayTeam: '#FF3B30',    // Red Team
    ball: '#FFFFFF',        // White Ball
    goalkeeper: '#FF6B35',  // Orange Goalkeeper
  },
  
  // UI Elements
  ui: {
    card: '#1E1E1E',         // Card Background
    cardBorder: '#333333',   // Card Border
    button: '#FFD700',       // Primary Button
    buttonText: '#000000',   // Button Text
    input: '#2A2A2A',        // Input Background
    divider: '#333333',      // Divider Line
  },
  
  // Gradients
  gradients: {
    primary: ['#FFD700', '#FFC107'],
    background: ['#0F0F0F', '#1A1A1A'],
    card: ['#1E1E1E', '#2A2A2A'],
    pitch: ['#0F5132', '#1B5E20'],
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border Radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  
  // Typography
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' as const },
    h2: { fontSize: 28, fontWeight: 'bold' as const },
    h3: { fontSize: 24, fontWeight: '600' as const },
    h4: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: 'normal' as const },
    caption: { fontSize: 14, fontWeight: 'normal' as const },
    small: { fontSize: 12, fontWeight: 'normal' as const },
  },
};

export default PremiumTheme;