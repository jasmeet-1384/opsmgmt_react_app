import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {userprojectonboardingdata } from '../../api/index';
import moment from 'moment';


const fetchData = async () => {
    let response = await userprojectonboardingdata();
    response = response.data;

    if (response.status_code == 1) {
        return response.data;
    }

    return [];
}


const DataTables = () => {

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
        },
        {
            name: 'Status',
            selector: row => row.status,
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
            <Breadcrumb parent="Table" title="Project Onboarding Data Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{"Project onboarding Data"}</h5>
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