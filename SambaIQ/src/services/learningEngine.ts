// Enhanced Interactive Learning System
export interface LearningFeedback {
  positionQuality: number; // 0-100
  threatLevel: number;     // 0-100  
  hints: string[];
  visualFeedback: {
    heatMap: boolean;
    ghostPlayer: boolean;
    threatLines: boolean;
  };
}

export const calculatePositionFeedback = (
  playerPos: Position,
  scenario: ScenarioType
): LearningFeedback => {
  const { targetArea, opponents, teammates } = scenario.setup;
  
  // Calculate distance to optimal position
  const distanceToOptimal = Math.sqrt(
    Math.pow(playerPos.x - targetArea.x, 2) + 
    Math.pow(playerPos.y - targetArea.y, 2)
  );
  
  // Calculate threat coverage
  const threatCoverage = calculateThreatCoverage(playerPos, opponents);
  
  // Generate contextual hints
  const hints = generateHints(distanceToOptimal, threatCoverage, scenario);
  
  return {
    positionQuality: Math.max(0, 100 - (distanceToOptimal * 5)),
    threatLevel: Math.max(0, 100 - threatCoverage),
    hints,
    visualFeedback: {
      heatMap: distanceToOptimal > 10,
      ghostPlayer: distanceToOptimal > 15,
      threatLines: threatCoverage < 70
    }
  };
};

const generateHints = (distance: number, coverage: number, scenario: ScenarioType): string[] => {
  const hints: string[] = [];
  
  if (distance > 15) {
    hints.push("Du är för långt från optimal position...");
  } else if (distance > 8) {
    hints.push("Du närmar dig! Fortsätt i denna riktning.");
  } else if (distance > 3) {
    hints.push("Nästan perfekt! Justera lite till.");
  } else {
    hints.push("Excellent positioning! 🔥");
  }
  
  if (coverage < 50) {
    hints.push("Tänk på vilken väg motståndaren kan ta mot mål...");
  } else if (coverage < 80) {
    hints.push("Bra försvar! Du täcker de farligaste zonerna.");
  }
  
  // Add scenario-specific coaching
  if (scenario.coaching?.tip) {
    hints.push(`💡 ${scenario.coaching.tip}`);
  }
  
  return hints;
};