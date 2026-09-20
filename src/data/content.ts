export const identity = {
  name: "Adwik Singh",
  first: "Adwik",
  grade: "7th Grade",
  gradeShort: "Class VII",
  school: "Sunbeam School, Mau",
  email: "adwik2237@sunbeamschoolmau.edu.in",
  tagline: "A mind in motion",
  bio: "Hello, I'm Adwik Singh, a 7th-grade student at Sunbeam School, Mau. I have a deep passion for exploration — discovering new places, learning about machines, and understanding how things work. I am driven by curiosity and always eager to expand my knowledge. Through this e-portfolio, I aim to share my journey and interests, offering a glimpse into who I am and what I am striving to achieve.",
  pullQuote: "I am driven by curiosity and always eager to expand my knowledge.",
};

export interface CuriosityItem {
  index: string;
  title: string;
  note: string;
}

export const curiosity: CuriosityItem[] = [
  { index: "01", title: "Exploring new places", note: "Discovering what's out there." },
  { index: "02", title: "Learning about machines", note: "How the moving parts fit together." },
  { index: "03", title: "Understanding how things work", note: "The why behind the what." },
];

export interface Strength {
  title: string;
  note: string;
}

export const strengths: Strength[] = [
  { title: "Quick to learn & adapt", note: "New ideas click fast." },
  { title: "Strong observation", note: "Noticing the small details." },
  { title: "Open to new challenges", note: "Ready when something new shows up." },
  { title: "Creative & innovative", note: "Thinking of it differently." },
  { title: "Attentive listener", note: "Hearing what's actually said." },
];

export interface Goal {
  title: string;
  detail?: string;
  note: string;
}

export const goals: Goal[] = [
  { title: "Confident public speaker", note: "Speaking up, clearly." },
  { title: "Mastery of a skill", detail: "A musical instrument or coding", note: "One thing, done really well." },
  { title: "Time management & organization", note: "Making room for everything." },
  { title: "Self-confidence & self-esteem", note: "Believing in the work." },
];

export interface Achievement {
  title: string;
  tag: string;
  year?: string;
}

export const achievements: Achievement[] = [
  { title: "Head Boy JR. (Primary block)", tag: "Leadership" },
  { title: "Participation in class project", tag: "Participation" },
  { title: "First position — Spell Bee", tag: "First position" },
  { title: "98% in Class II", tag: "Academic", year: "Class II" },
  { title: "Most regular in online classes", tag: "Attendance" },
  { title: "93% in Class III", tag: "Academic", year: "Class III" },
  { title: "Highest marks in Hindi", tag: "Academic" },
  { title: "General Quiz — Sunfest 2024", tag: "Competition", year: "2024" },
  { title: "First position — non-thermal cooking", tag: "First position" },
  { title: "Creative, expressive & curious — Full Swing", tag: "Recognition" },
];

export interface JourneyStop {
  label: string;
  note: string;
}

export const journey: JourneyStop[] = [
  { label: "Class II", note: "98% — a strong start." },
  { label: "Class III", note: "93% — keeping the momentum." },
  { label: "Primary block", note: "Chosen Head Boy JR." },
  { label: "Sunfest 2024", note: "General Quiz participant." },
  { label: "Class VII", note: "Still curious. Still exploring." },
];

export interface SectionMeta {
  id: string;
  index: string;
  label: string;
}

export const sections: SectionMeta[] = [
  { id: "intro", index: "01", label: "Intro" },
  { id: "who", index: "02", label: "Who is Adwik?" },
  { id: "curious", index: "03", label: "The Curious Mind" },
  { id: "strengths", index: "04", label: "Strengths" },
  { id: "journey", index: "05", label: "The Journey" },
  { id: "vault", index: "06", label: "Achievement Vault" },
  { id: "next", index: "07", label: "What's Next?" },
  { id: "explore", index: "08", label: "Keep Exploring" },
];
