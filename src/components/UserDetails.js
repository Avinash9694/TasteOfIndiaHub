import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  // Firebase authentication instance
  const auth = getAuth();

  // Destructuring currentUser from authentication instance
  const { currentUser } = auth;

  // State variables for display name and new profile picture URL
  const [displayName, setDisplayName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
    }
  }, [currentUser]);

  // Styles for buttons, inputs, and container
  const buttonStyle = {
    padding: "10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
  };

  const inputStyle = {
    margin: "5px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  };

  const profilePicStyle = {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    try {
      // Update profile using Firebase authentication API
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: newPhotoURL || currentUser.photoURL,
      });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }

    // Display success toast and navigate to the home page
    toast.success("Profile updated successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    navigate("/");
  };

  // Function to handle password reset
  const handlePasswordReset = async () => {
    try {
      // Send password reset email using Firebase authentication API
      await sendPasswordResetEmail(auth, currentUser.email);

      // Display info toast for successful password reset email sent
      toast.info("Password reset link sent to your email!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error.message);

      // Display error toast for failed password reset email sending
      toast.error("Failed to send password reset email", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2>User Details</h2>
      {currentUser && (
        <>
          <p>Name: {currentUser.displayName}</p>
          <p>Email: {currentUser.email}</p>
          <p>
            Profile Picture:{" "}
            <img
              src={currentUser.photoURL}
              alt="Profile"
              style={profilePicStyle}
            />
          </p>

          <input
            type="url"
            id="newPhotoURL"
            placeholder="Enter new display picture url"
            value={newPhotoURL}
            onChange={(e) => setNewPhotoURL(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter new display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            onClick={handleUpdateProfile}
            style={buttonStyle}
          >
            Update
          </button>

          <button
            type="button"
            onClick={handlePasswordReset}
            style={buttonStyle}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default UserDetails;
