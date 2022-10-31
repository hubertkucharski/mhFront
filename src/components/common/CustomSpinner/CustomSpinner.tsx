import CircularProgress from '@mui/material/CircularProgress';
import './CustomSpinner.css';

export const CustomSpinner = () => (
  <div className="spinner-container">
      <CircularProgress color="secondary" />
  </div>
);
