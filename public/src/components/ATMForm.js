import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function ATMForm({ onChange, isDeposit, values, errors}){
  const choice = ["Deposit", "Cash Back"];
  return (
    <>
      <Form.Group>
        <Form.Label> {choice[Number(!isDeposit)]}</Form.Label>
        <Form.Control 
          id="deposit"
          type="number"
          placeholder="Enter an amount"
          value={values.deposit}
          onChange={onChange}
        />
        {
          errors.deposit ? 
            (
              <Form.Text className="text-muted">
                {errors.deposit}
              </Form.Text>
            ):null
        }
      </Form.Group>
      <Form.Group className="text-center">
        <Button
          type="submit"
          variant="light"
          className="mt-2"
        >{choice[Number(!isDeposit)]}</Button>
      </Form.Group>
    </>
  );
};

export default ATMForm;
