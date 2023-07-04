import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label, Input } from 'reactstrap'
import { Cancel, Submit, Projectname, Projectfolder, ProjectOnBoarding, Cloudpem, Comments, Timetrackers, kanbans } from '../../../constant';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
import { projectOnboarding, userlatestprojectmanagementdata } from '../../../api';
// import { classes } from '../../../data/layouts';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import differenceBy from 'lodash/differenceBy';

const fetchData = async () => {
  let response = await userlatestprojectmanagementdata();
  response = response.data;

  if (response.status_code == 1) {
    return response.data;
  }

  return [];
}

const ProjectOnBoardingForm = () => {
  const [date, setDate] = useState("");
  const [projectname, setProjectName] = useState("");
  const [projectfolder, setProjectFolder] = useState("");
  const [timetracker, setTimeTracker] = useState("");
  const [kanban, setKanban] = useState("");
  const [cloudpem, setCloudPem] = useState("");
  const [comments, setComments] = useState("");
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

      let response = await projectOnboarding({
        "date": date,
        "project_name": projectname,
        "project_folder": projectfolder,
        "time_tracker": timetracker,
        "kanban": kanban,
        "cloud_pem": cloudpem,
        "comments": comments
      });

      let result = response.data;

      if (result.status_code == 1) {
        toast.success(result.message);
        // history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        document.getElementById("projectform").reset();
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
      name: 'Project Folder',
      selector: row => row.project_folder,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Time Tracker',
      selector: row => row.time_tracker,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Kanban',
      selector: row => row.kanban,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Cloud Pem',
      selector: row => row.cloud_pem,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Comments',
      selector: row => row.comments,
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
      <Breadcrumb parent="Form" title="Project Onboarding" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{ProjectOnBoarding}</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" id='projectform'>
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
                      <Label className="col-form-label">{Projectfolder}</Label>
                      <Input className="form-control" type="select" required="" onChange={e => setProjectFolder(e.target.value)} >
                        <option defaultValue>Select Your Option</option>
                        <option value={"Yes"}>{"Yes"}</option>
                        <option value={"No"}>{"No"}</option>
                      </Input>
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="col-form-label">{Timetrackers}</Label>
                      <Input className="form-control" type="select" required="" onChange={e => setTimeTracker(e.target.value)}>
                        <option defaultValue>Select Your Option</option>
                        <option value={"Yes"}>{"Yes"}</option>
                        <option value={"No"}>{"No"}</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{kanbans}</Label>
                      <Input className="form-control" type="select" required="" list='kanbans' onChange={e => setKanban(e.target.value)}>
                        <option defaultValue>Select Your Option</option>
                        <option value={"Yes"}>{"Yes"}</option>
                        <option value={"No"}>{"No"}</option>
                      </Input>
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Cloudpem}</Label>
                      <Input className="form-control" type="select" required="" list='cloudpem' onChange={e => setCloudPem(e.target.value)} placeholder="Select Your Options" >
                        <option defaultValue>Select Your Option</option>
                        <option value={"Yes"}>{"Yes"}</option>
                        <option value={"No"}>{"No"}</option>
                      </Input>
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Comments}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setComments(e.target.value)} placeholder="Enter Your Comments" />
                    </Col>
                  </Row>
                  <Button color="primary" className="me-2" disabled={loading ? loading : loading} onClick={(e) => submitLeaveForm(e)}>{loading ? "LOADING..." : Submit}</Button>
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
                <h5>{"Recently Applied Project Onboarding"}</h5>
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

export default ProjectOnBoardingForm;