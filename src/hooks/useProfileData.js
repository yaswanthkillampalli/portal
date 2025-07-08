import { useState, useEffect } from 'react';
import { getProfileDetails, getPersonalProfileDetails, getParentDetails } from '../services/student';

export default function useProfileData(activeSection) {
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileDetails = async () => {
      setIsLoading(true);
      setError(''); // Clear previous errors on section change
      try {
        let data;
        switch (activeSection) {
          case 'profile':
            data = await getProfileDetails();
            const enrollmentDate = new Date(data.enrollmentDate);
            const dateofbirth = new Date(data.dateOfBirth);
            setProfileData({
              profileImage: data.imageurl,
              profileFirstName: data.firstName,
              profileLastName: data.lastName,
              profileDOB: dateofbirth.toISOString().split('T')[0],
              profileGender: data.gender,
              profileEnrollmentDate: enrollmentDate.toISOString().split('T')[0],
              profileProgram: data.program,
              profileBranch: data.branch,
              profileSemester: data.currentSemester,
              profileStreet: data.address.street,
              profileVillage: data.address.village,
              profileMandal: data.address.mandal,
              profileCity: data.address.city,
              profileState: data.address.state,
              profileZipcode: data.address.zipCode,
            });
            break;
          case 'personal':
            data = await getPersonalProfileDetails();
            setProfileData({
              profileEmail: data.email,
              profilePhone: data.phone,
            });
            break;
          case 'parent':
            data = await getParentDetails();
            setProfileData({
              profileFatherRelation: data.parents[0]?.relation || '',
              profileFatherFirstName: data.parents[0]?.firstName || '',
              profileFatherLastName: data.parents[0]?.lastName || '',
              profileFatherEmail: data.parents[0]?.contact?.email || '',
              profileFatherPhone: data.parents[0]?.contact?.phone || '',
              profileMotherRelation: data.parents[1]?.relation || '',
              profileMotherFirstName: data.parents[1]?.firstName || '',
              profileMotherLastName: data.parents[1]?.lastName || '',
              profileMotherEmail: data.parents[1]?.contact?.email || '',
              profileMotherPhone: data.parents[1]?.contact?.phone || '',
            });
            break;
          case 'password':
            // No data fetching for password section
            setProfileData({});
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
        setProfileData({}); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileDetails();
  }, [activeSection]);

  return {
    profileData,
    setProfileData,
    formData,
    setFormData,
    isLoading,
    error,
    setError,
  };
}