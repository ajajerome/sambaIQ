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
  }
};

export type ScenarioType = typeof scenarios[keyof typeof scenarios];