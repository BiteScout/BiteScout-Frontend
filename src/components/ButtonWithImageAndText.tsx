import "../styles/Button.css";

export function Button(props: {
  text: string;
  func: any;
  msg: string;
  src: string;
  class: string;
}) {
  return (
    <button className={props.class} onClick={() => props.func(props.msg)}>
      <p className="button__text">{props.text}</p>
      <img src={props.src}></img>
    </button>
  );
}
