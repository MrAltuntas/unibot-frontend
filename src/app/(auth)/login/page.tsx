"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Paper,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
    Alert,
    Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type TLoginForm = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const initialValues: TLoginForm = {
    email: "",
    password: "",
    rememberMe: false,
};

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isUnverifiedEmail, setIsUnverifiedEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    const onSubmit = async (data: TLoginForm) => {
        setLoginError(null);
        setIsUnverifiedEmail(false);
        setLoginSuccess(false);
        setIsLoading(true);

        try {
            await login(data.email, data.password, data.rememberMe);
            setLoginSuccess(true);

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error: any) {
            console.log("Login error:", error);

            // Check for specific status codes or error types
            if (error.status === 403 || error.statusCode === 403) {
                setIsUnverifiedEmail(true);
            } else {
                setLoginError(error.message || "Invalid email or password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Paper className="w-full max-w-md p-8 shadow-lg rounded-lg">
                <div className="text-center mb-8">
                    <Typography
                        variant="h4"
                        className="text-primary-700 font-bold mb-2"
                    >
                        Sign In
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Welcome back to UniBot
                    </Typography>
                </div>

                {registered && (
                    <Alert severity="success" className="mb-6">
                        Registration successful! Please check your email to
                        verify your account.
                    </Alert>
                )}

                {isUnverifiedEmail && (
                    <Alert severity="warning" className="mb-6">
                        <div>
                            <Typography
                                variant="body2"
                                className="font-medium mb-1"
                            >
                                Email not verified
                            </Typography>
                            <Typography variant="body2">
                                Please check your email and click on the
                                verification link we sent you.
                                <br />
                                Didn&apos;t receive the email?{" "}
                                <Link
                                    href="/resend-verification"
                                    className="text-primary-600 hover:text-primary-800 font-medium"
                                >
                                    Resend verification email
                                </Link>
                            </Typography>
                        </div>
                    </Alert>
                )}

                {loginError && (
                    <Alert severity="error" className="mb-6">
                        {loginError}
                    </Alert>
                )}

                {loginSuccess && (
                    <Alert severity="success" className="mb-6">
                        Login successful! Redirecting to your dashboard...
                    </Alert>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-6"
                >
                    {/* Email Field */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                className="bg-white"
                                InputLabelProps={{}}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        paddingLeft: "15px",
                                    },
                                    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)":
                                        {
                                            transform:
                                                "translate(40px, 16px) scale(1)",
                                        },
                                    "& .MuiInputLabel-shrink": {
                                        marginLeft: 0,
                                    },

                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow:
                                            "0 0 0 1000px white inset",
                                        WebkitTextFillColor: "inherit",
                                    },
                                    "& input:-webkit-autofill:focus": {
                                        WebkitBoxShadow:
                                            "0 0 0 1000px white inset",
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon className="text-gray-500" />
                                        </InputAdornment>
                                    ),
                                }}
                                id={`${field.name}-input`}
                            />
                        )}
                    />

                    {/* Password Field */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                className="bg-white"
                                InputLabelProps={{}}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        paddingLeft: "15px",
                                    },
                                    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)":
                                        {
                                            transform:
                                                "translate(40px, 16px) scale(1)",
                                        },
                                    "& .MuiInputLabel-shrink": {
                                        marginLeft: 0,
                                    },
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow:
                                            "0 0 0 1000px white inset",
                                        WebkitTextFillColor: "inherit",
                                    },
                                    "& input:-webkit-autofill:focus": {
                                        WebkitBoxShadow:
                                            "0 0 0 1000px white inset",
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon className="text-gray-500" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                                className="text-gray-600"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <div className="flex justify-between items-center">
                        {/* Remember Me Checkbox */}
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            className="text-primary-600"
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            className="text-gray-700"
                                        >
                                            Remember me
                                        </Typography>
                                    }
                                />
                            )}
                        />

                        {/* Forgot Password Link */}
                        <Link
                            href="/forgot-password"
                            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        className="bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <Divider className="my-6">
                        <Typography
                            variant="body2"
                            className="text-gray-500 px-2"
                        >
                            OR
                        </Typography>
                    </Divider>

                    {/* Register Link */}
                    <div className="text-center">
                        <Typography variant="body2" className="text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary-600 hover:text-primary-800 font-medium"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </div>
                </form>
            </Paper>
        </div>
    );
}
