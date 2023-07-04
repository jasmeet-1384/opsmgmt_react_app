import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { userleavedata } from '../../api/index';
import moment from 'moment';


const fetchData = async () => {
    let response = await userleavedata();
    response = response.data;

    if(response.status_code == 1)
    {
      return response.data;
    }

    return [];
}


const DataTables =  () => {

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  



 

  
  const tableColumns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      format: (row) => moment(row.date).format('DD-MM-YYYY'),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Absent From',
      selector: row => row.absence_from,
      format: (row) => moment(row.absence_from).format('DD-MM-YYYY') ,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Absent Through',
      selector: row => row.absence_through,
      format: (row) => moment(row.absence_through).format('DD-MM-YYYY'),
      sortable: true,
      center: true,
    },
    {
      name: 'Total days',
      selector: row => row.total_days,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Leave Type',
      selector: row => row.type_of_leave,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      center: true,
      wrap: true,
    }
  ]

  useEffect(async ()=>{
    let table_data = await fetchData();
  setData(table_data);
  },[])

  

  // const handleRowSelected = useCallback(state => {
  //   setSelectedRows(state.selectedRows);
  // }, []);

  // const contextActions = useMemo(() => {
  //   const handleDelete = () => {

  //     if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
  //       setToggleCleared(!toggleCleared);
  //       setData(differenceBy(data, selectedRows, 'name'));
  //       toast.success("Successfully Deleted !")
  //     }
  //   };

  //   return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
  // }, [data, selectedRows, toggleCleared]);

  return (
    <Fragment>
      <Breadcrumb parent="Table" title="Leave Data Report"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{"Leave Data"}</h5>
              </CardHeader>
              <CardBody>
                <DataTable className='table-border-horizontal'
                  data={data}
                  columns={tableColumns}
                  striped={true}
                  center={true}
                  selectableRows
                  persistTableHead
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page:',
                    rangeSeparatorText: 'out of',
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default DataTables;