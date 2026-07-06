import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ButtonPrimary } from '@/components/buttons';
import { DialogActions, DialogContent } from '@/components/dialogs';
import { TextField } from '@/components/form';
import { postCreateEvent } from '@/redux/actions/event';

const CreateEvent = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const EventSchema = Yup.object().shape({
        event: Yup.string().required('Event name is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
    });
    const formik = useFormik({
        initialValues: {
            event: '',
            description: '',
            image: '',
            status: '',
        },
        validationSchema: EventSchema,
        onSubmit: async values => {
            setLoading(true);
            await dispatch<any>(
                postCreateEvent({
                    data: values,
                    callback: (data: any) => {
                        window.location.href = `/admin/event/detail/${data._id}`;
                    },
                })
            );
        },
    });
    const { handleSubmit, touched, errors } = formik;
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="w-full flex-col gap-2">
                        <div className="w-full">
                            <p>Event Name</p>
                            <TextField
                                name="event"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(touched.event && errors.event)}
                                helperText={touched.event && errors.event}
                                placeholder="Event"
                            />
                        </div>
                        <div className="w-full">
                            <p>Description</p>
                            <TextField
                                name="description"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.description && errors.description
                                )}
                                helperText={
                                    touched.description && errors.description
                                }
                                placeholder="Description"
                            />
                        </div>
                        <div className="w-full">
                            <p>Image URL</p>
                            <TextField
                                name="image"
                                type="text"
                                onChange={formik.handleChange}
                                placeholder="https://example.com/image/"
                            />
                        </div>
                        <div className="w-full">
                            <p>Description</p>
                            <div className="flex gap-4">
                                <label
                                    className="flex cursor-pointer gap-2"
                                    onChange={formik.handleChange}
                                    htmlFor="status"
                                >
                                    <input
                                        name="status"
                                        type="radio"
                                        value="ACTIVE"
                                        id="status"
                                    />
                                    Active
                                </label>
                                <label
                                    className="flex cursor-pointer gap-2"
                                    onChange={formik.handleChange}
                                    htmlFor="status"
                                >
                                    <input
                                        name="status"
                                        type="radio"
                                        value="INACTIVE"
                                        id="status"
                                    />
                                    Inactive
                                </label>
                            </div>
                            <div className="text-left text-text-xs font-medium text-error">
                                {Boolean(touched.status && errors.status) &&
                                    errors.status}
                            </div>
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

export default CreateEvent;
