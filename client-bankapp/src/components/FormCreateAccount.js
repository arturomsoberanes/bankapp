import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
function FormCreateAccount({onChange, onSubmit, values, errors, isValid}){
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={values.name}
          onChange={onChange}
        />
        {
          errors.name ? 
            (
              <Form.Text className="text-muted">
                {errors.name}
              </Form.Text>
            ):null
        }
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          id="email"
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
          id="password"
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
      <Form.Group className="mb-3">
        <Form.Label>Repeat your Password:</Form.Label>
        <Form.Control
          type="password"
          id="repassword"
          value={values.repassword}
          onChange={onChange}
        />
        {
          errors.repassword ? 
            (
              <Form.Text className="text-muted">
                {errors.repassword}
              </Form.Text>
            ):null
        }
      </Form.Group>
      <Form.Group className="text-center">
        <Button
          type="submit"
          variant="light"
        >Create Account</Button>
      </Form.Group>
    </Form>

  );
}

export default FormCreateAccount;
