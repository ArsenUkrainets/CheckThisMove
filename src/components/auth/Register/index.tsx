import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { IRegisterModel, IRegisterResult } from "./types";
import { RegisterSchema } from "./validation";
import classNames from "classnames";
import axios from "axios";

const RegisterPage: React.FC = () => {
    const initialValues: IRegisterModel = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    };

    const navigator = useNavigate();

    const onHandleSubmit = async (values: IRegisterModel) => {
        console.log("Submit form to server:", values);
        try {
            const response = await axios
                .post<IRegisterResult>("http://127.0.0.1:8000/api/auth/register", values);
            const data = response.data;
            console.log("token", data.access_token);
            navigator("/");
        }
        catch (ex) {
            console.log("Problem ", ex);
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit,
    });

    const { errors, touched, handleChange, handleSubmit } = formik;
    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 className="text-center">Register</h1>
                    <FormikProvider value={formik}>
                        <Form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="name"
                                    className={classNames("form-control",
                                        { "is-invalid": touched.name && errors.name },
                                        { "is-valid": touched.name && !errors.name }
                                    )}
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                />
                                {(touched.name && errors.name) && <span className="text-danger">{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={classNames("form-control",
                                        { "is-invalid": touched.email && errors.email },
                                        { "is-valid": touched.email && !errors.email }
                                    )}
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                />
                                {(touched.email && errors.email) && <span className="text-danger">{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={classNames("form-control",
                                        { "is-invalid": touched.password && errors.password },
                                        { "is-valid": touched.password && !errors.password }
                                    )}
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                                {(touched.password && errors.password) && <span className="text-danger">{errors.password}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="form-label">
                                Password confirmation
                                </label>
                                <input
                                    type="password"
                                    className={classNames("form-control",
                                        { "is-invalid": touched.password_confirmation && errors.password_confirmation },
                                        { "is-valid": touched.password_confirmation && !errors.password_confirmation }
                                    )}
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    onChange={handleChange}
                                />
                                {(touched.password_confirmation && errors.password_confirmation) && <span className="text-danger">{errors.password_confirmation}</span>}
                            </div>
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

export default RegisterPage;
