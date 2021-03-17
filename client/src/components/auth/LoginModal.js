import React, {useEffect, useState} from "react";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from "reactstrap";
import { useDispatch,useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";


const LoginModal = (params) =>
{
    const [modal, setModal] = useState(false)
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email: "",
        password: ""
    })
    const dispatch =useDispatch()
    const { errorMsg } = useSelector((state) => state.auth)
    useEffect(() =>
    {
        try {
            setLocalMsg(errorMsg)
        } catch (e) {
           console.log(e) 
        }
    },[errorMsg])

const handleToggle = (params) => {
    dispatch({
        type: CLEAR_ERROR_REQUEST
    })
    setModal(!modal)
}
const onChange = (e) => {
    setValues({
        ...form,
        [e.target.name]: e.target.value
    })
    }
    
const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = form
    const user = { email, password }
    console.log(user)
    dispatch({
        type: LOGIN_REQUEST,
        payload: user,
    })
    }
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{ localMsg}</Alert>: null}
                </ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChange}
                        />
                        <Label for="password">Password</Label>
                        <Input type="passowrd"
                            name="passowrd"
                            id="passowrd"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <Button color='dark' style={{marginTop: "2rem"}} block>
                            Login
                        </Button>
                        
                    </FormGroup>
                </Form>
            </Modal>
        </div>
    )
};


export default LoginModal;