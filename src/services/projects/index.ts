import Project from "@/models/Project";
import { ProjectInput, ProjectResponse } from "./types";

/**
 * Create a new project
 */
export async function createProject(payload: ProjectInput): Promise<ProjectResponse> {
  const project = await Project.create({
    title: payload.title,
    description: payload.description,
    image: payload.image || "",
    tech: payload.technologies || [],
    link: payload.link || "",
    github: payload.githubLink || "",
    order: payload.order || 0,
  });

  return projectToResponse(project);
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<ProjectResponse[]> {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });

  return projects.map(projectToResponse);
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<ProjectResponse | null> {
  const project = await Project.findById(id);

  if (!project) {
    return null;
  }

  return projectToResponse(project);
}

/**
 * Update project
 */
export async function updateProject(id: string, payload: Partial<ProjectInput>): Promise<ProjectResponse> {
  const project = await Project.findByIdAndUpdate(id, payload, { new: true });

  if (!project) {
    throw new Error("Project not found");
  }

  return projectToResponse(project);
}

/**
 * Delete project
 */
export async function deleteProject(id: string): Promise<void> {
  const result = await Project.findByIdAndDelete(id);

  if (!result) {
    throw new Error("Project not found");
  }
}

/**
 * Reorder projects
 */
export async function reorderProjects(projects: Array<{ id: string; order: number }>): Promise<ProjectResponse[]> {
  const updated = [];

  for (const item of projects) {
    const project = await Project.findByIdAndUpdate(
      item.id,
      { order: item.order },
      { new: true }
    );

    if (project) {
      updated.push(projectToResponse(project));
    }
  }

  return updated;
}

/**
 * Helper function to convert project to response format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function projectToResponse(project: any): ProjectResponse {
  return {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.tech || [],
    link: project.link,
    githubLink: project.github,
    order: project.order,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
