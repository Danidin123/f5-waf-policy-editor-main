import * as React from "react";
import { Box } from "@mui/material";
import { GridTableValueControl } from "../controls/grid.table-value.control";
import { useVisitor } from "../../../store/policy-editor/visitor/interface/base.visitor";
import { MethodsFieldFactory } from "../../../store/policy-editor/visitor/imp/methods-field.factory";
import { MethodsVisitorFactory } from "../../../store/policy-editor/visitor/factory/imp/methods.visitor-factory";
import { useStyles } from "../../../utils/styles.hook";
import { usePolicyEditorState } from "../../../store/policy-editor/policy-editor.hooks";
import AddIcon from "@mui/icons-material/Add";
import { ContentPageControl } from "../controls/page-controls/content.page-control";
import { ToolbarPageControl } from "../controls/page-controls/toolbar.page-control";
import { ToolbarButtonPageControl } from "../controls/page-controls/toolbar-button.page-control";

export const MethodsPage: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  const methodsFieldFactory = useVisitor(MethodsFieldFactory);
  const methodsVisitorFactory = useVisitor(MethodsVisitorFactory);

  const { showDefaultPolicy } = usePolicyEditorState();

  const {
    titles,
    visitors,
    default: defValues,
  } = methodsVisitorFactory.getResolvers();

  return (
    <Box className={classes.pageContent}>
      <ToolbarPageControl headerText="Methods">
        <ToolbarButtonPageControl
          variant="contained"
          color="primary"
          onClick={() => methodsFieldFactory.create(undefined)}
          startIcon={<AddIcon />}
        >
          Add Method
        </ToolbarButtonPageControl>
      </ToolbarPageControl>
      <ContentPageControl>
        <GridTableValueControl
          settingsName="Methods"
          titles={titles}
          visitors={showDefaultPolicy ? [...visitors, ...defValues] : visitors}
          onAddItem={() => methodsFieldFactory.create(undefined)}
          addItemInscription="add Method"
        />
      </ContentPageControl>
    </Box>
  );
};
