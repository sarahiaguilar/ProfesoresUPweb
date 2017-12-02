import React from 'react'
import {Link} from 'react-router-dom'

const Evaluation = props => (
    <div className="row myItemList">
      <Link to={'/evaluations/' + props._id}>
        <div className="col-md-6">
          {props.professor ? <div>Profesor: {props.professor.name}</div> : null}
          {props.course ? <div>Curso: {props.course.name}</div> : null}
          <div><b>Apoyo: {props.help}</b></div>
          <div><b>Claridad: {props.clearness}</b></div>
          <div><b>Dificultad: {props.difficulty}</b></div>
          <div><b>Comentario: {props.comment}</b></div>
          <div><b>Fecha: {props.date}</b></div>
        </div>
      </Link><br /><br />
    </div>
)

export default Evaluation
