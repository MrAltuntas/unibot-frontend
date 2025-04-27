"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Paper,
    FormHelperText,
    IconButton,
    InputAdornment,
    Alert,
    Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMutateApi from "@/Hooks/useMutateApi";

// Create a common sx style object to apply to all text fields
const textFieldSx = {
    "& .MuiInputBase-input": {
        paddingLeft: "15px",
    },
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(40px, 16px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
        marginLeft: 0,
    },
    // Fix autofill styling
    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
        {
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: "inherit",
            transition: "background-color 5000s ease-in-out 0s",
        },
    // Consistent hover styles
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
    },
    // Consistent focus styles
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
    },
    // Ensure text remains visible during transition
    "& .MuiInputBase-input, & .MuiInputLabel-root": {
        transition: "color 0.2s ease-in-out",
    },
};

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
    const [isRegistered, setIsRegistered] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const [registerApi, registerApiLoading] = useMutateApi({
        apiPath: `/users/create`,
        method: "POST",
    });

    const password = watch("password");

    const onSubmit = async (data: TRegisterForm) => {
        setRegisterError(null);

        try {
            const registerApiResponse = await registerApi({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
            });

            if (registerApiResponse.error === null) {
                setIsRegistered(true);

                setTimeout(() => {
                    router.push("/login?registered=true");
                }, 3000);
            } else {
                setRegisterError(
                    registerApiResponse.error.message || "Registration failed"
                );
                console.error("Registration error:", registerApiResponse.error);
            }
        } catch (error) {
            setRegisterError(
                "An unexpected error occurred during registration"
            );
            console.error("Registration error:", error);
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
                        Create Account
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Join us today and start exploring
                    </Typography>
                </div>

                {isRegistered ? (
                    <Alert severity="success" className="mb-4">
                        Registration successful! Check your email to verify your
                        account. Redirecting to login page...
                    </Alert>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-6"
                    >
                        {registerError && (
                            <Alert severity="error" className="mb-4">
                                {registerError}
                            </Alert>
                        )}

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
                                    sx={textFieldSx}
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
                                    sx={textFieldSx}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon className="text-gray-500" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={textFieldSx}
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
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
                                    sx={textFieldSx}
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
                                                <LockIcon className="text-gray-500" />
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
                                    sx={textFieldSx}
                                />
                            )}
                        />

                        {/* Terms and Conditions Checkbox */}
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
                            disabled={registerApiLoading}
                            className="bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            {registerApiLoading
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
                        <div className="text-center mt-4">
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
                )}
            </Paper>
        </div>
    );
}
