export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  logo?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  thumbnail?: string;
  status?: 'live' | 'archived' | 'wip';
  year?: number;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Social {
  label: string;
  url: string;
}
