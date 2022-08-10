import React,{useEffect, useState} from "react";
import "./Home.css";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from "react-redux";
import axios from "axios";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));
function Home(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [tableSize, setTableSize] = useState()

  let formId = useSelector((state) => state.formId.value)
  let  array = []
  for( let i = 0 ; i< tableSize ; i++) {
    array.push({value:i})
  }
  useEffect(() => {
    // if(tableSize.length === 0) {
      getTableCount()
      // }
  })

 const getTableCount = async() => {
  
    try{
      let response = await axios({
        method: 'get',
        url:`http://localhost:2000/getTable/${formId}`,
        data:{
          formId
        }
      },[tableSize])
      console.log(response.data.count)
      setTableSize(response.data.count)

   }catch(err) {
     console.log(err)
   }
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <main className="container-xl ">
        
        <div className="row d-flex justify-content-center p-2">
         {array.map((item, index) => {
          return(
           <div
           onClick={toggleDrawer(true)}
           className="tableConainer border col-6 mx-md-2 col-md-3"
         >
           <p className="tableText">Table no : {index}</p>
           </div>
          )
        }) 
         }
        </div>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Menu list
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <div className="container">
              <p className="fw-bold">Order list</p>
              <div className="mt-4">
                <div className="orderList">
                  <div className="itemContaienr">
                    <p className="item">Paneer chilly</p>
                    <p className="item">Paneer chilly</p>
                    <p className="item">Paneer chilly</p>
                  </div>
                  <div className="quantityContainer">
                    <p className="quantity">1</p>
                    <p className="quantity">2</p>
                    <p className="quantity">3</p>
                  </div>
                </div>
              </div>
              <div className="outerContaienrPrice">
              <div className="priceContainer border border-info rounded col-8 col-md-6">
                <p className="priceTag mx-5 mt-2 fw-bold mb-0">1240rs/-</p>
                <p className="billTag mx-5">Total bill</p>
              </div>
              <div className="enterConaier bg-primary col-md-1 col-3 rounded">
                <LoginIcon/>
              </div>
              </div>
            </div>
          </StyledBox>
        </SwipeableDrawer>
      </main>
    </Root>
  );
}

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Home;
