export function Button(props: {
  text: string;
  color: string;
  func: any;
  msg: string;
}) {
  return (
    <button
      style={{ backgroundColor: props.color }}
      onClick={() => props.func(props.msg)}
    >
      <p>{props.text}</p>
    </button>
  );
}
