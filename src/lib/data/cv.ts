import type { Experience, Project, SkillCategory, Social } from '$lib/types';

export const cvData = {
  name: 'Rizki Arkant Pratama',
  role: 'Software Engineer',
  tagline:
    'I build fast, responsive, and low-level oriented applications with modern tech stacks.',

  about: `I'm a software developer with a strong focus on building performant web applications and exploring foundational programming concepts. I love tinkering with lightweight UI frameworks, fine-tuning development environments, and digging into the low-level mechanics under the hood. Currently finishing up my final year academic project while building modern web applications.`,

  socials: [
    { label: 'GitHub', url: 'https://github.com/ekikaja55' },
    { label: 'Email', url: 'mailto:rizkiarkant55@gmail.com' },
    { label: 'Instagram', url: 'https://instagram.com/filenya_ekik.zip' }
  ] as Social[],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'C & C++', 'Java', 'C# ', 'PHP', 'Lua']
    },
    {
      category: 'Frameworks',
      items: ['Svelte 5', 'SvelteKit', 'React', 'Next.js', 'NestJS', 'Laravel', 'Flutter']
    },
    {
      category: 'Tools & Infra',
      items: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Firebase', 'Vercel']
    }
  ] as SkillCategory[],

  experiences: [
    {
      period: '2025 — PRESENT',
      role: 'Software Engineer / Freelance',
      company: 'Self-Employed',
      description:
        'Collaborating with independent clients to architect and deliver end-to-end web applications, dynamic management dashboards, and lightweight backends. Specializing in responsive UI engineering, REST API integrations, and multi-platform solution architecture.',
      technologies: [
        'Svelte 5',
        'SvelteKit',
        'React',
        'Next.js',
        'NestJS',
        'Node.js',
        'Express.js',
        'Laravel',
        'Flutter',
        'PostgreSQL',
        'MongoDB',
        'Firebase',
        'Python',
        'Lua',
        'C# (Unity)'
      ]
    },
    {
      period: '2023 — 2025',
      role: 'Student Developer & Foundations',
      company: 'Computer Science Academic Work',
      description:
        'Focused on core computer science foundations, Object-Oriented Programming (OOP), and low-level system concepts. Built foundational desktop, web, and mobile software prototypes alongside custom memory management experiments.',
      technologies: ['C & C++', 'Java', 'C# (.NET)', 'JavaScript', 'PHP', 'HTML5 & CSS3']
    }
  ] as Experience[],

  projects: [
    {
      title: 'Tutur.id',
      description:
        'Cross-platform BISINDO sign language educational app built to improve accessibility learning with structured workflows.',
      technologies: ['Flutter', 'Dart', 'Riverpod', 'Firebase'],
      githubUrl: 'https://github.com/ekikaja55/tutur_id_app',
      featured: true,
      status: 'wip',
      year: 2026,
    },
    {
      title: 'Math Quest Pygame',
      description:
        'Educational 2D math quiz game built with Python and Pygame featuring interactive problem-solving game loops.',
      technologies: ['Python', 'Pygame', 'Game Logic'],
      githubUrl: 'https://github.com/ekikaja55/math_quest_pygame',
      featured: true,
      status: 'archived',
      year: 2026,
    },
    {
      title: "Kanti's Store",
      description:
        'Fullstack e-commerce platform built for local MSMEs featuring product management and seamless dynamic store functionality.',
      technologies: ['SvelteKit', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      liveUrl: 'https://sdp-project-black.vercel.app',
      featured: true,
      status: 'live',
      year: 2025,
    },
    {
      title: 'SR12 Admin Dashboard',
      description:
        'Management dashboard web app built for brand inventory, sales monitoring, and internal operational tracking.',
      technologies: ['Svelte', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://admin-sr12.vercel.app',
      status: 'live',
      year: 2025,
    },
    {
      title: 'Cho Lazey Studio',
      description:
        'Prototype digital artist storefront and portfolio showcase built with modern web components.',
      technologies: ['Svelte', 'Tailwind CSS'],
      liveUrl: 'https://cho-lazey-studio.vercel.app/',
      status: 'live',
      year: 2026,
    },
    {
      title: 'Interactive Balinese Script Game',
      description:
        '2D educational game developed in Unity to help users learn traditional Balinese script interactively.',
      technologies: ['Unity 2D', 'C#', 'Game Design'],
      githubUrl: 'https://github.com/ekikaja55/belajar_aksara',
      status: 'archived',
      year: 2026,
    }
  ] as Project[]
};
