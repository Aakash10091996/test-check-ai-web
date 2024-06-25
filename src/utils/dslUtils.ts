import type { ComponentProperties, ComponentTypes, VirtualDOM } from "@/types/dslUtils";
import { v4 as uuidv4 } from "uuid";
import {
  Props,
  type IDsl,
  type IIdentifier,
  type ILayer,
  type ValueTypes,
} from "@purecodeai/dsl-web";
import {
  ArrowIconsBASE64,
  AvatarImage,
  defaultIcon,
  defaultImage,
  drawerCloseIcon,
  plusIcon,
  // selectedThemingComponents,
} from "@/constants";

const componentProperties = (props: Record<string, ValueTypes>): ComponentProperties => {
  const propsValues: ComponentProperties = {
    Accordion: {
      variant: props.variant ?? "outline",
    },
    AccordionBody: {},
    AccordionHeader: {
      openIcon: props.openIcon ?? ArrowIconsBASE64.up,
      closeIcon: props.closeIcon ?? ArrowIconsBASE64.down,
      iconSize: props.iconSize ?? "14px",
      w: props.w ?? 14,
      h: props.h ?? 14,
    },
    Card: {},
    CardBody: {},
    CardFooter: {},
    CardHeader: {},
    Footer: {},
    Header: {},
    Box: {
      component: props.component ?? "div",
    },
    Stack: {},
    Grid: {
      align: props.align ?? "stretch",
      columns: props.columns ?? 12,
      row: props.row ?? 0,
      grow: props.grow ?? true,
      spacing: props.spacing ?? "10px",
    },
    GridCol: {
      offset: props.offset ?? 0,
      order: props.order ?? 0,
      span: props.span ?? 12,
    },
    GridItem: {
      xs: props.xs ?? 12,
      sm: props.sm ?? 12,
      md: props.md ?? 12,
      lg: props.lg ?? 12,
      xl: props.xl ?? 12,
    },
    ColumnContainer: {
      gap: props.gap ?? "0px",
    },
    RowContainer: {
      gap: props.gap ?? "0px",
    },
    ScrollArea: {
      h: props.h ?? "200px",
      w: props.w ?? "200px",
      mih: props.mih ?? "200px",
      miw: props.miw ?? "200px",
      mah: props.mah ?? "200px",
      maw: props.maw ?? "200px",
      scrollbarSize: props.scrollbarSize ?? "5px",
      scrollHideDelay: props.scrollHideDelay ?? 1000,
      scrollbars: props.scrollbars ?? "xy",
      type: props.type ?? "hover",
      scrollbarTrackRadius: props.scrollbarTrackRadius ?? "5px",
      scrollbarthumbRadius: props.scrollbarthumbRadius ?? "5px",
      scrollbarTrackColor: props.scrollbarTrackColor ?? "#f9fafb",
      scrollbarthumbColor: props.scrollbarthumbColor ?? "#9ca3af",
    },
    Avatar: {
      src: props.src ?? AvatarImage,
      alt: props.alt ?? "",
      radius: props.radius ?? "50%",
    },
    Badge: {
      variant: props.variant ?? "solid",
    },
    Chip: {
      variant: props.variant ?? "solid",
    },
    Divider: {
      orientation: props.orientation ?? "horizontal",
      dividerWidth: props.dividerWidth ?? "1px",
      rootColor: props.rootColor ?? "#9ca3af",
    },
    Icon: {
      src: props.src ?? defaultIcon,
      size: props.size ?? "25px",
      invertIconColor: props.invertIconColor ?? false,
      radius: props.radius ?? "4px",
    },
    Image: {
      src: props.src ?? defaultImage,
      h: props.h ?? "190px",
      w: props.w ?? "350px",
    },
    Label: {
      name: props.name ?? "label",
      htmlFor: props.htmlFor ?? "label",
    },
    List: {
      listType: props.listType ?? "ul",
    },
    ListItem: {},
    CollapsibleListItem: {
      label: props.label ?? "CollapsibleListItem",
      openIcon: props.openIcon ?? ArrowIconsBASE64.up,
      closeIcon: props.closeIcon ?? ArrowIconsBASE64.down,
      iconSize: props.iconSize ?? "12px",
      withIcon: props.withIcon ?? true,
    },
    Sidebar: {},
    Table: {
      variant: props.variant ?? "ghost",
    },
    TableBody: {},
    TableCell: {},
    TableHeader: {},
    TableRow: {},
    Col: {},
    Colgroup: {},
    Tooltip: {
      variant: props.variant ?? "solid",
      position: props.position ?? "top",
      label: props.label ?? "tooltip",
      rootColor: props.rootColor ?? "#101113",
      fontColor: props.fontColor ?? "#ffffff",
    },
    Typography: {
      variant: props.variant ?? "surface",
      variantType: props.variantType ?? "subtitle",
    },
    Breadcrumbs: {
      variant: props.variant ?? "solid",
      separator: props.separator ?? "/",
      name: props.name ?? "breadcrumb",
      separatorColor: props.separatorColor ?? "#101113",
    },
    ContextMenu: {},
    ContextMenuRoot: {},
    ContextMenuTarget: {},
    Drawer: {
      position: props.position ?? "left",
      size: props.size ?? "260px",
      closeBtn: props.closeBtn ?? true,
      closeIcon: props.closeIcon ?? drawerCloseIcon,
      iconSize: props.iconSize ?? "24px",
    },
    DrawerTarget: {},
    DrawerWrapper: {},
    Dropdown: {
      closeOnClickOutside: props.closeOnClickOutside ?? true,
    },
    DropdownHeader: {
      openIcon: props.openIcon ?? ArrowIconsBASE64.up,
      closeIcon: props.closeIcon ?? ArrowIconsBASE64.down,
      iconSize: props.iconSize ?? "14px",
      w: props.w ?? 14,
      h: props.h ?? 14,
    },
    DropdownMenu: {},
    Link: {
      href: props.href ?? "#",
      target: props.target ?? "_self",
      rel: props.rel ?? "",
      hrefLang: props.hrefLang ?? "",
      media: props.media ?? "",
      ping: props.ping ?? "",
      referrerPolicy: props.referrerPolicy ?? "",
    },
    Menu: {},
    MenuTarget: {},
    MenuItem: {},
    Pagination: {
      variant: props.variant ?? "solid",
      total: props.total ?? 10,
      radius: props.radius ?? "25px",
      border: props.border ?? "0px",
      name: props.name ?? "pagination",
    },
    Stepper: {
      variant: props.variant ?? "solid",
      orientation: props.orientation ?? "horizontal",
      rootColor: props.rootColor ?? "#007bff",
      contentColor: props.contentColor ?? "#909296",
      stepRadius: props.stepRadius ?? "50%",
      connectorGap: props.connectorGap ?? "5px",
      size: props.size ?? "md",
    },
    Step: {
      index: props.index ?? 0,
      orientation: props.orientation ?? "horizontal",
    },
    StepContent: {
      index: props.index ?? 0,
      collapsible: props.collapsible ?? false,
    },
    StepHeader: {},
    TabsProvider: {
      defaultValue: props.defaultValue ?? "",
      orientation: props.orientation ?? "horizontal",
    },
    Tabs: {},
    Tab: {
      value: props.value ?? "",
      label: props.label ?? "",
      activeTabStyles: props.activeTabStyles ?? {},
    },
    Panel: { value: props.value ?? "" },
    Button: {
      variant: props.variant ?? "solid",
    },
    Checkbox: {
      id: props.id ?? "",
      name: props.name ?? "checkbox",
      borderRadius: props.borderRadius ?? "5px",
      size: props.size ?? "20px",
      rootColor: props.rootColor ?? "#007bff",
    },
    CustomOption: {
      value: props.value ?? "option",
    },
    CustomSelect: {
      variant: props.variant ?? "outline",
      closeOnClickOutside: props.closeOnClickOutside ?? true,
      openIcon: props.openIcon ?? ArrowIconsBASE64.up,
      closeIcon: props.closeIcon ?? ArrowIconsBASE64.down,
      iconSize: props.iconSize ?? 14,
      selectedColor: props.selectedColor ?? "#007bff",
      rightIcon: props.rightIcon,
      leftIcon: props.leftIcon,
      placeholder: props.placeholder ?? "select a value",
    },
    FloatingActionButton: {
      icon: props.icon ?? plusIcon,
      size: props.size ?? "56px",
      invertIconColor: props.invertIconColor ?? false,
      bgColor: props.bgColor ?? "#007bff",
    },
    Input: {
      variant: props.variant ?? "outline",
      type: props.type ?? "text",
      name: props.name ?? "input",
      id: props.id ?? "",
      placeholder: props.placeholder ?? "Enter text",
      value: props.value,
    },
    Radio: {
      variant: props.variant ?? "solid",
      id: props.id ?? "",
      name: props.name ?? "radio",
      variantType: props.variantType ?? "classic",
      rootColor: props.rootColor ?? "#007bff",
      size: props.size ?? "20px",
    },
    RangeSlider: {
      variant: props.variant ?? "solid",
      min: props.min ?? 0,
      max: props.max ?? 100,
      enableTooltip: props.enableTooltip ?? true,
      trackSize: props.trackSize ?? "6px",
      thumbSize: props.thumbSize ?? "20px",
      name: props.name ?? "rangeSlider",
      filledTrackColor: props.filledTrackColor ?? "#007bff",
      rootTrackColor: props.rootTrackColor ?? "#c3c3c3",
      thumbColor: props.thumbColor ?? "#007bff",
    },
    Rating: {
      totalStars: props.totalStars ?? 5,
      initialRating: props.initialRating ?? 2.5,
      stroke: props.stroke ?? "#eee",
      strokeWidth: props.strokeWidth ?? 0,
      gap: props.gap ?? 0,
      size: props.size ?? 24,
      rootColor: props.rootColor ?? "#eee",
      selectedColor: props.selectedColor ?? "#ffcf00",
    },
    Select: {},
    Option: {},
    Slider: {
      variant: props.variant ?? "solid",
      min: props.min ?? 0,
      max: props.max ?? 100,
      value: props.value ?? 50,
      trackSize: props.trackSize ?? "10px",
      thumbSize: props.thumbSize ?? "20px",
      showTooltip: props.showTooltip ?? true,
      filledTrackColor: props.filledTrackColor ?? "#007bff",
      rootTrackColor: props.rootTrackColor ?? "#c3c3c3",
      thumbColor: props.thumbColor ?? "#007bff",
    },
    Switch: {
      variant: props.variant ?? "solid",
      trackWidth: props.trackWidth ?? 40,
      trackHeight: props.trackHeight ?? 25,
      trackColor: props.trackColor ?? "#ccc",
      thumbWidth: props.thumbWidth ?? 20,
      thumbHeight: props.thumbHeight ?? 20,
      thumbColor: props.thumbColor ?? "#fff",
      checked: props.checked ?? "#007bff",
    },
    Textarea: {
      maxColumns: props.maxColumns ?? 50,
      maxRows: props.maxRows ?? 10,
      placeholder: props.placeholder ?? "Enter text",
    },
    Calendar: {
      rootColor: props.rootColor ?? "#007bff",
      todayHighlightStyle: props.todayHighlightStyle ?? {},
      dayHeaderStyle: props.dayHeaderStyle ?? {},
      calendarEmptyDayStyle: props.calendarEmptyDayStyle ?? {},
      dayStyle: props.dayStyle ?? {},
      navigationContainerStyle: props.navigationContainerStyle ?? {},
      calendarGridStyle: props.calendarGridStyle ?? {},
      buttonStyle: props.buttonStyle ?? {},
      selectStyle: props.selectStyle ?? {},
    },
    DataGrid: {
      rows: props.rows ?? [],
      columns: props.columns ?? [],
      caption: props.caption ?? "",
      cellStyles: props.cellStyles ?? {},
      checkboxStyles: props.checkboxStyles ?? {},
      tdStyles: props.tdStyles ?? {},
      thStyles: props.thStyles ?? {},
      paginationContainerStyles: props.paginationContainerStyles ?? {},
      gridInputStyles: props.gridInputStyles ?? {},
      gridInputFocusedStyles: props.gridInputFocusedStyles ?? {},
      selectable: props.selectable ?? true,
      pagination: props.pagination ?? true,
      pageSize: props.pageSize ?? 5,
    },
    Form: {},
    Loader: {
      variant: props.variant ?? "solid",
      thickness: props.thickness ?? "4px",
      variantType: props.variantType ?? "spin",
      bgColor: props.bgColor ?? "#007bff",
    },
    Progress: {
      variant: props.variant ?? "solid",
      value: props.value ?? 20,
      rootColor: props.rootColor ?? "#007bff",
      trackColor: props.trackColor ?? "#007bff50",
    },
    // new componentsPropsDetails
    KanbanContext: {
      data: props.data ?? {},
      kanbanColumnStyles: props.kanbanColumnStyles ?? {},
      kanbanColumnHeaderStyles: props.kanbanColumnHeaderStyles ?? {},
    },
    Carousel: {
      height: props.height ?? "500px",
      itemWidth: props.itemWidth ?? "100%",
      activeIndexColor: props.activeIndexColor ?? "#007bff",
      itemIdicatorType: props.itemIdicatorType ?? "dots",
      arrowColor: props.arrowColor ?? "#007bff",
      autoIntervel: props.autoIntervel ?? true,
      autoScrollInterval: props.autoScrollInterval ?? 2000,
    },
    ComboBox: {
      data: props.data ?? ["Option 1", "Option 2", "Option 3", "Option 4"],
      placeholder: props.placeholder ?? "Select an option",
      inputStyles: props.inputStyles ?? {},
      menuStyles: props.menuStyles ?? {},
      SelectedStyles: props.SelectedStyles ?? {},
      closeIconStyles: props.closeIconStyles ?? {
        paddingTop: "5px",
      },
    },
    Kanban: {
      data: props.data ?? {},
      kanbanColumnStyles: props.kanbanColumnStyles ?? {},
      kanbanColumnHeaderStyles: props.kanbanColumnHeaderStyles ?? {},
      kanbanItemStyles: props.kanbanItemStyles ?? {},
      kanbanItemHeadingStyles: props.kanbanItemHeadingStyles ?? {},
      kanbanItemContentStyles: props.kanbanItemContentStyles ?? {},
      kanbanItemLabelStyles: props.kanbanItemLabelStyles ?? {},
      kanbanItemAvatarStyles: props.kanbanItemAvatarStyles ?? {},
      kanbanItemImageStyles: props.kanbanItemImageStyles ?? {},
    },
    ModalProvider: {},
    ModalContainer: {
      title: props.title ?? "modal",
      name: props.name ?? "Modal",
      closeButton: props.closeButton ?? true,
      closeIcon: props.closeIcon ?? drawerCloseIcon,
      closeOnClickBackground: props.closeOnClickBackground ?? true,
      closeButtonStyles: props.closeButtonStyles ?? {},
      backdropStyles: props.backdropStyles ?? {},
    },
    ModalTarget: {},
    MultiSelect: {
      placeholder: props.placeholder ?? "Select...",
      options: props.options ?? [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
        "Option 6",
        "Option 7",
        "Option 8",
        "Option 9",
        "Option 10",
      ],
      rightIcon: props.rightIcon ?? drawerCloseIcon,
      rightIconStyles: props.rightIconStyles ?? {},
      headerStyle: props.headerStyle ?? {},
      optionsDropdownStyles: props.optionsDropdownStyles ?? {},
      selectedPillStyles: props.selectedPillStyles ?? {},
      deleteButtonStyles: props.deleteButtonStyles ?? {},
      checkButtonStyles: props.checkButtonStyles ?? {},
    },
    PopoverRoot: {
      trigger: props.trigger ?? "hover",
      closeOnClickOutside: props.closeOnClickOutside ?? true,
    },
    PopoverTarget: {},
    PopoverPopup: {},
    TodoCalendar: {
      calendarEmptyDayStyle: props.calendarEmptyDayStyle ?? {},
      calendarGridStyle: props.calendarGridStyle ?? {},
      dayHeaderStyle: props.dayHeaderStyle ?? {},
      dayStyle: props.dayStyle ?? {},
      todayHighlightStyle: props.todayHighlightStyle ?? {},
      navigationContainerStyle: props.navigationContainerStyle ?? {},
      buttonStyle: props.buttonStyle ?? {},
      selectStyle: props.selectStyle ?? {},
      modalContentStyles: props.modalContentStyles ?? {},
      addHeaderStyles: props.addHeaderStyles ?? {},
      editHeaderStyles: props.editHeaderStyles ?? {},
      editinputWrapperStyles: props.editinputWrapperStyles ?? {},
      todoWrapperStyle: props.todoWrapperStyle ?? {},
      todoTextStyle: props.todoTextStyle ?? {},
      modalContainerStyle: props.modalContainerStyle ?? {},
      modalHeaderStyle: props.modalHeaderStyle ?? {},
      modalInputWrapperStyle: props.modalInputWrapperStyle ?? {},
      tagSectionStyle: props.tagSectionStyle ?? {},
      tagPillStyle: props.tagPillStyle ?? {},
      customTagInputStyle: props.customTagInputStyle ?? {},
      modalButtonsStyle: props.modalButtonsStyle ?? {},
      colorPickerStyle: props.colorPickerStyle ?? {},
      addTitleInputStyle: props.addTitleInputStyle ?? {},
      addDescriptionStyle: props.addDescriptionStyle ?? {},
      h4Styles: props.h4Styles ?? {},
    },
    Video: {
      autoplay: props.autoplay ?? true,
      controls: props.controls ?? true,
      controlsList: props.controlsList ?? "none",
      crossorigin: props.crossorigin ?? "none",
      disablePictureInPicture: props.disablePictureInPicture ?? false,
      height: props.height ?? "300px",
      width: props.width ?? "500px",
      loop: props.loop ?? false,
      muted: props.muted ?? false,
      playsInline: props.playsInline ?? false,
      poster: props.poster ?? "",
      preload: props.preload ?? "none",
      src: props.src ?? "",
    },
    VerticalCarouselAnimationWrapper: {},
  };
  return propsValues;
};

