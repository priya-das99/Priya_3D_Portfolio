/**
 * skillsData.js
 * Skill data for the Proximity Scale Grid constellation.
 *
 * - SKILL_CATEGORIES: categories requested for navigation.
 * - SKILLS_DATA: skill items per category.
 * - filterSkills(catId): returns relevant subset.
 *   - For 'all': returns featured core technologies (Middle trio: Python, C++, Java + surrounding stack).
 *   - For other categories: returns skills belonging to that category.
 */

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const SKILL_CATEGORIES = [
  { id: 'all',       label: 'ALL',               icon: 'sparkles' },
  { id: 'languages', label: 'Languages',         icon: 'code'     },
  { id: 'backend',   label: 'Backend',           icon: 'server'   },
  { id: 'ai',        label: 'AI / ML',           icon: 'brain'    },
  { id: 'databases', label: 'Databases',         icon: 'database' },
  { id: 'frontend',  label: 'Frontend / Mobile', icon: 'monitor'  },
  { id: 'tools',     label: 'Development Tools', icon: 'wrench'   },
];

export const SKILLS_DATA = [
  // ── Languages ──────────────────────────────────────────────────────────────
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    isCore: true,
    isFeatured: true,
    icon: `${DI}/python/python-original.svg`,
    color: '#3B82F6',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    isFeatured: true,
    icon: `${DI}/cplusplus/cplusplus-original.svg`,
    color: '#6470C7',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    isFeatured: true,
    icon: `${DI}/java/java-original.svg`,
    color: '#ED8B00',
  },
  {
    id: 'javascript-lang',
    name: 'JavaScript',
    category: 'languages',
    icon: `${DI}/javascript/javascript-original.svg`,
    color: '#F7DF1E',
  },
  {
    id: 'typescript-lang',
    name: 'TypeScript',
    category: 'languages',
    isFeatured: true,
    icon: `${DI}/typescript/typescript-original.svg`,
    color: '#3178C6',
  },
  {
    id: 'appwrite',
    name: 'Appwrite',
    category: 'databases',
    isFeatured: true,
    icon: `${DI}/appwrite/appwrite-original.svg`,
    color: '#FD366E',
  },

  // ── Backend ────────────────────────────────────────────────────────────────
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    isCore: true,
    isFeatured: true,
    icon: `${DI}/fastapi/fastapi-original.svg`,
    color: '#009688',
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    category: 'backend',
    isFeatured: true,
    icon: `${DI}/spring/spring-original.svg`,
    color: '#6DB33F',
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'backend',
    icon: `${DI}/flask/flask-original.svg`,
    color: '#F8FAFC',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    icon: 'https://api.iconify.design/dashicons:rest-api.svg?color=%233B82F6',
    color: '#3B82F6',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: `${DI}/nodejs/nodejs-original.svg`,
    color: '#5FA04E',
  },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  {
    id: 'openai-sdk',
    name: 'OpenAI Agent SDK',
    category: 'ai',
    isCore: true,
    isFeatured: true,
    icon: 'https://api.iconify.design/simple-icons:openai.svg?color=%2310B981',
    color: '#10B981',
  },
  {
    id: 'faiss',
    name: 'FAISS',
    category: 'ai',
    icon: null,
    fallbackChar: 'FA',
    color: '#8B5CF6',
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'ai',
    icon: `${DI}/scikitlearn/scikitlearn-original.svg`,
    color: '#F7931E',
  },
  {
    id: 'rake',
    name: 'RAKE',
    category: 'ai',
    icon: null,
    fallbackChar: 'RK',
    color: '#D946EF',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'ai',
    icon: `${DI}/pandas/pandas-original.svg`,
    color: '#150458',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'ai',
    icon: `${DI}/numpy/numpy-original.svg`,
    color: '#013243',
  },
  {
    id: 'rag',
    name: 'RAG',
    category: 'ai',
    icon: null,
    fallbackChar: 'RAG',
    color: '#06B6D4',
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    isFeatured: true,
    icon: 'https://api.iconify.design/simple-icons:langchain.svg?color=%238B5CF6',
    color: '#8B5CF6',
  },

  // ── Databases ──────────────────────────────────────────────────────────────
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'databases',
    isCore: true,
    isFeatured: true,
    icon: `${DI}/postgresql/postgresql-original.svg`,
    color: '#336791',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    icon: `${DI}/mysql/mysql-original.svg`,
    color: '#F97316',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'databases',
    icon: `${DI}/sqlite/sqlite-original.svg`,
    color: '#003B57',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'databases',
    icon: `${DI}/redis/redis-original.svg`,
    color: '#DC382D',
  },

  // ── Frontend / Mobile ──────────────────────────────────────────────────────
  {
    id: 'html5',
    name: 'HTML',
    category: 'frontend',
    isCore: true,
    icon: `${DI}/html5/html5-original.svg`,
    color: '#E34F26',
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    isFeatured: true,
    icon: `${DI}/react/react-original.svg`,
    color: '#61DAFB',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: `${DI}/tailwindcss/tailwindcss-original.svg`,
    color: '#06B6D4',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    icon: `${DI}/react/react-original.svg`,
    color: '#3DB1CC',
  },

  // ── Development Tools ──────────────────────────────────────────────────────
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    isCore: true,
    isFeatured: true,
    icon: `${DI}/docker/docker-original.svg`,
    color: '#2496ED',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    isFeatured: true,
    icon: `${DI}/git/git-original.svg`,
    color: '#F97316',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    icon: 'https://api.iconify.design/simple-icons:github.svg?color=%23F8FAFC',
    color: '#94A3B8',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    icon: `${DI}/vscode/vscode-original.svg`,
    color: '#007ACC',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'tools',
    icon: `${DI}/linux/linux-original.svg`,
    color: '#F59E0B',
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    category: 'tools',
    icon: `${DI}/jupyter/jupyter-original.svg`,
    color: '#F37726',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'tools',
    isFeatured: true,
    icon: `${DI}/githubactions/githubactions-original.svg`,
    color: '#2088FF',
  },
];

/**
 * Returns the skills to display for the given category.
 * For 'all': returns the featured core skills.
 */
export function filterSkills(catId) {
  if (catId === 'all') {
    const seen = new Set();
    return SKILLS_DATA.filter(s => s.isFeatured).filter(s => {
      if (seen.has(s.name)) return false;
      seen.add(s.name);
      return true;
    });
  }
  return SKILLS_DATA.filter(s => s.category === catId);
}
