import { DEMO_SCHOOL, DEMO_USERS } from './constants';

export const createDemoSchool = async () => {
  // This would typically create a demo school in the database
  // For now, we'll return the demo school data
  return DEMO_SCHOOL;
};

export const getDemoUsers = () => {
  return DEMO_USERS.map(user => ({
    ...user,
    school_id: DEMO_SCHOOL.id,
  }));
};

export const createDemoData = async () => {
  const school = await createDemoSchool();
  const users = getDemoUsers();
  
  return {
    school,
    users,
    classes: [
      {
        id: 'class-001',
        name: 'JSS 1A',
        level: 'Junior Secondary',
        capacity: 40,
        school_id: school.id,
      },
      {
        id: 'class-002',
        name: 'JSS 2B',
        level: 'Junior Secondary',
        capacity: 35,
        school_id: school.id,
      },
      {
        id: 'class-003',
        name: 'SS 1A',
        level: 'Senior Secondary',
        capacity: 30,
        school_id: school.id,
      },
    ],
    subjects: [
      {
        id: 'subject-001',
        name: 'Mathematics',
        code: 'MATH',
        description: 'General Mathematics',
        school_id: school.id,
      },
      {
        id: 'subject-002',
        name: 'English Language',
        code: 'ENG',
        description: 'English Language and Literature',
        school_id: school.id,
      },
      {
        id: 'subject-003',
        name: 'Physics',
        code: 'PHY',
        description: 'General Physics',
        school_id: school.id,
      },
    ],
    academicSessions: [
      {
        id: 'session-001',
        name: '2024/2025',
        start_date: '2024-09-01',
        end_date: '2025-07-31',
        is_current: true,
        school_id: school.id,
      },
    ],
    terms: [
      {
        id: 'term-001',
        name: 'First Term',
        start_date: '2024-09-01',
        end_date: '2024-12-15',
        status: 'open',
        is_current: true,
        school_id: school.id,
        academic_session_id: 'session-001',
      },
      {
        id: 'term-002',
        name: 'Second Term',
        start_date: '2025-01-15',
        end_date: '2025-04-15',
        status: 'closed',
        is_current: false,
        school_id: school.id,
        academic_session_id: 'session-001',
      },
      {
        id: 'term-003',
        name: 'Third Term',
        start_date: '2025-04-30',
        end_date: '2025-07-31',
        status: 'closed',
        is_current: false,
        school_id: school.id,
        academic_session_id: 'session-001',
      },
    ],
  };
};