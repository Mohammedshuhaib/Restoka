
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import { useSelector } from "react-redux";
function Profile() {

  let formId = useSelector((state) => state.formId.value)
  const [formData, setFormData ] = useState([])

  const getFormData = async() => {
    let response = await axios.get(`http://localhost:2000/getFormData/${formId}`)
    setFormData(response.data.data)
    
  }

  useEffect(() => {
    getFormData()
  })
  return (
    <Box
    className="bg-white border formContainer mx-auto p-2"
  >
    <form className="row">
      <div className="inputForm mt-4 col-md-6">
        <label>Full name</label>
        <TextField
           id="outlined-read-only-input"
   
          className="w-100"
          type="text"
          value={formData.fullname}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
   
         

      <div className="inputForm mt-4 col-md-6">
      <label>Mobile number</label>
        <TextField
           id="outlined-read-only-input"
       
          className="w-100"
          type="number"
          name="phonenumber"
          value={formData.phonenumber}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"

        />
      </div>

         
  
      <div className="inputForm mt-4 col-md-6">
      <label>Gst no</label>

        <TextField
          id="outlined-read-only-input"

          className="w-100"
          type="number"
          name='gst'
          value={formData.gst}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

      </div>
    
       
      <div className="inputForm mt-4 col-md-6">
      <label>Tables</label>

        <TextField
          id="outlined-read-only-input"
    
          className="w-100"
          type="text"
          name='tables'
          value={formData.tables}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
  
      <div className="inputForm mt-4 col-md-6">
      <label>Images</label>

        <TextField
          id="outlined-read-only-input"
       
          className="w-100"
          type="text"
          name='image'
          value={formData.image}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
    </form>
  </Box>
  )
}

export default Profile