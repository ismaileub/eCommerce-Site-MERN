import { useEffect } from "react";
import "./AuthForm.css";
import useAuth from "../../Hooks/useAuth";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

type AuthFormValues = {
  name: string;
  email: string;
  password: string;
};

type SignInValues = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const { createUser, signIn, googleSignIn, logOut } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const mobileSignUpButton = document.getElementById("mobileSignUp");
    const mobileSignInButton = document.getElementById("mobileSignIn");
    const container = document.getElementById("container");

    if (!container) return;

    const onSignUp = () => {
      container.classList.add("right-panel-active");
    };

    const onSignIn = () => {
      container.classList.remove("right-panel-active");
    };

    signUpButton?.addEventListener("click", onSignUp);
    signInButton?.addEventListener("click", onSignIn);
    mobileSignUpButton?.addEventListener("click", onSignUp);
    mobileSignInButton?.addEventListener("click", onSignIn);

    return () => {
      signUpButton?.removeEventListener("click", onSignUp);
      signInButton?.removeEventListener("click", onSignIn);
      mobileSignUpButton?.removeEventListener("click", onSignUp);
      mobileSignInButton?.removeEventListener("click", onSignIn);
    };
  }, []);

  const {
    register: registerSignUp,
    formState: { errors: signUpErrors },
    handleSubmit: handleSubmitSignUp,
    setError: setSignUpError,
    reset: resetSignUp,
  } = useForm<AuthFormValues>();

  const {
    register: registerSignIn,
    formState: { errors: signInErrors },
    handleSubmit: handleSubmitSignIn,
    setError: setSignInError,
    reset: resetSignIn,
  } = useForm<SignInValues>();

  const onSubmitSignUp: SubmitHandler<AuthFormValues> = (data) => {
    if (!data.name || !data.email || !data.password) {
      if (!data.name) {
        setSignUpError("name", {
          type: "manual",
          message: "Name is required",
        });
      }
      if (!data.email) {
        setSignUpError("email", {
          type: "manual",
          message: "Email is required",
        });
      }
      if (!data.password) {
        setSignUpError("password", {
          type: "manual",
          message: "Password is required",
        });
      }
      return;
    }

    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        await axiosPublic.post("/user/register", {
          name: data.name,
          email: data.email,
        });

        console.log(user);
        toast.success("Sign Up successful!");

        resetSignUp();
        logOut();

        setTimeout(() => {
          const modal = document.getElementById("my_modal_2");
          if (modal instanceof HTMLDialogElement) {
            modal.close();
          }
          navigate("/");
        }, 500);
      })
      .catch((error: any) => {
        console.log(error);
        if (error?.code === "auth/email-already-in-use") {
          toast.error("Email is already in use.");
        } else if (error?.code === "auth/weak-password") {
          toast.error("Password is too weak.");
        } else {
          toast.error("An unknown error occurred.");
        }
      });
  };

  const onSubmitSignIn: SubmitHandler<SignInValues> = (data) => {
    if (!data.email || !data.password) {
      if (!data.email) {
        setSignInError("email", {
          type: "manual",
          message: "Email is required",
        });
      }
      if (!data.password) {
        setSignInError("password", {
          type: "manual",
          message: "Password is required",
        });
      }
      return;
    }

    signIn(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        await axiosPublic.post("/auth/signin", {
          name: user.displayName || data.email.split("@")[0],
          email: data.email,
        });

        // console.log(user);
        toast.success("Sign In successful!");

        resetSignIn();

        setTimeout(() => {
          const modal = document.getElementById("my_modal_2");
          if (modal instanceof HTMLDialogElement) {
            modal.close();
          }
          navigate("/");
        }, 300);
      })
      .catch((error: any) => {
        console.log(error);
        if (error?.code === "auth/user-not-found") {
          toast.error("No user found with this email.");
        } else if (error?.code === "auth/wrong-password") {
          toast.error("Wrong password.");
        } else if (error?.code === "auth/invalid-credential") {
          toast.error("Invalid email or password.");
        } else {
          toast.error("An unknown error occurred.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const email = result.user?.email;
        const name = result.user?.displayName || email?.split("@")[0] || "User";
        const picture = result.user?.photoURL || undefined;

        if (!email) {
          throw new Error("Google account email not found");
        }

        try {
          await axiosPublic.post("/user/register", {
            name,
            email,
            picture,
          });
        } catch (error: any) {
          const message = error?.response?.data?.message;
          if (message !== "User Already Exist") {
            throw error;
          }
        }

        await axiosPublic.post("/auth/signin", {
          name,
          email,
          picture,
        });

        toast.success("Google Sign-In successful!");
        setTimeout(() => {
          const modal = document.getElementById("my_modal_2");
          if (modal instanceof HTMLDialogElement) {
            modal.close();
          }
          navigate("/");
        }, 300);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Sign-In failed.");
      });
  };

  return (
    <>
      <div className="auth-container " id="container">
        {/* sign up form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
            <h1>Join PowerPixel</h1>
            <p className="auth-subtitle">
              Save builds, track orders, and unlock member-only deals.
            </p>
            <div className="social-container">
              <button
                type="button"
                className="social-btn"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </div>
            <span>Or sign up with your email</span>
            <input type="text" placeholder="Name" {...registerSignUp("name")} />
            {signUpErrors.name && (
              <h6 className="text-red-500">{signUpErrors.name.message}</h6>
            )}
            <input
              type="email"
              placeholder="Email"
              {...registerSignUp("email")}
            />
            {signUpErrors.email && (
              <h6 className="text-red-500">{signUpErrors.email.message}</h6>
            )}
            <input
              type="password"
              placeholder="Password"
              {...registerSignUp("password")}
            />
            {signUpErrors.password && (
              <h6 className="text-red-500">{signUpErrors.password.message}</h6>
            )}
            <button className="cursor-pointer">Sign Up</button>
            <p className="auth-helper">We never share your email.</p>
            <p className="mobile-toggle">
              Already have an account?{" "}
              <button type="button" id="mobileSignIn" className="toggle-link">
                Sign In
              </button>
            </p>
          </form>
        </div>

        {/* sign in section */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitSignIn(onSubmitSignIn)}>
            <h1>Sign in to PowerPixel</h1>
            <p className="auth-subtitle">
              Access your saved builds, cart, and order history.
            </p>
            <div className="social-container">
              <button
                type="button"
                className="social-btn"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </div>
            <span>Or use your PowerPixel email</span>
            <input
              type="email"
              placeholder="Email"
              {...registerSignIn("email")}
            />
            {signInErrors.email && (
              <h6 className="text-red-500">{signInErrors.email.message}</h6>
            )}
            <input
              type="password"
              placeholder="Password"
              {...registerSignIn("password")}
            />
            {signInErrors.password && (
              <h6 className="text-red-500">{signInErrors.password.message}</h6>
            )}
            <a href="#">Reset your PowerPixel password</a>
            <button className="cursor-pointer mt-3">Sign In</button>
            <p className="auth-helper">We never share your email.</p>
            <p className="mobile-toggle">
              Don&apos;t have an account?{" "}
              <button type="button" id="mobileSignUp" className="toggle-link">
                Sign Up
              </button>
            </p>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back to PowerPixel</h1>
              <p>Sign in to pick up your build and track your orders.</p>
              <button className="cursor-pointer" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>New to PowerPixel?</h1>
              <p>Create an account to save builds, wishlists, and deals.</p>
              <button className="cursor-pointer" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
