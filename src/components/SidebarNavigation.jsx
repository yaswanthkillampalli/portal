import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { TbLockPassword } from 'react-icons/tb';
import { RiParentFill } from 'react-icons/ri';
import { LiaUserLockSolid } from 'react-icons/lia';

export default function SidebarNavigation({ activeSection, onSectionChange }) {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: CgProfile },
    { id: 'personal', label: 'Personal Info', icon: LiaUserLockSolid },
    { id: 'parent', label: 'Parent Details', icon: RiParentFill },
    { id: 'password', label: 'Password Change', icon: TbLockPassword },
  ];

  return (
    <div className="profile-left-side-container">
      <div className="profile-left-container-menu-item-container">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`profile-left-container-menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className="profile-left-container-menu-item-icon" />
            <span className="profile-left-container-menu-item-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}