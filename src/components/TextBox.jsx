export const TextBox = (props) => {
  return (
    <input
      value={props.value}
      oninput={props.onInput}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      class={props.className}
    />
  );
};
