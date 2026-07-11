import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const data = await loginUser(email, password);

            dispatch(
                loginSuccess({
                    user: data.user,
                    token: data.token,
                })
            );

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            console.log("Login Successful");
            console.log(data);

        } catch (error) {

            console.error(error.response?.data || error.message);

        }
    };
    return (
        <div className="min-h-screen bg-[#1E2022] flex">

            {/* Left Section */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20">

                <h1 className="text-5xl font-bold text-white">
                    NTI POS
                </h1>

                <p className="mt-4 text-2xl text-green-500 font-semibold">
                    Inventory & Sales Management System
                </p>

                <p className="mt-6 text-gray-300 text-lg leading-8">
                    Manage products, customers, suppliers,
                    purchases and sales from one professional
                    Point of Sale system.
                </p>

            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">

                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md bg-[#2B2D31] rounded-2xl p-10 shadow-xl"
                >

                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Login
                    </h2>

                    {/* Email */}

                    <div className="mb-5">

                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}

                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                        />

                    </div>

                    {/* Password */}

                    <div className="mb-6">

                        <label className="block text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1E2022] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;