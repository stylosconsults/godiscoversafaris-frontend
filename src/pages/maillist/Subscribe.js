import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userSubscribe } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/LoadingSmall";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const loading = useSelector((state) => state.maillistReducer.subscribeData);
  const subscribeFailure = useSelector(
    (state) => state.maillistReducer.subscribeFailure,
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    if (email) {
      dispatch(userSubscribe({ email }));
    }
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="justify-content-center flex text-center mail-form"
      >
       <div style={{ display: 'flex', alignItems: 'center' }}>
    <Form.Group className='form-group' style={{ margin: '0', flex: '1' }}>
        <Form.Label className='text-title text-light'>
            <b>Email address</b>
        </Form.Label>
        <Form.Control
            required
            type='email'
            name='email'
            value={email}
            placeholder='Eg: email@example.com'
            className='form-control-md form-control-xs'
            style={{ width: '100%', height: '40px' }}
            onChange={handleChange}
        />
    </Form.Group>
    <Button
        type='submit'
        variant='default'
        className='btn btn-custom-primary text-light'
        style={{ marginLeft: '10px', height: '40px', marginTop: '30px' }} 
    >
        <i className='fa fa-paper-plane'></i> Subscribe
    </Button>
</div>


        <Form.Control.Feedback type="invalid">
          Email is required
        </Form.Control.Feedback>
        {subscribeFailure && (
          <Alert className="alert-warning text-small">
            {"Server Error, Please try again later"}
          </Alert>
        )}
        {loading && <Loading />}
      </Form>
    </>
  );
};
