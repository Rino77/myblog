import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { CLEAR_ERROR_REQUEST ,REGISTER_REQUEST} from '../../redux/types';

const RegisterModal = (params) => {
    const [modal, setModal] = useState(false)
    const [form, setValue] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [localMsg, setlocalMsg] = useState('')

    const { errorMsg } = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()
    const handleToggle = (params) =>
    {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal)
    }

    useEffect(() =>
    {
        try {
            setlocalMsg(errorMsg)
        } catch (e)
        {
            console.log(e)
            
        }
    }, [errorMsg])
    
    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = form;
        const newUser = { name, email,password }
        console.log(newUser, "newUser")
        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser
        })
    }

    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen ={modal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='name'>
                                Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                onChange={onChange}
                                placeholder="NAME"
                            />
                            <Label for='email'>
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                onChange={onChange}
                                placeholder="EMAIL"
                            />
                            <Label for='password'>
                                Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                onChange={onChange}
                                placeholder="PASSWORD"
                            />
                        <Button color="dark" className="mt-2" block>Register</Button>
                        </FormGroup>
                    </Form>
            </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterModal