import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getFavorites, addFavorite, removeFavorite, logoutUser } from '../utils/api';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const user = getCurrentUser();
  const navigate = useNavigate();

  const mockProperties = [
    { id: 'prop1', title: 'Modern Apartment Downtown', price: '$250,000', location: 'Downtown' },
    { id: 'prop2', title: 'Cozy House in Suburbs', price: '$350,000', location: 'Suburbs' },
    { id: 'prop3', title: 'Luxury Villa with Pool', price: '$750,000', location: 'Uptown' },
    { id: 'prop4', title: 'Studio Apartment', price: '$180,000', location: 'Midtown' },
    { id: 'prop5', title: 'Family Home', price: '$420,000', location: 'Residential Area' },
  ];

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err);
    }
  };

  const handleAddFavorite = async (propertyId) => {
    try {
      await addFavorite(propertyId);
      fetchFavorites();
    } catch (err) {
      setError(err);
    }
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await removeFavorite(propertyId);
      fetchFavorites();
    } catch (err) {
      setError(err);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.property_id === propertyId);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Buyer Dashboard</h2>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>

      {user && (
        <div className="mb-4">
          <h4>Welcome, {user.name}!</h4>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Available Properties Section */}
      <div className="mb-5">
        <h3>Available Properties</h3>
        <div className="row">
          {mockProperties.map((property) => (
            <div key={property.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> {property.price}<br />
                    <strong>Location:</strong> {property.location}
                  </p>
                  <div className="mt-auto">
                    <button
                      className={`btn ${isFavorite(property.id) ? 'btn-danger' : 'btn-outline-danger'} w-100`}
                      onClick={() => isFavorite(property.id) ? handleRemoveFavorite(property.id) : handleAddFavorite(property.id)}
                    >
                      <i className={`fas ${isFavorite(property.id) ? 'fa-heart' : 'fa-heart-o'}`}></i>
                      {isFavorite(property.id) ? ' Remove from Favorites' : ' Add to Favorites'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Favorites Section */}
      <div>
        <h3>My Favorite Properties</h3>
        {favorites.length === 0 ? (
          <div className="alert alert-info">No favorite properties yet. Click the heart icon on properties above to add them to your favorites!</div>
        ) : (
          <div className="row">
            {favorites.map((fav) => {
              const property = mockProperties.find(p => p.id === fav.property_id);
              return (
                <div key={fav.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 border-success">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{property ? property.title : `Property ${fav.property_id}`}</h5>
                      {property && (
                        <p className="card-text">
                          <strong>Price:</strong> {property.price}<br />
                          <strong>Location:</strong> {property.location}
                        </p>
                      )}
                      <div className="mt-auto">
                        <button
                          className="btn btn-outline-danger w-100"
                          onClick={() => handleRemoveFavorite(fav.property_id)}
                        >
                          <i className="fas fa-heart-broken"></i> Remove from Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
