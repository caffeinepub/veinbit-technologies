import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contact {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getContacts(): Promise<Array<Contact>>;
    getStats(): Promise<{
        yearsOfExperience: bigint;
        technologiesUsed: bigint;
        projectsCompleted: bigint;
        clients: bigint;
    }>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    updateStats(projects: bigint, clients: bigint, technologies: bigint, years: bigint): Promise<void>;
}
