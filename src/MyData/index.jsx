import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin:'10px', width: '90%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="搜索记录"
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}


const columns = [
  { id: 'time', label: '投放时间', minWidth: 100 },
  { id: 'position', label: '位置', minWidth: 35 },
  { id: 'type', label: '种类', minWidth: 45, },
  { id: 'accurency', label: '准确度', minWidth: 50, },
];


const rows = [
  { time: "2022-5-3 16:22:30", position: '001', type: 'residual', accurency: 0.9 },
  { time: "2022-5-3 16:22:31", position: '002', type: 'hazardous', accurency: 0.54 },
  { time: "2022-5-3 16:22:32", position: '003', type: 'food', accurency: 0.92 },
  { time: "2022-5-3 16:22:33", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:34", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:35", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:36", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:37", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:38", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:39", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:40", position: '004', type: 'recyclable', accurency: 0.91 },
  { time: "2022-5-3 16:22:43", position: '004', type: 'recyclable', accurency: 0.91 },
];

const typeZhMap = {
  'residual': '其他',
  'hazardous': '有害',
  'food': '厨余',
  'recyclable': '可回收',
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CustomizedInputBase></CustomizedInputBase>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.time}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={value} >
                          {column.id==='type'?typeZhMap[value]:value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
