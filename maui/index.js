import Alert from './components/alert/alert.vue'
import Avatar from './components/avatar/avatar.vue'
import Badge from './components/badge/badge.vue'
import Breadcrumb from './components/breadcrumb/breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb/breadcrumb-item.vue'
import Button from './components/button/button.vue'
import Card from './components/card/card.vue'
import Collapse from './components/collapse/collapse.vue'
import CollapseItem from './components/collapse/collapse-item.vue'
import Column from './components/layout/column.vue'
import Container from './components/layout/container.vue'
import Countdown from './components/countdown/countdown.vue'
import Dropdown from './components/dropdown/dropdown.vue'
import DropdownItem from './components/dropdown/dropdown-item.vue'
import DropdownMenu from './components/dropdown/dropdown-menu.vue'
import Grid from './components/layout/grid.vue'
import Group from './components/group/group.vue'
import Nav from './components/nav/nav.vue'
import NavItem from './components/nav/nav-item.vue'
import Icon from './components/icon/icon'
import Pagination from './components/pagination/pagination.vue'
import Popover from './components/popover/popover.vue'
import Progress from './components/progress/progress.vue'
import ProgressBar from './components/progress/progress-bar.vue'
import Skeleton from './components/skeleton/skeleton.vue'
import SkeletonSet from './components/skeleton/skeleton-set.vue'
import Tabs from './components/tabs/tabs.vue'
import TabPane from './components/tabs/tab-pane.vue'
import Tag from './components/tag/tag.vue'
import Tooltip from './components/tooltip/tooltip.vue'

const components = {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Collapse,
  CollapseItem,
  Column,
  Container,
  Countdown,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Grid,
  Group,
  Nav,
  NavItem,
  Icon,
  Pagination,
  Popover,
  Progress,
  ProgressBar,
  Skeleton,
  SkeletonSet,
  Tabs,
  TabPane,
  Tag,
  Tooltip
}

function install (Vue) {
  for (const component of Object.values(components)) {
    if (!component.name) {
      continue
    }

    Vue.component(component.name, component)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export const Maui = {
  install,
  ...components
}
export default Maui
