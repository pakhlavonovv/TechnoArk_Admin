import { Formik, Field, FieldInputProps, Form as FormikForm } from "formik";
import { Input, Button } from "antd";
import { SignUp as SignUpType } from "../types";
import { useSignUpMutation } from "../hooks/mutations";
import { Notification } from "../../../utils/notification";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";

const SignUp = () => {
  const { mutate } = useSignUpMutation();
  const navigate = useNavigate();
  
  const userContext = useContext(UserContext);
  
  const initialValues: SignUpType = {
    first_name: userContext?.user?.first_name || "",
    last_name: userContext?.user?.last_name || "",
    phone_number: userContext?.user?.phone_number || "",
    email: userContext?.user?.email || "",
    password: userContext?.user?.password || "",
  };

  function handleSubmit(values: SignUpType): void {
    const payload = { ...values };
    
    mutate(payload, {
      onSuccess: (res) => {
        console.log(res);
        
        if (userContext) {
          userContext.updateUser(values);
        }

        navigate("/admin-layout");
      },
      onError: (error) => {
        Notification('error', error?.message);
      }
    });
  }

  return (
    <div style={{ margin: "auto", marginTop: "50px" }} className="max-w-64 lg:max-w-[450px]">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl text-center">Sign Up</h1>

            <div className="form-group flex flex-col gap-2">
              <label>First Name</label>
              <Field name="first_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="First Name" />
                )}
              </Field>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label>Last Name</label>
              <Field name="last_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Last Name" />
                )}
              </Field>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label>Phone Number</label>
              <Field name="phone_number">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Phone Number" />
                )}
              </Field>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label>Email</label>
              <Field name="email">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Email" />
                )}
              </Field>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label>Password</label>
              <Field name="password">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input.Password {...field} placeholder="Password" />
                )}
              </Field>
            </div>

            <div className="form-group mt-3">
              <Button className='bg-[#AD8354] text-white p-5 text-lg' htmlType="submit" block>
                Create
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <p>Do you have an account?</p>
              <NavLink to={'/'} className='text-[#AD8354]'>Sign In</NavLink>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
