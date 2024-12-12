import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col ,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = ({ limit }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error("Il y a eu une erreur!", error);
            });
    }, []);

    return (
        <Container>
            <Row>
                {products.slice(0, limit).map(product =>
                    <Col xs={12} sm={6} lg={4} className="mb-4" key={product.id}>
                        <Card as={Link} to={`/products/${product.id}`} className="h-100 shadow-sm text-decoration-none" style={{ cursor: 'pointer' }}>
                            <Card.Img 
                                variant="top" 
                                src={product.thumbnail} 
                                alt={product.title} 
                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 'auto', marginTop: '10px' }} 
                            />
                            <Card.Body className="text-center">
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Prix : ${product.price}</Card.Text>
                                <Button variant="primary" as={Link} to={`/products/${product.id}`}>Voir plus de détails</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ProductList;
