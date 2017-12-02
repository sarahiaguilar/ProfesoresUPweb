import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'
import Layout from '../../components/Layout/'
import Evaluation from './Evaluation'

class Evaluations extends React.Component {
  state = {process: false, list: []}
  componentDidMount = () => {
    document.title = 'Evaluations'
    this.load()
  }
  load = () => {
    this.setState({process: true}, () => {
      api('evaluations')
      .then(res => this.setState({process: false, list: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  render = () => {
    const emptyEl = <div>No hay Evaluaciones</div>
    return (
      <Layout>
        <h1>Evaluaciones</h1>
        <div className="text-right">
          <Link className="btn-lazyfy" to='/evaluations/new'>Crear Evaluación +</Link>
        </div>
        <div className="col-md-6">
          {this.state.process ? <div>Cargando...</div> : null}
          {this.state.list.length
            ? this.state.list.map(evaluation => <Evaluation key={evaluation._id} {...evaluation} />)
            : emptyEl}
        </div>
      </Layout>
    )
  }
}

export default Evaluations
