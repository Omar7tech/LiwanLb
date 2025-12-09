import { ProjectUpdate } from './index';

export interface ProjectUpdateResource {
    data: ProjectUpdate;
}

export interface ProjectUpdatesResource {
    data: ProjectUpdate[];
}

export interface ProjectUpdateFormData {
    name?: string | null;
    description?: string | null;
    date: string;
    project_id: number;
    updated_by?: number | null;
    images?: File[] | null;
}
