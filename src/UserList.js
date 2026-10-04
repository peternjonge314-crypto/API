import { useEffect, useState } from 'react';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    axios
      .get(USERS_URL)
      .then(({ data }) => {
        if (isMounted) setListOfUser(data);
      })
      .catch(() => {
        if (isMounted) setError('We couldn’t load the directory. Please try again.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="directory" aria-labelledby="directory-title">
      <div className="directory-heading">
        
       
      </div>

     
     
     
        <ul className="people-grid">
          {listOfUser.map((user) => (
            <li className="person-card" key={user.id}>
              <div className="avatar" aria-hidden="true">
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="person-details">
                <h2>{user.name}</h2>
                <p className="username">@{user.username}</p>
                <a href={`mailto:${user.email}`} className="person-email">{user.email}</a>
                <p className="company">{user.company.name}</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ul>
      
    </section>
  );
}

export default UserList;
