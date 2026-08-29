export const TECH_CATEGORIES = {
  AI_CORE: "Artificial Intelligence & Core ML",
  LLM_SYSTEMS: "LLMs, Agents & RAG",
  VISION_3D: "Computer Vision & 3D Web",
  INFRASTRUCTURE: "Mantis Infra & GPU Cloud"
};

export const TECH_STACK = [
  { name: "PyTorch", category: TECH_CATEGORIES.AI_CORE, level: 95, icon: "Flame" },
  { name: "CUDA / C++", category: TECH_CATEGORIES.AI_CORE, level: 88, icon: "Cpu" },
  { name: "Transformers / HuggingFace", category: TECH_CATEGORIES.LLM_SYSTEMS, level: 92, icon: "Brain" },
  { name: "vLLM & TensorRT-LLM", category: TECH_CATEGORIES.LLM_SYSTEMS, level: 90, icon: "Zap" },
  { name: "LangChain / LlamaIndex", category: TECH_CATEGORIES.LLM_SYSTEMS, level: 88, icon: "GitFork" },
  { name: "Three.js / React Three Fiber", category: TECH_CATEGORIES.VISION_3D, level: 90, icon: "Box" },
  { name: "WebGPU / GLSL Shaders", category: TECH_CATEGORIES.VISION_3D, level: 85, icon: "Eye" },
  { name: "Docker / Kubernetes / Ray", category: TECH_CATEGORIES.INFRASTRUCTURE, level: 86, icon: "Server" },
  { name: "React / Vite / Tailwind", category: TECH_CATEGORIES.VISION_3D, level: 94, icon: "Code" }
];
