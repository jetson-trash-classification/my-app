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
import axios from 'axios'

function CustomizedInputBase(props) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: '10px', width: '90%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="搜索记录"
        onChange={props.handleSearchChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

const columns = [
  { id: 'time', label: '投放时间', minWidth: 60 },
  { id: 'position', label: '编号', minWidth: 35 },
  { id: 'type', label: '种类', minWidth: 45, },
  { id: 'accuracy', label: '准确度', minWidth: 50, },
];

const typeZhMap = {
  'residual': '其他',
  'hazardous': '有害',
  'food': '厨余',
  'recyclable': '可回收',
}

export default function StickyHeadTable() {
  const [searchText, setSearchText] = React.useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  //搜索框修改回调函数
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  //获取数据
  React.useEffect(() => {
    axios.get('http://192.168.50.1:3001/history').then(
      (res) => {
        console.log(res.data)
        setRows([...res.data])
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <React.Fragment>
      <CustomizedInputBase handleSearchChange={handleSearchChange}></CustomizedInputBase>
      <TableContainer sx={{ maxHeight: 500 }}>
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
            {rows.filter((dataObj) => {
              return dataObj.time.includes(searchText)
                || dataObj.position.includes(searchText)
                || dataObj.type.includes(searchText)
                || dataObj.accuracy == searchText
            })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.time}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} >
                          {column.id === 'type' ? typeZhMap[value]
                            : (column.id === 'position' ? value.slice(-3) : value)}
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
        labelRowsPerPage="每页显示: "
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
    // </Paper>
  );
}
