import React from "react"

import ArchiveForm from './archive/form'

class Archive extends React.Component {

  render() {
    return (
      <div>
        {this.props.entity.upload === "En cours" || this.props.entity.deployment === "En cours"
         ? <div>
             <span>
               {this.props.entity.upload === "En cours"
                ? "En cours de téléchargement"
                : "En cours de déploiement"}
             </span>
           </div>
         : <ArchiveForm scenario={this.props.entity} />
        }
      </div>
    )
  }

}

export default Archive
