import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { ILoginModel, ILoginResult } from "./types";
import { LoginSchema } from "./validation";
import classNames from "classnames";
import axios from "axios";
import { InputGroup } from "../../common/InputGroup";

const LoginPage: React.FC = () => {
  const initialValues: ILoginModel = {
    email: "",
    password: "",
  };

  const navigator = useNavigate();

  const onHandleSubmit = async (values: ILoginModel) => {
    console.log("Submit form to server:", values);
    try {
      const response = await axios.post<ILoginResult>(
        "http://127.0.0.1:8000/auth/login",
        values
      );
      const data = response.data;
      console.log("token", data.access_token);
      navigator("/");
    } catch (ex) {
      console.log("Problem ", ex);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, values } = formik;
  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 className="text-center">Login</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <InputGroup
                field="email"
                label="email"
                onChange={handleChange}
                touched={touched.email}
                error={errors.email}
                value={values.email}
              />

              <InputGroup
                type="password"
                field="password"
                label="password"
                onChange={handleChange}
                touched={touched.password}
                error={errors.password}
                value={values.password}
              />

              <button type="submit" className="btn btn-primary">
                Enter
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
