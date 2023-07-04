import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label, Input } from 'reactstrap'
import { Leave, Absentfrom, Absentthrough, Totaldays, typeofleave, reasonforleave, Cancel, Submit } from '../../../constant'
import { toast } from 'react-toastify';
import differenceBy from 'lodash/differenceBy';
// import { useNavigate } from 'react-router';
import { leaveFrom } from '../../../api';
import DataTable from 'react-data-table-component';
import moment from 'moment';


// import { classes } from '../../../data/layouts';
import { userlatestleavedata } from '../../../api/index';

const fetchData = async () => {
  let response = await userlatestleavedata();
  response = response.data;

  if (response.status_code == 1) {
    return response.data;
  }

  return [];
}


const LeaveForm = () => {
  // const [date, setDate] = useState("");
  const [absencefrom, setAbsenceFrom] = useState("");
  const [absencethrough, setAbsenceThrough] = useState("");
  // const [totaldays, setTotalDays] = useState("");
  const [leavetype, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useNavigate();
  // const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  // const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);



  const submitLeaveForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      let response = await leaveFrom({
        // "date": date,
        "absence_from": absencefrom,
        "absence_through": absencethrough,
        // "total_days": totaldays,
        "type_of_leave": leavetype,
        "reason_for_leave": leaveReason,
      });

      let result = response.data;

      if (result.status_code == 1) {
        toast.success(result.message);
        // history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        document.getElementById("leaveform").reset();
        let table_data = await fetchData();
        setData(table_data);
        setLoading(false);
        return;
      }
      else {
        toast.error(result.message);
        setLoading(false);
        return;
      }

    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. Server Error.");
        setLoading(false);
      }, 200);
    }
  }

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
      format: (row) => moment(row.date).format('D-MM-YYYY'),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Absent From',
      selector: row => row.absence_from,
      format: (row) => moment(row.absence_from).format('D-MM-YYYY'),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Absent Through',
      selector: row => row.absence_through,
      format: (row) => moment(row.absence_through).format('D-MM-YYYY'),
      sortable: true,
      center: true,
      wrap: true,
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

  useEffect(async () => {
    let table_data = await fetchData();
    setData(table_data);
  }, [])

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
      <Breadcrumb parent="Form" title="Leave Application" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{Leave}</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" id='leaveform'>
                  <Row>
                    {/* <Col md="3 mb-3">
                      <Label className="col-form-label">Date</Label>
                      <Input className="form-control" type="date" required onChange={e => setDate(e.target.value)} placeholder="date" />
                    </Col> */}
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Absentfrom}</Label>
                      <Input className="form-control" type="date" required onChange={e => setAbsenceFrom(e.target.value)} placeholder="Absence From" />
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Absentthrough}</Label>
                      <Input className="form-control" type="date" required onChange={e => setAbsenceThrough(e.target.value)} placeholder="Absence Through" />
                    </Col>
                    {/* <Col md="3 mb-3">
                      <Label className="col-form-label">{Totaldays}</Label>
                      <Input className="form-control" type="number" required onChange={e => setTotalDays(e.target.value)} placeholder="Total Days" />
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{typeofleave}</Label>
                      <Input className="form-control" type="select" required onChange={e => setLeaveType(e.target.value)} >
                        <option defaultValue>Select Leave Type</option>
                        <option value={"Bereavement leave (Immediate Family)"}>{"Bereavement leave (Immediate Family)"}</option>
                        <option value={"Bereavement leave (Other)"}>{"Bereavement leave (Other)"}</option>
                        <option value={"Personal leave"}>{"Personal leave"}</option>
                        <option value={"Jury duty or legal leave"}>{"Jury duty or legal leave"}</option>
                        <option value={"Emergency leave"}>{"Emergency leave"}</option>
                        <option value={"Temporary leave"}>{"Temporary leave"}</option>
                        <option value={"Leave without pay"}>{"Leave without pay"}</option>
                      </Input>
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{reasonforleave}</Label>
                      <Input className="form-control" type="text" required onChange={e => setLeaveReason(e.target.value)} placeholder="Leave Reason" />
                    </Col>
                  </Row>
                  <Button color="primary" type="submit" className="me-2" disabled={loading ? loading : loading} onClick={(e) => submitLeaveForm(e)}>{loading ? "LOADING..." : Submit}</Button>
                  <Button color="light" type="reset" >{Cancel}</Button>
                  {/* <Button color="light" type="reset">Reset form</Button> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{"Recently Applied Leaves"}</h5>
              </CardHeader>
              <CardBody>
                <DataTable
                  data={data}
                  columns={tableColumns}
                  striped={true}
                  center={true}
                  selectableRows
                  persistTableHead
                  contextActions={contextActions}
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={toggleCleared}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LeaveForm;