// src/app/models/quiz.model.ts

export interface QuizOption {
  text: string;
  points: number;
  label: string; // A, B, C, D
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: QuizOption[];
  timeLimit: number; // seconds
}

export interface PersonaProfile {
  id: string;
  name: string;
  tagline: string;
  scoreMin: number;
  scoreMax: number;
  executiveSummary: string;
  pressureProfile: string;
  clarityDescription: string;
  aiTransformation: string;
  aiFocus24: string;
  riskResilience: string;
  riskFocus24: string;
  growthVolatility: string;
  growthFocus24: string;
  closingReflection: string;
  color: string;
  icon: string;
}

export interface QuizResult {
  firstName: string;
  lastName: string;
  email?: string;
  country?: string;
  answers: { questionId: number; selectedOption: string; points: number }[];
  totalScore: number;
  persona: PersonaProfile;
  completedAt: Date;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'The path narrows. Cracks form beneath your feet. Lights flicker along the edges.',
    question: 'What do you do? Which do you choose?',
    timeLimit: 10,
    options: [
      { label: 'A', text: 'Push forward and deal with issues later', points: 4 },
      { label: 'B', text: 'Stabilize the foundation, knowing it will delay progress', points: 3 },
      { label: 'C', text: 'Pause to assess risks and move forward with the fewest unknowns', points: 2 },
      { label: 'D', text: 'Check on the team behind you before continuing', points: 1 }
    ]
  },
  {
    id: 2,
    scenario: 'Three paths diverge ahead. An opportunity opens up. Each direction leads forward.',
    question: "You won't have time to explore all of them. Which do you choose?",
    timeLimit: 10,
    options: [
      { label: 'A', text: 'One is fast but unfinished', points: 4 },
      { label: 'B', text: 'One is solid but crowded', points: 3 },
      { label: 'C', text: 'One is steady, but not exciting', points: 2 },
      { label: 'D', text: 'One is new, but unproven', points: 1 }
    ]
  },
  {
    id: 3,
    scenario: 'Alerts overlay the screen. A countdown timer appears. Everything hits at once — four interruptions animate in rapidly.',
    question: 'Player must act or time expires. Which do you address?',
    timeLimit: 8,
    options: [
      { label: 'A', text: 'A competitive move in the market', points: 4 },
      { label: 'B', text: 'A customer escalation that needs attention', points: 3 },
      { label: 'C', text: 'A resource bottleneck or unexpected staffing gap', points: 2 },
      { label: 'D', text: 'An internal system warning that could cause problems later', points: 1 }
    ]
  },
  {
    id: 4,
    scenario: 'Team avatars trail behind. Some slow down. Others drift off the path.',
    question: 'What do you do?',
    timeLimit: 10,
    options: [
      { label: 'A', text: 'Push ahead and trust the team to catch up', points: 4 },
      { label: 'B', text: 'Delegate responsibility and keep moving forward', points: 3 },
      { label: 'C', text: 'Regroup and realign without losing direction', points: 2 },
      { label: 'D', text: 'Slow down to get the disengaged ones back on track, even if progress is delayed', points: 1 }
    ]
  },
  {
    id: 5,
    scenario: 'The path disappears completely. You need clarity to move forward.',
    question: 'What do you do?',
    timeLimit: 10,
    options: [
      { label: 'A', text: 'Push forward and adjust once patterns emerge', points: 4 },
      { label: 'B', text: 'Pull the team together to align before moving', points: 3 },
      { label: 'C', text: 'Set a provisional course, and proceed cautiously', points: 2 },
      { label: 'D', text: 'Define guardrails so movement doesn\'t create damage', points: 1 }
    ]
  }
];

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: 'compass',
    name: 'Compass',
    tagline: 'See further ahead',
    scoreMin: 18,
    scoreMax: 20,
    color: '#1a3a5c',
    icon: '🧭',
    executiveSummary: 'You create clarity by moving decisively once direction is clear. Under pressure, you act quickly, favoring momentum over perfect information.',
    pressureProfile: 'You maintain momentum even in uncertainty, deferring reinforcement to avoid slowing down. Best in dynamic environments; benefits from guardrails.',
    clarityDescription: 'Clarity improves when decisions are made quickly and revisited. You commit early and adjust later; increases speed but risks instability.',
    aiTransformation: 'You drive value when AI is embedded into operations quickly. Clarity comes from knowing when to standardize vs. accelerate everything.',
    aiFocus24: 'Embed AI for immediate value; standardize selectively.',
    riskResilience: 'You take a momentum-first posture, absorbing risk to avoid delay. Needs strong recovery paths to avoid fragility.',
    riskFocus24: 'Define recovery paths; reduce hidden risk accumulation.',
    growthVolatility: 'You respond well to market pressure but risk taking on too much. Clarity comes from capacity discipline.',
    growthFocus24: 'Limit parallel responses; preserve leadership attention.',
    closingReflection: 'Clarity comes from movement; paired with discipline, momentum becomes an advantage.'
  },
  {
    id: 'accelerator',
    name: 'Accelerator',
    tagline: 'Move faster',
    scoreMin: 14,
    scoreMax: 17,
    color: '#2563a8',
    icon: '⚡',
    executiveSummary: 'You create clarity by reinforcing foundations before accelerating. Under pressure, you slow down to reduce volatility and strengthen system resilience.',
    pressureProfile: 'You prioritize directional clarity over competing demands, deferring short-term optimization to preserve coherence.',
    clarityDescription: 'Clarity improves when decisions are grounded in stability. You strengthen foundations before advancing.',
    aiTransformation: 'You benefit from platform-first AI strategies emphasizing readiness, governance, and data quality before scale.',
    aiFocus24: 'Accelerate where foundations are strong; avoid early over-engineering.',
    riskResilience: 'You take a preventative posture well-suited to rising risk pressure; works best when stability doesn\'t delay action.',
    riskFocus24: 'Maintain foundational controls; prevent silent risk build-up.',
    growthVolatility: 'You protect the organization during turbulence but may delay bold moves. Clarity improves with selective acceleration.',
    growthFocus24: 'Balance caution with decisiveness; define thresholds for action.',
    closingReflection: 'Clarity comes from knowing the organization can withstand pressure; paired with timely action, this builds lasting confidence.'
  },
  {
    id: 'beacon',
    name: 'Beacon',
    tagline: 'Stay connected to your team',
    scoreMin: 10,
    scoreMax: 13,
    color: '#0891b2',
    icon: '💡',
    executiveSummary: 'You create clarity by aligning people, systems, and priorities. Under pressure, you prioritize bringing the organization with you.',
    pressureProfile: 'You prioritize team alignment over short-term speed, deferring solo execution for coordinated movement.',
    clarityDescription: 'Clarity improves when decisions are socialized and shared. You invest in alignment before commitment.',
    aiTransformation: 'You succeed when AI ownership and adoption are clear; operating model clarity is more important than technology alone.',
    aiFocus24: 'Pair innovation with adoption planning; prevent accountability diffusion.',
    riskResilience: 'You treat resilience as an organizational capability; strongest when accountability is clear (not consensus-driven).',
    riskFocus24: 'Clarify ownership during disruption; maintain shared situational awareness.',
    growthVolatility: 'You manage disruption through alignment and shared focus; risk over-alignment slowing necessary action.',
    growthFocus24: 'Streamline escalation paths; preserve alignment under pressure.',
    closingReflection: 'Clarity comes from shared understanding; paired with decisiveness, alignment becomes a force multiplier.'
  },
  {
    id: 'shield',
    name: 'Shield',
    tagline: 'Absorb hidden risk',
    scoreMin: 5,
    scoreMax: 9,
    color: '#475569',
    icon: '🛡️',
    executiveSummary: 'You create clarity by sequencing decisions deliberately. Under pressure, you pause to assess and preserve long-term direction.',
    pressureProfile: 'You prioritize risk reduction and durability over near-term speed. Builds long-term reliability and confidence.',
    clarityDescription: 'Clarity improves when decisions are intentionally sequenced. You commit to direction and adjust as information emerges.',
    aiTransformation: 'You benefit from focused AI investments with clear ownership; clarity comes from sequencing vs. expanding use cases.',
    aiFocus24: 'Sequence AI initiatives around outcomes; limit parallel transformation efforts.',
    riskResilience: 'You balance preventative and pragmatic approaches; cyber works best as an enabler of progress.',
    riskFocus24: 'Reinforce core data and platform foundations; maintain decision guardrails.',
    growthVolatility: 'You handle competing demands by choosing what not to act on. Clarity relies on explicit tradeoffs and discipline.',
    growthFocus24: 'Preserve attention for trajectory-changing decisions; design models preventing constant escalation.',
    closingReflection: 'Clarity comes from knowing what matters now vs. later; sequencing becomes a powerful advantage.'
  }
];

export function getPersonaByScore(score: number): PersonaProfile {
  return PERSONA_PROFILES.find(p => score >= p.scoreMin && score <= p.scoreMax) || PERSONA_PROFILES[3];
}
