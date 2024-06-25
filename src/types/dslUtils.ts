import type { ValueTypes } from "@purecodeai/dsl-web";
import type { ExoticComponent } from "react";
import type {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Box,
  Calendar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  ColumnContainer,
  ContextMenu,
  ContextMenuRoot,
  ContextMenuTarget,
  CustomOption,
  CustomSelect,
  DataGrid,
  Divider,
  Drawer,
  DrawerTarget,
  DrawerWrapper,
  Dropdown,
  DropdownHeader,
  DropdownMenu,
  FloatingActionButton,
  Footer,
  Form,
  Grid,
  GridCol,
  GridItem,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Link,
  List,
  ListItem,
  CollapsibleListItem,
  Loader,
  Menu,
  MenuTarget,
  MenuItem,
  Option,
  Pagination,
  Progress,
  Radio,
  RangeSlider,
  Rating,
  RowContainer,
  ScrollArea,
  Select,
  Sidebar,
  Slider,
  // Stack,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableFoot,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TabsProvider,
  Tabs,
  TextArea,
  Tooltip,
  Typography,
  //new components added on 29-01-2024
  Carousel,
  CarouselItem,
  ComboBox,
  DateRangePicker,
  Kanban,
  ModalContainer,
  ModalProvider,
  ModalTarget,
  MultiSelect,
  PopoverRoot,
  PopoverTarget,
  PopoverPopup,
  TodoCalendar,
  Video,
  VerticalCarouselAnimationWrapper,
  VerticalCarouselAnimationItem,
  Tab,
  Panel,
} from "@purecodeai/pcui";
import type { CSSObject } from "@/DSL/utils";

export type Generics = string | number | symbol | boolean;

interface AccordionProps {
  variant: ValueTypes;
}

interface AccordionHeaderProps {
  openIcon: ValueTypes;
  closeIcon: ValueTypes;
  iconSize: ValueTypes;
  w: ValueTypes;
  h: ValueTypes;
}

interface BoxProps {
  component: ValueTypes;
}

interface GridProps {
  align: ValueTypes;
  columns: ValueTypes;
  row: ValueTypes;
  grow: ValueTypes;
  spacing: ValueTypes;
}

interface GridColProps {
  offset: ValueTypes;
  order: ValueTypes;
  span: ValueTypes;
}

interface ScrollAreaProps {
  h: ValueTypes;
  w: ValueTypes;
  mih: ValueTypes;
  miw: ValueTypes;
  mah: ValueTypes;
  maw: ValueTypes;
  scrollbarSize: ValueTypes;
  scrollHideDelay: ValueTypes;
  scrollbars: ValueTypes;
  type: ValueTypes;
  scrollbarTrackRadius: ValueTypes;
  scrollbarthumbRadius: ValueTypes;
  scrollbarTrackColor: ValueTypes;
  scrollbarthumbColor: ValueTypes;
}

interface AvatarProps {
  src: ValueTypes;
  alt: ValueTypes;
  radius: ValueTypes;
}

interface BadgeProps {
  variant: ValueTypes;
}

interface DividerProps {
  orientation: ValueTypes;
  dividerWidth: ValueTypes;
  rootColor: ValueTypes;
}

interface IconProps {
  src: ValueTypes;
  size: ValueTypes;
  invertIconColor: ValueTypes;
  radius: ValueTypes;
}

interface ImageProps {
  src: ValueTypes;
  h: ValueTypes;
  w: ValueTypes;
}

interface LabelProps {
  name: ValueTypes;
  htmlFor: ValueTypes;
}

interface CollapsibleListItemProps {
  label: ValueTypes;
  openIcon: ValueTypes;
  closeIcon: ValueTypes;
  iconSize: ValueTypes;
  withIcon: ValueTypes;
}

interface TooltipProps {
  variant: ValueTypes;
  position: ValueTypes;
  label: ValueTypes;
  rootColor: ValueTypes;
  fontColor: ValueTypes;
}

interface ButtonProps {
  variant: ValueTypes;
}

