import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ButtonPrimary } from '../../components/buttons';
import {
    Checkboxes,
    TextField,
    TextFieldPassword,
} from '../../components/form';
// import { postLoginUser } from '../../redux/actions/auth';
import type { Reducers } from '../../redux/types';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: Reducers) => state.auth);
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Incorrect email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 6 characters'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async value => {
            dispatch<any>({
                type: 'LOGIN',
                payload: value,
            });
        },
    });
    const { handleSubmit, touched, errors } = formik;
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="w-full items-end">
                <TextField
                    name="email"
                    type="text"
                    placeholder="Email"
                    fullWidth
                    contentBefore={
                        <Icon
                            icon="mdi:email-outline"
                            className="dark:text-textDarkTertiary"
                            width="16"
                            height="16"
                        />
                    }
                    onChange={formik.handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextFieldPassword
                    name="password"
                    placeholder="Password"
                    fullWidth
                    onChange={formik.handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                <div className="flex">
                    <Checkboxes name="staylogin" label="Keep me" value="1" />
                    <div className="float-right w-full">
                        <ButtonPrimary
                            text="Forgot Password"
                            type="button"
                            variant="text"
                            size="sm"
                            fullWidth
                        />
                    </div>
                </div>
                <ButtonPrimary
                    text="Login"
                    type="submit"
                    variant="contained"
                    size="md"
                    fullWidth
                    loading={authState?.login?.loading}
                />
                <p className="my-2 text-center">Or</p>
                <ButtonPrimary
                    text="Sign up"
                    type="button"
                    variant="text"
                    size="md"
                    fullWidth
                />
            </Form>
        </FormikProvider>
    );
};
