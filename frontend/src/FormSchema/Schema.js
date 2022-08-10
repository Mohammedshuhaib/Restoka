import * as yup from 'yup'

export const schema = yup.object().shape({
    fullname: yup.string().required(),
    phonenumber: yup.number('Phone number must be number').required('Mobile number is required').typeError('Mobile number is required'),
    gst: yup.number().required().typeError('Gst number is required'),
    tables: yup.number().required().typeError('Tables number is required').max(10).min(0),
    // image: yup.string().required()
})

