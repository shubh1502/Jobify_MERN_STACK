import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
// import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormInput";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const err = { msg: "" };
  if (data.password.length < 8) {
    err.msg = "Password is short";
    return err;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
const Login = () => {
  const navigation = useNavigation();
  const LoggingIn = navigation.state === "submitting";
  const err = useActionData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {err && <p style={{ color: "red" }}>{err.msg}</p>}
        <FormRow type="email" name="email" defaultValue="shubhi@gmail.com" />
        <FormRow type="password" name="password" defaultValue="Shubham" />
        <button type="submit" className="btn btn-block" disabled={LoggingIn}>
          {LoggingIn ? "Logging In" : "Login"}
        </button>
        <p>
          New member ?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
