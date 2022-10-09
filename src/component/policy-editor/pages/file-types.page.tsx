import React from "react";
import { useStyles } from "../../../utils/styles.hook";
import { useVisitor } from "../../../store/policy-editor/visitor/interface/base.visitor";
import { Box } from "@mui/material";
import { GridTableValueControl } from "../controls/grid.table-value.control";
import { FileTypesFieldFactory } from "../../../store/policy-editor/visitor/imp/file-types-field.factory";
import { FileTypesVisitorFactory } from "../../../store/policy-editor/visitor/factory/imp/file-types.visitor-factory";
import {
  usePolicyEditorDispatch,
  usePolicyEditorState,
} from "../../../store/policy-editor/policy-editor.hooks";
import { policyEditorJsonVisit } from "../../../store/policy-editor/policy-editor.actions";
import { PolicyJsonReorderServices } from "../../../store/policy-editor/visitor/services/policy-json.reorder.services";
import { ToolbarPageControl } from "../controls/page-controls/toolbar.page-control";
import { ToolbarButtonPageControl } from "../controls/page-controls/toolbar-button.page-control";
import { ContentPageControl } from "../controls/page-controls/content.page-control";
import AddIcon from "@mui/icons-material/Add";

export const FileTypesPage: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  const filetypesFieldFactory = useVisitor(FileTypesFieldFactory);
  const filetypesVisitorFactory = useVisitor(FileTypesVisitorFactory);

  const dispatch = usePolicyEditorDispatch();

  const {
    titles,
    visitors,
    default: defValues,
  } = filetypesVisitorFactory.getResolvers();

  const { showDefaultPolicy } = usePolicyEditorState();

  return (
    <Box className={classes.pageContent}>
      <ToolbarPageControl headerText="File Types">
        <ToolbarButtonPageControl
          variant="contained"
          color="primary"
          onClick={() => filetypesFieldFactory.create(undefined)}
          startIcon={<AddIcon />}
        >
          Add Filetype
        </ToolbarButtonPageControl>
      </ToolbarPageControl>
      <ContentPageControl>
        <GridTableValueControl
          titles={titles}
          visitors={showDefaultPolicy ? [...visitors, ...defValues] : visitors}
          settingsName="Filetypes"
          dnd={true}
          onAddItem={() => filetypesFieldFactory.create(undefined)}
          addItemInscription="add Filetype"
          onDragEnd={(result) =>
            dispatch(
              policyEditorJsonVisit((currentJson) => {
                const urlServices = new PolicyJsonReorderServices(
                  currentJson.policy
                );
                urlServices.changeOrder(
                  "filetypes",
                  "wildcardOrder",
                  result.source.index,
                  result.destination?.index ?? 0
                );
              })
            )
          }
        />
      </ContentPageControl>
    </Box>
  );
};
