
const END_POINTS = {
  //authentications
  LOGIN: `user/login`,
  SIGNUP: `user/signup`,
  GOOGLE_AUTH: 'user/google-auth',
  DASHBOARD_ACCESS: `user/dashboard`,

  //Employer's
  JOB_POSTED_BY_EMPLOYER: `jobs/user`,
  CREATE_JOB: `jobs/create-jobs`,
  JOB_FETCHED_BY_EMPLOYER: `jobs/admin/job/posted`,

  //Job Seeker's
  RECENT_JOBS: `jobs/recent-jobs`,
  APPLIED_JOBS: `jobs/user`,
  APPLY_JOB: `jobs/job-applications`,
    STATUS_CARDS: `status/status-cards`,

  //user profile
  UPDATE_USER_PROFILE: `user/update-user-profile`,
  GET_USER_PROFILE: `user/get-user-details`
};

export { END_POINTS };
