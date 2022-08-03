import { Alert, Container, Col, Row } from 'react-bootstrap';

function Result({ shortUrl, originalUrl }) {
  return (
    <>
      <Container>
        <h1 className="my-4">Your shortened URL</h1>
        <span>Copy the shortened link and share it in messages, texts, posts, websites and other locations.</span>
        <Row>
          <Col md={12}>
            <Alert variant={'success'} className="mt-3">
              Your shortened URL: <Alert.Link href={shortUrl} target="_blank">{shortUrl}</Alert.Link>
            </Alert>
            Original URL: <Alert.Link href={originalUrl} target="_blank">{originalUrl}</Alert.Link>
            <p>
              Create other <Alert.Link href="/"> shortened URL</Alert.Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Result;
