export const Button = ({ onClick, btnText, className }) => {
  return (
    <button on:click={onClick} class={className}>
      {btnText}
    </button>
  );
};
