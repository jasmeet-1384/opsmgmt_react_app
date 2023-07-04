import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label, Input } from 'reactstrap'
import { Cancel, Submit, Projectname, StartTime, FinishTime, Durations, Note, TimeTracker } from '../../../constant';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
import { timetrackerform, userlatesttimetrackerdata } from '../../../api';
// import { classes } from '../../../data/layouts';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import differenceBy from 'lodash/differenceBy';


const fetchData = async () => {
  let response = await userlatesttimetrackerdata();
  response = response.data;

  if (response.status_code == 1) {
    return response.data;
  }

  return [];
}


const LeaveForm = () => {
  const [date, setDate] = useState("");
  const [projectname, setProjectName] = useState("");
  const [starttime, setStartTime] = useState("");
  const [finishtime, setFinishTime] = useState("");
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useNavigate();
  // const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  // const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const submitTimeTrackerForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      let response = await timetrackerform({
        "date": date,
        "project_name": projectname,
        "start_time": starttime,
        "finish_time": finishtime,
        "duration": duration,
        "note": note,
      });

      let result = response.data;

      if (result.status_code == 1) {
        toast.success(result.message);
        // history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        document.getElementById('myform').reset();
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
      name: 'Project Name',
      selector: row => row.project_name,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Start Time',
      selector: row => row.start_time,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Finish Time',
      selector: row => row.finish_time,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Note',
      selector: row => row.note,
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
      <Breadcrumb parent="Form" title="Time Tracker" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{TimeTracker}</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" id='myform'>
                  <Row>
                    <Col md="3 mb-3">
                      <Label className="col-form-label">Date</Label>
                      <Input className="form-control" type="date" required="" onChange={e => setDate(e.target.value)} placeholder="date" />
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="col-form-label">{Projectname}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setProjectName(e.target.value)} placeholder="Enter Your Project Name" />
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="col-form-label">{StartTime}</Label>
                      <Input className="form-control" type="time" required="" onChange={e => setStartTime(e.target.value)} placeholder="Select Your Start Time" />
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="col-form-label">{FinishTime}</Label>
                      <Input className="form-control" type="time" required="" onChange={e => setFinishTime(e.target.value)} placeholder="Select Your Finish Time" />
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md="6 mb-3">
                      <Label className="col-form-label">{Durations}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setDuration(e.target.value)} placeholder="Enter your duration" />
                    </Col> */}
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Note}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setNote(e.target.value)} placeholder="Note.." />
                    </Col>
                  </Row>
                  <Button color="primary" className="me-2" disabled={loading ? loading : loading} onClick={(e) => submitTimeTrackerForm(e)}>{loading ? "LOADING..." : Submit}</Button>
                  <Button color="light" type="reset" >{Cancel}</Button>
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