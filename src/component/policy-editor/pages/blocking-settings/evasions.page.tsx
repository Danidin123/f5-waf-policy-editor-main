import React, { useRef, useState } from "react";
import { useStyles } from "../../../../utils/styles.hook";
import { useVisitor } from "../../../../store/policy-editor/visitor/interface/base.visitor";
import { Box } from "@mui/material";
import { GridTableValueControl } from "../../controls/grid.table-value.control";
import { EvasionsFieldFactory } from "../../../../store/policy-editor/visitor/imp/evasions-field.factory";
import { EvasionsVisitorFactory } from "../../../../store/policy-editor/visitor/factory/imp/evasions.visitor-factory";
import { ExpandMore } from "@mui/icons-material";
import { MenuSearchPopupControl } from "../../controls/menu-search-popup.control";
import { EvasionDescription } from "../../../../model/policy-schema/policy.definitions";
import { usePolicyEditorState } from "../../../../store/policy-editor/policy-editor.hooks";
import { ToolbarPageControl } from "../../controls/page-controls/toolbar.page-control";
import { ContentPageControl } from "../../controls/page-controls/content.page-control";
import { ToolbarButtonPageControl } from "../../controls/page-controls/toolbar-button.page-control";

export const EvasionsPage: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const evasionsFieldFactory = useVisitor(EvasionsFieldFactory);
  const evasionsVisitorFactory = useVisitor(EvasionsVisitorFactory);

  const {
    titles,
    visitors,
    default: defValues,
  } = evasionsVisitorFactory.getResolvers();
  const allEvasions = Object.values(EvasionDescription);

  const btnRef = useRef<null | HTMLDivElement>(null);

  const { showDefaultPolicy } = usePolicyEditorState();

  function handleSelect(item: string) {
    evasionsFieldFactory.create({
      description: item as EvasionDescription,
      enabled: true,
      maxDecodingPasses: 2,
    });
    setAnchorEl(null);
  }

  return (
    <Box className={classes.pageContent}>
      <ToolbarPageControl headerText="Evasions">
        <div ref={btnRef}>
          <ToolbarButtonPageControl
            variant="contained"
            color="primary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<ExpandMore />}
          >
            Add Evasion
          </ToolbarButtonPageControl>
        </div>
        <MenuSearchPopupControl
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          items={allEvasions}
          onClose={() => {
            setAnchorEl(null);
          }}
          onSelect={(item) => handleSelect(item)}
        />
      </ToolbarPageControl>
      <ContentPageControl>
        <GridTableValueControl
          settingsName={"Evasions"}
          titles={titles}
          visitors={showDefaultPolicy ? [...visitors, ...defValues] : visitors}
          onAddItem={() => btnRef.current && setAnchorEl(btnRef.current)}
          addItemInscription="add Evasions"
        />
      </ContentPageControl>
    </Box>
  );
};
