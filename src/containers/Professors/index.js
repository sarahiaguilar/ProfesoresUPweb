import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import Professor from './Professor'
import api from '../../helpers/api'

class Professors extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('professors')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.message})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay Profesores</div>
    return (
      <Layout>
        <h1>Profesores</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/professors/new'>Crear Profesor +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(professor => <Professor key={professor._id} {...professor} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Professors
