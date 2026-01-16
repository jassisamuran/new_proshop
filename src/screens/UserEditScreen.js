import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
const UserEditScreen = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log(userDetails);
  useEffect(() => {
    dispatch(getUserDetails(id));
    if (user !== null) {
      setName(user.name);
    }
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const setPassword = () => {
    console.log("set password");
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="checkbox"
                label="Is Admin"
                checked={admin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Control>
              state
            </Form.Group>

            <Button type="submit" variant="primary">
              Regiter
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
