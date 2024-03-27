import * as s from "./Button.sc";

export default function Button({ children, href, type }) {
  return (
    <s.ButtonLink href={href}>
      <s.Button>{children}</s.Button>
    </s.ButtonLink>
  );
}
