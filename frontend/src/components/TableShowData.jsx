import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useLocation, useNavigate } from "react-router-dom";
import useApp from "../store/store";

export const TableShowData = ({ columns, data, setFuncion, navigation }) => {
  const message = useApp((state) => state.message);

  const navigate = useNavigate();
  const [send, setSend] = useState(false);

  const handleUpdate = (row) => {
    setFuncion(row.original);
    navigate(`${navigation}/${row.original.id_student}`);
  };

  const commonStyles = {
    color: "#111111",
  };

  useEffect(() => {
    if (send) {
      setTimeout(() => {
        setSend(false);
      }, 3000);
    }
  }, [send]);

  return (
    <>
      {message !== null && message.ok ? (
        <div className="z-20 toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{message.msg}</span>
          </div>
        </div>
      ) : message !== null ? (
        <div className="z-20 toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{message.msg}</span>
          </div>
        </div>
      ) : null}
      <MaterialReactTable
        muiTableBodyCellProps={{
          sx: commonStyles,
        }}
        muiTableHeadCellProps={{
          sx: commonStyles,
        }}
        muiTopToolbarProps={{
          sx: {
            "& .MuiSvgIcon-root": commonStyles,
          },
        }}
        muiTablePaperProps={{
          sx: {
            color: "#D3D3D3",
            "& .MuiFormLabel-root": commonStyles,
            "& .MuiInputBase-root": commonStyles,
            "& .MuiSvgIcon-root": commonStyles,
          },
        }}
        columns={columns}
        data={data}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="Ver data">
              <IconButton onClick={() => handleUpdate(row)} color="info">
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        localization={MRT_Localization_ES}
      />
    </>
  );
};
