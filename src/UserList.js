import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupère les utilisateurs une seule fois, au montage du composant
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setListOfUser(response.data))
      .catch(() => setError('Impossible de charger les utilisateurs.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="info">Chargement...</p>;
  if (error) return <p className="info error">{error}</p>;

  return (
    <div className="grid">
      {listOfUser.map((user) => (
        <div key={user.id} className="user">
          <div className="avatar">{user.name.charAt(0)}</div>
          <h3>{user.name}</h3>
          <p className="username">@{user.username}</p>
          <p>📧 {user.email}</p>
          <p>📞 {user.phone}</p>
          <p>🏙️ {user.address.city}</p>
          <p>🏢 {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
