export interface UsuarioRequest {
    username: string;
    password?: string;
    roleIds: number[];
}

export interface UsuarioResponse {
    idUsuario: number;
    username: string;
    roleNames: string[];
}