import React, {
  ReactElement,
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "./Icon";

type InputSize = "lg" | "sm";
export interface IForm extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string
}
const Form: React.FC<IForm> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  const cnames = classNames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  if ("value" in restProps) {
    const value = restProps.value;
    delete restProps.defaultValue; // input
    restProps.value = (value === null || value === 'undefined') ? '' : value
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        placeholder="test-input"
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

Form.defaultProps = {};

export default Form;
