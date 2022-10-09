import {
  PolicyEditorAction,
  PolicyEditorPageEnum,
  PolicyEditorState,
} from "./policy-editor.types";
import { ReducerBase } from "../reducer.base";
import {
  POLICY_EDITOR_JSON_SRC_SET,
  POLICY_EDITOR_JSON_TEXT_SET,
  POLICY_EDITOR_JSON_VISIT,
  POLICY_EDITOR_PAGE_SET,
  POLICY_EDITOR_UI_SHOW_DEFAULT_POLICY_SET,
} from "../action-types";
import { policyEditorPageSetHandler } from "./handler/policyeditor-page-set.handler";
import { policyEditorJsonTextSetHandler } from "./handler/policyeditor-jsontext-set.handler";
import { policyEditorJsonVisitHandler } from "./handler/policyeditor-json-visit.handler";
import { policyEditorJsonSrcSetHandler } from "./handler/policyeditor-jsonsrc-set.handler";
import { policyEditorDefaultPolicySetHandler } from "./handler/policyeditor-default-policy-set.handler";

export function policyEditorStateInit(): PolicyEditorState {
  return {
    policySrcUrl: "",
    currentTab: 0,
    jsonParseError: false,
    currentPage: PolicyEditorPageEnum.Summary,
    jsonCurrentPolicy: {},
    strCurrentPolicy: "",
    jsonValidationErrors: [],
    showDefaultPolicy: false,
  };
}

class PolicyEditorReducerHandlerFactory extends ReducerBase<
  PolicyEditorAction,
  PolicyEditorState
> {
  constructor(state: PolicyEditorState) {
    super(state, {
      [POLICY_EDITOR_PAGE_SET]: policyEditorPageSetHandler,
      [POLICY_EDITOR_JSON_TEXT_SET]: policyEditorJsonTextSetHandler,
      [POLICY_EDITOR_JSON_VISIT]: policyEditorJsonVisitHandler,
      [POLICY_EDITOR_JSON_SRC_SET]: policyEditorJsonSrcSetHandler,
      [POLICY_EDITOR_UI_SHOW_DEFAULT_POLICY_SET]:
        policyEditorDefaultPolicySetHandler,
    });
  }
}

export const PolicyEditorReducer = (
  state: PolicyEditorState = policyEditorStateInit(),
  action: PolicyEditorAction
): PolicyEditorState => {
  const policyEditorReducerHandlerFactory =
    new PolicyEditorReducerHandlerFactory(state);

  return policyEditorReducerHandlerFactory.process(action);
};