interface InputProps {
  variant: ValueTypes;
  type: ValueTypes;
  name: ValueTypes;
  id: ValueTypes;
  placeholder: ValueTypes;
  value?: ValueTypes;
}

interface ListProps {
  listType: ValueTypes;
}

interface TableProps {
  variant: ValueTypes;
}

interface TypographyProps {
  variant: ValueTypes;
  variantType: ValueTypes;
}

interface BreadcrumbsProps {
  variant: ValueTypes;
  separator: ValueTypes;
  name: ValueTypes;
  separatorColor: ValueTypes;
}

interface CalendarProps {
  rootColor: ValueTypes;
  todayHighlightStyle: ValueTypes;
  dayHeaderStyle: ValueTypes;
  calendarEmptyDayStyle: ValueTypes;
  dayStyle: ValueTypes;
  navigationContainerStyle: ValueTypes;
  calendarGridStyle: ValueTypes;
  buttonStyle: ValueTypes;
  selectStyle: ValueTypes;
}

interface DrawerProps {
  position: ValueTypes;
  size: ValueTypes;
  closeBtn: ValueTypes;
  closeIcon: ValueTypes;
  iconSize: ValueTypes;
}

interface DropdownProps {
  closeOnClickOutside: ValueTypes;
}

interface DropdownHeaderProps {
  openIcon: ValueTypes;
  closeIcon: ValueTypes;
  iconSize: ValueTypes;
  w: ValueTypes;
  h: ValueTypes;
}

interface LinkProps {
  href: ValueTypes;
  target: ValueTypes;
  rel: ValueTypes;
  hrefLang: ValueTypes;
  media: ValueTypes;
  ping: ValueTypes;
  referrerPolicy: ValueTypes;
}

interface PaginationProps {
  variant: ValueTypes;
  total: ValueTypes;
  radius: ValueTypes;
  border: ValueTypes;
  name: ValueTypes;
}

interface StepperProps {
  variant: ValueTypes;
  orientation: ValueTypes;
  rootColor: ValueTypes;
  contentColor: ValueTypes;
  stepRadius: ValueTypes;
  connectorGap: ValueTypes;
  size: ValueTypes;
}

interface TabsProviderProps {
  defaultValue: ValueTypes;
  orientation: ValueTypes;
}

interface TabProps {
  value: ValueTypes;
  label: ValueTypes;
  activeTabStyles: ValueTypes;
}

interface PanelProps {
  value: ValueTypes;
}

interface CheckboxProps {
  id: ValueTypes;
  name: ValueTypes;
  borderRadius: ValueTypes;
  size: ValueTypes;
  rootColor: ValueTypes;
}

interface RadioProps {
  variant: ValueTypes;
  id: ValueTypes;
  name: ValueTypes;
  variantType: ValueTypes;
  rootColor: ValueTypes;
  size: ValueTypes;
}

interface RangeSliderProps {
  variant: ValueTypes;
  min: ValueTypes;
  max: ValueTypes;
  enableTooltip: ValueTypes;
  trackSize: ValueTypes;
  thumbSize: ValueTypes;
  name: ValueTypes;
  filledTrackColor: ValueTypes;
  rootTrackColor: ValueTypes;
  thumbColor: ValueTypes;
}

interface RatingProps {
  totalStars: ValueTypes;
  initialRating: ValueTypes;
  stroke: ValueTypes;
  strokeWidth: ValueTypes;
  gap: ValueTypes;
  size: ValueTypes;
  rootColor: ValueTypes;
  selectedColor: ValueTypes;
}

interface ChipProps {
  variant: ValueTypes;
}

interface SliderProps {
  variant: ValueTypes;
  min: ValueTypes;
  max: ValueTypes;
  value: ValueTypes;
  trackSize: ValueTypes;
  thumbSize: ValueTypes;
  showTooltip: ValueTypes;
  filledTrackColor: ValueTypes;
  rootTrackColor: ValueTypes;
  thumbColor: ValueTypes;
}

