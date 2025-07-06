import { useState, useEffect } from "react";
import { useNavigate, useSearchParams,Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/"; // Default redirect


    // Check localStorage for "Remember Me" data on component mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");

        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true); // Pre-check the "Remember Me" checkbox
        }
        if (rememberedPassword) {
            setPassword(rememberedPassword);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }
    
        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            }, { withCredentials: true });
    
            console.log("Response Data:", res.data); // Debug API response
    
            if (res.data.success) {
                console.log("Login successful, User Role:", res.data.user.role);
    
                // Save user data in localStorage
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
    
                // Handle "Remember Me" functionality
                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                    localStorage.setItem("rememberedPassword", password);
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                }
    
                navigate(redirect);

    
                
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };
    

    return (
        <>
            <div className="preloader">
                <div className="loader"></div>
            </div>
            <div className="side-overlay"></div>
            <section className="auth d-flex gap-90">
                <div className="auth-left bg-main-50 flex-center justify-between">
                    <img src="/assets/images/thumbs/auth-img1.png" alt="" />
                </div>
                <div className="auth-right py-40 px-24 flex-center flex-column">
                    <div className="auth-right__inner mx-auto w-100">
                        <Link to="/" className="sidebar__logo py-40 position-sticky">
                            <img src={logo} alt="Logo" className="h-32" />
                        </Link>
                        <h2 className="mb-8">Welcome Back! &#128075;</h2>
                        <p className="text-gray-600 text-15 mb-32">
                            Please sign in to your account and start the adventure
                        </p>

                        {error && <p className="error-text text-red-500 mb-24">{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-24">
                                <label htmlFor="email" className="form-label mb-8 h6">Email</label>
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control py-11 ps-40"
                                        id="email"
                                        placeholder="Type your email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-24">
                                <label htmlFor="password" className="form-label mb-8 h6">Password</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control py-11 ps-40"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <span
                                        className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`ph ph-eye${showPassword ? "" : "-slash"}`}></i>
                                    </span>
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-32 flex flex-between flex-wrap gap-8 w-full">
                                <div className="form-check mb-0 flex items-center flex-shrink-0">
                                    <input
                                        className="form-check-input flex-shrink-0 rounded-4"
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label className="form-check-label text-15 flex-grow-1 pt-2" htmlFor="remember">
                                        Remember Me
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-main-600 hover-text-decoration-underline text-15 fw-medium"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className="btn btn-main rounded-pill w-100">
                                Sign In
                            </button>

                            <p className="mt-32 text-gray-600 text-center">
                                New on our platform?
                                <Link to="/register" className="text-main-600 pl-2 hover-text-decoration-underline">
                                    Create an account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;