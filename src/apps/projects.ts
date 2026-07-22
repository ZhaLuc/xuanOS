import type { AppDefinition } from "./types";

type Project = {
  name: string;
  blurb: string;
  url: string;
};

const projects: Project[] = [
  {
    name: "GenesisOS",
    blurb:
      "An x86_64 operating system built from scratch - custom kernel, virtual memory, processes, filesystems, networking, drivers, and a desktop GUI with a shell.",
    url: "https://github.com/ZhaLuc/GenesisOS",
  },
  {
    name: "mycc",
    blurb:
      "A from-scratch C compiler that builds real x86-64 programs. Has two backends (handwritten assembly and LLVM) and was checked against GCC with 117 tests.",
    url: "https://github.com/ZhaLuc/mycc",
  },
  {
    name: "GridMark",
    blurb:
      "An autonomous indoor robot that maps with LiDAR, explores on its own with Nav2, and detects objects with YOLO on a Jetson Orin Nano Super + Arduino Mega.",
    url: "https://github.com/ZhaLuc/GridMark",
  },
  {
    name: "RayTracing",
    blurb:
      "A multithreaded CPU path tracer in C11 with realistic lighting - soft shadows, reflections, refraction, BVH speedups, and a custom scene format.",
    url: "https://github.com/ZhaLuc/RayTracing",
  },
  {
    name: "Underwater Robotics (NURC)",
    blurb:
      "Full underwater robot platform for the National Underwater Robotics Challenge - software, electronics, mechanical design, and documentation.",
    url: "https://github.com/ZhaLuc/UnderwaterRobotics-NURC",
  },
  {
    name: "WebRadarDL",
    blurb:
      "A live Windows web radar that reads game memory externally and shows player positions and health in a Node.js browser UI.",
    url: "https://github.com/ZhaLuc/WebRadarDL",
  },
  {
    name: "ManualMapperWindows",
    blurb:
      "An x64 manual DLL mapper with both a GUI and command-line mode, plus a reference payload to test with.",
    url: "https://github.com/ZhaLuc/ManualMapperWindows",
  },
  {
    name: "Arizona Science Fair Water Analysis",
    blurb:
      "Machine learning project that analyzes and predicts water quality for the Arizona Science & Engineering Fair.",
    url: "https://github.com/ZhaLuc/AZSEF-Water-Analysis",
  },
  {
    name: "BMECS EPICS",
    blurb:
      "Sustainable engineering system meant to lower heat stress and save water in community gardens, built through ASU EPICS.",
    url: "https://github.com/ZhaLuc/BMECS-EPICS",
  },
  {
    name: "SaveEditorTBCA",
    blurb:
      "Windows desktop app for editing and transferring The Battle Cats save files through a simple graphical interface.",
    url: "https://github.com/ZhaLuc/SaveEditorTBCA",
  },
  {
    name: "AstroBeeQuest",
    blurb:
      "Interactive story app that figures out Dungeons & Dragons player archetypes from how you answer narrative prompts.",
    url: "https://github.com/ZhaLuc/AstroBeeQuest",
  },
  {
    name: "Codeforces Solutions",
    blurb:
      "Collection of competitive programming solutions and algorithms written in C++.",
    url: "https://github.com/ZhaLuc/Codeforces",
  },
  {
    name: "USACO Solutions",
    blurb:
      "Competitive programming solutions for the USACO 2026 Second Contest.",
    url: "https://github.com/ZhaLuc/USACOComplete",
  },
  {
    name: "Arch Linux Webpage",
    blurb:
      "Custom-built website showcasing the Arch Linux operating system.",
    url: "https://github.com/ZhaLuc/Arch-Linux-Webpage",
  },
];

function createProjectsContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-projects";
  body.innerHTML = `<h2 class="app-projects__title">projects</h2>`;

  const list = document.createElement("div");
  list.className = "app-projects__list";

  for (const project of projects) {
    const item = document.createElement("div");
    item.className = "app-projects__item";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "app-projects__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = `<span>${project.name}</span><span class="app-projects__chevron">↓</span>`;

    const panel = document.createElement("div");
    panel.className = "app-projects__panel";
    panel.innerHTML = `
      <p class="app-projects__blurb">${project.blurb}</p>
      <a
        class="app-projects__link"
        href="${project.url}"
        target="_blank"
        rel="noopener noreferrer"
      >github</a>
    `;

    toggle.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      const chevron = toggle.querySelector(".app-projects__chevron");
      if (chevron) chevron.textContent = open ? "↑" : "↓";
    });

    item.append(toggle, panel);
    list.append(item);
  }

  body.append(list);
  return body;
}

export const projectsApp: AppDefinition = {
  id: "projects",
  title: "Projects",
  iconSrc: "/projects-icon.png",
  iconLabel: "Projects",
  width: 560,
  height: 520,
  createContent: createProjectsContent,
};
