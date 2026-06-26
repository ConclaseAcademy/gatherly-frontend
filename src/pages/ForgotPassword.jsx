import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://20.25.50.191:5144/api/Auth/forgot-password",
        {
          email,
        }
      );

      toast.success("OTP has been sent to your email.");

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      toast.error("Failed to send OTP.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFF8FA",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <Logo page="auth" />
        </div>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#0E0D0D",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Forgot Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Enter your registered email address and we'll send a verification
          code (OTP) to reset your password.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#F5F5F5",
              outline: "none",
              fontSize: "15px",
              marginBottom: "25px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "#800020",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Send OTP
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "#800020",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;