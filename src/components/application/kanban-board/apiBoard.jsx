import React, { Fragment, useState, useEffect } from "react";
import Board from "@asseinfo/react-kanban";
import {
  API,
  AddNewTask,
  NewMessage,
  Close,
  SendMessage,
  EditMessage,
} from "../../../constant";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { getUserList, kanbanform, updateKanban, userkanbandata } from "../../../api";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import moment from "moment";
import { updateClose } from './../../../api/index';
import { Link } from 'react-router-dom';


const auth0_profile = () => JSON.parse(localStorage.getItem("auth0_profile"))

const fetchData = async () => {
  let response = await userkanbandata();
  response = response.data;
  console.log(response.data);

  if (response.status_code == 1) {
    return response.data;
  }

  return [];
};

const fetchedData = async () => {
  let response = await getUserList();
  response = response.data;
  console.log(response.data);
  if (response.status_code == 1) {
    return response.data;
  }
  return [];
};

const apikanbanboard = {
  columns: [
    {
      id: "pending",
      title: "Todo",
      cards: [],
    },
    {
      id: "progress",
      title: "Working",
      cards: [],
    },
    {
      id: "testing",
      title: "Testing",
      cards: [],
    },
    {
      id: "completed",
      title: "Done",
      cards: [],
    },
  ],
};

