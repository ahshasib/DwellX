import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useRole from '../hooks/useRole';
import { updateProfile, updatePassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [role,roleLoading] = useRole();

  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // optional UI only

  // ✅ Update Profile
  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      Swal.fire('Success!', 'Profile updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', err.message, 'error');
    }
  };

  // ✅ Change Password
  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      return Swal.fire('Error', 'Password must be at least 6 characters', 'error');
    }

    try {
      await updatePassword(user, newPassword);
      Swal.fire('Success!', 'Password changed successfully!', 'success');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', err.message, 'error');
    }
  };

  if (roleLoading) return <Loading></Loading>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Helmet>
        <title>Profile | Dashboard</title>
      </Helmet>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        {/* 🖼️ Profile Card */}
        <div className="text-center mb-6">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-indigo-500 shadow"
          />
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-1 text-indigo-600 font-semibold capitalize">Role: {role?.toUpperCase()}</p>
        </div>

        {/* ✏️ Update Profile */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Update Profile</h3>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button onClick={handleUpdate} className="btn btn-primary w-full">Update</button>
        </div>

        {/* 🔐 Change Password */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Change Password</h3>
          {/* Optional UI input for old password */}
          {/* <input type="password" className="input input-bordered w-full mb-2" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /> */}
          <input
            type="password"
            className="input input-bordered w-full mb-2"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange} className="btn btn-secondary w-full">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
