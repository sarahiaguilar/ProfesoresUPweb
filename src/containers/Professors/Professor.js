import React from 'react'
import {Link} from 'react-router-dom'

const Professor = props => (
    <div className="row myItemList">
      <Link to={'/professors/' + props._id}>
        <div>Nombre del profesor: {props.name}</div>
      </Link><br /><br />
    </div>
)

export default Professor
