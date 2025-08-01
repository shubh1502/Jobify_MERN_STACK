import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

import { useAllJobsContext } from "../pages/AllJobs";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { totalJobs, jobs } = data;

  if (jobs.length == 0)
    return (
      <Wrapper>
        <h4>No jobs to display</h4>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
