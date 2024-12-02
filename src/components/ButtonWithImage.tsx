import "../styles/Button.css";

export function ImgButton(props: {
  func: any;
  msg: string;
  src: string;
  class: string;
}) {
  return (
    <button className={props.class} onClick={() => props.func(props.msg)}>
      <img src={props.src}></img>
    </button>
  );
}
