import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://20.25.50.191:5144/api/Auth/reset-password",
        {
          email,
          tokenOrOtp: otp,
          newPassword,
          confirmPassword,
        }
      );

      toast.success("Password reset successfully!");

      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password.");
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
          Reset Password
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
          Enter the verification code sent to your email and create a new
          password.
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
            value={email}
            readOnly
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#F5F5F5",
              outline: "none",
              fontSize: "15px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444",
            }}
          >
            Verification Code
          </label>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#F5F5F5",
              outline: "none",
              fontSize: "15px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444",
            }}
          >
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#F5F5F5",
              outline: "none",
              fontSize: "15px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#444",
            }}
          >
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#F5F5F5",
              outline: "none",
              fontSize: "15px",
              marginBottom: "30px",
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
            Reset Password
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#800020",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;