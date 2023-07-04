import React, { Fragment } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col } from 'reactstrap'
// import CustomeBoard from './customeBoard'
import KanbanBoard from './apiBoard';
// import DefaultBoard from './defaultBoard';

const kanbanBoard = () => {
    return (
        <Fragment>
            <Breadcrumb parent="Apps" title="Kanban Dashboard" />
            <Container fluid={true} className="jkanban-container">
                <Row>
                    <Col xs="12">
                        <KanbanBoard />
                        
                        {/* <CustomeBoard />
                        <DefaultBoard /> */}
                    </Col>
                </Row>

            </Container>
        </Fragment>
    );
}

export default kanbanBoard;