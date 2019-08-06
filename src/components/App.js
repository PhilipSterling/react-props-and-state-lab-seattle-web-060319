import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFiltersType = (newType) => {
    this.setState({
      filters:{
        type: newType
      }
    })
  }

  handleAdoptPet = (id) => {
    let selectedPet = this.state.pets.find(pet => pet.id == id)
    let index = this.state.pets.indexOf(selectedPet)
    selectedPet.isAdopted = true
    this.setState(prevState => {
      let prevPets = prevState.pets
      prevPets[index] = selectedPet
      return {pets: prevPets}
    })
  }

  maybeFetch = () => {
    let url = "/api/pets"
    if(this.state.filters.type !== "all"){
      url += `?type=${this.state.filters.type}`
    }
    console.log(url)
    fetch(url).then(res => res.json()).then(json => {
      this.setState({
        pets: json
      })
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFiltersType} onFindPetsClick={this.maybeFetch}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
