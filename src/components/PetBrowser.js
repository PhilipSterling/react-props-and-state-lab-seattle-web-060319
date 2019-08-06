import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  showPetCards = () => {
    return this.props.pets.map(pet => {
      return <Pet onAdoptPet={this.props.onAdoptPet} pet={pet} key={pet.id}/>
    })
  }

  render() {
    return <div className="ui cards">{this.showPetCards()}</div>
  }
}

export default PetBrowser
