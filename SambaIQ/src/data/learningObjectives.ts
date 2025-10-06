// SambaIQ Learning Objectives - Baserat på UEFA/SVFF/FIFA Standards
export interface LearningObjective {
  id: string;
  title: string;
  source: 'UEFA' | 'FIFA' | 'SVFF' | 'La_Masia' | 'Ajax' | 'DFB';
  ageGroup: '7-9' | '10-12' | '13-16';
  category: 'technical' | 'tactical' | 'physical' | 'psychological';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  measurableOutcome: string;
}

// UEFA/SVFF Approved Learning Objectives
export const learningObjectives: LearningObjective[] = [
  // 7-9 ÅR - FIFA Grassroots Programme
  {
    id: 'spatial_awareness_basic',
    title: 'Grundläggande Rumsuppfattning',
    source: 'FIFA',
    ageGroup: '7-9',
    category: 'tactical',
    skillLevel: 'beginner',
    description: 'Förstå var det är säkert/farligt att ha bollen på planen',
    measurableOutcome: 'Kan identifiera 3 säkra zoner på planen'
  },
  {
    id: 'teammate_support',
    title: 'Hjälpa Lagkamrater',
    source: 'SVFF',
    ageGroup: '7-9', 
    category: 'tactical',
    skillLevel: 'beginner',
    description: 'Förstå hur man positionerar sig för att hjälpa lagkamrater',
    measurableOutcome: 'Kan rita var man ska stå för att ta emot pass'
  },

  // 10-12 ÅR - UEFA Foundation Phase
  {
    id: 'defensive_positioning',
    title: 'Grundläggande Defensiv Positionering',
    source: 'UEFA',
    ageGroup: '10-12',
    category: 'tactical',
    skillLevel: 'intermediate',
    description: 'Lära sig täcka farliga zoner och blockera anfall',
    measurableOutcome: 'Kan rita optimal defensiv position i 5 olika situationer'
  },
  {
    id: 'passing_under_pressure',
    title: 'Passningar Under Press',
    source: 'La_Masia',
    ageGroup: '10-12',
    category: 'tactical',
    skillLevel: 'intermediate', 
    description: 'Hitta säkra passningsalternativ när motståndaren pressar',
    measurableOutcome: 'Kan rita 3 olika passningsalternativ under press'
  },

  // 13-16 ÅR - UEFA Specialization Phase
  {
    id: 'formation_understanding',
    title: 'Formationsförståelse',
    source: 'UEFA',
    ageGroup: '13-16',
    category: 'tactical',
    skillLevel: 'advanced',
    description: 'Förstå olika formationer och sina roller inom dem',
    measurableOutcome: 'Kan rita sina ansvar i 4-3-3, 4-4-2, 3-5-2 formationer'
  },
  {
    id: 'pressing_triggers',
    title: 'Pressing Triggers',
    source: 'DFB',
    ageGroup: '13-16',
    category: 'tactical',
    skillLevel: 'advanced',
    description: 'Identifiera när och hur man startar kollektiv pressing',
    measurableOutcome: 'Kan rita pressing-rörelser för hela laget'
  }
];

// AI Question Generation Templates - Baserat på Våra Källor
export const questionTemplates = {
  // UEFA Standard Questions
  uefa_defensive: {
    ageGroup: '10-12',
    source: 'UEFA Pro License Manual',
    template: `
    SITUATION: {match_context}
    LÄRANDE MÅL: {learning_objective}
    
    FRÅGA: "Som {player_role}, vilken yta ska du täcka för att stoppa detta anfall?"
    
    RITA DITT SVAR: Markera området på planen där du ska positionera dig.
    
    BEDÖMNINGSKRITERIER:
    - Täcker du den farligaste passlinje? (30 poäng)
    - Blockerar du skottmöjligheter? (30 poäng)  
    - Ger du dig tid att reagera? (20 poäng)
    - Kommunicerar du med lagkamrater? (20 poäng)
    `
  },

  // La Masia Passing Philosophy
  la_masia_passing: {
    ageGroup: '10-12',
    source: 'Barcelona La Masia Training Manual',
    template: `
    SITUATION: {possession_context}
    LÄRANDE MÅL: Hitta framåtriktade passningar under press
    
    FRÅGA: "Du har bollen och två motståndare pressar dig. Rita det pass som:
    1. Undviker pressen säkert
    2. Flyttar spelet framåt
    3. Sätter lagkamraten i bra position"
    
    RITA DITT SVAR: Dra linje från dig till bästa passningsalternativ.
    
    GUARDIOLA WISDOM: "Det perfekta passet sätter mottagaren i bättre position än passaren"
    `
  },

  // SVFF Age-Appropriate Development  
  svff_youth: {
    ageGroup: '7-9',
    source: 'SVFF Spelarutveckling',
    template: `
    SITUATION: {fun_context}
    LÄRANDE MÅL: Grundläggande spelförståelse
    
    FRÅGA: "Dina kompisar behöver hjälp! Rita var du ska springa för att:
    1. Vara nära nog att få bollen
    2. Hjälpa ditt lag att komma framåt
    3. Ha kul och vara trygg"
    
    RITA DITT SVAR: Rita din löpbana på planen.
    
    ZLATAN WISDOM: "Fotboll ska vara roligt - då spelar man bäst!"
    `
  }
};

// Scenario Generation Based on Real Academy Data
export const academyScenarios = {
  // Ajax TIPS Method Implementation
  ajax_creativity: {
    source: 'Ajax Academy TIPS Method',
    focus: 'Creative problem solving within tactical framework',
    ageAdaptation: {
      '7-9': 'Rita hur du skulle komma runt konen (kreativitet)',
      '10-12': 'Rita din lösning när försvararen blockerar (intelligens)', 
      '13-16': 'Rita lagkamraternas rörelser för att skapa utrymme (taktik)'
    }
  },

  // Guardiola Positional Play
  city_positional: {
    source: 'Manchester City Academy - Pep Guardiola Method',
    focus: 'Understanding space and time in football',
    ageAdaptation: {
      '10-12': 'Rita var du ska stå när vi har bollen (positionsspel)',
      '13-16': 'Rita hur hela laget ska röra sig (kollektiv förståelse)'
    }
  },

  // German DFB Systematic Approach
  dfb_systematic: {
    source: 'DFB Talentförderung Manual',
    focus: 'Step-by-step tactical development',
    ageAdaptation: {
      '10-12': 'Rita steg 1: Var tar du emot bollen?',
      '13-16': 'Rita hela sekvensen: Mottagning → Vändning → Pass'
    }
  }
};

// AI Content Quality Assurance - Based on Our Sources
export const contentValidation = {
  // UEFA Compliance Check
  uefa_standards: [
    'Åldersanpassad komplexitet enligt UEFA Youth Development',
    'Säkerhet först - inga farliga situationer',
    'Inkluderande - fungerar för alla skicklighetsgrader',
    'Pedagogiskt sound - tydliga lärande mål'
  ],

  // SVFF Child Development Standards
  svff_guidelines: [
    'Glädje och utveckling före resultat',
    'Alla får spela - ingen uteslutning',
    'Kreativitet uppmuntras inom struktur',
    'Positiv feedback och uppmuntran'
  ],

  // Academic Research Validation
  research_backed: [
    'Bloom\'s Taxonomy - Tydliga kunskapsnivåer',
    'Flow Theory - Optimal challenge/skill balance',
    'Constructivist Learning - Barnet bygger egen förståelse',
    'Social Learning - Lär från lagkamrater och förebilder'
  ]
};

export default {
  learningObjectives,
  questionTemplates,
  academyScenarios,
  contentValidation
};