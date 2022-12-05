import CardComponent from '../components/CardComponent';
import ATM from '../components/ATM';

function Deposit() {

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <CardComponent
        txtcolor="white"
        bgcolor="dark"
        header="Deposit"
        body={
          <ATM
            isDeposit={true}
            atmMode="Deposit"
          />
        }
      />

    </div>
  );
}

export default Deposit;

