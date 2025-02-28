import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL;

    // Load remembered credentials on mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
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
            const res = await axios.post(`${url}/auth/admin-login`, { email, password }, { withCredentials: true });

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);

                // Handle Remember Me
                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                    localStorage.setItem("rememberedPassword", password);
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                }

                navigate("/admin", { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <>
            <div className="preloader"><div className="loader"></div></div>
            <div className="side-overlay"></div>
            <section className="auth bg-blue-100 flex justify-center items-center">
                <div className="auth-right py-48 p-24 rounded-lg shadow-md flex-center flex-column bg-zinc-100 w-[50%]">
                    <div className="auth-right__inner mx-auto w-100">
                        <Link to="/" className="sidebar__logo py-40 position-sticky">
                            <img src={logo} alt="Logo" className="h-32" />
                        </Link>
                        <h2 className="mb-6 font-semibold text-lg">Admin Portal 🔐</h2>
                        <p className="text-gray-600 text-15 mb-32">Sign in with your admin credentials</p>

                        {error && <p className="error-text text-red-500 mb-24">{error}</p>}

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="mb-24">
                                <label htmlFor="email" className="form-label mb-8 h6">Email</label>
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control py-11 ps-40"
                                        id="email"
                                        placeholder="Enter Admin Email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    />
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-envelope"></i> {/* Email Icon */}
                                    </span>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-24">
                                <label htmlFor="password" className="form-label mb-8 h6">Password</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control py-11 ps-40"
                                        id="password"
                                        placeholder="Enter Admin Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    />
                                    <span
                                        className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`ph ph-eye${showPassword ? "" : "-slash"}`}></i> {/* Toggle Password Icon */}
                                    </span>
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-lock"></i> {/* Lock Icon */}
                                    </span>
                                </div>
                            </div>

                            {/* Remember Me and Forgot Password */}
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

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-main rounded-pill w-100">Sign In</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminLogin;