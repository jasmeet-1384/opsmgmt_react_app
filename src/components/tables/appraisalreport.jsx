import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { userappraisaldata } from '../../api/index';
import moment from 'moment';


const fetchData = async () => {
    let response = await userappraisaldata();
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
            <Breadcrumb parent="Table" title="Appraisal Data Report" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{"Appraisal Data"}</h5>
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