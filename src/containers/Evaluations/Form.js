import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'
import Layout from '../../components/Layout/'
import Confirm from '../../components/Confirm/'

class EvaluationsForm extends React.Component {
  state = {process: false, err: '', course: '', professor: '', artist: '', help: '', clearness: '', difficulty: '', comment: '', date: '', courses: [], professors: [], modal: false}
  componentDidMount = () => {
    if (this.props.match.params.id) this.load()
    else{
      this.loadCourses()
      this.loadProfessors()
    }
  }
  change = e => {
    const type = e.target.type
    const value = type === 'file' ? e.target.files[0] : e.target.value
    this.setState({[e.target.id]: value})
  }
  load = e => {
    const id = this.props.match.params.id
    this.setState({process: true}, () => {
      Promise.all([
        api('evaluations/' + id),
        api('courses/'),
        api('professors/')
      ])
      .then(([evaluations, professors, courses]) => this.setState({
        process: false,
        ...evaluations.data[0],
        professor: evaluations.data[0].professor ? evaluations.data[0].professor._id : professors.data[0]._id,
        professors: professors.data,
        course: evaluations.data[0].course ? evaluations.data[0].course._id : courses.data[0]._id,
        courses: courses.data
      }))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  loadCourses = e => {
    this.setState({process: true}, () => {
      api('courses/')
      .then(res => this.setState({process: false, course: res.data[0]._id, courses: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  loadProfessors = e => {
    this.setState({process: true}, () => {
      api('professors/')
      .then(res => this.setState({process: false, professor: res.data[0]._id, professors: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }

  create = (e) => {
    const {professor, course, help, clearness, difficulty, comment, date} = this.state
    const data = new FormData()

    data.append('professor', professor)
    data.append('course', course)
    data.append('help', help)
    data.append('clearness', clearness)
    data.append('difficulty', difficulty)
    data.append('comment', comment)
    data.append('date', date)

    this.setState({process: 'save'}, () => {
      api({
        url: 'evaluations',
        method: 'post',
        body: data
      })
      .then(res => this.props.history.push('/evaluations'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: 'problemas de conexión'})
      })
    })
  }
  update = (e) => {
    const {_id, professor, course, help, clearness, difficulty, comment, date} = this.state
    const data = new FormData()

    if (professor) data.append('professor', professor)
    if (course) data.append('course', course)
    if (help) data.append('help', help)
    if (clearness) data.append('clearness', clearness)
    if (difficulty) data.append('difficulty', difficulty)
    if (comment) data.append('comment', comment)
    if (date) data.append('date', date)

    this.setState({process: 'save'}, () => {
      api({ url: 'evaluations/' + _id, method: 'put', body: data})
      .then(res => this.props.history.push('/evaluations'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.data.message})
      })
    })
  }
  delete = (e) => {
    const {_id} = this.state

    this.setState({process: 'delete'}, () => {
      api({url: 'evaluations/' + _id, method: 'delete'})
      .then(res => this.props.history.push('/evaluations'))
      .catch(err => {
        console.log(err);
        this.setState({process: false, err: err.data.message})
      })
    })
  }
  toggleModal = () => this.setState({modal: !this.state.modal})
  render = () => {
    return (
      <Layout>
        {this.state.modal ? <Confirm delete={this.delete} toggle={this.toggleModal} /> : null}
        <div className="col-md-offset-3 col-md-6">
          <h2 className="text-center">Crear Evaluación</h2><br />
          <form className="lazyForms">
          <div className='form-group'>
            <select
              className='form-control'
              id='course'
              value={this.state.course}
              onChange={this.change}>
              {this.state.courses.map(course => <option value={course._id} key={course._id}>{course.name}</option>)}
            </select>
          </div>
            <div className='form-group'>
              <select
                className='form-control'
                id='professor'
                value={this.state.professor}
                onChange={this.change}>
                {this.state.professors.map(professor => <option value={professor._id} key={professor._id}>{professor.name}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='clearness'
                placeholder='Claridad'
                value={this.state.clearness}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='help'
                placeholder='Apoyo'
                value={this.state.apoyo}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='difficulty'
                placeholder='Dificultad'
                value={this.state.difficulty}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='comment'
                placeholder='Comentario'
                value={this.state.comment}
                onChange={this.change}
                />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                id='date'
                placeholder='Fecha'
                value={this.state.date}
                onChange={this.change}
                />
            </div>
            <div>{this.state.err}</div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <button type='button' className='btn-lazyfy btn-danger' onClick={this.toggleModal}>
                  {this.state.process === 'delete' ? 'Cargando...': 'Eliminar'}
                </button>
              </div>
              <div className="col-xs-6 text-left">
                <button type='button' className='btn-lazyfy' onClick={this.state._id ? this.update : this.create}>
                  {this.state.process === 'save' ? 'Cargando...': 'Guardar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default EvaluationsForm
