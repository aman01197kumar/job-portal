// const BASE_URL = "https://job-portal-8rp9.onrender.com";
const BASE_URL = "http://localhost:3000"

const END_POINTS = {
  //authentications
  LOGIN: `login`,
  SIGNUP: `signup`,

  //Employer's
  JOB_POSTED_BY_EMPLOYER: `jobs/user`,
  CREATE_JOB: `create-jobs`,

  //Job Seeker's
  JOBS: `jobs`,
  USER_PROFILE: `getuser`,
  APPLIED_JOBS: `jobs/user`
};

export { BASE_URL, END_POINTS };
