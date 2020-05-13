import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchUsers, clearingResults } from '../../redux/actions/search';
import { getStates } from '../../redux/actions/states';
import NoUiSlider from './_slider'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchIcon: 'fa-search-plus'
    }
  }

  renderPlaces = (state) => {
    return <option key={state[1]} value={state[1]}>{state[0]}</option>
  }

  componentDidMount() {
    this.props.getStates()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearingResults();

    const data = new FormData(e.target);
    this.props.getSearchUsers(data);
  }

  renderLoader = () => {
    return <option>Loading...</option>
  }

  render() {
    return(
      <div id="top-search" className="col-12 effect2 white-text-bs">
        <form className="p-3" onSubmit={ this.handleSubmit }>
          <div className="row">
            <div className="form-group col-md-2">
              <select
                name="state"
                className="form-control form-control-lg custom-select"
              >
                <option value="">Ελλάδα</option>
                { this.props.states.isFetching ? this.renderLoader() :
                  this.props.states.allStates.map(this.renderPlaces) }
              </select>
            </div>
            <div className="form-group col-md-2">
              <select
                name="gender"
                id="gender"
                className="form-control form-control-lg custom-select"
              >
                <option value="">Φύλο</option>
                <option value="male">Άντρας</option>
                <option value="female">Γυναίκα</option>
                <option value="other">Άλλο</option>
              </select>
            </div>
            <div className="form-group col-md-4 text-center">
              Ηλικία από/εώς
              <NoUiSlider />
            </div>
            <div className="form-group col-md-2">
              <label className="switch">
                <input
                  name="is_signed_in"
                  id="is_signed_in"
                  defaultValue="true"
                  type="checkbox"
                />
                <span className="slider round" />
              </label>
              <p className="float-right">Συνδεδεμένοι τώρα</p>
            </div>
            <div className="form-group col-md-2">
              <button
                name="commit"
                className="btn btn-outline-light btn-lg btn-block"
                type="submit"
                >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>

          <input
            name="age_from"
            id="slider-limit-value-min"
            defaultValue="18"
            className="form-control form-control-lg"
            type="hidden"
          />
          <input
            name="age_to"
            id="slider-limit-value-max"
            defaultValue="99"
            className="form-control form-control-lg"
            type="hidden"
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      getSearchUsers,
      getStates,
      clearingResults
    }, dispatch)
  }
}

const mapStateToProps = ({ states }) => {
  return { states };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
