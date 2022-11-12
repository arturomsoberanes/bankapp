import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormLogin({onChange, onSubmit, values, errors}) {

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address:</Form.Label>
        <Form.Control  
          type="email"
          id="email" 
          placeholder="Enter Email"
          value={values.email}
          onChange={onChange}
        />
        {
          errors.email ? 
            (
              <Form.Text className="text-muted">
                {errors.email}
              </Form.Text>
            ):null
        }
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          className="form-control"
          id="password" 
          placeholder="Enter Password"
          value={values.password}
          onChange={onChange}
        />
        {
          errors.password ? 
            (
              <Form.Text className="text-muted">
                {errors.password}
              </Form.Text>
            ):null
        }
      </Form.Group>
      <Form.Group className="text-center">
        <Button 
          variant="light"
          type="submit"
        >
          Login
        </Button>
      </Form.Group>
    </Form>
  );

}

export default FormLogin;