const KanbanBoard = () => {
  const [board, setboard] = useState(apikanbanboard);
  const [userList, setUserList] = useState([]);
  const [VaryingContentone, setVaryingContentone] = useState(false);
  const VaryingContentonetoggle = () =>
    setVaryingContentone(!VaryingContentone);

  const [VaryingContentoneedit, setVaryingContentoneedit] = useState(false);
  const VaryingContentonetoggleedit = () =>
    setVaryingContentoneedit(!VaryingContentoneedit);

  // for kanban form

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setStartDate] = useState("");
  const [duedate, setDueDate] = useState("");
  const [originalestimate, setOriginalEstimate] = useState("");
  const [timespent, setTimeSpent] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const submitkanbanForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await kanbanform({
        title: title,
        description: description,
        start_date: startdate,
        due_date: duedate,
        original_estimate: originalestimate,
        time_spent: timespent,
        assignee: assignee?.map((e) => e.id),
        status: status,
        priority: priority,
      });

      let result = response.data;

      if (result.status_code == 1) {
        toast.success(result.message);
        document.getElementById("kanbanform").reset();
        await getBoardsData();
        
        setLoading(false);
        
      
        return;
      } else {
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
  };


  function handleCardMove(_card, source, from, to) {
    // console.log({ _card, source, from, to });

    let req_body = {
      task_id: source.id,
      status: to.toColumnId,
      position_id: to.toPosition,
    };
    console.log(req_body);
    updateCardMove(req_body);
  }

  async function updateCardMove(req_body) {
    let update = await updateKanban(req_body);
    //  console.log({update: update.data});
  }

  async function getBoardsData() {
    let kanban_data = await fetchData();

    apikanbanboard.columns[0].cards = kanban_data.pending || [];
    apikanbanboard.columns[1].cards = kanban_data.progress || [];
    apikanbanboard.columns[2].cards = kanban_data.testing || [];
    apikanbanboard.columns[3].cards = kanban_data.completed || [];
    setboard({ ...apikanbanboard });
  }

  async function closeCompleted(task_id) {
    let response = await updateClose(task_id);
  }

  useEffect(async () => {
    await getBoardsData()
    await closeCompleted()

    let userlist = await fetchedData();
    setUserList(userlist);
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <h5>{API}</h5>
          {/* <div className="todo-list-footer">
                        <div className="add-task-btn-wrapper"><span className="add-task-btn">
                          <Button color="primary" >{AddNewTask}</Button></span>
                        </div>
                      </div> */}
          <Button color="primary" onClick={VaryingContentonetoggle}>
            {AddNewTask}
          </Button>
          <Modal
            className="modal-dialog modal-xl"
            isOpen={VaryingContentone}
            toggle={VaryingContentonetoggle}
          >
            <ModalHeader toggle={VaryingContentonetoggle}>
              {NewMessage}
            </ModalHeader>
            <ModalBody>
              <Form id="kanbanform">
                <Row>
                  <Col md="6 mb-3">
                    <Label className="col-form-label">{"Title"}</Label>
                    <Input
                      className="form-control"
                      type="text"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                    />
                  </Col>
                  <Col md="3 mb-3">
                    <Label className="col-form-label">{"Assignee"}</Label>

                    {/* <Input className="form-control" type="text" required onChange={e => setAssignee(e.target.value)} placeholder="Assignee" /> */}
                    <Multiselect
                      onRemove={(e) => {
                        setAssignee(e);
                      }}
                      onSelect={(e) => {
                        setAssignee(e);
                      }}
                      options={userList}
                      displayValue="name"
                      showCheckbox
                    />
                  </Col>
                  <Col md="3 mb-3">
                    <Label className="col-form-label">{"Start Date"}</Label>
                    <Input
                      className="form-control"
                      type="date"
                      required
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="Start date"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6 mb-3">
                    <Label className="col-form-label">{"Description"}</Label>
                    <Input
                      className="form-control"
                      type="textarea"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </Col>
                  <Col md="6 mb-3">
                    <Row>
                      <Col md="6 mb-3">
                        <Label className="col-form-label">{"Status"}</Label>
                        <Input
                          className="form-control text"
                          type="select"
                          list="statuskanban"
                          required
                          onChange={(e) => setStatus(e.target.value)}
                          placeholder="Status"
                        >
                          <option defaultValue>Select Your Status</option>
                          <option value={"pending"}>{"To-do"}</option>
                          <option value={"progress"}>{"In-Process"}</option>
                          <option value={"testing"}>{"Testing"}</option>
                          <option value={"completed"}>{"Done"}</option>
                        </Input>
                      </Col>
                      <Col md="6 mb-3">
                        <Label className="col-form-label">{"Due Date"}</Label>
                        <Input
                          className="form-control"
                          type="date"
                          required
                          onChange={(e) => setDueDate(e.target.value)}
                          placeholder="Due date"
                        />
                      </Col>
                      <Col md="6 mb-3">
                        <Label className="col-form-label">{"Priority"}</Label>
                        <Input
                          className="form-control text"
                          type="select"
                          list="prioritykanban"
                          required
                          onChange={(e) => setPriority(e.target.value)}
                          placeholder="Select priority"
                        >
                          <option defaultValue>Select Your Priority</option>
                          <option value={"low"}>{"Low"}</option>
                          <option value={"medium"}>{"Medium"}</option>
                          <option value={"high"}>{"High"}</option>
                        </Input>
                      </Col>
                      <Col md="6 mb-3">
                        <Label className="col-form-label">
                          {"Original Estimate"}
                        </Label>
                        <Input
                          className="form-control"
                          type="time"
                          required
                          onChange={(e) => setOriginalEstimate(e.target.value)}
                          placeholder="Select Estimate Hours"
                        />
                      </Col>
                      <Col md="6 mb-3">
                        <Label className="col-form-label">{"Time Spent"}</Label>
                        <Input
                          className="form-control"
                          type="time"
                          required
                          onChange={(e) => setTimeSpent(e.target.value)}
                          placeholder="Select Spent Hours"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={VaryingContentonetoggle}>
                {Close}
              </Button>
              <Button
                color="primary"
                disabled={loading ? loading : loading}
                onClick={(e) => submitkanbanForm(e)}
              >
                {loading ? "LOADING..." : SendMessage}
              </Button>
            </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody>
          <div id="demo3">
            <div className="kanban-container">
              <div className="kanban-board">
                <main className="kanban-drag" id="addToDo">
                  <Board
                    initialBoard={board}
                    onCardDragEnd={handleCardMove}
                    renderCard={({
                      id,
                      title,
                      start_date,
                      priority,
                      backgroundImg,
                      description,
                      status,
                      user,
                      assignee_count,
                      assignee,
                    }) => (
                      <div className="kanban-item" id="todo">
                        <a className="kanban-box" >
                          <span className="date">#{id}</span>
                          <span
                            className="edit_icon"
                            onClick={VaryingContentonetoggleedit}
                          >
                            <i className="fa fa-pencil"></i>Edit
                          </span>
                          <Modal
                            className="modal-dialog modal-xl"
                            isOpen={VaryingContentoneedit}
                            toggle={VaryingContentonetoggleedit}
                          >
                            <ModalHeader toggle={VaryingContentonetoggleedit}>
                              {EditMessage}
                            </ModalHeader>
                            <ModalBody>
                              <Form id="kanbanform">
                                <Row>
                                  <Col md="6 mb-3">
                                    <Label className="col-form-label">{"Title"}</Label>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      required
                                      onChange={(e) => setTitle(e.target.value)}
                                      placeholder="Title"
                                      value={title}
                                    />
                                  </Col>
                                  <Col md="6 mb-3">
                                    <Label className="col-form-label">{"Assignee"}</Label>

                                    {/* <Input className="form-control" type="text" required onChange={e => setAssignee(e.target.value)} placeholder="Assignee" /> */}
                                    <Multiselect
                                      onRemove={(e) => {
                                        setAssignee(e);
                                      }}
                                      onSelect={(e) => {
                                        setAssignee(e);
                                      }}
                                      options={userList}
                                      displayValue="name"
                                      showCheckbox
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12 mb-3">
                                    <Label className="col-form-label">{"Description"}</Label>
                                    <Input
                                      className="form-control"
                                      type="textarea"
                                      required
                                      onChange={(e) => setDescription(e.target.value)}
                                      placeholder="Description"
                                      value={description}
                                    />
                                  </Col>
                                </Row>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="secondary" onClick={VaryingContentonetoggleedit}>
                                {Close}
                              </Button>
                              <Button
                                color="primary"
                                disabled={loading ? loading : loading}
                                onClick={(e) => submitkanbanForm(e)}
                              >
                                {loading ? "LOADING..." : SendMessage}
                              </Button>
                            </ModalFooter>
                          </Modal>
                          <span className="date">
                            {moment(start_date).format("DD-MM-YYYY")}
                          </span>
                          {/* {
                            auth0_profile.id == user.id ? <span
                            className="edit_icon"
                          >
                            <i className="fa fa-trash"></i>Close
                          </span> : null
                          } */}

                          {((auth0_profile()?.id == user?.id) && (status == 'completed')) ?
                            <span className="edit_icon" onClick={() => closeCompleted(id)}><i className="fa fa-trash"></i>Delete</span> : null}
                          <span
                            className={`badge ${priority === "high"
                                ? "badge-danger"
                                : priority === "low"
                                  ? "bg-success"
                                  : "bg-primary"
                              } f-right`}
                          >
                            {priority}
                          </span>

                          <img
                            className="mt-2 img-fluid"
                            src={backgroundImg}
                            alt=""
                          />

                          <h6>{title}</h6>
                          <div className="media">
                            <img
                              className="img-20 me-1 rounded-circle"
                              src={user.image}
                              alt=""
                            />
                            <div className="media-body">
                              <p>{description}</p>
                            </div>
                          </div>
                          <div className="d-flex mt-2">
                            <ul className="list">
                              <li>
                                <i className="fa fa-comments-o"></i>2&nbsp;
                              </li>
                              <li>
                                 <i className="fa fa-paperclip"></i>2&nbsp;
                              </li>
                              <li>
                                <Link to={`${process.env.PUBLIC_URL}/kanbanlistdata`} ><i className="fa fa-eye"></i></Link>
                              </li>
                            </ul>
                            <div className="customers">
                              <ul>
                                <li className="d-inline-block me-3">
                                  <p className="f-12">+{assignee_count}</p>
                                </li>
                                {assignee_count >= 1 ? (
                                  <li className="d-inline-block">
                                    <img
                                      className="img-20 rounded-circle"
                                      src={assignee[0]?.image}
                                      alt=""
                                    />
                                  </li>
                                ) : null}
                                {assignee_count >= 2 ? (
                                  <li className="d-inline-block">
                                    <img
                                      className="img-20 rounded-circle"
                                      src={assignee[1]?.image}
                                      alt=""
                                    />
                                  </li>
                                ) : null}
                                {assignee_count >= 3 ? (
                                  <li className="d-inline-block">
                                    <img
                                      className="img-20 rounded-circle"
                                      src={assignee[2]?.image}
                                      alt=""
                                    />
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  >
                    {board}
                  </Board>
                </main>
              </div>
            </div>
          </div>
          {/* <div className="mt-3">
                        <Button color="success" className="ms-2" onClick={addDefaultboard}>{Add} &quot;{Default}&quot; {"board"}</Button>
                        <Button color="success" className="ms-2" onClick={AddElementIntoTodo}>{"Add element in"} &quot;{ToDo}&quot; {"Board"}</Button>
                        <Button color="danger" className="ms-2" onClick={removeDoneboard}>{"Remove"} &quot;{Done}&quot; {"Board"}</Button>
                    </div> */}
        </CardBody>
      </Card>
      <div id="mydata"></div>
    </Fragment>
  );
};

export default KanbanBoard;
