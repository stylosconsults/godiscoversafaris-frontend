import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import PaymentForm from '../components/payment/PaymentForm';

const ViewOrder = (props) => {
  const history = useHistory();
  const myprofroma = useSelector((state) => state.order.orderItem.oneorder);
  const items = useSelector((state) => state.order.orderItem.orderItems);
  const item = useSelector((state) => state.order.orderItem.oneorder);
  let amountToPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const lastPath = window.location.pathname;
    const id = lastPath.split('/');
    dispatch(getSingleOrder(id[2]));
   
  }, [dispatch]);

  const handleClickOpen = () => {
    let path = `/account/supplier/orders`;
    history.push(path);
  };

  const handlePayOpen = (amountToPay) => {
		localStorage.setItem("amountToPay", amountToPay);
		window.location.href = `${process.env.REACT_APP_FRONTEND}/pay`;
	};
  
  if(item !== undefined){
    amountToPay = item.amount;
  }

  return (
    <Container className="mt-4">
      <h4 className="text-center mt-4">View order</h4>
      <hr />
      <Row>
        <Col xs={12} sm={5} md={4}>
          {myprofroma !== undefined ? (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Names</strong>
                  <br />
                  {myprofroma.client.names}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone</strong>
                  <br />
                  {myprofroma.client.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email</strong>
                  <br />
                  {myprofroma.client.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Need date from</strong>
                  <br />
                  {moment(myprofroma.needDate).format('MMM Do YY, h:mm a')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pick up date</strong>
                  <br />
                  {moment(myprofroma.deadline).format('MMM Do YY, h:mm a')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status</strong>
                  <br />
                  {myprofroma.status}
                </ListGroup.Item>
              </ListGroup>
              {!myprofroma.isPaid && (
                <Card.Footer>
                  {/* Add your cancel and approve buttons here */}
                </Card.Footer>
              )}
            </Card>
          ) : null}
        </Col>
        <Col xs={12} sm={4} md={4}>

          <h2>Total: {amountToPay}</h2>
          {/* <Table striped bordered hover>
            <tbody>
              <tr>
                <td colSpan="3">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>
                    {myprofroma.amount !=''? myprofroma.amount : 0}
                  </strong>
                </td>
              </tr>
            </tbody>
          </Table> */}
          {props.isAdmin && (
            <Button
              variant="success"
              size="md"
              className="mt-3"
              onClick={() => handleClickOpen()}
            >
              Back
            </Button>
          )}

          {myprofroma !== undefined && !props.isAdmin && myprofroma.status !== 'PAID' && (
            <div>
              {/* <PaymentForm
                bookingEmail={'niyoceles3@gmail.com'}
                bookingID={myprofroma.id}
                amountToPay={4}
              /> */}

          <Button
              variant="success"
              size="md"
              className="mt-3"
              onClick={() => handlePayOpen(myprofroma.amount)}
            >
              Pay now
            </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewOrder;
