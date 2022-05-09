import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Highlight from '../components/Highlight';
import Loading from '../components/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

export const ProfileComponent = () => {
  const { user, getIdTokenClaims } = useAuth0();
  const [idTokenClaims, setIdTokenClaims] = useState();

  useEffect(() => {
    async function getClaims() {
      const claims = await getIdTokenClaims();
      setIdTokenClaims(claims);
    }
    getClaims();
  }, []);

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
          {idTokenClaims && idTokenClaims['http://localhost:3000/roles'] && (
            <p className="lead text-muted">
              {idTokenClaims['http://localhost:3000/roles'].join(' ')}
            </p>
          )}
        </Col>
      </Row>
      <h4>User Object for simple operations</h4>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      <h4>
        ID Token claims you can use - if you need custom claims like Roles
      </h4>
      <Row>
        <Highlight>{JSON.stringify(idTokenClaims, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
