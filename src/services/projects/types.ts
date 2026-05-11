export interface ProjectInput {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  link?: string;
  githubLink?: string;
  order?: number;
}

export interface ProjectResponse extends ProjectInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
