import '../styles/Profile.css';
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";

export default function Profile() {
  return(
    <>
      <div className='profile-main-container'>
        <div className='profile-left-side-container'>
          <div className='profile-left-container-menu-item-container'>
            <div className='profile-left-container-menu-item'>
              <CgProfile className='profile-left-container-menu-item-icon' />
              <span className='profile-left-container-menu-item-text'>Profile</span>
            </div>
            <div className='profile-left-container-menu-item'>
              <TbLockPassword className='profile-left-container-menu-item-icon' />
              <span className='profile-left-container-menu-item-text'>Password Change</span>
            </div>
            <div className='profile-left-container-menu-item'>
              <RiParentFill className='profile-left-container-menu-item-icon' />
              <span className='profile-left-container-menu-item-text'>Parent Details</span>
            </div>
          </div>
        </div>
        <div className='profile-right-side-container'>
          
        </div>
      </div>
    </>
  )
}