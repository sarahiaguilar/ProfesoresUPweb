import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './containers/Home/'
import Courses from './containers/Courses/'
import CoursesForm from './containers/Courses/Form'
import Professors from './containers/Professors/'
import ProfessorsForm from './containers/Professors/Form'
import Evaluations from './containers/Evaluations/'
import EvaluationsForm from './containers/Evaluations/Form'
import Login from './containers/Login/'
import Signup from './containers/Signup/'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/courses' component={Courses} />
      <Route exact path='/courses/new' component={CoursesForm} />
      <Route exact path='/courses/:id' component={CoursesForm} />

      <Route exact path='/professors' component={Professors} />
      <Route exact path='/professors/new' component={ProfessorsForm} />
      <Route exact path='/professors/:id' component={ProfessorsForm} />

      <Route exact path='/evaluations' component={Evaluations} />
      <Route exact path='/evaluations/new' component={EvaluationsForm} />
      <Route exact path='/evaluations/:id' component={EvaluationsForm} />

      //<Route exact path='/courses' component={Courses} />
      //<Route exact path='/evaluations' component={Evaluations} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  </Router>
)

export default App;
