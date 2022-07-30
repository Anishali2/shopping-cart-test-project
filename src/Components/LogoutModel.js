import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { openModel } from '../redux/actions/appAction';
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  
};

export default function LogoutModel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector(state => state.app.model);
  const handleClose = () => dispatch(openModel(false));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    dispatch(openModel(false));

  }

  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Logout!
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to Logout??
            </Typography>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}>
            <Button onClick={() => handleClose()} color="error" variant="outlined" style={{marginRight:10}}>No</Button>
            <Button onClick={() => handleLogout()} color="error" variant="contained">Yes</Button>
            </div>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}