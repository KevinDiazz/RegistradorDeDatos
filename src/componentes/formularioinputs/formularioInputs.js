import "./formularioInputs.css";
function Inputs(props) {
  return (
    <>
      <p>{props.name}</p>
      <label htmlFor={props.name}></label>
      <input style={props.style} type={props.type} id={props.name} onChange={props.valor} /* autoComplete="off" */ autoFocus></input>
      <img style={props.styleImg} className="alert" src={process.env.PUBLIC_URL + '/img/alert-icon-red-11-1.png'} alt="Alert Icon"></img>
      <p style={props.styleAlert} className="alertMessage">{props.alert}</p>
    </>
  );
}
export default Inputs;
