import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Modal, Form } from "react-bootstrap";

const Crud = () => {
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [age, setAge] = useState(0);
  const [show, setShow] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItem");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cartItem", JSON.stringify(cartItems));
  // }, [cartItems]);

  const openModal = (item) => {
    setShow(true);
    setEditedItem(item);
  };

  const closeModal = () => {
    setShow(false);
    setEditedItem(null);
  };

  const saveEdit = () => {
    const updatedItem = cartItems.map((cart) =>
      cart.id === editedItem.id ? { ...editedItem } : item
    );
    console.log("updatedItem", updatedItem);
    setCartItems(updatedItem);
    localStorage.setItem("cartItem", JSON.stringify(updatedItem));
    closeModal();
  };

  const removeAllItems = () => {
    setCartItems([]);
    localStorage.removeItem("cartItem");
  };

  const addItemCart = () => {
    if (fullName && nickName) {
      const newItem = { id: new Date().getTime(), fullName, nickName, age };
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      setFullName("");
      setNickName("");
      setAge("");
    }
  };

  // const addItemCart = () => {
  //   if (fullName && nickName) {
  //     const newItem = { id: new Date().getTime(), fullName, nickName };
  //     const updatedCart = [...cartItems];
  //     updatedCart.push(newItem);
  //     setCartItems(updatedCart);
  //     setFullName("");
  //     setNickName("");
  //   }
  // };

  // console.log("cartItems", cartItems);

  const removeItemFromCart = (id) => {
    const deletedItem = cartItems.filter((cart) => cart.id !== id);
    setCartItems(deletedItem);
    localStorage.setItem("cartItem", JSON.stringify(deletedItem));
  };



  return (
    <>
      <div className="container d-flex flex-column align-items-center ">
        <div className="d-flex flex-column align-items-center my-3">
          <input
            type="text"
            placeholder="FullName"
            className="my-1 px-4 py-1 rounded-2"
            value={fullName}
            onChange={(e) => {
              console.log("FullName", e.target.value);
              setFullName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="NickName"
            value={nickName}
            className="my-1 px-4 py-1 rounded-2"
            onChange={(e) => {
              console.log("setNickName", e.target.value);
              setNickName(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            className="my-1 px-4 py-1 rounded-2"
            onChange={(e) => {
              console.log("setNickName", e.target.value);
              setAge(e.target.value);
            }}
          />
          <div>
            <Button className="m-1" onClick={addItemCart}>
              Add to Cart
            </Button>
            <Button className="m-1" variant="danger" onClick={removeAllItems}>
              Remove All
            </Button>
          </div>
        </div>

        <Row>
          {cartItems.map((cart) => (
            <Col key={cart.id}>
              <Card
                style={{ width: "14rem" }}
                className="mt-3 bg-dark-subtle text-center py-3"
              >
                <Card.Body>
                  <Card.Title>FullName : {cart.fullName} </Card.Title>
                  <Card.Title className="my-3">
                    NickName : {cart.nickName}
                  </Card.Title>
                  <Card.Title className="my-3">Age : {cart.age}</Card.Title>
                  <Button className="me-2" onClick={() => openModal(cart)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => removeItemFromCart(cart.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={editedItem?.fullName || ""}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    fullName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editedItem?.nickName || ""}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    nickName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="number"
                value={editedItem?.age || ""}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    age: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Crud;