interface SwitchProps {
  variant: ValueTypes;
  trackWidth: ValueTypes;
  trackHeight: ValueTypes;
  trackColor: ValueTypes;
  thumbWidth: ValueTypes;
  thumbHeight: ValueTypes;
  thumbColor: ValueTypes;
  checked: ValueTypes;
}

interface TextareaProps {
  maxColumns: ValueTypes;
  maxRows: ValueTypes;
  placeholder: ValueTypes;
}

interface StepProps {
  index: ValueTypes;
  orientation: ValueTypes;
}

interface StepContentProps {
  index: ValueTypes;
  collapsible: ValueTypes;
}

interface StepContentProps {
  index: ValueTypes;
  collapsible: ValueTypes;
}

interface CustomOptionProps {
  value?: ValueTypes;
}

interface CustomSelectProps {
  variant: ValueTypes;
  closeOnClickOutside: ValueTypes;
  openIcon: ValueTypes;
  closeIcon: ValueTypes;
  iconSize: ValueTypes;
  selectedColor: ValueTypes;
  rightIcon?: ValueTypes;
  leftIcon?: ValueTypes;
  placeholder: ValueTypes;
}

interface FloatingActionButtonProps {
  icon: ValueTypes;
  size: ValueTypes;
  invertIconColor: ValueTypes;
  bgColor: ValueTypes;
}

interface DataGridProps {
  rows: ValueTypes; // Assuming rows is an array of some type, adjust as necessary
  columns: ValueTypes; // Assuming columns is an array of some type, adjust as necessary
  caption: ValueTypes; // Typically a string
  cellStyles: ValueTypes;
  checkboxStyles: ValueTypes;
  tdStyles: ValueTypes;
  thStyles: ValueTypes;
  paginationContainerStyles: ValueTypes;
  gridInputStyles: ValueTypes;
  gridInputFocusedStyles: ValueTypes;
  selectable: ValueTypes; // Boolean indicating if rows are selectable
  pagination: ValueTypes; // Boolean indicating if pagination is enabled
  pageSize: ValueTypes; // Typically a number indicating rows per page
}

interface LoaderProps {
  variant: ValueTypes; // Expected to be a string, representing the loader's visual style.
  thickness: ValueTypes; // This could be a string indicating the thickness, like "4px".
  variantType: ValueTypes; // A string indicating the type of animation or visual style, like "spin".
  bgColor: ValueTypes; // String representing a background color, like "#007bff".
}

interface ProgressProps {
  variant: ValueTypes; // Typically a string indicating the visual style.
  value: ValueTypes; // Could be a number representing the progress percentage.
  rootColor: ValueTypes; // String representing a color, like "#007bff".
  trackColor: ValueTypes; // String representing the track color, like "#007bff50".
}

interface KanbanContextProps {
  data: ValueTypes; // Assuming data could be an object representing the Kanban board's data.
  kanbanColumnStyles: ValueTypes; // Styles for Kanban columns.
  kanbanColumnHeaderStyles: ValueTypes; // Styles for Kanban column headers.
}

interface CarouselProps {
  height: ValueTypes; // String indicating the height, e.g., "500px".
  itemWidth: ValueTypes; // String indicating the width of each item, e.g., "100%".
  activeIndexColor: ValueTypes; // String representing a color for the active index, e.g., "#007bff".
  itemIdicatorType: ValueTypes; // String indicating the type of indicator, e.g., "dots".
  arrowColor: ValueTypes; // String representing the arrow color, e.g., "#007bff".
  autoIntervel: ValueTypes; // Boolean indicating if the carousel should auto-scroll.
  autoScrollInterval: ValueTypes; // Number indicating the interval between auto-scrolls in milliseconds, e.g., 2000.
}

interface ComboBoxProps {
  data: ValueTypes; // Assuming data is an array of strings for the options.
  placeholder: ValueTypes; // Typically a string.
  inputStyles: ValueTypes; // Object representing CSS styles for the input element.
  menuStyles: ValueTypes; // Object representing CSS styles for the menu.
  SelectedStyles: ValueTypes; // Object representing CSS styles for selected item.
  closeIconStyles: ValueTypes; // Object representing CSS styles for the close icon.
}

