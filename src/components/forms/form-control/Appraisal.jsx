import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label,Input } from 'reactstrap'
import  { Cancel, Submit, Goalsappraisal, Greatestaccomplishment, Biggestchallenge, Biggeststrengthweakness, Resources, Careergoals, Currentrole, Motivates, Anyquestions, Appraisals } from '../../../constant';
import { toast } from 'react-toastify';
import differenceBy from 'lodash/differenceBy';
// import { useNavigate } from 'react-router';
import { appraisalform, userlatestappraisaldata } from '../../../api';
// import { classes } from '../../../data/layouts';
import moment from 'moment';
import DataTable from 'react-data-table-component';


const fetchData = async () => {
  let response = await userlatestappraisaldata();
  response = response.data;

  if (response.status_code == 1) {
      return response.data;
  }

  return [];
}


const ChangeManagementForm= () => {
  const [goalsappraisal, setGoalsAppraisal] = useState("");
  const [greatestaccomplishment, setGreatestAccomplishment] = useState("");
  const [biggestchallenge, setBiggestChallenge] = useState("");
  const [biggeststrengthweakness, setBiggestStrengthWeakness] = useState("");
  const [resources, setResources] = useState("");
  const [careergoals, setCareerGoals] = useState("");
  const [currentrole, setCurrentRole] = useState("");
  const [motivates, setMotivates] = useState("");
  const [anyquestions, setAnyQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useNavigate();
  // const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  // const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const submitAppraisalForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      let response = await appraisalform({
        "goals_appraisal": goalsappraisal,
        "greatest_accomplishment": greatestaccomplishment,
        "biggest_challenge": biggestchallenge,
        "biggest_strength_weakness": biggeststrengthweakness,
        "resources": resources,
        "career_goals": careergoals,
        "current_role": currentrole, 
        "motivates": motivates,
        "any_questions": anyquestions
      });

      let result = response.data ;

      if(result.status_code ==  1){
        toast.success(result.message);
        // history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        document.getElementById("appraisalform").reset();
        let table_data = await fetchData();
        setData(table_data);
        setLoading(false)
        return;
      }
      else
      {
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
        selector: row => row.createdAt,
        format: (row) => moment(row.date).format('D-MM-YYYY'),
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Goals Appraisal',
        selector: row => row.goals_appraisal,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Greatest Accomplishment',
        selector: row => row.greatest_accomplishment,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Biggest Challenge',
        selector: row => row.biggest_challenge,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Strength or Weakness',
        selector: row => row.biggest_strength_weakness,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Resources',
        selector: row => row.resources,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Career Goals',
        selector: row => row.career_goals,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: 'Current Role',
        selector: row => row.current_role,
        sortable: true,
        center: true,
        border: true,
        wrap: true,
    },
    {
        name: 'Motivates',
        selector: row => row.motivates,
        sortable: true,
        center: true,
        border: true,
        wrap: true,
    },
    {
        name: 'Any Questions',
        selector: row => row.any_questions,
        sortable: true,
        center: true,
        border: true,
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
    <Breadcrumb parent="Form" title="Appraisal Form" />
    <Container fluid={true}>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>{Appraisals}</h5>
            </CardHeader>
            <CardBody>
              <Form className="needs-validation" id='appraisalform'>
                <Row>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Goalsappraisal}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setGoalsAppraisal(e.target.value)} placeholder="Your Answer" />
                    </Col>
                    <Col md="6 mb-3">
                      <Label className="col-form-label">{Greatestaccomplishment}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setGreatestAccomplishment(e.target.value)} placeholder="Your Answer" />
                    </Col>
                  </Row>
                  <Row>
                  <Col md="6 mb-3">
                      <Label className="col-form-label">{Biggestchallenge}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setBiggestChallenge(e.target.value)} placeholder="Your Answer" />
                    </Col>
                  <Col md="6 mb-3">
                      <Label className="col-form-label">{Biggeststrengthweakness}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setBiggestStrengthWeakness(e.target.value)} placeholder="Your Answer" />
                    </Col> 
                </Row>
                <Row>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Resources}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setResources(e.target.value)} placeholder="Your Answer" />
                    </Col>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Careergoals}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setCareerGoals(e.target.value)} placeholder="Your Answer" />
                    </Col>
                </Row>
                <Row>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Currentrole}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setCurrentRole(e.target.value)} placeholder="Your Answer" />
                    </Col>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Motivates}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setMotivates(e.target.value)} placeholder="Your Answer" />
                    </Col>
                </Row>
                <Row>
                <Col md="6 mb-3">
                      <Label className="col-form-label">{Anyquestions}</Label>
                      <Input className="form-control" type="text" required=""  onChange={e => setAnyQuestions(e.target.value)} placeholder="Your Answer" />
                    </Col> 
                </Row>
                <Button color="primary" className="me-2" disabled={loading ? loading : loading} onClick={(e) => submitAppraisalForm(e)}>{loading ? "LOADING..." : Submit}</Button>
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
                                <h5>{"Recently Applied Appraisal Data"}</h5>
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