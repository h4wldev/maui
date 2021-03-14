import Avatar from './components/avatar/avatar.vue'
import Badge from './components/badge/badge.vue'
import Breadcrumb from './components/breadcrumb/breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb/breadcrumb-item.vue'
import Button from './components/button/button.vue'
import Card from './components/card/card.vue'
import Container from './components/layout/container.vue'
import Column from './components/layout/column.vue'
import Group from './components/group/group.vue'
import Grid from './components/layout/grid.vue'
import Icon from './components/icon/icon'
import Progress from './components/progress/progress.vue'
import ProgressBar from './components/progress/progress-bar.vue'
import Skeleton from './components/skeleton/skeleton.vue'
import Tag from './components/tag/tag.vue'

const components = {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Column,
  Container,
  Grid,
  Group,
  Icon,
  Progress,
  ProgressBar,
  Skeleton,
  Tag
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
