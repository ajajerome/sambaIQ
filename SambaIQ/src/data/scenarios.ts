// Mock scenarios data - kommer från AI/Supabase senare
export const scenarios = {
  'scenario_1': {
    id: 'scenario_1',
    title: 'Ditt Första Mål',
    description: 'Du har bollen framför målet. Målvakten är på fel sida. Styr nära bollen och skjut mot det tomma hörnet!',
    ageGroup: '7-9',
    difficulty: 1,
    xp: 50,
    type: 'shooting',
    setup: {
      playerPosition: { x: 50, y: 70 },
      ballPosition: { x: 50, y: 70 },
      goalkeeperPosition: { x: 30, y: 95 },
      targetArea: { x: 70, y: 95, radius: 15 },
      teammates: [],
      opponents: []
    },
    correctSolution: {
      action: 'shoot',
      targetX: 70,
      targetY: 95,
      explanation: 'Perfekt! Du såg att målvakten var på fel sida och sköt mot det tomma hörnet. Det här är smart fotboll!'
    },
    coaching: {
      quote: "Som Messi sa: 'Det handlar om att fatta rätt beslut på rätt tid.'",
      tip: 'Titta alltid var målvakten är innan du skjuter!'
    }
  },

  'scenario_2': {
    id: 'scenario_2', 
    title: 'Hjälp din Kompis',
    description: 'Din lagkamrat Marcus är helt fri framför mål! Försvararen blockerar dig. Passa bollen till Marcus så han kan göra mål!',
    ageGroup: '7-9',
    difficulty: 2,
    xp: 75,
    type: 'passing',
    setup: {
      playerPosition: { x: 40, y: 60 },
      ballPosition: { x: 40, y: 60 },
      goalkeeperPosition: { x: 50, y: 95 },
      targetArea: { x: 70, y: 75, radius: 12 }, // Where teammate is
      teammates: [
        { id: 'marcus', name: 'Marcus', position: { x: 70, y: 75 }, isFree: true }
      ],
      opponents: [
        { id: 'defender1', position: { x: 55, y: 70 }, isBlocking: true }
      ]
    },
    correctSolution: {
      action: 'pass',
      targetX: 70,
      targetY: 75,
      explanation: 'Briliant pass! Du såg att Marcus var fri och passade perfekt. Nu kan han göra mål! Det här är lagarbete när det är som bäst!'
    },
    coaching: {
      quote: "Som Xavi sa: 'Fotboll handlar om att hitta den fria spelaren.'",
      tip: 'Kolla alltid runt dig efter fria lagkamrater innan du bestämmer dig!'
    }
  },

  'scenario_3': {
    id: 'scenario_3',
    title: 'Smart Försvar',
    description: 'Motståndaren anfaller med bollen. Du är back. Var ska du positionera dig?',
    ageGroup: '10-12',
    difficulty: 3,
    xp: 100,
    type: 'theory_practice', // Ny typ!
    question: {
      text: 'Du är back och anfallaren springer mot dig med bollen. Var ska du stå för bäst försvar?',
      context: 'Försvarsprincipen - Grundläggande positionering',
      options: [
        {
          id: 'A',
          text: '🏃‍♂️ Springa rakt mot bollen',
          isCorrect: false,
          explanation: 'Nej, då blir du lätt att passera med en körning eller pass.'
        },
        {
          id: 'B', 
          text: '🛡️ Stå mellan boll och mål',
          isCorrect: true,
          explanation: 'Rätt! Du täcker den farligaste vägen och tvingar anfallaren till svårare alternativ.'
        },
        {
          id: 'C',
          text: '👀 Backa mot mållinjen',
          isCorrect: false,
          explanation: 'Nej, då ger du anfallaren för mycket utrymme att accelerera.'
        }
      ]
    },
    setup: {
      playerPosition: { x: 30, y: 60 }, // Start position (fel position)
      ballPosition: { x: 15, y: 45 }, 
      goalkeeperPosition: { x: 50, y: 95 },
      targetArea: { x: 35, y: 70, radius: 12 }, // Rätt defensive position
      teammates: [],
      opponents: [
        { id: 'attacker1', position: { x: 15, y: 45 }, hasBall: true }
      ],
      markings: [
        { type: 'zone', x: 35, y: 70, width: 20, height: 15, color: '#FFD700' },
        { type: 'arrow', x: 30, y: 60, direction: 135, color: '#00B04F' }
      ]
    },
    correctSolution: {
      action: 'position',
      targetX: 35,
      targetY: 70,
      explanation: 'Perfekt defensiv positionering! Du täcker vägen till mål och tvingar anfallaren att välja sämre alternativ. Det här är proaktivt försvarsspel!'
    },
    coaching: {
      quote: "Som Paolo Maldini sa: 'Det bästa försvaret är att läsa spelet innan det händer.'",
      tip: 'Täck alltid den farligaste linjen - vägen till mål!'
    }
  }
};

export type ScenarioType = typeof scenarios[keyof typeof scenarios];