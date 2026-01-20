export interface AuthRequest {
    username: string;
    password?: string;
}

export interface AuthResponse {
    id: number;
    token: string;
    username: string;
    roles: string[];
}
