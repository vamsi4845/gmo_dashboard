import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { userData } from "../utils/data";
import { Box, Typography, Paper } from "@mui/material";
const UserList = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: 'header', flex:0.25 },
        { field: 'userId', headerName: 'User ID',   headerClassName: 'header', flex:0.25 },
        { field: 'title', headerName: 'Title',  headerClassName: 'header', flex:0.5 },
        { field: 'body', headerName: 'Body',    headerClassName: 'header', flex:1 },
    ];

    return (
        <Paper elevation={3}  sx={{ p: 3, mb: 4, backgroundColor: '#2d2d34',borderRadius: 3 }}>
            <Typography variant="h5" color="white" component="h2" sx={{ mb: 2 }}>
                User List
            </Typography>
            <Box
             sx={{ 
                "& .header": {
                  background: "#2d2d34",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "10px",
                  borderBottom: `1px solid #48494e !important`,
                },
                "& .MuiDataGrid-root": {
                    color:"#d1d3da",
                    border: "none",   
                },
                "& .MuiDataGrid-cell": {
                    borderTop: `1px solid #48494e !important`,
                },
                "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                },
                "& .MuiToolbar-root": {
                    color: "#d1d3da",
                },
               "& .MuiDataGrid-scrollbarFiller--header": {
                    background: "#2d2d34",
               },
                height: 400, width: '100%'
            }}
            >
                <DataGrid
                    rows={userData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                    disableColumnSelector
                    />
            </Box>
        </Paper>
    );
}

export default UserList;