interface KanbanProps {
  data: ValueTypes;
  kanbanColumnStyles: ValueTypes;
  kanbanColumnHeaderStyles: ValueTypes;
  kanbanItemStyles: ValueTypes;
  kanbanItemHeadingStyles: ValueTypes;
  kanbanItemContentStyles: ValueTypes;
  kanbanItemLabelStyles: ValueTypes;
  kanbanItemAvatarStyles: ValueTypes;
  kanbanItemImageStyles: ValueTypes;
}

interface ModalProviderProps {}

interface ModalContainerProps {
  title: ValueTypes;
  name: ValueTypes;
  closeButton: ValueTypes;
  closeIcon: ValueTypes;
  closeOnClickBackground: ValueTypes;
  closeButtonStyles: ValueTypes;
  backdropStyles: ValueTypes;
}

interface ModalTargetProps {}

interface MultiSelectProps {
  placeholder: ValueTypes;
  options: ValueTypes;
  rightIcon: ValueTypes;
  rightIconStyles: ValueTypes;
  headerStyle: ValueTypes;
  optionsDropdownStyles: ValueTypes;
  selectedPillStyles: ValueTypes;
  deleteButtonStyles: ValueTypes;
  checkButtonStyles: ValueTypes;
}

interface PopoverRootProps {
  trigger: ValueTypes;
  closeOnClickOutside: ValueTypes;
}

interface PopoverTargetProps {}

interface PopoverPopupProps {}

interface TodoCalendarProps {
  calendarEmptyDayStyle: ValueTypes;
  calendarGridStyle: ValueTypes;
  dayHeaderStyle: ValueTypes;
  dayStyle: ValueTypes;
  todayHighlightStyle: ValueTypes;
  navigationContainerStyle: ValueTypes;
  buttonStyle: ValueTypes;
  selectStyle: ValueTypes;
  modalContentStyles: ValueTypes;
  addHeaderStyles: ValueTypes;
  editHeaderStyles: ValueTypes;
  editinputWrapperStyles: ValueTypes;
  todoWrapperStyle: ValueTypes;
  todoTextStyle: ValueTypes;
  modalContainerStyle: ValueTypes;
  modalHeaderStyle: ValueTypes;
  modalInputWrapperStyle: ValueTypes;
  tagSectionStyle: ValueTypes;
  tagPillStyle: ValueTypes;
  customTagInputStyle: ValueTypes;
  modalButtonsStyle: ValueTypes;
  colorPickerStyle: ValueTypes;
  addTitleInputStyle: ValueTypes;
  addDescriptionStyle: ValueTypes;
  h4Styles: ValueTypes;
}

interface VideoProps {
  autoplay: ValueTypes;
  controls: ValueTypes;
  controlsList: ValueTypes;
  crossorigin: ValueTypes;
  disablePictureInPicture: ValueTypes;
  height: ValueTypes;
  width: ValueTypes;
  loop: ValueTypes;
  muted: ValueTypes;
  playsInline: ValueTypes;
  poster: ValueTypes;
  preload: ValueTypes;
  src: ValueTypes;
}

interface GridItemProps {
  xs: ValueTypes;
  sm: ValueTypes;
  md: ValueTypes;
  lg: ValueTypes;
  xl: ValueTypes;
}

interface ContainerProps {
  gap: ValueTypes;
}

interface EmptyProps {}

