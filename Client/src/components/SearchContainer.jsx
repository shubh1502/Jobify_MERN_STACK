import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormRowSelect from "./FormRowSelect";
import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useSubmit } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../../utils/constants";

const SearchContainer = () => {
  const { data, searchParams } = useAllJobsContext();
  console.log(data, searchParams);
  const { search, JobStatus, JobType, sort } = searchParams;

  const debounce = (submit) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("debounce called");
        submit(form);
      }, 2000);
    };
  };

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form method="get" className="form">
        <h4 className="form-title">Search Jobs</h4>
        <div className="form-center">
          <FormInput
            name="search"
            type="text"
            defaultValue={search}
            onchange={debounce(submit)}
          ></FormInput>
          <FormRowSelect
            name="JobStatus"
            labelText="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JobStatus}
            onchange={(e) => {
              submit(e.currentTarget.form);
            }}
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JobType}
            onchange={(e) => {
              submit(e.currentTarget.form);
            }}
          ></FormRowSelect>
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={Object.values(JOB_SORT_BY)}
            onchange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="../all-jobs" className="btn form-btn">
            Reset Search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
