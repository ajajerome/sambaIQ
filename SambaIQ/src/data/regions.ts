// Global Football Culture Regions
export interface FootballRegion {
  id: string;
  name: string;
  flag: string;
  shortName: string;
  philosophy: string;
  description: string;
  ageApproach: {
    earlyFocus: string;
    positionAge: number;
    specialization: 'early' | 'balanced' | 'late';
  };
  coachingStyle: {
    emphasis: string[];
    quotes: {
      text: string;
      author: string;
    }[];
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const footballRegions: FootballRegion[] = [
  {
    id: 'nordic',
    name: 'Nordic Style',
    flag: '🇸🇪',
    shortName: 'Skandinavisk',
    philosophy: 'Utveckling genom glädje - spela länge, specialisera sent',
    description: 'Fokus på spelglädje, kreativitet och sen specialisering. Alla får spela överallt tills tonåren.',
    ageApproach: {
      earlyFocus: 'Allmän fotbollsförståelse och glädje',
      positionAge: 13,
      specialization: 'late'
    },
    coachingStyle: {
      emphasis: ['creativity', 'joy', 'understanding', 'teamwork'],
      quotes: [
        {
          text: 'Spela med glädje först - resten kommer sedan',
          author: 'Zlatan Ibrahimović'
        },
        {
          text: 'Det viktiga är att barnen älskar fotboll',
          author: 'Sven-Göran Eriksson'
        }
      ]
    },
    colors: {
      primary: '#006AA7',
      secondary: '#FECC00', 
      accent: '#FFFFFF'
    }
  },

  {
    id: 'latin',
    name: 'Latin Flair',
    flag: '🇧🇷',
    shortName: 'Latinamerikansk',
    philosophy: 'Kreativitet och teknik - lös det med stil och improvisation',
    description: 'Teknisk excellens, kreativ problemlösning och individuell briljans i lagsammanhang.',
    ageApproach: {
      earlyFocus: 'Teknisk utveckling och kreativitet',
      positionAge: 11,
      specialization: 'balanced'
    },
    coachingStyle: {
      emphasis: ['technique', 'creativity', 'flair', 'individual_skill'],
      quotes: [
        {
          text: 'Fotboll är konst, och konstnärer ska vara fria',
          author: 'Pelé'
        },
        {
          text: 'Spela vackert, vinn med stil',
          author: 'Ronaldinho'
        }
      ]
    },
    colors: {
      primary: '#009739',
      secondary: '#FEDD00',
      accent: '#012169'
    }
  },

  {
    id: 'systematic',
    name: 'Systematic',
    flag: '🇩🇪',
    shortName: 'Systematisk',
    philosophy: 'Teknik först, taktik sen - bygga sten för sten metodiskt',
    description: 'Strukturerad utveckling, teknisk grund och gradvis taktisk fördjupning.',
    ageApproach: {
      earlyFocus: 'Teknisk grund och förståelse',
      positionAge: 12,
      specialization: 'balanced'
    },
    coachingStyle: {
      emphasis: ['technique', 'tactics', 'structure', 'progression'],
      quotes: [
        {
          text: 'Perfekt teknik är grunden för allt annat',
          author: 'Thomas Müller'
        },
        {
          text: 'Disciplin och kreativitet går hand i hand',
          author: 'Jürgen Klopp'
        }
      ]
    },
    colors: {
      primary: '#000000',
      secondary: '#DD0000',
      accent: '#FFCE00'
    }
  },

  {
    id: 'competitive',
    name: 'Competitive',
    flag: '🇺🇸',
    shortName: 'Konkurrensinriktad',
    philosophy: 'Specialisera tidigt - bli bäst på din position med målmedvetenhet',
    description: 'Tidig positionsspecialisering, konkurrenskraft och målmedveten utveckling.',
    ageApproach: {
      earlyFocus: 'Positionsspecifik träning',
      positionAge: 9,
      specialization: 'early'
    },
    coachingStyle: {
      emphasis: ['specialization', 'competition', 'goal_oriented', 'performance'],
      quotes: [
        {
          text: 'Träna hårt, drömma stort, aldrig ge upp',
          author: 'Christian Pulisic'
        },
        {
          text: 'Framgång kommer till dem som vill det mest',
          author: 'Megan Rapinoe'
        }
      ]
    },
    colors: {
      primary: '#B22234',
      secondary: '#FFFFFF',
      accent: '#3C3B6E'
    }
  },

  {
    id: 'traditional',
    name: 'Traditional',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    shortName: 'Traditionell',
    philosophy: 'Fysik och mentalitet - spela med hjärtat och brittisk anda',
    description: 'Fysisk styrka, mental toughness och traditionell britttisk fotbollsanda.',
    ageApproach: {
      earlyFocus: 'Fysik och mentalitet',
      positionAge: 11,
      specialization: 'balanced'
    },
    coachingStyle: {
      emphasis: ['physicality', 'mentality', 'determination', 'tradition'],
      quotes: [
        {
          text: 'Fotboll är en kontaktsport för tuffa människor',
          author: 'Harry Kane'
        },
        {
          text: 'Ge aldrig upp, kämpa till slutsignalen',
          author: 'Steven Gerrard'
        }
      ]
    },
    colors: {
      primary: '#012169',
      secondary: '#FFFFFF',
      accent: '#C8102E'
    }
  },

  {
    id: 'global_mix',
    name: 'Global Mix',
    flag: '🌍',
    shortName: 'Global Mix',
    philosophy: 'Bästa från alla kulturer - adaptiv approach för modern fotboll',
    description: 'Kombinerar det bästa från alla fotbollskulturer för en holistisk utveckling.',
    ageApproach: {
      earlyFocus: 'Adaptiv och flexibel approach',
      positionAge: 12,
      specialization: 'balanced'
    },
    coachingStyle: {
      emphasis: ['adaptability', 'global_perspective', 'balanced_approach', 'modern_football'],
      quotes: [
        {
          text: 'Modern fotboll kräver alla kvaliteter',
          author: 'Pep Guardiola'
        },
        {
          text: 'Lära från världens bästa, bli din egen spelare',
          author: 'Ancelotti'
        }
      ]
    },
    colors: {
      primary: '#1E40AF',
      secondary: '#10B981',
      accent: '#F59E0B'
    }
  }
];

// Helper functions
export const getRegionById = (id: string): FootballRegion | undefined => {
  return footballRegions.find(region => region.id === id);
};

export const getRegionQuote = (regionId: string): string => {
  const region = getRegionById(regionId);
  if (!region || region.coachingStyle.quotes.length === 0) {
    return "Fotboll är det vackraste spelet i världen!";
  }
  
  const randomQuote = region.coachingStyle.quotes[
    Math.floor(Math.random() * region.coachingStyle.quotes.length)
  ];
  
  return `"${randomQuote.text}" - ${randomQuote.author}`;
};

export const shouldUsePositions = (regionId: string, age: number): boolean => {
  const region = getRegionById(regionId);
  if (!region) return false;
  
  return age >= region.ageApproach.positionAge;
};