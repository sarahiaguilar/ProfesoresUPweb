import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import Course from './Course'
import api from '../../helpers/api'

class Courses extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('courses')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.message})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay Cursos</div>
    return (
      <Layout>
        <h1>Cursos</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/courses/new'>Crear Curso +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(course => <Course key={course._id} {...course} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Courses
