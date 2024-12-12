import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Erreur lors du chargement du produit:', error));
    }, [id]);

    if (!product) return <div>Chargement...</div>;

    return (
        <Container className="py-5">
            <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={product.thumbnail} alt={product.title} 
                style={{ width: '350px', height: 'auto', objectFit: 'cover' }} 
                />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Prix : ${product.price}</Card.Text>
                    <Card.Text>Catégorie : {product.category}</Card.Text>
                    <Button variant="primary" as={Link} to="/products">Retour à la liste des produits</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;
