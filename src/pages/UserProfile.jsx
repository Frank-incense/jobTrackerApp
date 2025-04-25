import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    bio: "Experienced software engineer looking for new opportunities in full-stack development.",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    resumeUrl: "#",
    profilePic: null,
    profileCompletion: 75,
    jobStats: {
      applied: 24,
      interviews: 6,
      offers: 2,
      rejected: 5,
      activeApplications: 8,
      upcomingInterviews: 2,
      archived: 9,
    },
  });
   
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      // Proper API URL format
      fetch(`https://your-api-endpoint/users/${id}`)
        .then((r) => r.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]); // Add

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setEditMode(false);
    // In a real app, you would save to the backend here
    // saveUserData(formData);
  };

  const cancelEdit = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const validatePasswordChange = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitPasswordChange = (e) => {
    e.preventDefault();

    if (validatePasswordChange()) {
      // In a real app, you would call API to change password
      console.log("Password change submitted:", passwordData);

      // Simulate successful password change
      setPasswordSuccess(true);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }, 2000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeProfilePic = () => {
    setFormData({
      ...formData,
      profilePic: null,
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!editMode && (
          <div className="profile-actions">
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
            <button
              className="password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        {editMode ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group profile-pic-upload">
              <label>Profile Picture</label>
              <div className="pic-upload-container">
                {formData.profilePic ? (
                  <div className="profile-pic-preview">
                    <img src={formData.profilePic} alt="Profile" />
                    <button
                      type="button"
                      className="remove-pic-btn"
                      onClick={removeProfilePic}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="avatar-upload">
                    <div className="avatar">
                      {formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="upload-pic-btn"
                  onClick={triggerFileInput}
                >
                  {formData.profilePic ? "Change Picture" : "Upload Picture"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Skills</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="skill-input-group">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                  />
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => removeSkill(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-skill-btn"
                onClick={addSkill}
              >
                + Add Skill
              </button>
            </div>

            <div className="form-group">
              <label>Resume URL</label>
              <input
                type="url"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-overview">
              <div className="profile-card">
                {user.profilePic ? (
                  <div className="profile-pic">
                    <img src={user.profilePic} alt="Profile" />
                  </div>
                ) : (
                  <div className="avatar">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="profile-info">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.location}</p>
                  <a
                    href={user.resumeUrl}
                    className="resume-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              <div className="profile-stats">
                <h3>Profile Completion</h3>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${user.profileCompletion}%` }}
                  ></div>
                </div>
                <span>{user.profileCompletion}% complete</span>

                <h3>Job Search Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{user.jobStats.applied}</div>
                    <div className="stat-label">Applied</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.jobStats.interviews}</div>
                    <div className="stat-label">Interviews</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.jobStats.offers}</div>
                    <div className="stat-label">Offers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.jobStats.rejected}</div>
                    <div className="stat-label">Rejected</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {user.jobStats.activeApplications}
                    </div>
                    <div className="stat-label">Active</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {user.jobStats.upcomingInterviews}
                    </div>
                    <div className="stat-label">Upcoming</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{user.jobStats.archived}</div>
                    <div className="stat-label">Archived</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h3>About Me</h3>
                <p>{user.bio}</p>
              </div>

              <div className="detail-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordErrors({});
                  setPasswordSuccess(false);
                }}
              >
                &times;
              </button>
            </div>

            {passwordSuccess ? (
              <div className="password-success">
                <p>Password changed successfully!</p>
              </div>
            ) : (
              <form onSubmit={submitPasswordChange} className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordErrors.currentPassword && (
                    <span className="error-message">
                      {passwordErrors.currentPassword}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordErrors.newPassword && (
                    <span className="error-message">
                      {passwordErrors.newPassword}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordErrors.confirmPassword && (
                    <span className="error-message">
                      {passwordErrors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordErrors({});
                      setPasswordSuccess(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
