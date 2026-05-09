import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { login } from "@/services/auth.service";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (username.trim().length < 1) {
            toast.error("Username is required");
            return;
        }

        try {

            const data = await login(username);

            localStorage.setItem("token", data.token);

            toast.success("Login successful");

            navigate("/qr");

        } catch {
            toast.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="fixed top-3 right-3 mb-5 flex justify-end items-center gap-x-3">
                <Button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {
                        theme === 'dark' && <Sun />
                    }
                    {
                        theme === 'light' && <Moon />
                    }
                </Button>
            </div>

            <div className="w-full max-w-sm space-y-4">

                <h1 className="text-2xl font-bold">
                    Login
                </h1>

                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Button
                    className="w-full"
                    onClick={handleLogin}
                >
                    Login
                </Button>

            </div>

        </div>
    );
}