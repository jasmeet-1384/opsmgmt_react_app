import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { userchangemanagementdata } from '../../api/index';
import moment from 'moment';


const fetchData = async () => {
    let response = await userchangemanagementdata();
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
    },
    {
      name: 'CR No.',
      selector: row => row.cr_no,
      format: (row) => moment(row.date).format('D-MM-YYYY'),
      sortable: true,
      center: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      format: (row) => moment(row.date).format('D-MM-YYYY'),
      sortable: true,
      center: true,
    },
    {
      name: 'Project Name',
      selector: row => row.project_name,
      sortable: true,
      center: true,
    },
    {
      name: 'Cr Severity',
      selector: row => row.cr_severity,
      sortable: true,
      center: true,
    },
    {
      name: 'Area Affected',
      selector: row => row.area_affected,
      sortable: true,
      center: true,
    },
    {
      name: 'Downtime',
      selector: row => row.downtime,
      sortable: true,
      center: true,
    },
    {
      name: 'Change Required',
      selector: row => row.change_reqiured,
      sortable: true,
      center: true,
    },
    {
      name: 'Intended Outcome',
      selector: row => row.intended_outcome,
      sortable: true,
      center: true,
    },
    {
      name: 'Additional Factor',
      selector: row => row.addtional_factor,
      sortable: true,
      center: true,
    },
    {
      name: 'Implementor',
      selector: row => row.implementor,
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      center: true,
    }
  ]
  
  

  useEffect(async ()=>{
    let table_data = await fetchData();

  setData(table_data);
  },[])

  

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {

      if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, 'name'));
        toast.success("Successfully Deleted !")
      }
    };

    return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
  }, [data, selectedRows, toggleCleared]);

  return (
    <Fragment>
      <Breadcrumb parent="Table" title="Change Management Data Report"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{"Change Management Data"}</h5>
              </CardHeader>
              <CardBody>
                <DataTable className='table-border-horizontal'
                  data={data}
                  columns={tableColumns}
                  striped={true}
                  center={true}
                  selectableRows
                  persistTableHead
                  contextActions={contextActions}
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={toggleCleared}
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