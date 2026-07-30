import { deadlockApp } from "./deadlock";
import { meApp } from "./me";
import { musicApp } from "./music";
import { notesApp } from "./notes";
import { programmingCompsApp } from "./programmingComps";
import { projectsApp } from "./projects";
import { schoolApp } from "./school";
import { videosApp } from "./videos";
import type { AppDefinition, AppId } from "./types";
import { appOrder } from "./types";

export const apps: Record<AppId, AppDefinition> = {
  me: meApp,
  notes: notesApp,
  projects: projectsApp,
  "programming-comps": programmingCompsApp,
  school: schoolApp,
  music: musicApp,
  videos: videosApp,
  deadlock: deadlockApp,
};

export function getApp(id: AppId): AppDefinition {
  return apps[id];
}

export function listApps(): AppDefinition[] {
  return appOrder.map((id) => apps[id]);
}
