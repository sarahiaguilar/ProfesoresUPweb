import React from 'react'
import {Link} from 'react-router-dom'

const Course = props => (
    <div className="row myItemList">
      <Link to={'/courses/' + props._id}>
        <div>Nombre de curso: {props.name}</div>
      </Link><br /><br />
    </div>
)

export default Course
