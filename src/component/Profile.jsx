import React from 'react';
import { getInitials } from '../utils/helper/getInitials';

const Profile = ({ userInfo, onLogout }) => {
  if (!userInfo) return null; // Early return if no user info

  const { FullName } = userInfo;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-medium bg-slate-100">
        {getInitials(FullName || "")}
      </div>
      <div>
        <p className="text-sm font-medium">{FullName || ""}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
