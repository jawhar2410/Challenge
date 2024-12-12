import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductList';

const Home = () => {
    const [aboutImage, setAboutImage] = useState('');
    const [customerImages, setCustomerImages] = useState([]);

    useEffect(() => {
      
        axios.get('https://dummyjson.com/products/16') 
            .then(response => {
                const imageUrl = response.data.images[0]; 
                setAboutImage(imageUrl);
            })
            .catch(error => {
                console.error("Erreur lors du chargement de l'image:", error);
            });

   
        axios.get('https://dummyjson.com/users')
            .then(response => {
                const users = response.data.users;
                const userImages = users.slice(0, 3).map(user => user.image);
                setCustomerImages(userImages);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des images des clients:", error);
            });
    }, []);

    return (
        <div className="home font-sans p-3">
       
            <header className="text-center py-5 mb-5 bg-primary text-white rounded shadow-lg">
                <h1 className="display-4 font-weight-bold mb-3">Bienvenue dans notre boutique en ligne</h1>
                <p className="lead">Trouvez les meilleurs produits aux meilleurs prix !</p>
                <Button as={Link} to="/products" variant="outline-light" size="lg">Explorer nos produits</Button>
            </header>

      
            <section className="my-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            {aboutImage && <img src={aboutImage} alt="À propos de nous" className="img-fluid rounded shadow" />}
                        </Col>
                        <Col md={6}>
                            <h2 className="font-weight-bold">À propos de notre boutique</h2>
                            <p>
                                Nous offrons une large sélection de produits de haute qualité à des prix compétitifs. Notre mission est de fournir à nos clients une expérience d'achat exceptionnelle, avec un service clientèle de premier ordre.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

         
            <section className="my-5">
                <Container>
                    <h2 className="text-center mb-4">Produits populaires</h2>
                    <ProductList limit={6} />
                    <div className="text-center mt-4">
                        <Button className="btn btn-primary btn-lg" as={Link} to="/products">Voir tous les produits</Button>
                    </div>
                </Container>
            </section>

          
            <section className="my-5 bg-light py-5">
                <Container>
                    <h2 className="text-center mb-4">Ce que disent nos clients</h2>
                    <Row>
                        {customerImages.map((image, index) => (
                            <Col md={4} key={index}>
                                <Card className="p-3 shadow-sm">
                                    <Card.Img 
                                        variant="top" 
                                        src={image} 
                                        alt={`Client ${index + 1}`} 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 'auto' }} 
                                    />
                                    <Card.Body>
                                        <Card.Text>
                                            {index === 0 && "Excellent service et produits de haute qualité. Je recommande vivement cette boutique !"}
                                            {index === 1 && "Livraison rapide et support client très réactif. Merci pour cette expérience."}
                                            {index === 2 && "Les produits correspondent parfaitement à la description. Très satisfait de mon achat."}
                                        </Card.Text>
                                        <Card.Footer>
                                            <small className="text-muted">
                                                {index === 0 && "- Client satisfait"}
                                                {index === 1 && "- Client heureux"}
                                                {index === 2 && "- Client fidèle"}
                                            </small>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
