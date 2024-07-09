import { CSSProperties } from "react";
import { Children } from "../utils/types";

interface PillProps {
  children: Children;
  className?: string;
  style?: CSSProperties;
}

function Pill(props: PillProps) {
  return <div className={"pill" + (props.className ? " " + props.className : "")} style={props.style}>{props.children}</div>;
}

export default Pill;