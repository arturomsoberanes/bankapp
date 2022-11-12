import CardComponent from '../components/CardComponent';
import ATM from '../components/ATM';

function Withdraw() {

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <CardComponent
        bgcolor="dark"
        txtcolor="white"
        header="Withdraw"
        body={
          <ATM
            isDeposit={false}
            atmMode="Cash Back"
          />
        }
      />

    </div>
  );
}

export default Withdraw;
