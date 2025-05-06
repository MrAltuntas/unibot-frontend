"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Alert,
    Divider,
    FormHelperText,
    Box,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Image from "next/image";
import useMutateApi from "@/Hooks/useMutateApi";

type TRegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    agreeToTerms: boolean;
};

const initialValues: TRegisterForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    agreeToTerms: false,
};

export default function RegisterPage() {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const [registerApi, registerApiLoading] = useMutateApi({
        apiPath: `/users/create`,
        method: "POST",
    });

    const password = watch("password");

    const onSubmit = async (data: TRegisterForm) => {
        setRegistrationError(null);
        setIsLoading(true);

        try {
            const response = await registerApi(data);

            if (response.error === null) {
                router.push("/login?registered=true");
            } else {
                console.error(
                    "Registration API returned error:",
                    response.error
                );
                setRegistrationError(
                    response.error.message || "Registration failed"
                );
            }
        } catch (error: any) {
            if (
                error.status === 409 ||
                (error.message &&
                    error.message.toLowerCase().includes("exists"))
            ) {
                setRegistrationError(
                    "An account with this email already exists"
                );
            } else {
                setRegistrationError(
                    error.message || "An unexpected error occurred"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isClient) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Typography variant="h6">
                    Loading registration form...
                </Typography>
            </div>
        );
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
                            Join the intelligent university assistant
                        </Typography>
                        <Typography variant="body1" className="text-white/80">
                            Create an account to get access to the most helpful
                            AI assistant for university students. Get answers to
                            your questions, manage your schedule, and excel in
                            your studies.
                        </Typography>
                        <div className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <Typography
                                variant="body1"
                                className="text-white font-medium italic"
                            >
                                &ldquo;UniBot has completely transformed my
                                university experience. It helps me stay
                                organized and get answers to complex questions
                                instantly!&rdquo;
                            </Typography>
                            <Typography
                                variant="body2"
                                className="text-white/70 mt-4"
                            >
                                — Alex Johnson, Computer Science Student
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
                            Create Account
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            Join UniBot to enhance your university experience
                        </Typography>
                    </div>

                    {registrationError && (
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
                            {registrationError}
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-5"
                    >
                        {/* First Name Field */}
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "First name must be at least 2 characters",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon className="text-gray-500" />
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

                        {/* Last Name Field */}
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required: "Last name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Last name must be at least 2 characters",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon className="text-gray-500" />
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
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message:
                                        "Password must include uppercase, lowercase, number and special character",
                                },
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Box className="text-gray-500">
                                                    🔒
                                                </Box>
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
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Confirm Password Field */}
                        <Controller
                            name="passwordConfirmation"
                            control={control}
                            rules={{
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    error={!!errors.passwordConfirmation}
                                    helperText={
                                        errors.passwordConfirmation?.message
                                    }
                                    className="bg-white"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Box className="text-gray-500">
                                                    🔒
                                                </Box>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    className="text-gray-600"
                                                >
                                                    {showConfirmPassword ? (
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

                        <Controller
                            name="agreeToTerms"
                            control={control}
                            rules={{
                                required:
                                    "You must agree to terms and conditions",
                            }}
                            render={({ field }) => (
                                <div>
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
                                                I agree to the Terms of Service
                                                and Privacy Policy
                                            </Typography>
                                        }
                                    />
                                    {errors.agreeToTerms && (
                                        <FormHelperText error>
                                            {errors.agreeToTerms.message}
                                        </FormHelperText>
                                    )}
                                </div>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={isLoading || registerApiLoading}
                            className="mt-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            endIcon={
                                !isLoading &&
                                !registerApiLoading && <ArrowForwardIcon />
                            }
                        >
                            {isLoading || registerApiLoading
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>

                        <Divider className="my-6">
                            <Typography
                                variant="body2"
                                className="text-gray-500 px-2"
                            >
                                OR
                            </Typography>
                        </Divider>

                        {/* Login Link */}
                        <div className="text-center">
                            <Typography
                                variant="body2"
                                className="text-gray-600"
                            >
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-primary-600 hover:text-primary-800 font-medium"
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
