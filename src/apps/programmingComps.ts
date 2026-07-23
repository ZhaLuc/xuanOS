import type { AppDefinition } from "./types";

function createProgrammingCompsContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-comps";
  body.innerHTML = `
    <h2 class="app-comps__title">comps</h2>

    <h3 class="app-comps__heading">competitions</h3>
    <ul class="app-comps__list">
      <li><span class="app-comps__label">codeforces</span> - 2129 (master)</li>
      <li><span class="app-comps__label">leetcode</span> - 133 problems solved</li>
      <li><span class="app-comps__label">usaco</span> - gold</li>
      <li>National Underwater Robotics Competition - 3rd place</li>
      <li>EPICS research presentation - ASU Ira A. Fulton Schools of Engineering</li>
      <li>3x hackathon winner</li>
    </ul>

    <h3 class="app-comps__heading">working for</h3>
    <ul class="app-comps__list">
      <li>icpc</li>
      <li>comptia a+, network+, and security+</li>
      <li>ioi camp qualification</li>
      <li>codeforces international master</li>
      <li>usaco platinum</li>
      <li>regeneron sts</li>
    </ul>
  `;
  return body;
}

export const programmingCompsApp: AppDefinition = {
  id: "programming-comps",
  title: "Comps",
  iconSrc: "/programming-comps-icon.png",
  iconLabel: "Comps",
  width: 480,
  height: 480,
  createContent: createProgrammingCompsContent,
};
