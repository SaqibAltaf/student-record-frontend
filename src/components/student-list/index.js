import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const StudentLists = () => {
    const history = useNavigate();
    const [state, setstate] = useState([]);
    useEffect(() => {
        async function fetchMyAPI() {
            const list = await axios.get('http://localhost:8080/api/students').then(data=>data.data);
            console.log(list)
            setstate(list)
        }
        fetchMyAPI()
    }, [])


    const getRefferal = (id) => () => {
        history("/registeration/" + id)
    }

    return (
        <Container>
            <h1 className="center mrb_20 ">Students</h1>
            <Link to='/registeration' >Registeration</Link>
            <Table columns={6}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Use Referral</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.length > 0? 
                        state.map((val, key) => {
                            return(
                                <Table.Row key={key}>
                                    <Table.Cell>{val.first_name}</Table.Cell>
                                    <Table.Cell>{val.last_name}</Table.Cell>
                                    <Table.Cell>
                                        <Button color="teal" onClick={getRefferal(val._id)}>Get Reffered</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }):
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>No Record</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell />
                                </Table.Row>
                            </Table.Footer>
                    }
                </Table.Body>

            </Table>

        </Container>
    );
}