export interface MindfulFact {
  id: number;
  title: string;
  fact: string;
  category: 'Breath' | 'Focus' | 'Movement' | 'Acoustics' | 'Nervous System' | 'Mind-Body';
  scienceSource: string;
}

export const wellnessFacts: MindfulFact[] = [
  {
    id: 1,
    title: 'Built-In Vagal Brake',
    fact: 'Your heart speeds up slightly on each inhale and slows down on each exhale (respiratory sinus arrhythmia). Making your exhale longer than your inhale directly activates your parasympathetic calming reflex.',
    category: 'Breath',
    scienceSource: 'Polyvagal Theory & Cardiology',
  },
  {
    id: 2,
    title: 'The 4-4-4-4 Focus Pattern',
    fact: 'Box breathing is used by first responders, trauma clinicians, and tactical teams to steady heart rate variability and keep executive decision-making online under extreme sympathetic stress.',
    category: 'Breath',
    scienceSource: 'Autonomic Neuroscience Research',
  },
  {
    id: 3,
    title: 'Purring Frequency Calm',
    fact: 'Domestic cats typically purr between 25 and 150 Hz—a gentle, rhythmic low-frequency vibration widely experienced by humans as soothing and restorative to the nervous system.',
    category: 'Acoustics',
    scienceSource: 'Bioacoustics & Veterinary Medicine',
  },
  {
    id: 4,
    title: 'Walking Sparks Creativity',
    fact: 'Stanford University researchers discovered that walking—whether outdoors in fresh air or indoors on a quiet track—significantly increases creative divergent thinking compared to remaining seated.',
    category: 'Movement',
    scienceSource: 'Stanford University Psychology Studies',
  },
  {
    id: 5,
    title: '1–2% Dehydration Affects Mood',
    fact: 'Even mild fluid loss can measurably increase perceived fatigue, muscle tension, and working memory fog well before your body registers intense conscious thirst.',
    category: 'Mind-Body',
    scienceSource: 'Journal of Nutrition & Cognitive Science',
  },
  {
    id: 6,
    title: 'Naming Feelings Calms the Brain',
    fact: 'Neuroscience research on affect labeling shows that simply putting an emotion into words helps down-regulate amygdala reactivity and re-engages prefrontal cognitive control.',
    category: 'Nervous System',
    scienceSource: 'UCLA Social Cognitive Neuroscience Lab',
  },
  {
    id: 7,
    title: 'Soft Gaze, Calm Mind',
    fact: 'Narrow tunnel vision is hardwired to sympathetic alertness. Softening your gaze to notice peripheral motion (like gentle living-canvas waves) signals immediate biological safety to the brain.',
    category: 'Focus',
    scienceSource: 'Ophthalmology & Autonomic Regulation',
  },
  {
    id: 8,
    title: 'Gentle Gongs Beat Harsh Alarms',
    fact: 'Soft, resonant acoustic cues (like a 174 Hz singing bowl gong) interrupt automatic scrolling loops far more effectively than jarring alarms because they invite awareness without triggering stress resistance.',
    category: 'Focus',
    scienceSource: 'Sensory Ergonomics & Habit Loop Research',
  },
  {
    id: 9,
    title: 'Bilateral Grounding Rhythms',
    fact: 'Alternating left-right auditory or tactile rhythms help anchor attention in the safe present moment and form the physiological foundation of clinical EMDR somatic protocols.',
    category: 'Acoustics',
    scienceSource: 'Clinical EMDR & Neurobiology',
  },
  {
    id: 10,
    title: 'Micro-Pauses Compound',
    fact: 'Brief 60-to-90-second nervous system resets scattered intentionally throughout the workday prevent cumulative cortisol spikes far better than waiting for the weekend to recover.',
    category: 'Nervous System',
    scienceSource: 'Occupational Health & Circadian Biology',
  },
];
