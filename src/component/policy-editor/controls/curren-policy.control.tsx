import * as React from "react";
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import { languages, highlight } from "prismjs";

import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/components/prism-json";
import { usePolicyEditorState } from "../../../store/policy-editor/policy-editor.hooks";

export type CurrentPolicyProps = {
  jsonText: string;
  onTextChange?: (text: string) => void;
};

export const CurrentPolicyControl: React.FunctionComponent<CurrentPolicyProps> =
  ({ jsonText, onTextChange }) => {
    const [code, setCode] = useState(jsonText);

    const { jsonValidationErrors } = usePolicyEditorState();

    useEffect(() => {
      setCode(jsonText);
    }, [jsonText]);

    return (
      <Editor
        id={"current-policy-json"}
        value={code}
        onValueChange={(text) => {
          if (text !== code && onTextChange) {
            // check that this is called not because
            // the props changed, but by the user event
            // to avoid loops
            onTextChange(text);
          }
          setCode(text);
        }}
        highlight={(code) =>
          code && code.length > 0 && highlight(code, languages.json, "json")
        }
        padding={10}
        className="container__editor"
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          position: "relative",
          backgroundColor:
            jsonValidationErrors.length > 0 ? "#fde0dc" : "#DCF9FD",
        }}
      />
    );
  };
