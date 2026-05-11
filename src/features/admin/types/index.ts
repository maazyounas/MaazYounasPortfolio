"use client";

export interface SystemStatus {
    cpu: number;
    memory: number;
    storage: number;
    uptime: string;
    requests: number;
    activeUsers: number;
    responseTime: number;
    databaseSize: string;
    lastBackup: string;
}

export type AdminTab =
    | "dashboard"
    | "home"
    | "about"
    | "projects"
    | "contact"
    | "settings"
    | "security"
    | "logs";

export interface Notification {
    id: string;
    type: "info" | "warning" | "error";
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}
