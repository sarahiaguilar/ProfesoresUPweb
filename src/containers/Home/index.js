import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../components/Layout/'
import './style.css'

class Home extends React.Component {
  componentDidMount = () => {
    document.title = 'Lazyfy'
  }
  render = () => (
    <Layout>
      <div className="text-center myClass">
        <h1>Bienvenido a Profesores UP</h1>
        <h2>Acerca de</h2>
        <p>Profesores UP es una aplicación que te ayudará a conocer a los profesores de la Universidad Panamericana con anticipación para poder encontrar a los profesores que más se adecuen a tu forma de estudio. De esta forma tomarás una elección estratégica en el momento de la inscripción de materias.</p>
        <p>Podrás conocer de cada profesor la claridad de su cátedra, la dificultad de su evaluación y el apoyo extra que brinda en base a evaluciones de alumnos que ya han cursado materias con ellos. Así mismo, podrás también hacer tus propias contribuciones (todo siempre de manera objetiva y respetuosa), y así, extender nuestra red de profesores evaluados.</p>
        <p><b>Por alumnos para alumnos.</b></p>
        <p><b>Construyendo una UP más competente.</b></p>
      </div>
    </Layout>
  )
}

export default Home
