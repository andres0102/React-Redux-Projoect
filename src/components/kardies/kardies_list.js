import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';
import { getLikes } from '../../redux/actions/likes';
import { clearingResults } from '../../redux/actions/likes';
import KardiesItem from './kardies_item'

class KardiesList extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1 };
  }

  componentDidMount() {
    this.props.getLikes();
  }

  componentWillUnmount() {
    this.props.clearingResults();
  }

  renderKardiesItem = (like, index) => {
    let timelineInverted = ''

    if(index % 2 === 0) {
      timelineInverted = ''
    } else {
      timelineInverted = 'timeline-inverted'
    }

    return (
      <KardiesItem
        key={like.username}
        user={like}
        timelineInverted={timelineInverted}
      />
    );
  }

  renderEmpty = () => {
    return (
      <div className="col-12 text-center">
        <p> Δεν υπάρχουν καρδιές ακομα </p>
      </div>
    )
  }

  renderLikes = () => {
    return this.props.likes.map(this.renderKardiesItem)
  }

  fetchMore = () => {
    let incrementPage = this.state.page + 1;

    this.setState({ page: incrementPage });
    this.props.getLikes(incrementPage);
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    )
  }

  renderMoreButton = () => {
    if(this.props.endOfLikes) {
      return (
        <div className="row justify-content-center">
          <strong> Δεν υπάρχουν άλλες καρδιές </strong>
        </div>
      )
    }
    return (
      <div className="row justify-content-center">
        <button
          className="button_shadow mb-3"
          onClick={this.fetchMore}
        >
          Περισσότερα...
        </button>
      </div>
    )
  }

  render() {
    return(
      <div>
        { this.props.isFetchingLikes ? this.renderLoader() : null }
        <ul className="timeline">
          { this.renderLikes() }
        </ul>
        { this.renderMoreButton() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    likes: state.likes.results,
    isFetchingLikes: state.likes.isFetchingLikes,
    endOfLikes: state.likes.endOfLikes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLikes, clearingResults }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KardiesList);
