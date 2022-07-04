import React from 'react';
import { useState } from 'react';
import { Button, Container, Form } from 'semantic-ui-react';
import { RegisterationValidation } from '../../validation/registeration';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';


export const RegisterationForm = () => {
    let params = useParams();

    const [state, setstate] = useState({
        first_name: "",
        last_name: "",
        address: [{
            label: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip_code: ""
        }]
    })
    const [error, seterror] = useState({
        success: false,
        error_first_name: "",
        error_last_name: "",
    })


    const onChangeText = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const onChangeTexAddress = (index) => (e) => {
        const _address = [...state.address];
        _address[index][e.target.name] = e.target.value;
        const __state = state;
        __state.address = _address;
        setstate({ ...__state })
    }

    const submit = async () => {
        const resultedValidation = RegisterationValidation(state);
        console.log(state)
        if (resultedValidation.success) {
            try {
                await axios.post('http://localhost:8080/api/register-student', {
                    ...state,
                    referred_by: Object.values(params)[0] ? Object.values(params)[0] : null
                });
                NotificationManager.success('Successfuly', 'Successfuly Registered', 3000);

                setstate({
                    first_name: "",
                    last_name: "",
                    address: [{
                        label: "",
                        address: "",
                        city: "",
                        state: "",
                        country: "",
                        zip_code: ""
                    }]
                })
            } catch (error) {
                NotificationManager.error('Error', 'Please try again later', 3000);
            }
        } else {
            seterror({ ...error, ...resultedValidation })
            console.log("FAds")
        }
    }


    const addAddress = () => {
        const _address = [...state.address];
        _address.push({
            label: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip_code: ""
        });

        const __state = state;
        __state.address = _address;
        setstate({ ...__state })
    }

    const removeAddress = (index) => {
        if (index !== 0) {
            const __state = state;
            __state.address.splice(index, 1)
            setstate({ ...__state })
        }

    }
    return (
        <Container>
            <h1 className="center mrb_20">Registeration</h1>

            <Form>
                <h3>Personal Information</h3>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        onChange={onChangeText}
                        label='First name'
                        placeholder='First name'
                        name="first_name"
                        value={state.first_name}
                        error={error.error_first_name ? { content: error.error_first_name } : null}
                    />
                    <Form.Input
                        fluid
                        onChange={onChangeText}
                        label='Last name'
                        name="last_name"
                        placeholder='Last name'
                        value={state.last_name}
                        error={error.error_last_name ? { content: error.error_last_name } : null}
                    />
                </Form.Group>
                <h3>Address Information</h3>
                {
                    state.address.map((val, key) => {
                        return (
                            <>
                                <Button onClick={addAddress} color="teal">+</Button>
                                {
                                    key !== 0 ?

                                        <Button onClick={() => removeAddress(key)} color="youtube">-</Button>
                                        :
                                        null
                                }
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='Address'
                                        placeholder='Address'
                                        name="address"
                                        value={val.address}
                                    />
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='Label'
                                        placeholder='Label'
                                        name="label"
                                        value={val.label}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='City'
                                        placeholder='City'
                                        name="city"
                                        value={val.city}
                                    />
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='State'
                                        placeholder='State'
                                        name="state"
                                        value={val.state}
                                    />
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='Country'
                                        placeholder='Country'
                                        name="country"
                                        value={val.country}
                                    />
                                    <Form.Input
                                        fluid
                                        onChange={onChangeTexAddress(key)}
                                        label='Zip Code'
                                        placeholder='Zip Code'
                                        name="zip_code"
                                        value={val.zip_code}
                                    />
                                </Form.Group>

                            </>
                        )
                    })
                }

                <Button type="button" onClick={submit}>Submit</Button>
            </Form>

        </Container>
    );
}