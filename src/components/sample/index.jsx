import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import moment from 'moment';
import { allkanbandata } from '../../api';



const fetchData = async () => {
    let response = await allkanbandata();
    response = response.data;
    if(response.status_code == 1)
    {
      return response.data;
    }

    return [];
}


const KanbanData =  () => {

  const [data, setData] = useState([]);
  

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
      name: 'Task Title',
      selector: row => row.title,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
      center: true,
    },
    {
      name: 'Start Date',
      selector: row => row.start_date,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Due Date',
      selector: row => row.due_date,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Assignee',
      selector: row => row.assignee,
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
      },
      {
        name: 'Priority',
        selector: row => row.priority,
        sortable: true,
        center: true,
        wrap: true,
      },
  ]

  useEffect(async ()=>{
    let table_data = await fetchData();

  setData(table_data);
  },[])

  
  return (
    <Fragment>
      <Breadcrumb parent="Table" title="Kanban Data Report"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{"kanban Data"}</h5>
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

export default KanbanData;