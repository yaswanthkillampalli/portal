import api from './api';

export const getAttendencePercentage = async () => {
  try {
    const response = await api.get('/students/attendance-days');
    if (response.data && response.data.attendancePercentage !== undefined) {
      const { attendanceRecordsCount, attendancePercentage, totalWorkingDays } = response.data;
      return { 
        attendanceRecordsCount,
        attendancePercentage,
        totalWorkingDays
      };
    }
    
    throw new Error('Invalid response format or missing attendancePercentage from backend.');
  } catch (error) {
    throw error;
  }
};

export const getCurrentCGPA = async () => {
  try {
    const response = await api.get('/students/current-cgpa');
    if (response.data && response.data.cgpa !== undefined) {
      return response.data.cgpa;
    }
    throw new Error('Invalid response format or missing currentCGPA from backend.');
  } catch (error) {
    throw error;
  }
};

export const getTotalCoursesRegistered = async () => {
  try {
    const response = await api.get('/students/courses-registered');
    if (response.data) {
      return response.data.courses.length || 0;
    }
    throw new Error('Invalid response format or missing totalCourses from backend.');
  } catch (error) {
    throw error;
  }
}

export const getTotalCredits = async () => {
  try {
    const response = await api.get('/students/total-credits');
    if (response.data && response.data.totalCredits !== undefined) {
      return response.data.totalCredits;
    }
    throw new Error('Invalid response format or missing totalCredits from backend.');
  } catch (error) {
    throw error;
  }
};

export const getTotalCertificates = async () => {
  try {
    const response = await api.get('/students/certificates-count');
    if (response.data && response.data.totalCertificates) {
      return response.data.totalCertificates;
    }
    throw new Error('Invalid response format or missing certificates from backend.');
  } catch (error) {
    throw error;
  }
}
export const upcomingExamsCache = async () => {
  try {
    const response = await api.get('/students/nearest-exam');

    if (response.data && response.data.nearestExam) {
      const examDate = new Date(response.data.nearestExam.date);

      const day = examDate.getDate(); // 1–31
      const monthAbbrs = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = monthAbbrs[examDate.getMonth()]; 

      return {
        day,
        month,
        examType: response.data.nearestExam.examType
      };
    }

    throw new Error('Invalid response format or missing nearestExam from backend.');
  } catch (error) {
    throw error;
  }
};

export const getProfileDetails = async () => {
  try {
    const response = await api.get('/profile/student');
    if (response.data && response.data) {
      return response.data.profile;
    }
    throw new Error('Invalid response format or missing profile from backend.');
  } catch (error) {
    throw error;
  }
}

export const getPersonalProfileDetails = async () => {
  try {
    const response = await api.get('/profile/personal-student');
    if (response.data && response.data.personal) {
      return response.data.personal.contact;
    }
    throw new Error('Invalid response format or missing studentDetails from backend.');
  } catch (error) {
    throw error;
  }
};

export const getParentDetails = async () => {
  try {
    const response = await api.get('/profile/student-parents');
    if (response.data && response.data.parent) {
      console.log(response.data.parent);
      return response.data.parent;
    }
    throw new Error('Invalid response format or missing parentDetails from backend.');
  } catch (error) {
    throw error;
  }
};

export const updateProfileDetails = async (data) => {
  try {
    const response = await api.put('/profile/update', data);
    return response.data;

  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
}
