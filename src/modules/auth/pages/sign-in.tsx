
import { Form, Input, Button } from "antd";  
import { NavLink, useNavigate } from "react-router-dom";
import erp from "../../../assets/images/erp.jpg";
import { SignIn as SignInType} from "../types";
import { Notification } from "../../../utils/notification";
import { useSignInMutation } from "../hooks/mutations"


const SignIn = () => {
  const {mutate} = useSignInMutation()
  const navigate = useNavigate();
  const initialValues: SignInType = {
    phone_number: '',
    password: ''
  };


  function handleSubmit(values: SignInType): void {
    mutate(values, {
      onSuccess: (res) => {
        const access_token = res.data?.data?.tokens?.access_token
        console.log(res);
        localStorage.setItem("access_token",access_token );
        navigate("./admin-layout");
      },
      onError: (error) => {
        Notification('error', error.message)
      },
    });
  }
  
    return (
      <>
          <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[50%] h-[100%] hidden md:block">
          <img src={erp} alt="erp" className="h-[100%] object-cover" />
        </div>
        <div className="w-[70%] flex flex-col justify-center items-center md:w-[50%]">
          <div className="w-full md:w-[60%]">
            <h1 className="font-bold text-3xl mb-4">Sign In</h1>
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={initialValues}
            >
              <Form.Item
                name="phone_number"
                label={<span style={{ fontSize: "14px" }}>Phone Number</span>}
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input placeholder="Phone number" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ fontSize: "14px" }}>Password</span>}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Password" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ backgroundColor: "#AD8354", fontSize: "16px", padding: "23px" }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
              <div className="flex items-center justify-between">
                <p>Do you have an account?</p>
                <NavLink to={'sign-up'} className='text-[#AD8354]'>Sign Up</NavLink>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
    )
  }
  export default SignIn