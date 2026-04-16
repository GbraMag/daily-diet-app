import { TextInputProps } from "react-native";
import { useState } from "react";

import {
  Container,
  Label,
  InputField,
} from "./styles";

type Props = TextInputProps & {
  label?: string;
  multiline?: boolean;
};

export function Input({ label, multiline = false, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <InputField
        multiline={multiline}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </Container>
  );
}