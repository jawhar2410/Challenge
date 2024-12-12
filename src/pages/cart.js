import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
       
        axios.get('https://dummyjson.com/carts/1')
            .then(response => {
                setCartItems(response.data.products);
            })
            .catch(error => {
                console.error("Erreur lors du chargement du panier:", error);
            });
    }, []);

    const handleRemoveItem = (id) => {
   
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
       
        console.log("Passer à la caisse");
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Mon Panier</h2>
            <Row>
                {cartItems.map(item => (
                    <Col md={4} key={item.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={item.thumbnail} alt={item.title} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                    <br />
                                    <strong>Prix : ${item.price}</strong>
                                </Card.Text>
                                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                    Retirer
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {cartItems.length > 0 ? (
                <div className="text-center mt-4">
                    <Button variant="success" onClick={handleCheckout}>Passer à la caisse</Button>
                </div>
            ) : (
                <p className="text-center">Votre panier est vide.</p>
            )}
        </Container>
    );
};

export default Cart;
