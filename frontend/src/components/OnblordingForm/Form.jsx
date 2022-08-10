import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Form.css";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../FormSchema/Schema";
import axios from 'axios'
import { setFormId } from '../../store/formStore'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
function Form() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState();
  const [err, setErr] = useState('')


//   get image preview
  const getPreview = (e) => {
    console.log(e)
    setErr('')
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);      
    }
  };

//   yup validation

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

//   submit form

  const submitForm = async(data) => {
    if(!selectedImage) {
        setErr('Image field is required')
        return
    }else{
         setErr('')
         try{
            data.image = selectedImage
            const config = {
                headers: {
                    'content-type':'multipart/form-data'
                }
            } 
           let response = await axios.post('http://localhost:2000/submitForm',data,config)
           dispatch(setFormId(response.data.formid))
            navigate('/home')
         }catch(err) {
           console.log(err)
         }
         
    }
  }
  return (
    <Box
      className="bg-white border formContainer mx-auto mt-5 p-2"
    >
      <form className="row" onSubmit={handleSubmit(submitForm)}>
        <div className="mainHeading mt-3">
          <p className="headingText">Onboaring Process</p>
        </div>
        <div className="inputForm mt-4 col-md-6">
          <TextField
            id="fullWidth"
            className="w-100"
            label="Full Name"
            type="text"
            name="fullname"
            {...register('fullname')}
          />
           <p className="err">{formState.errors.fullname?.message}</p>
        </div>
     
           

        <div className="inputForm mt-4 col-md-6">
          <TextField
            id="outlined-name"
            className="w-100"
            label="Phone number"
            type="number"
            name="phonenumber"
            {...register('phonenumber')}
          />
           <p className="err">{formState.errors.phonenumber?.message}</p>
        </div>
 
           
    
        <div className="inputForm mt-4 col-md-6">
          <TextField
            id="outlined-name"
            className="w-100"
            label="GST no"
            type="number"
            name='gst'
            {...register('gst')}
          />
             <p className="err">{formState.errors.gst?.message}</p>

        </div>
      
         
        <div className="inputForm mt-4 col-md-6">
          <TextField
            id="outlined-name"
            className="w-100"
            label="No of tables"
            type="text"
            name='tables'
            {...register('tables')}
          />
          <p className="err">{formState.errors.tables?.message}</p>
        </div>

            

        <div className="inputForm mt-4 row mx-auto">
          <input
            disabled
            value={selectedImage?.name}
            className="col-md-10 col-9 mx-auto me-0"
            {...register('image')}
          />
          <Button
            variant="contained"
            className="col-2 mx-auto ms-0"
            component="label"
          >
            Upload
            <input
              onChange={getPreview}
              hidden
              accept="image/*"
              type="file"
              name='image'
            />
          </Button>
          <p className="err">{err}</p>
        </div>
        {selectedImage && (
          <div className="imagePreview">
            <img
              className="image"
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
            />
          </div>
        )}

        <div className="my-4 col">
          <Button type="submit" variant="contained" className="col-12 mx-auto">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default Form;
