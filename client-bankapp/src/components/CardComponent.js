import Card from 'react-bootstrap/Card';
function CardComponent(props){
  function classes() {
    const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card m-4 ' + bg + txt;
  }
  return (
    <Card className={classes()}>
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        {props.title && ( <Card.Title>{props.title}</Card.Title> )}
        {props.text && ( <Card.Text>{props.text}</Card.Text> )}
        {props.body}
        {props.status && ( <p id="createStatus" className="mt-3">{props.status}</p> )}
      </Card.Body>
    </Card>

  );
}
export default CardComponent;
