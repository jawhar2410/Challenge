import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            })
            .catch(error => console.error('Erreur lors du chargement des produits:', error));
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, category, minPrice, maxPrice]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const filterProducts = () => {
        let filtered = products;

        if (search) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(product =>
                product.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        if (minPrice) {
            filtered = filtered.filter(product =>
                product.price >= parseFloat(minPrice)
            );
        }

        if (maxPrice) {
            filtered = filtered.filter(product =>
                product.price <= parseFloat(maxPrice)
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Tous les produits</h2>
            <Form className="mb-4">
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Form.Group controlId="search">
                            <Form.Label>Recherche</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Form.Group controlId="category">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                                <option value="">Toutes</option>
                                <option value="fragrances">Fragrances</option>
                                <option value="smartphones">Smartphones</option>
                                <option value="laptops">Laptops</option>
                                <option value="clothing">Vêtements</option>
                                <option value="watches">Montres</option>
                                <option value="books">Livres</option>
                                <option value="home-decoration">Décoration maison</option>
                                <option value="sports">Sports</option>
                                <option value="toys">Jouets</option>
                                <option value="groceries">Épicerie</option>
                                <option value="beauty">Beauté</option>
                                <option value="automotive">Automobile</option>
                                <option value="health">Santé</option>
                               
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={3}>
                        <Form.Group controlId="minPrice">
                            <Form.Label>Prix Min</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={3}>
                        <Form.Group controlId="maxPrice">
                            <Form.Label>Prix Max</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row className="mt-4">
                {filteredProducts.map(product => (
                    <Col xs={12} sm={6} lg={4} className="mb-4" key={product.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                            <Card.Body className="text-center">
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Prix : ${product.price}</Card.Text>
                                <Button variant="primary" as={Link} to={`/products/${product.id}`}>Voir plus de détails</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsPage;