interface AccordionBodyProps extends EmptyProps {}
interface ListItemProps extends EmptyProps {}
interface CardProps extends EmptyProps {}
interface CardBodyProps extends EmptyProps {}
interface CardFooterProps extends EmptyProps {}
interface CardHeaderProps extends EmptyProps {}
interface FooterProps extends EmptyProps {}
interface HeaderProps extends EmptyProps {}
interface StackProps extends EmptyProps {}
interface GridItemProps extends EmptyProps {}
interface SidebarProps extends EmptyProps {}
interface TableBodyProps extends EmptyProps {}
interface TableCellProps extends EmptyProps {}
interface TableHeaderProps extends EmptyProps {}
interface TableRowProps extends EmptyProps {}
interface ColProps extends EmptyProps {}
interface ColgroupProps extends EmptyProps {}
interface DropdownMenuProps extends EmptyProps {}
interface MenuProps extends EmptyProps {}
interface MenuTargetProps extends EmptyProps {}
interface MenuItemProps extends EmptyProps {}
interface ContextMenuProps extends EmptyProps {}
interface ContextMenuRootProps extends EmptyProps {}
interface ContextMenuTargetProps extends EmptyProps {}
interface DrawerTargetProps extends EmptyProps {}
interface DrawerWrapperProps extends EmptyProps {}
interface FormProps extends EmptyProps {}
interface ModalProviderProps extends EmptyProps {}
interface ModalContainerProps extends EmptyProps {}
interface ModalTargetProps extends EmptyProps {}
interface OptionProps extends EmptyProps {}
interface SelectProps extends EmptyProps {}
interface VerticalCarouselAnimationWrapperProps extends EmptyProps {}
interface StepHeaderProps extends EmptyProps {}
interface TabsProps extends EmptyProps {}

export interface ThemeProps {
  use_primary?: ValueTypes;
  use_secondary?: ValueTypes;
  use_base?: ValueTypes;
  use_neutral?: ValueTypes;
  high_contrast?: ValueTypes;
}
export interface ExtendedThemeProps {
  Typography?: ThemeProps;
  Progress?: ThemeProps;
  Radio?: ThemeProps;
  Table?: ThemeProps;
  Pagination?: ThemeProps;
  Accordion?: ThemeProps;
  Tooltip?: ThemeProps;
  Button?: ThemeProps;
  CustomSelect?: ThemeProps;
  Badge?: ThemeProps;
  Chip?: ThemeProps;
  Input?: ThemeProps;
  Loader?: ThemeProps;
  Switch?: ThemeProps;
  Slider?: ThemeProps;
  RangeSlider?: ThemeProps;
  Breadcrumbs?: ThemeProps;
  Stepper?: ThemeProps;
  Tabs?: ThemeProps;
  // Add more components as needed
}