export const CreateDom = <T extends ComponentTypes>(
  tree: IDsl,
  componentId: IIdentifier,
  componentProps: Record<string, ValueTypes>
  // componentMapping: T
) => {
  const component = tree?.getComponent(componentId);
  const compKey = uuidv4();
  const virtualDom: VirtualDOM<T> = {
    type: "Fragment",
    props: {
      children: [],
      key: compKey,
      importName: "Fragment",
    },
  };

  if (!component) {
    return null;
  }
  const CreateLayer = (layer: ILayer): VirtualDOM<T> => {
    let childrenComponents;
    let customComponent;
    if (layer) {
      const { children, props } = layer;
      const key = uuidv4();
      if (layer.importName && layer.importLibrary && layer.importLibrary === "custom") {
        componentProps = { ...componentProps, ...props };
        customComponent = CreateDom(
          tree,
          tree.getComponent(layer.importName).identifier,
          componentProps
          // componentMapping
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { layout, styleId, ...rest } = props;
      let _props: Record<string, ValueTypes> = {
        style: {
          ...(props?.style as object),
        },
        ...rest,
      };

      const layerProps = layer.importName
        ? componentProperties(props)[layer.importName.value as keyof ComponentProperties]
        : {};

      _props = { ..._props, ...layerProps };
      Object.assign(props, _props);

      childrenComponents =
        children.length !== 0
          ? children.map((child) => {
              if (typeof child === "string") {
                return child;
              }
              if (child instanceof Props) {
                return componentProps[child.value.value];
              }
              return CreateLayer(findLayerById(child as IIdentifier));
            })
          : [];

      for (const [key, prop] of Object.entries(_props)) {
        if (prop instanceof Props) {
          _props[key] = componentProps[prop.value.toString()];
        }
      }

      const importName =
        layer.importLibrary === "custom"
          ? "div"
          : layer?.importName
            ? layer.importName.value
            : "div";

      // const ComponentType = componentMapping[importName as keyof ComponentTypes];
      return {
        type: importName as keyof ComponentTypes,
        layer_id: `${layer.importName?.value}-${key}`,
        commonKey: `${layer.importName?.value}-${layer.identifier.value}`,
        key,
        props: {
          importName: importName,
          children:
            customComponent === undefined
              ? [...childrenComponents]
              : [...childrenComponents, customComponent],
          ..._props,
        },
      };
    } else {
      return virtualDom;
    }
  };
  const findLayerById = (layerId: IIdentifier): ILayer => {
    return component.getLayer(layerId);
  };

  const rootLayer = component?.layers.find((layer) => layer.isRoot);
  virtualDom.props.children.push(CreateLayer(rootLayer!));
  return virtualDom;
};
