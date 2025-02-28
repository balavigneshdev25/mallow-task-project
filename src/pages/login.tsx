import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CustomInput from "../components/customInput";
import { loginAPI } from "../api/auth";
import { errorHandler } from "../utils/errorHandling";
import { setCookie } from "../utils/cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdmin } from "../slice/adminSlice";


type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({ defaultValues: { remember: true } });

  const handleInputChange = (name: keyof FormValues, value: string | boolean) => {
    setValue(name, value as never, { shouldValidate: true });
    setDisableButton(false)
  };



  const handleLogin = (data: FormValues) => {
    setDisableButton(true)
    const { email, password } = data
    let reqParams = {
      email,
      password
    }
    loginAPI(reqParams)
      .then(({ token }) => {
        let adminObj = {
          name: "Elon Musk",
          email: "eve.holt@reqres.in",
          role: "Super Admin",
        }
        dispatch(setAdmin(adminObj))
        setCookie('accessToken', token)
        toast.success("Login Successfully")
        navigate("/users_list")
      })
      .catch((error) => {
        if (error?.response) {
          errorHandler(error.response);
        } else {
          errorHandler(error);
        }
        setTimeout(() => {
          setDisableButton(false)
        }, 3000)
      })
  };

  return (
    <div className="login-container">
      <Form className="login-form" onFinish={handleSubmit(handleLogin)}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#1677ff", textTransform: "uppercase" }}>Login</h1>
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
          error={errors.email}
          icon={<UserOutlined />}
          value={watch("email") || ""}
          onChange={(value) => handleInputChange("email", value)}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register("password", { required: "Password is required" })}
          error={errors.password}
          icon={<LockOutlined />}
          value={watch("password") || ""}
          onChange={(value) => handleInputChange("password", value)}
        />

        <Form.Item>
          <Checkbox
            checked={watch("remember")}
            onChange={(e) => handleInputChange("remember", e.target.checked)}
          >
            Remember me
          </Checkbox>
          <a href="/forgot_password" style={{ float: "right" }}>
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{
            width: "100%",
            pointerEvents: disableButton ? "none" : "auto",
            cursor: disableButton ? "not-allowed" : "pointer"
          }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
