import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "../redux/getDataSlice";
import { Box, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataTable = () => {
  const { api } = useParams();
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const data = useSelector((state) => state.apiData.data);
  const loading = useSelector((state) => state.apiData.loading);
  let tableHead = data[0];
  const dispatch = useDispatch();

  useEffect(() => {
    api && dispatch(getData(api));
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    setPage(0);
    return () => {
      clearInterval(timer);
    };
  }, [api]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="inherit" variant="determinate" value={progress} />
    </Box>
  ) : (
    <div className="data-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead &&
                Object.keys(tableHead)?.map((item) => (
                  <TableCell key={uuid()}>{item}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={uuid()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.values(item)?.map((item) => (
                    <TableCell key={uuid()}>{JSON.stringify(item)}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataTable;
