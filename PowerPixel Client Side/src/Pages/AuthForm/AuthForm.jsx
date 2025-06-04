import React, { useEffect } from 'react';
import './AuthForm.css';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {

    const { createUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        
    } = useForm();

    const onSubmit = (data) => {

        if (!data.name || !data.email || !data.password) {
            if (!data.name) {
                setError("name", {
                    type: "manual",
                    message: "Name is required",
                });
            }
            if (!data.email) {
                setError("email", {
                    type: "manual",
                    message: "Email is required",
                });
            }
            if (!data.password) {
                setError("password", {
                    type: "manual",
                    message: "Password is required",
                });
            }
        } else {
            //console.log(data);
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    toast.success("Sign Up successful!");
                    setTimeout(() => {
                        document.getElementById('my_modal_2').close(); // Manually close modal
                        navigate('/');
                    }, 500); // Slight delay helps ensure DOM updates are done
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === "auth/email-already-in-use") {
                        toast.error("Email is already in use.");
                    } else if (error.code === "auth/weak-password") {
                        toast.error("Password is too weak.");
                    } else {
                        toast.error("An unknown error occurred.");
                    }
                })
        }
    };

    return (
        <>
            <div className="auth-container " id="container">
                <Toaster />

                {/* sign up form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaGoogle /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name"
                            {...register("name")}
                        />
                        {errors.name && <h6 className='text-red-500'>{errors.name.message}</h6>}
                        <input type="email" placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email && <h6 className='text-red-500'>{errors.email.message}</h6>}
                        <input type="password" placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password && <h6 className='text-red-500'>{errors.password.message}</h6>}
                        <button className='cursor-pointer'>Sign Up</button>
                    </form>
                </div>

                {/* sign in section */}
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaGoogle /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button className='cursor-pointer'>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost cursor-pointer" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost cursor-pointer" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
