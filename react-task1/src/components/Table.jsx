import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "../redux/getDataSlice";
import { Box } from "@mui/material";

const Table = () => {
  const { api } = useParams();
  const [progress, setProgress] = useState(0);
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
    return () => {
      clearInterval(timer);
    };
  }, [api]);

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="inherit" variant="determinate" value={progress} />
    </Box>
  ) : (
    <table className="data-table">
      <thead className="table-head">
        <tr>
          {tableHead &&
            Object.keys(tableHead)?.map((item) => <th key={uuid()}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={uuid()}>
            {Object.values(item)?.map((item) => (
              <td key={uuid()}>{JSON.stringify(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
