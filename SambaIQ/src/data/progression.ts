// SambaIQ Progression System - Duolingo Inspired
export interface ProgressionLevel {
  level: number;
  title: string;
  xpRequired: number;
  xpTotal: number;
  badge?: Badge;
  unlocks: string[];
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
  category: 'tactical' | 'technical' | 'mental' | 'social' | 'achievement';
  requirement: string;
  earned_at?: string;
}

export interface DailyStreak {
  current_streak: number;
  longest_streak: number;
  last_activity: string;
  streak_rewards: {
    day: number;
    reward_type: 'xp_bonus' | 'badge' | 'scenario_unlock' | 'custom_avatar';
    reward_value: string;
  }[];
}

export interface UserProgress {
  // Core Stats
  total_xp: number;
  current_level: number;
  
  // Streaks & Consistency
  daily_streak: DailyStreak;
  
  // Tactical Skills
  tactical_iq: {
    positioning: number;
    passing: number;
    defending: number;
    attacking: number;
    overall: number;
  };
  
  // Collections
  badges_earned: Badge[];
  scenarios_mastered: string[];
  quotes_collected: string[];
  
  // Social
  friends_count: number;
  leaderboard_position: number;
}

// Progression Levels - Football Themed
export const progressionLevels: ProgressionLevel[] = [
  {
    level: 1,
    title: "Rookie Player",
    xpRequired: 0,
    xpTotal: 100,
    description: "Just starting your football journey!",
    unlocks: ["basic_shooting", "basic_passing"]
  },
  {
    level: 2,
    title: "Youth Academy",
    xpRequired: 100,
    xpTotal: 250,
    description: "Learning the fundamentals",
    unlocks: ["defensive_positioning"],
    badge: {
      id: "first_level",
      name: "First Steps",
      description: "Completed your first level up!",
      icon: "⚽",
      rarity: 'bronze',
      category: 'achievement',
      requirement: "Reach level 2"
    }
  },
  {
    level: 3,
    title: "Reserve Team",
    xpRequired: 250,
    xpTotal: 500,
    description: "Building tactical awareness",
    unlocks: ["counter_attacks", "set_pieces_basic"]
  },
  {
    level: 4,
    title: "First Team Player",
    xpRequired: 500,
    xpTotal: 900,
    description: "Ready for serious competition",
    unlocks: ["advanced_formations", "pressing_triggers"]
  },
  {
    level: 5,
    title: "Squad Regular",
    xpRequired: 900,
    xpTotal: 1500,
    description: "Consistent performer",
    unlocks: ["leadership_scenarios", "captain_decisions"],
    badge: {
      id: "squad_regular",
      name: "Squad Regular",
      description: "Earned your place in the team",
      icon: "👕",
      rarity: 'silver',
      category: 'achievement',
      requirement: "Reach level 5"
    }
  },
  {
    level: 10,
    title: "Team Captain",
    xpRequired: 3000,
    xpTotal: 5000,
    description: "Leading by example",
    unlocks: ["tactical_masterclass", "coaching_scenarios"],
    badge: {
      id: "captain",
      name: "Captain's Armband",
      description: "Natural leader on and off the pitch",
      icon: "🔥",
      rarity: 'gold',
      category: 'achievement',
      requirement: "Reach level 10"
    }
  },
  {
    level: 15,
    title: "International Player",
    xpRequired: 8000,
    xpTotal: 12000,
    description: "Representing your country",
    unlocks: ["world_cup_scenarios", "legendary_matches"]
  },
  {
    level: 20,
    title: "Football Legend",
    xpRequired: 15000,
    xpTotal: 25000,
    description: "Among the greatest ever",
    unlocks: ["create_scenarios", "mentor_mode"],
    badge: {
      id: "legend",
      name: "Football Legend",
      description: "Reached legendary status",
      icon: "👑",
      rarity: 'legendary',
      category: 'achievement',
      requirement: "Reach level 20"
    }
  }
];

// Tactical Badges - Inspired by Real Legends
export const tacticalBadges: Badge[] = [
  // Defensive Badges
  {
    id: "maldini_positioning",
    name: "Maldini's Shadow",
    description: "Master defensive positioning like Paolo Maldini",
    icon: "🛡️",
    rarity: 'gold',
    category: 'tactical',
    requirement: "Complete 10 defensive scenarios perfectly"
  },
  {
    id: "baresi_anticipation",
    name: "Baresi's Vision",
    description: "Anticipate attacks before they develop",
    icon: "👁️",
    rarity: 'diamond',
    category: 'tactical',
    requirement: "Intercept 25 attacks through positioning"
  },
  
  // Passing Badges
  {
    id: "xavi_passing",
    name: "Xavi's Touch",
    description: "Thread passes like the Barcelona maestro",
    icon: "🎯",
    rarity: 'gold',
    category: 'tactical',
    requirement: "Complete 20 passing scenarios with 95%+ accuracy"
  },
  {
    id: "pirlo_vision",
    name: "Pirlo's Vision",
    description: "See passes others can't imagine",
    icon: "🔮",
    rarity: 'diamond',
    category: 'tactical',
    requirement: "Find 10 'impossible' pass solutions"
  },
  
  // Leadership Badges
  {
    id: "pep_tactics",
    name: "Guardiola's Mind",
    description: "Think like a tactical genius",
    icon: "🧠",
    rarity: 'legendary',
    category: 'tactical',
    requirement: "Master all tactical scenarios"
  }
];

// Daily Streak Rewards
export const streakRewards = [
  { day: 3, reward_type: 'xp_bonus', reward_value: '25', description: "25% XP Bonus!" },
  { day: 7, reward_type: 'badge', reward_value: 'week_warrior', description: "Week Warrior Badge!" },
  { day: 14, reward_type: 'scenario_unlock', reward_value: 'premium_set', description: "Unlock Premium Scenarios!" },
  { day: 30, reward_type: 'custom_avatar', reward_value: 'legend_kit', description: "Legendary Kit Unlock!" },
  { day: 50, reward_type: 'badge', reward_value: 'dedication', description: "Dedication Master Badge!" },
  { day: 100, reward_type: 'badge', reward_value: 'century', description: "Century Club - Legendary!" }
];

// Helper Functions
export const calculateLevel = (totalXP: number): number => {
  for (let i = progressionLevels.length - 1; i >= 0; i--) {
    if (totalXP >= progressionLevels[i].xpRequired) {
      return progressionLevels[i].level;
    }
  }
  return 1;
};

export const getXPToNextLevel = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelData = progressionLevels.find(l => l.level === currentLevel + 1);
  return nextLevelData ? nextLevelData.xpRequired - totalXP : 0;
};

export const getTacticalIQLevel = (score: number): string => {
  if (score >= 90) return "Genius";
  if (score >= 80) return "Expert";
  if (score >= 70) return "Advanced";
  if (score >= 60) return "Intermediate";
  if (score >= 40) return "Developing";
  return "Beginner";
};

export const getStreakMultiplier = (streakDays: number): number => {
  if (streakDays >= 30) return 2.0;
  if (streakDays >= 14) return 1.5;
  if (streakDays >= 7) return 1.25;
  if (streakDays >= 3) return 1.1;
  return 1.0;
};