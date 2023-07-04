import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label, Input } from 'reactstrap'
import { Cancel, Submit, Additionalfactor, Projectname, Crseverity, Areaeffected, Downtime, changerequired, Intendedoutcome, Implementor, ChangeManagement } from '../../../constant'
import { toast } from 'react-toastify';
import differenceBy from 'lodash/differenceBy';
// import { useNavigate } from 'react-router';
import { changeManagementForm, userlatestchangemanagementdata } from '../../../api';
// import { classes } from '../../../data/layouts';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const fetchData = async () => {
  let response = await userlatestchangemanagementdata();
  response = response.data;

  if (response.status_code == 1) {
    return response.data;
  }

  return [];
}


const ChangeManagementForm = () => {
  // const [crnos, setCrnos] = useState("");
  const [date, setDate] = useState("");
  const [projectname, setProjectName] = useState("");
  const [crseverity, setCrSeverity] = useState("");
  const [areaaffected, setAreaAffected] = useState("");
  const [downtime, setDownTime] = useState("");
  const [changesreqiured, setChangesRequired] = useState("");
  const [intendedoutcome, setIntendedOutcome] = useState("");
  const [additionalfactor, setAdditionalFactor] = useState("");
  const [implementor, setImplementor] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useNavigate();
  // const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  // const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const submitChangeManagementForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      let response = await changeManagementForm({
        // "cr_no": crnos,
        "date": date,
        "project_name": projectname,
        "cr_severity": crseverity,
        "area_affected": areaaffected,
        "downtime": downtime,
        "change_reqiured": changesreqiured,
        "intended_outcome": intendedoutcome,
        "addtional_factor": additionalfactor,
        "implementor": implementor
      });

      let result = response.data;

      if (result.status_code == 1) {
        toast.success(result.message);
        // history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        document.getElementById("change").reset();
        let table_data = await fetchData();
        setData(table_data);
        setLoading(false)
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
      name: 'CR No.',
      selector: row => row.cr_no,
      format: (row) => moment(row.date).format('D-MM-YYYY'),
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
      name: 'Cr Severity',
      selector: row => row.cr_severity,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Area Affected',
      selector: row => row.area_affected,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Downtime',
      selector: row => row.downtime,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Change Required',
      selector: row => row.change_reqiured,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Intended Outcome',
      selector: row => row.intended_outcome,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Additional Factor',
      selector: row => row.addtional_factor,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Implementor',
      selector: row => row.implementor,
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
      <Breadcrumb parent="Form" title="Change Management" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{ChangeManagement}</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" id='change'>
                  <Row>
                    {/* <Col md="3 mb-3">
                      <Label className="col-form-label">Cr-No.</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setCrnos(e.target.value)} placeholder="Cr-no" />
                    </Col> */}
                    <Col md="3 mb-3">
                      <Label className="col-form-label">Date</Label>
                      <Input className="form-control" type="date" required="" onChange={e => setDate(e.target.value)} placeholder="date" />
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Projectname}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setProjectName(e.target.value)} placeholder="Enter Project Name" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Crseverity}</Label>
                      <Input className="form-control" type="select" required="" onChange={e => setCrSeverity(e.target.value)} >
                        <option defaultValue>Select Cr-Severity Type</option>
                        <option value={"Minor"}>{"Minor"}</option>
                        <option value={"Major"}>{"Major"}</option>
                        <option value={"Critical"}>{"Critical"}</option>
                        <option value={"Show Stopper"}>{"Show Stopper"}</option>
                      </Input>
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Areaeffected}</Label>
                      <Input className="form-control" type="select" required=""  onChange={e => setAreaAffected(e.target.value)} >
                      <option defaultValue>Select Area Effected</option>
                        <option value={"Application"}>{"Application"}</option>
                        <option value={"Database"}>{"Database"}</option>
                        <option value={"Network"}>{"Network"}</option>
                        <option value={"Others"}>{"Others"}</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Downtime}</Label>
                      <Input className="form-control" type="number" required="" onChange={e => setDownTime(e.target.value)} placeholder="Enter Your Downtime" />
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{changerequired}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setChangesRequired(e.target.value)} placeholder="Why Change is Reqiured" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Intendedoutcome}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setIntendedOutcome(e.target.value)} placeholder="Enter Intended Outcome" />
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Additionalfactor}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setAdditionalFactor(e.target.value)} placeholder="Additional Factor" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Implementor}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setImplementor(e.target.value)} placeholder="Implementor" />
                    </Col>
                  </Row>
                  <Button color="primary" className="me-2" disabled={loading ? loading : loading} onClick={(e) => submitChangeManagementForm(e)}>{loading ? "LOADING..." : Submit}</Button>
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
                <h5>{"Recently Applied Change Management"}</h5>
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

export default ChangeManagementForm;