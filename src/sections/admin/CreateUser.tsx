import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ButtonIcon, ButtonPrimary } from '@/components/buttons';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@/components/dialogs';
import { TextField } from '@/components/form';
import SelectOptions from '@/components/form/SelectOptions';
import { getRoleList } from '@/redux/actions/role';
import { postUserCreate } from '@/redux/actions/user';

interface PropsOption {
    key: any;
    text: string;
    value: any;
}

const CreateUser = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [roleOptions, setRoleOptions] = useState<PropsOption[]>([]);
    const [isCopied, setIsCopied] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [userPass, setUserPass] = useState('');
    useEffect(() => {
        async function getRole() {
            await dispatch<any>(
                getRoleList({
                    callback: (data: any) => {
                        if (data) {
                            const roles = data.data.map((item: any) => {
                                return {
                                    key: item.role,
                                    text: item.role,
                                    value: item._id,
                                };
                            });
                            setRoleOptions(roles);
                        }
                    },
                })
            );
        }
        getRole();
    }, [dispatch]);

    const UserSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^\S*$/, 'Spaces are not allowed')
            .required('Event name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        role: Yup.string().required('Role is required'),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: '',
        },
        validationSchema: UserSchema,
        onSubmit: async values => {
            setLoading(true);
            await dispatch<any>(
                postUserCreate({
                    data: values,
                    callback: (data: any) => {
                        setUserPass(data.data.password);
                        setDialog(true);
                        setLoading(false);
                    },
                })
            );
        },
    });
    const { handleSubmit, touched, errors } = formik;
    const handleCopy = async (textToCopy: string) => {
        // Modern Clipboard API method
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);

        // Revert the button text back to "Copy" after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
    };
    return (
        <FormikProvider value={formik}>
            <Dialog
                open={dialog}
                animation="scale"
                width="sm"
                onClose={() => setDialog(false)}
            >
                <DialogTitle>Create User!</DialogTitle>
                <DialogContent>
                    <div className="flex w-full flex-col gap-4">
                        <p>Success Create New User</p>
                        <p>User Password: </p>
                        {isCopied && (
                            <p className="ty-caption text-accent-light">
                                Success copy
                            </p>
                        )}
                        {userPass && (
                            <div className="relative w-full rounded-md border border-accent-light bg-accent-light/20 p-2">
                                <p>{userPass}</p>
                                <div className="absolute inset-y-0 right-2 m-auto size-8">
                                    <ButtonIcon
                                        icon="solar:copy-outline"
                                        iconSize={24}
                                        type="button"
                                        onClick={() => handleCopy(userPass)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <Form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="w-full flex-col gap-2">
                        <div className="w-full">
                            <p>Username</p>
                            <TextField
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.username && errors.username
                                )}
                                helperText={touched.username && errors.username}
                                placeholder="Username"
                            />
                        </div>
                        <div className="w-full">
                            <p>Email</p>
                            <TextField
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex w-full gap-2">
                            <div className="w-full">
                                <p>First Name</p>
                                <TextField
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.firstName && errors.firstName
                                    )}
                                    helperText={
                                        touched.firstName && errors.firstName
                                    }
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="w-full">
                                <p>Last Name</p>
                                <TextField
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.lastName && errors.lastName
                                    )}
                                    helperText={
                                        touched.lastName && errors.lastName
                                    }
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <p>Role</p>
                            <SelectOptions
                                name="role"
                                options={roleOptions}
                                onChange={formik.handleChange}
                                error={Boolean(touched.role && errors.role)}
                                helperText={touched.role && errors.role}
                                nullValue
                                nullValueText="Select Role"
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <ButtonPrimary
                            text="Cancel"
                            type="reset"
                            size="sm"
                            variant="outline"
                            fullWidth
                            disabled={loading}
                            loading={loading}
                        />
                        <ButtonPrimary
                            text="Save"
                            type="submit"
                            size="sm"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            loading={loading}
                        />
                    </DialogActions>
                </DialogContent>
            </Form>
        </FormikProvider>
    );
};

export default CreateUser;
