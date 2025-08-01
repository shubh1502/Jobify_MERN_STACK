import { Form, useNavigation, Link, redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormInput";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const actions = async ({ request }) => {
  // console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  const Navigation = useNavigation();
  console.log(Navigation);
  const isSubmitting = Navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Shubham" />
        <FormRow type="text" name="lastName" defaultValue="Saini" />
        <FormRow type="number" name="number" defaultValue="9736634945" />
        <FormRow type="email" name="email" defaultValue="shubhi@gmail.com" />
        <FormRow type="password" name="password" defaultValue="12345678" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
