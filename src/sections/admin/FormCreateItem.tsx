import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ButtonPrimary } from '@/components/buttons';
import { DialogActions, DialogContent } from '@/components/dialogs';
import { TextField } from '@/components/form';
import SelectOptions from '@/components/form/SelectOptions';
import { postItemCreate } from '@/redux/actions/item';
import type { Reducers } from '@/redux/types';

const tierOptions = [
    {
        text: 'SILVER',
        value: 'SILVER',
        key: 'SILVER',
    },
    {
        text: 'GOLD',
        value: 'GOLD',
        key: 'GOLD',
    },
    {
        text: 'DIAMOND',
        value: 'DIAMOND',
        key: 'DIAMOND',
    },
    {
        text: 'LEGENDARY',
        value: 'LEGENDARY',
        key: 'LEGENDARY',
    },
];

const FormCreateItem = () => {
    const dispatch = useDispatch();
    const itemState = useSelector((state: Reducers) => state.item);
    const ItemSchema = Yup.object().shape({
        name: Yup.string().required('Item name is required'),
        image: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
            .required('Please enter website'),
        tier: Yup.string().required('Tier is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            tier: '',
        },
        validationSchema: ItemSchema,
        onSubmit: async values => {
            await dispatch<any>(
                postItemCreate({
                    data: values,
                    callback: () => {
                        window.location.href = '/admin/item';
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
                            <p>Item Name</p>
                            <TextField
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                placeholder="Name"
                            />
                        </div>
                        <div className="w-full">
                            <p>Image</p>
                            <TextField
                                name="image"
                                type="text"
                                onChange={formik.handleChange}
                                error={Boolean(touched.image && errors.image)}
                                helperText={touched.image && errors.image}
                                placeholder="Image URL"
                            />
                        </div>
                        <div className="w-full">
                            <p>Tier</p>
                            <SelectOptions
                                options={tierOptions}
                                name="tier"
                                onChange={formik.handleChange}
                                error={Boolean(touched.tier && errors.tier)}
                                helperText={touched.tier && errors.tier}
                                nullValue
                                nullValueText="Select Tier"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        text="Cancel"
                        type="reset"
                        size="sm"
                        variant="outline"
                        fullWidth
                        disabled={itemState?.actions?.loading}
                        loading={itemState?.actions?.loading}
                    />
                    <ButtonPrimary
                        text="Save"
                        type="submit"
                        size="sm"
                        variant="contained"
                        fullWidth
                        disabled={itemState?.actions?.loading}
                        loading={itemState?.actions?.loading}
                    />
                </DialogActions>
            </Form>
        </FormikProvider>
    );
};

export default FormCreateItem;
