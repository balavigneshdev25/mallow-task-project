import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import CustomInput from "../customInput";
import { MailOutlined, UserOutlined, PictureOutlined } from "@ant-design/icons";
import { createUserAPI, updateUserAPI } from "../../api/users";
import { errorHandler } from "../../utils/errorHandling";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUsers } from "../../slice/userSlice";
import toast from "react-hot-toast";




type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    id?: number
};

interface UserFormModalProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    refetchData: () => void;
    userData?: FormValues | null
}

const UserFormModal: React.FC<UserFormModalProps> = ({ title, isOpen, onCancel, userData, refetchData }) => {

    const { users, total } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();

    const [disableButton, setDisableButton] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<FormValues>();

    useEffect(() => {
        if (userData) {
            Object.entries(userData).forEach(([key, value]) => {
                setValue(key as keyof FormValues, value);
            });
        }
    }, [userData])

    const handleInputChange = (name: keyof FormValues, value: string | boolean) => {
        setValue(name, value as never, { shouldValidate: true });
        setDisableButton(false)
    }

    const onSubmit = (data: FormValues) => {
        setDisableButton(true)
        const { first_name, last_name, email, avatar } = data
        const id = userData?.id ?? 0;

        let reqParams = {
            first_name,
            last_name,
            email,
            avatar
        }
        const action = userData
            ? updateUserAPI(reqParams, id)
            : createUserAPI(reqParams);
        action
            .then((data) => {
                console.log(data, "Updated Data "); // The create or update operation was successful, and the response was received from the API.
                let temporaryData
                if (!userData) {
                    temporaryData = [data, ...users]
                    toast.success("User Created Successfully")
                }
                else {
                    temporaryData = users.map((user) =>
                        user.id === id ? { ...user, ...data } : user
                    );
                    toast.success("User Updated Successfully");
                }

                dispatch(setUsers({ users: temporaryData, total: total }))
                onCancel()
                setDisableButton(false)
                // refetchData()  After creating or editing, call the user fetch API, but the new data does not update in the list, so it remains hidden.
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
    }



    return (
        <Modal title={title} open={isOpen} footer={null} onCancel={onCancel}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <CustomInput
                    label="First Name"
                    placeholder="Enter your first name"
                    register={register("first_name", { required: "First name is required" })}
                    error={errors.first_name}
                    icon={<UserOutlined />}
                    value={watch("first_name") || ""}
                    onChange={(value) => handleInputChange("first_name", value)}
                    required={true}

                />

                <CustomInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    register={register("last_name", { required: "Last name is required" })}
                    error={errors.last_name}
                    icon={<UserOutlined />}
                    value={watch("last_name") || ""}
                    onChange={(value) => handleInputChange("last_name", value)}
                    required={true}
                />
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
                    icon={<MailOutlined />}
                    value={watch("email") || ""}
                    onChange={(value) => handleInputChange("email", value)}
                    required={true}
                />

                <CustomInput
                    label="Profile Image URL"
                    type="text"
                    placeholder="Enter image URL"
                    register={register("avatar", {
                        required: "Profile image URL is required",
                        pattern: {
                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                            message: "Invalid image URL (must be a valid image link)",
                        },
                    })}
                    error={errors.avatar}
                    icon={<PictureOutlined />}
                    value={watch("avatar") || ""}
                    onChange={(value) => handleInputChange("avatar", value)}
                    required={true}

                />

                <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
                    <Button htmlType="button" onClick={() => onCancel()}>
                        Cancel
                    </Button>
                    <Button style={{ pointerEvents: disableButton ? "none" : "auto" }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default UserFormModal;
