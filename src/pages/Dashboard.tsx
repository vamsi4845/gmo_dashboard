import { useEffect, useState } from "react";
import { Box, Grid, Typography,  } from "@mui/material";
import { Link } from "react-router-dom";
import UserList from "../components/UserList";
import DepartmentList from "../components/DepartmentList";

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<{ name: string; mobile: string; email: string } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    }
  }, []);

  return (
    <Box sx={{ padding: 3,  minHeight: '100vh', borderRadius: 2 }}>
      {!formData ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
        <Typography variant="h5" align="center" sx={{ marginTop: 5,textDecoration:"underline"}}>
          <Link  to="/signup">
            Sign up to access the dashboard
          </Link>
        </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="white" gutterBottom>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
         <UserList/>
          </Grid>
          <Grid item xs={12}>         
              <DepartmentList />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;

