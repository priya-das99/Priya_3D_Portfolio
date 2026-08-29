export const PROJECTS_DATA = [
  {
    id: "neuro-mesh",
    title: "NeuroMesh-v4: Distributed Agentic Mesh",
    category: "LLM Orchestration & Multi-Agent",
    description: "Real-time fault-tolerant multi-agent orchestration engine powered by custom quantized local models with microsecond IPC communication.",
    tech: ["PyTorch", "Rust", "Ollama", "LangChain", "CUDA", "FastAPI"],
    metrics: { latency: "< 45ms", throughput: "12k tps" },
    links: { github: "#", demo: "#", paper: "#" },
    featured: true
  },
  {
    id: "vision-spatial-3d",
    title: "OmniVision 3D Gaussian Splatting",
    category: "Computer Vision & NeRF",
    description: "WebGPU accelerated neural radiance field generator capable of reconstructing 3D radiance fields directly inside browser viewports.",
    tech: ["WebGPU", "Three.js", "PyTorch", "CUDA", "C++"],
    metrics: { fps: "60 FPS WebGPU", compression: "10x Reduction" },
    links: { github: "#", demo: "#" },
    featured: true
  },
  {
    id: "quantum-coder-eval",
    title: "QuantumCode LLM Evaluator",
    category: "Fine-Tuning & Quantization",
    description: "Automated RLHF benchmarking framework evaluating code-generation fidelity, token efficiency, and security vulnerabilities.",
    tech: ["HuggingFace", "vLLM", "Unsloth", "TailwindCSS", "React"],
    metrics: { accuracy: "94.2%", speedup: "4.2x" },
    links: { github: "#", demo: "#" },
    featured: true
  }
];
