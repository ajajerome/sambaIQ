// SambaIQ Types
export interface User {
  id: string;
  age: number;
  name: string;
  avatar_url?: string;
  created_at: string;
  level: number;
  xp: number;
  streak_days: number;
  last_played: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  age_group: '7-9' | '10-12' | '13-16';
  difficulty: number; // 1-10
  learning_objective: string;
  pitch_size: '7v7' | '9v9' | '11v11';
  setup: ScenarioSetup;
  correct_solution: Solution;
  rewards: Rewards;
  created_at: string;
}

export interface ScenarioSetup {
  description: string;
  player_positions: Position[];
  opponent_positions: Position[];
  ball_position: Position;
  context: string;
}

export interface Position {
  x: number; // 0-100 percentage of pitch width
  y: number; // 0-100 percentage of pitch height
  player_id?: string;
  team: 'home' | 'away';
}

export interface Solution {
  action: 'drag_player' | 'pass_ball' | 'shoot' | 'defend';
  target_position: Position;
  explanation: string;
  coaching_tip: string;
  famous_quote?: Quote;
}

export interface Quote {
  text: string;
  author: string;
  context: string;
}

export interface Rewards {
  xp: number;
  badge?: Badge;
  unlock_next?: boolean;
  celebration_type: 'goal' | 'assist' | 'save' | 'tackle';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GameSession {
  id: string;
  user_id: string;
  scenarios_completed: string[];
  xp_gained: number;
  streak_maintained: boolean;
  duration_minutes: number;
  started_at: string;
  completed_at?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar_url?: string;
  level: number;
  xp: number;
  last_online: string;
}

export interface LeaderboardEntry {
  user_id: string;
  name: string;
  avatar_url?: string;
  xp: number;
  level: number;
  position: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked_at?: string;
  progress?: number;
  max_progress?: number;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Play: undefined;
  Profile: undefined;
  Friends: undefined;
};

export type PlayStackParamList = {
  Scenarios: undefined;
  Game: { scenarioId: string };
  Results: { sessionId: string };
};

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface ScenarioGenerationRequest {
  age: number;
  current_level: number;
  learning_focus: string;
  difficulty_preference: number;
  previous_scenarios: string[];
}