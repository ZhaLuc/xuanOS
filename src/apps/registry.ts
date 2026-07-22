import { deadlockApp } from "./deadlock";
import { meApp } from "./me";
import { programmingCompsApp } from "./programmingComps";
import { projectsApp } from "./projects";
import { schoolApp } from "./school";
import type { AppDefinition, AppId } from "./types";
import { appOrder } from "./types";

export const apps: Record<AppId, AppDefinition> = {
  me: meApp,
  projects: projectsApp,
  "programming-comps": programmingCompsApp,
  school: schoolApp,
  deadlock: deadlockApp,
};

export function getApp(id: AppId): AppDefinition {
  return apps[id];
}

export function listApps(): AppDefinition[] {
  return appOrder.map((id) => apps[id]);
}
