import { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { departmentData, Department } from "../utils/data";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleToggle = (department: string) => {
    setExpanded((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleDepartmentChange =
    (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = { ...checked };
      newChecked[department] = event.target.checked;
      departmentData
        .find((d) => d.department === department)
        ?.sub_departments.forEach((subDept) => {
          newChecked[`${department}-${subDept}`] = event.target.checked;
        });
      setChecked(newChecked);
    };

  const handleSubDepartmentChange =
    (department: string, subDepartment: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = { ...checked };
      newChecked[`${department}-${subDepartment}`] = event.target.checked;
      const allSubDepartmentsChecked = departmentData
        .find((d) => d.department === department)
        ?.sub_departments.every(
          (subDept) => newChecked[`${department}-${subDept}`]
        );
      newChecked[department] = allSubDepartmentsChecked || false;
      setChecked(newChecked);
    };

  const isDepartmentIndeterminate = (department: string): boolean => {
    const subDepartments =
      departmentData.find((d) => d.department === department)
        ?.sub_departments || [];
    const checkedSubDepartments = subDepartments.filter(
      (subDept) => checked[`${department}-${subDept}`]
    );
    return (
      checkedSubDepartments.length > 0 &&
      checkedSubDepartments.length < subDepartments.length
    );
  };

  const renderDepartment = (dept: Department) => {
    const isExpanded = expanded[dept.department];
    const isDepartmentChecked = checked[dept.department] || false;
    const isIndeterminate = isDepartmentIndeterminate(dept.department);

    return (
      <Box key={dept.department} sx={{ mb: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            bgcolor: "inherit",
            borderRadius: 1,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <IconButton
            onClick={() => handleToggle(dept.department)}
            size="small"
            sx={{ color: "#d1d3da" }}
          >
            {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDepartmentChecked}
                indeterminate={isIndeterminate}
                onChange={handleDepartmentChange(dept.department)}
                sx={{
                  "&.Mui-checked": {
                    color: "#d1d3da",
                  },
                  color: "#d1d3da",
                }}
              />
            }
            label={
              <Typography
                component="div"
                color="#d1d3da"
                sx={{ fontWeight: "medium" }}
              >
                {dept.department}
                <Typography
                  component="span"
                  sx={{
                    ml: 0.5,
                    color: "#d1d3da",
                    fontWeight: "light",
                  }}
                >
                  ({dept.sub_departments.length})
                </Typography>
              </Typography>
            }
          />
        </Box>
        <Collapse in={isExpanded}>
          <Box sx={{ display: "flex", flexDirection: "column", ml: 4, mt: 1 }}>
            {dept.sub_departments.map((subDept) => (
              <FormControlLabel
                key={subDept}
                control={
                  <Checkbox
                    checked={checked[`${dept.department}-${subDept}`] || false}
                    onChange={handleSubDepartmentChange(
                      dept.department,
                      subDept
                    )}
                    sx={{
                      "&.Mui-checked": {
                        color: "#d1d3da",
                      },
                      color: "#d1d3da",
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="#d1d3da">
                    {subDept}
                  </Typography>
                }
                sx={{ mb: 0.5 }}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    );
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#2d2d34",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography
          variant="h5"
          component="h2"
          color="white"
          sx={{ mb: 2, fontWeight: "medium", textAlign: "center" }}
        >
          Department List
        </Typography>
        <Box>{departmentData.map(renderDepartment)}</Box>
      </Box>
    </Paper>
  );
};

export default DepartmentList;
