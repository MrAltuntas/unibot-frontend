"use client";
import { useState, useEffect } from "react";
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
    Box,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Image from "next/image";
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
    if (process.env.NODE_ENV === "development") {
        console.log("[DEBUG] LoginPage component initialized");
    }
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");
    const { login } = useAuth();

    // Fix for hydration issues
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        console.log("[DEBUG] Setting isMounted to true");
        setIsMounted(true);
        console.log(
            "[DEBUG] Registration param:",
            registered ? "true" : "false"
        );
    }, [registered]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    // Log form errors when they change
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("[DEBUG] Form validation errors:", errors);
        }
    }, [errors]);

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isUnverifiedEmail, setIsUnverifiedEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    const onSubmit = async (data: TLoginForm) => {
        console.log("[DEBUG] Form submitted with data:", {
            email: data.email,
            password: "********", // Don't log actual password
            rememberMe: data.rememberMe,
        });

        setLoginError(null);
        setIsUnverifiedEmail(false);
        setLoginSuccess(false);
        setIsLoading(true);

        console.log("[DEBUG] Starting login process");

        try {
            console.log("[DEBUG] Calling login function from AuthContext");
            await login(data.email, data.password, data.rememberMe);

            console.log("[DEBUG] Login successful");
            setLoginSuccess(true);

            console.log("[DEBUG] Setting redirect timeout");
            setTimeout(() => {
                console.log("[DEBUG] Redirecting to dashboard");
                router.push("/dashboard");
            }, 2000);
        } catch (error: any) {
            console.error("[DEBUG] Login error details:", {
                status: error.status || error.statusCode,
                message: error.message,
                stack: error.stack,
                response: error.response
                    ? JSON.stringify(error.response, null, 2)
                    : "No response data",
            });

            // Check for specific message patterns or status codes
            const errorMsg = error.message?.toLowerCase() || "";
            console.log("[DEBUG] Error message lowercase:", errorMsg);

            if (
                error.status === 403 ||
                error.statusCode === 403 ||
                errorMsg.includes("verify") ||
                errorMsg.includes("verification") ||
                errorMsg.includes("unverified")
            ) {
                console.log("[DEBUG] Setting unverified email state");
                setIsUnverifiedEmail(true);
            } else {
                console.log("[DEBUG] Setting general login error");
                setLoginError(error.message || "Invalid email or password");
            }
        } finally {
            console.log("[DEBUG] Login process completed");
            setIsLoading(false);
        }
    };

    // If not mounted, avoid hydration issues by returning null
    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left Branding Column */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900">
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
                    <div>
                        <Typography
                            variant="h4"
                            className="text-white font-bold"
                        >
                            UniBot
                        </Typography>
                    </div>
                    <div className="max-w-md">
                        <Typography
                            variant="h3"
                            className="text-white font-bold mb-6"
                        >
                            Welcome back to your AI university assistant
                        </Typography>
                        <Typography variant="body1" className="text-white/80">
                            Sign in to continue your journey with the most
                            intelligent university assistant. Let UniBot help
                            you achieve academic excellence.
                        </Typography>
                        <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <Typography
                                variant="body1"
                                className="text-white font-medium italic"
                            >
                                &ldquo;UniBot has transformed how I manage my
                                university workload. The personalized support
                                and intelligent features have made a real
                                difference to my academic success.&rdquo;
                            </Typography>
                            <Typography
                                variant="body2"
                                className="text-white/70 mt-4"
                            >
                                — Sarah Chen, Computer Science Student
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-8 rounded-full bg-white opacity-100"></div>
                        <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
                        <div className="h-1.5 w-3 rounded-full bg-white/30"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-700/80 to-primary-900/95 z-0"></div>
                <Image
                    src="/university-campus.jpg"
                    alt="University campus"
                    fill
                    style={{ objectFit: "cover" }}
                    className="mix-blend-overlay opacity-50"
                    priority
                />
            </div>

            {/* Right Form Column */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-0">
                <div className="w-full max-w-md p-8 lg:p-12">
                    <div className="mb-10">
                        <Typography
                            variant="h4"
                            className="text-gray-800 font-bold mb-2"
                        >
                            Sign In
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            Enter your credentials to access your account
                        </Typography>
                    </div>

                    {registered && (
                        <Alert
                            severity="success"
                            className="mb-6"
                            sx={{
                                borderRadius: "8px",
                                backgroundColor: "rgba(46, 125, 50, 0.1)",
                                ".MuiAlert-icon": {
                                    color: "success.main",
                                },
                            }}
                        >
                            Registration successful! Please check your email to
                            verify your account.
                        </Alert>
                    )}

                    {isUnverifiedEmail && (
                        <Alert
                            severity="warning"
                            className="mb-6"
                            sx={{
                                borderRadius: "8px",
                                backgroundColor: "rgba(237, 108, 2, 0.1)",
                                ".MuiAlert-icon": {
                                    color: "warning.main",
                                },
                            }}
                        >
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
                        <Alert
                            severity="error"
                            className="mb-6"
                            sx={{
                                borderRadius: "8px",
                                backgroundColor: "rgba(211, 47, 47, 0.1)",
                                ".MuiAlert-icon": {
                                    color: "error.main",
                                },
                            }}
                        >
                            {loginError}
                        </Alert>
                    )}

                    {loginSuccess && (
                        <Alert
                            severity="success"
                            className="mb-6"
                            sx={{
                                borderRadius: "8px",
                                backgroundColor: "rgba(46, 125, 50, 0.1)",
                                ".MuiAlert-icon": {
                                    color: "success.main",
                                },
                            }}
                        >
                            Login successful! Redirecting to your dashboard...
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-5"
                        noValidate
                    >
                        {/* Email Field */}
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address format",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="email-input"
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    className="bg-white"
                                    onChange={(e) => {
                                        console.log(
                                            "[DEBUG] Email changed:",
                                            e.target.value
                                        );
                                        field.onChange(e);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                        },
                                    }}
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
                                    id="password-input"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    className="bg-white"
                                    onChange={(e) => {
                                        console.log(
                                            "[DEBUG] Password changed (masked)"
                                        );
                                        field.onChange(e);
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
                                                    onClick={() => {
                                                        console.log(
                                                            "[DEBUG] Toggle password visibility:",
                                                            !showPassword
                                                        );
                                                        setShowPassword(
                                                            !showPassword
                                                        );
                                                    }}
                                                    edge="end"
                                                    className="text-gray-600"
                                                    type="button"
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
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                        },
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
                                                id="remember-me-checkbox"
                                                checked={field.value}
                                                className="text-primary-600"
                                                onChange={(e) => {
                                                    console.log(
                                                        "[DEBUG] Remember me changed:",
                                                        e.target.checked
                                                    );
                                                    field.onChange(e);
                                                }}
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
                                onClick={() =>
                                    console.log(
                                        "[DEBUG] Forgot password link clicked"
                                    )
                                }
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
                            className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            endIcon={!isLoading && <ArrowForwardIcon />}
                            onClick={() =>
                                console.log(
                                    "[DEBUG] Submit button clicked - form will be validated"
                                )
                            }
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
                            <Typography
                                variant="body2"
                                className="text-gray-600"
                            >
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-primary-600 hover:text-primary-800 font-medium"
                                    onClick={() =>
                                        console.log(
                                            "[DEBUG] Register link clicked"
                                        )
                                    }
                                >
                                    Create an account
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
