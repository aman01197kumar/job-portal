
const END_POINTS = {
  //authentications
  LOGIN: `login`,
  SIGNUP: `signup`,
  GOOGLE_AUTH: 'google-auth',

  //Employer's
  JOB_POSTED_BY_EMPLOYER: `jobs/user`,
  CREATE_JOB: `create-jobs`,
  JOB_FETCHED_BY_EMPLOYER: `admin/job/posted`,

  //Job Seeker's
  JOBS: `jobs`,
  APPLIED_JOBS: `jobs/user`,
  APPLY_JOB: `job-applications`,
  STATUS_CARDS: `status/status-cards`,

  //user profile
  UPDATE_USER_PROFILE: `update-user-profile`,
  GET_USER_PROFILE: `get-user-details`
};

export { END_POINTS };
