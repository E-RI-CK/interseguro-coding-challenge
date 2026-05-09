import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    exp: number;
    username: string;
};

export function isTokenValid(token: string): boolean {

    try {

        const decoded = jwtDecode<JwtPayload>(token);

        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;

    } catch {
        return false;
    }
}

export function getNameOfToken(token: string): string {
    try {

        const decoded = jwtDecode<JwtPayload>(token);

        const { username } = decoded;

        return username;

    } catch {
        return "User Name";
    }
}