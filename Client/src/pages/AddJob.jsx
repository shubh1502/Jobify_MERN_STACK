import FormRow from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job Added Successfully");
    return null;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const Navigation = useNavigation();
  const isSubmitting = Navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add jobs</h4>
        <div className="form-center">
          <FormRow name="position" type="text"></FormRow>
          <FormRow name="company" type="text"></FormRow>
          <FormRow name="jobLocation" type="text"></FormRow>
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULLTIME}
          ></FormRowSelect>
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          ></FormRowSelect>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-block form-btn "
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