export interface ComponentProperties {
  AccordionHeader: AccordionHeaderProps;
  AccordionBody: AccordionBodyProps;
  Calendar: CalendarProps;
  Box: BoxProps;
  Grid: GridProps;
  DataGrid: DataGridProps;
  ComboBox: ComboBoxProps;
  KanbanContext: KanbanContextProps;
  Carousel: CarouselProps;
  GridCol: GridColProps;
  ScrollArea: ScrollAreaProps;
  Avatar: AvatarProps;
  Divider: DividerProps;
  GridItem: GridItemProps;
  ColumnContainer: ContainerProps;
  RowContainer: ContainerProps;
  Icon: IconProps;
  Image: ImageProps;
  Label: LabelProps;
  CollapsibleListItem: CollapsibleListItemProps;
  List: ListProps;
  Drawer: DrawerProps;
  Dropdown: DropdownProps;
  DropdownHeader: DropdownHeaderProps;
  Step: StepProps;
  StepContent: StepContentProps;
  StepHeader: StepHeaderProps;
  TabsProvider: TabsProviderProps;
  Tab: TabProps;
  Panel: PanelProps;
  Checkbox: CheckboxProps;
  Rating: RatingProps;
  Textarea: TextareaProps;
  Card: CardProps;
  CardBody: CardBodyProps;
  CardFooter: CardFooterProps;
  CardHeader: CardHeaderProps;
  Footer: FooterProps;
  Header: HeaderProps;
  Stack: StackProps;
  Sidebar: SidebarProps;
  TableBody: TableBodyProps;
  TableCell: TableCellProps;
  TableHeader: TableHeaderProps;
  TableRow: TableRowProps;
  Col: ColProps;
  Colgroup: ColgroupProps;
  DropdownMenu: DropdownMenuProps;
  Link: LinkProps;
  Menu: MenuProps;
  MenuTarget: MenuTargetProps;
  MenuItem: MenuItemProps;
  ContextMenu: ContextMenuProps;
  ContextMenuRoot: ContextMenuRootProps;
  ContextMenuTarget: ContextMenuTargetProps;
  DrawerTarget: DrawerTargetProps;
  DrawerWrapper: DrawerWrapperProps;
  Form: FormProps;
  Option: OptionProps;
  CustomOption: CustomOptionProps;
  Select: SelectProps;
  FloatingActionButton: FloatingActionButtonProps;
  VerticalCarouselAnimationWrapper: VerticalCarouselAnimationWrapperProps;
  ListItem: ListItemProps;
  Kanban: KanbanProps;
  ModalProvider: ModalProviderProps;
  ModalContainer: ModalContainerProps;
  ModalTarget: ModalTargetProps;
  MultiSelect: MultiSelectProps;
  PopoverRoot: PopoverRootProps;
  PopoverTarget: PopoverTargetProps;
  PopoverPopup: PopoverPopupProps;
  TodoCalendar: TodoCalendarProps;
  Video: VideoProps;
  Typography?: (TypographyProps & ExtendedThemeProps["Typography"]) | undefined;
  Progress?: (ProgressProps & ExtendedThemeProps["Progress"]) | undefined;
  Radio?: (RadioProps & ExtendedThemeProps["Radio"]) | undefined;
  Table?: (TableProps & ExtendedThemeProps["Table"]) | undefined;
  Pagination?: (PaginationProps & ExtendedThemeProps["Pagination"]) | undefined;
  Accordion?: (AccordionProps & ExtendedThemeProps["Accordion"]) | undefined;
  Tooltip?: (TooltipProps & ExtendedThemeProps["Tooltip"]) | undefined;
  Button?: (ButtonProps & ExtendedThemeProps["Button"]) | undefined;
  CustomSelect?: (CustomSelectProps & ExtendedThemeProps["CustomSelect"]) | undefined;
  Badge?: (BadgeProps & ExtendedThemeProps["Badge"]) | undefined;
  Chip?: (ChipProps & ExtendedThemeProps["Chip"]) | undefined;
  Input?: (InputProps & ExtendedThemeProps["Input"]) | undefined;
  Loader?: (LoaderProps & ExtendedThemeProps["Loader"]) | undefined;
  Switch?: (SwitchProps & ExtendedThemeProps["Switch"]) | undefined;
  Slider?: (SliderProps & ExtendedThemeProps["Slider"]) | undefined;
  RangeSlider?: (RangeSliderProps & ExtendedThemeProps["RangeSlider"]) | undefined;
  Breadcrumbs?: (BreadcrumbsProps & ExtendedThemeProps["Breadcrumbs"]) | undefined;
  Stepper?: (StepperProps & ExtendedThemeProps["Stepper"]) | undefined;
  Tabs?: (TabsProps & ExtendedThemeProps["Tabs"]) | undefined;
}

export interface VirtualDOM<T> {
  type: string;
  props: {
    children: (ValueTypes | VirtualDOM<T>)[];
    key?: string;
    style?: {
      key?: CSSObject;
    };
    layout?: {
      key?: CSSObject;
    };
    tablet?: {
      key?: CSSObject;
    };
    mobile?: {
      key?: CSSObject;
    };
    hover?: {
      key?: CSSObject;
    };
    active?: {
      key?: CSSObject;
    };
    focus?: {
      key?: CSSObject;
    };
    importName: string;
  };
  key?: string;
  layer_id?: string;
  commonKey?: string;
}

