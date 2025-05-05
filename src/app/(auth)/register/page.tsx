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
    Stepper,
    Step,
    StepLabel,
    Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    const {
        control,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initialValues,
        mode: "onChange",
    });

    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const [registerApi, registerApiLoading] = useMutateApi({
        apiPath: `/users/create`,
        method: "POST",
    });

    const password = watch("password");

    const steps = [
        { label: "Personal Info", fields: ["firstName", "lastName"] },
        {
            label: "Account Setup",
            fields: ["email", "password", "passwordConfirmation"],
        },
        { label: "Confirmation", fields: ["agreeToTerms"] },
    ];

    const handleNext = async () => {
        const fieldsToValidate = steps[activeStep].fields;
        const isStepValid = await trigger(fieldsToValidate as any);

        if (isStepValid) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

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

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
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
                    </>
                );
            case 1:
                return (
                    <>
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
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                        },
                                    }}
                                />
                            )}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="bg-gray-50 p-6 rounded-xl mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <SchoolIcon className="text-primary-500" />
                                <Typography
                                    variant="h6"
                                    className="text-gray-800"
                                >
                                    Almost there!
                                </Typography>
                            </div>
                            <Typography
                                variant="body2"
                                className="text-gray-600 mb-4"
                            >
                                By creating an account, you&apos;ll have access
                                to:
                            </Typography>
                            <ul className="list-disc ml-5 space-y-2">
                                <li className="text-gray-700">
                                    Personalized academic assistance
                                </li>
                                <li className="text-gray-700">
                                    Course planning and scheduling tools
                                </li>
                                <li className="text-gray-700">
                                    Study resources and recommendations
                                </li>
                                <li className="text-gray-700">
                                    AI-powered learning support
                                </li>
                            </ul>
                        </div>

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
                                                I agree to the{" "}
                                                <Link
                                                    href="/terms"
                                                    className="text-primary-600 hover:text-primary-800"
                                                >
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link
                                                    href="/privacy"
                                                    className="text-primary-600 hover:text-primary-800"
                                                >
                                                    Privacy Policy
                                                </Link>
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
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row overflow-hidden">
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
                            Start your journey with UniBot today
                        </Typography>
                        <Typography variant="body1" className="text-white/80">
                            Join thousands of students who are using UniBot to
                            enhance their university experience. Get
                            personalized academic support and organize your
                            studies efficiently.
                        </Typography>
                        <div className="flex flex-col gap-4 mt-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <SchoolIcon className="text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="body1"
                                        className="text-white font-medium"
                                    >
                                        Academic Excellence
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="text-white/70"
                                    >
                                        AI-powered assistance for your courses
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <SchoolIcon className="text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="body1"
                                        className="text-white font-medium"
                                    >
                                        Personalized Learning
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="text-white/70"
                                    >
                                        Custom study plans and resources
                                    </Typography>
                                </div>
                            </div>
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
                    src="/university-students.jpg"
                    alt="University students"
                    fill
                    style={{ objectFit: "cover" }}
                    className="mix-blend-overlay opacity-50"
                    priority
                />
            </div>

            {/* Right Form Column */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-0">
                <div className="w-full max-w-md p-8 lg:p-12">
                    <div className="mb-8 text-center lg:text-left">
                        <Typography
                            variant="h4"
                            className="text-gray-800 font-bold mb-2"
                        >
                            Create an Account
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            Join UniBot and transform your university experience
                        </Typography>
                    </div>

                    {isRegistered ? (
                        <Alert
                            severity="success"
                            className="mb-4"
                            sx={{
                                borderRadius: "8px",
                                backgroundColor: "rgba(46, 125, 50, 0.1)",
                                ".MuiAlert-icon": {
                                    color: "success.main",
                                },
                            }}
                        >
                            Registration successful! Check your email to verify
                            your account. Redirecting to login page...
                        </Alert>
                    ) : (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-y-5"
                        >
                            {registerError && (
                                <Alert
                                    severity="error"
                                    className="mb-4"
                                    sx={{
                                        borderRadius: "8px",
                                        backgroundColor:
                                            "rgba(211, 47, 47, 0.1)",
                                        ".MuiAlert-icon": {
                                            color: "error.main",
                                        },
                                    }}
                                >
                                    {registerError}
                                </Alert>
                            )}

                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                className="mb-8"
                            >
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel>{step.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <div className="space-y-5 mb-8">
                                {renderStepContent(activeStep)}
                            </div>

                            <div className="flex justify-between mt-4">
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                    color="primary"
                                    className="px-6 rounded-xl"
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back
                                </Button>

                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="px-6 rounded-xl"
                                        disabled={registerApiLoading}
                                        endIcon={
                                            !registerApiLoading && (
                                                <ArrowForwardIcon />
                                            )
                                        }
                                    >
                                        {registerApiLoading
                                            ? "Creating Account..."
                                            : "Complete"}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className="px-6 rounded-xl"
                                        endIcon={<ArrowForwardIcon />}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>

                            {activeStep === steps.length - 1 && (
                                <>
                                    <Divider className="my-6">
                                        <Typography
                                            variant="body2"
                                            className="text-gray-500 px-2"
                                        >
                                            OR
                                        </Typography>
                                    </Divider>

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
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
