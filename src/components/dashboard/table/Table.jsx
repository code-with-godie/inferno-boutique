"use client";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

const Table = ({ columns = [], rows = [] }) => {
  return (
    <div className='h-[90%] w-full'>
      <DataGrid
        rows={rows}
        rowSelection={false}
        slots={{ toolbar: GridToolbar }}
        columns={columns}
        getRowId={(row) => row._id}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 6,
          bottom: params.isLastVisible ? 0 : 6,
        })}
        sx={{
          // Header styling
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3b82f6", // Pastel pink background for the header
            color: "black", // Hot pink text color for the header
            borderBottom: "2px solid white", // Hot pink border below header
            fontFamily: "'Comic Sans MS', cursive, sans-serif", // Playful font
            borderRadius: "10px 10px 0 0", // Rounded top corners
          },
          // Row styling
          "& .MuiDataGrid-row": {
            color: "white", // Dark gray text color for rows
            backgroundColor: "#232323", // Light pink background for rows
            borderBottom: "1px solid #1A1D2C", // Light pink border below rows
            fontFamily: "'Comic Sans MS', cursive, sans-serif", // Playful font
          },
          // Cell styling
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #1A1D2C", // Light pink border below cells
            padding: "10px", // Increase padding for a more spacious look
          },
          // Footer pagination styling
          "& .MuiPaginationItem-root": {
            color: "white", // Hot pink text color for pagination items
            backgroundColor: "#3b82f6", // Pastel pink background for pagination items
            borderRadius: "5px", // Rounded corners for pagination items
            margin: "0 5px", // Space between pagination items
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#3b82f6", // Pastel pink background for footer
            borderTop: "2px solid white", // Hot pink border above footer
            color: "white", // Hot pink text color for footer
            fontFamily: "'Times New roman', sans-serif", // Playful font
          },
          "& .MuiPagination-root": {
            color: "white", // Hot pink text color for pagination
          },
          // Ensure alternating row colors if needed
          "& .MuiDataGrid-row.Mui-odd": {
            backgroundColor: "#3b82f6", // Slightly darker pink for alternating rows
          },
        }}
      />
    </div>
  );
};

export default Table;
