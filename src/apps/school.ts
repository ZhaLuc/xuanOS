import type { AppDefinition } from "./types";

const apCourses = [
  "AP Calculus BC",
  "AP Chemistry",
  "AP Chinese Language and Culture",
  "AP English Literature and Composition",
  "AP Seminar",
  "AP U.S. History",
  "AP Calculus AB",
  "AP Computer Science A",
  "AP English Language and Composition",
  "AP European History",
  "AP Physics 2",
  "AP Computer Science Principles",
  "AP Physics 1",
  "AP Precalculus",
  "AP U.S. Government and Politics",
  "AP Research",
];

const extracurriculars = [
  "Robotics Club",
  "Math Club",
  "Speech and Debate - Debate BQ D2 State Champion",
  "Middle School Speech and Debate Captain",
  "Coding Club",
  "Circuits Club",
  "Chinese and Math Studies (CCSA and ASU)",
  "Chemistry Teaching Assistant",
  "Part-Time Server",
  "High School Speech and Debate Captain",
  "Electrical Engineering Club",
  "Machine Learning Club",
  "National Chinese Honor Society",
  "National Chinese Honor Society President",
  "Codeforces - Master",
  "USACO - Gold",
  "Feed My Starving Children Volunteer",
  "Midwest Foodbank Volunteer",
  "Chinese Culture Education Volunteer",
  "ASU NURC - 3rd Place at the National Underwater Robotics Competition",
  "ASU EPICS - Presented at the Arizona State University Ira A. Fulton Schools of Engineering",
  "Linguistics Teacher's Assistant",
  "Lab Data Analyst Assistant, Arrowhead Hospital",
  "School Science Fair - Environmental Science 1st",
  "Arizona Science Fair - Stockholm Junior Water Prize",
];

function bindToggle(
  button: HTMLButtonElement,
  panel: HTMLElement,
  showLabel: string,
  hideLabel: string,
) {
  const setOpen = (open: boolean) => {
    panel.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? hideLabel : showLabel;
  };

  setOpen(false);
  button.addEventListener("click", () => {
    setOpen(!panel.classList.contains("is-open"));
  });
}

function createSchoolContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-school";
  body.innerHTML = `
    <h2 class="app-school__title">school</h2>
    <ul class="app-school__summary">
      <li>16x APs</li>
      <li>all 5s, couple 4s</li>
      <li>gpa 3.91 UW / 4.71 W</li>
    </ul>

    <h3 class="app-school__heading">aps</h3>
    <button type="button" class="app-school__toggle" data-ap-toggle aria-expanded="false">
      show aps ↓
    </button>
    <ul class="app-school__list" data-aps>
      ${apCourses.map((course) => `<li>${course}</li>`).join("")}
    </ul>

    <h3 class="app-school__heading">extracurriculars</h3>
    <button type="button" class="app-school__toggle" data-ec-toggle aria-expanded="false">
      show extracurriculars ↓
    </button>
    <ul class="app-school__list" data-ecs>
      ${extracurriculars.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;

  bindToggle(
    body.querySelector("[data-ap-toggle]")!,
    body.querySelector("[data-aps]")!,
    "show aps ↓",
    "hide aps ↑",
  );
  bindToggle(
    body.querySelector("[data-ec-toggle]")!,
    body.querySelector("[data-ecs]")!,
    "show extracurriculars ↓",
    "hide extracurriculars ↑",
  );

  return body;
}

export const schoolApp: AppDefinition = {
  id: "school",
  title: "School",
  iconSrc: "/school-icon.png",
  iconLabel: "School",
  width: 520,
  height: 480,
  createContent: createSchoolContent,
};
