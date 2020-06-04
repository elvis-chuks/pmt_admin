import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard.vue'
import NewRoute from '../views/newroute.vue'
import DeleteRoute from '../views/deleteroute.vue'
import RouteFare from '../views/routefare.vue'
import FareAdjust from '../views/fareadjust.vue'
import Settings from '../views/settings.vue'
import Profile from '../views/profile.vue'
import CreateStaff from '../views/createstaff'
import UpdateStaff from '../views/updatestaff'
import DeleteStaff from '../views/deletestaff'
import DepotDashboard from '../views/depotdashboard'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/newroute',
    name: 'NewRoute',
    component: NewRoute
  },
  {
    path: '/deleteroute',
    name: 'DeleteRoute',
    component: DeleteRoute
  },
  {
    path: '/routefare',
    name: 'RouteFare',
    component: RouteFare
  },
  {
    path: '/adjustfare',
    name: 'FareAdjust',
    component: FareAdjust
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/createstaff',
    name: 'CreateStaff',
    component: CreateStaff
  },
  {
    path: '/deletestaff',
    name: 'DeleteStaff',
    component: DeleteStaff
  },
  {
    path: '/updatestaff',
    name: 'UpdateStaff',
    component: UpdateStaff
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/depotdashboard',
    name: 'DepotDashboard',
    component: DepotDashboard
  }
]

const router = new VueRouter({
  routes
})

export default router