export interface ComponentTypes {
  Accordion: typeof Accordion;
  AccordionBody: typeof AccordionBody;
  AccordionHeader: typeof AccordionHeader;
  Avatar: typeof Avatar;
  Badge: typeof Badge;
  Breadcrumbs: typeof Breadcrumbs;
  Button: typeof Button;
  Box: typeof Box;
  Calendar: typeof Calendar;
  Card: typeof Card;
  CardBody: typeof CardBody;
  CardFooter: typeof CardFooter;
  CardHeader: typeof CardHeader;
  Checkbox: typeof Checkbox;
  Chip: typeof Chip;
  Dropdown: typeof Dropdown;
  DropdownHeader: typeof DropdownHeader;
  DropdownMenu: typeof DropdownMenu;
  Footer: typeof Footer;
  Form: typeof Form;
  Header: typeof Header;
  Icon: typeof Icon;
  Image: typeof Image;
  Input: typeof Input;
  Label: typeof Label;
  Link: typeof Link;
  List: typeof List;
  ListItem: typeof ListItem;
  CollapsibleListItem: typeof CollapsibleListItem;
  Loader: typeof Loader;
  Option: typeof Option;
  Pagination: typeof Pagination;
  Progress: typeof Progress;
  Radio: typeof Radio;
  Rating: typeof Rating;
  Select: typeof Select;
  Sidebar: typeof Sidebar;
  Slider: typeof Slider;
  Stepper: typeof Stepper;
  Step: typeof Step;
  StepContent: typeof StepContent;
  StepHeader: typeof StepLabel;
  Switch: typeof Switch;
  Table: typeof Table;
  TableBody: typeof TableBody;
  TableCell: typeof TableCell;
  TableHeader: typeof TableHeader;
  TableRow: typeof TableRow;
  TabsProvider: typeof TabsProvider;
  Tabs: typeof Tabs;
  Tab: typeof Tab;
  Panel: typeof Panel;
  Textarea: typeof TextArea;
  Tooltip: typeof Tooltip;
  Typography: typeof Typography;
  // newly added components
  // Col: typeof Col,
  // Colgroup: typeof Colgroup,
  ColumnContainer: typeof ColumnContainer;
  ContextMenu: typeof ContextMenu;
  ContextMenuRoot: typeof ContextMenuRoot;
  ContextMenuTarget: typeof ContextMenuTarget;
  CustomOption: typeof CustomOption;
  CustomSelect: typeof CustomSelect;
  DataGrid: typeof DataGrid;
  Divider: typeof Divider;
  Drawer: typeof Drawer;
  DrawerTarget: typeof DrawerTarget;
  DrawerWrapper: typeof DrawerWrapper;
  FloatingActionButton: typeof FloatingActionButton;
  Grid: typeof Grid;
  GridCol: typeof GridCol;
  GridItem: typeof GridItem;
  Menu: typeof Menu;
  MenuTarget: typeof MenuTarget;
  MenuItem: typeof MenuItem;
  RangeSlider: typeof RangeSlider;
  RowContainer: typeof RowContainer;
  ScrollArea: typeof ScrollArea;
  Stack: typeof Box;
  TableCaption: typeof TableCaption;
  TableFoot: typeof TableFoot;
  TableHeaderCell: typeof TableHeaderCell;
  // new pro component
  Carousel: typeof Carousel;
  CarouselItem: typeof CarouselItem;
  ComboBox: typeof ComboBox;
  DateRangePicker: typeof DateRangePicker;
  Kanban: typeof Kanban;
  ModalContainer: typeof ModalContainer;
  ModalProvider: typeof ModalProvider;
  ModalTarget: typeof ModalTarget;
  MultiSelect: typeof MultiSelect;
  PopoverRoot: typeof PopoverRoot;
  PopoverTarget: typeof PopoverTarget;
  PopoverPopup: typeof PopoverPopup;
  TodoCalendar: typeof TodoCalendar;
  Video: typeof Video;
  VerticalCarouselAnimationWrapper: typeof VerticalCarouselAnimationWrapper;
  VerticalCarouselAnimationItem: typeof VerticalCarouselAnimationItem;
  Fragment: ExoticComponent;
  div: string;
  TableHead: typeof TableHeader;
}
